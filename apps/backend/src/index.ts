import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env';
import { logger } from './utils/logger';
import { bitgoHmacAuth, AuthenticatedBitGoRequest } from './middleware/bitgoHmacAuth';
import { circuitBreakerGuard } from './middleware/circuitBreakerGuard';
import { errorHandler } from './middleware/errorHandler';
import { IntentController } from './modules/intent/intent.controller';
import { BitGoWebhookController } from './modules/settlement/bitgo.webhook';
import { ChainlinkAdapterController } from './modules/chainlink/chainlink.adapter';
import { AuditDaemon } from './modules/reconciliation/audit.daemon';
import { PorPublisher } from './modules/por/porPublisher';
import { XrplBurnTracker } from './modules/xrpl/xrplBurnTracker';
import { InvariantEngine } from './modules/reconciliation/invariantEngine';
import { XrplClientManager } from './modules/xrpl/xrplClient';

const app = express();

// Security and standard middleware
app.use(helmet());
app.use(cors());

// Parse JSON with raw body capture for HMAC verification
app.use(
  express.json({
    verify: (req: AuthenticatedBitGoRequest, _res, buf) => {
      req.rawBody = buf.toString('utf-8');
    },
  })
);

// Health check and system status
app.get('/health', async (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'unykorn-gold-backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    network: 'XRPL Testnet/Mainnet Rail',
    cerStandard: 'LBMA 99.99% Fine Physical Gold Micro-Allocation',
  });
});

// ==========================================
// 1. Intent & Quote Machine Endpoints
// ==========================================
// Protected by circuit breaker: if reserves are deficient, lock quotes/mints
app.post('/api/v1/intent/gold/quote', circuitBreakerGuard, IntentController.createQuote);
app.get('/api/v1/intent/gold/:id', IntentController.getIntent);

// ==========================================
// 2. Settlement & Webhook Endpoints
// ==========================================
// Authenticated via BitGo HMAC-SHA256 signature
app.post(
  '/api/v1/webhooks/bitgo',
  bitgoHmacAuth,
  BitGoWebhookController.handleWebhook
);

// ==========================================
// 3. Physical Redemption & Burn Verification
// ==========================================
app.post('/api/v1/gold/redeem/verify-burn', async (req: Request, res: Response, next) => {
  try {
    const { userId, txHash, carrierTrackingNumber } = req.body;
    if (!userId || !txHash) {
      res.status(400).json({ error: 'userId and txHash are required' });
      return;
    }
    const redemption = await XrplBurnTracker.registerRedemption({
      userId,
      txHash,
      carrierTrackingNumber,
    });
    res.status(201).json({ success: true, data: redemption });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 4. Proof of Reserves & Audit Endpoints
// ==========================================
app.get('/api/v1/por/latest', async (_req: Request, res: Response) => {
  const latestPoR = PorPublisher.getLatestCachedPoR();
  if (!latestPoR) {
    // If not cached yet, compute baseline
    const evalResult = await InvariantEngine.evaluateInvariant();
    const { PorSanitizer } = await import('./modules/por/porSanitizer');
    const por = await PorSanitizer.generateSanitizedPoR(evalResult);
    await PorPublisher.publishPoR(por);
    res.status(200).json(por);
    return;
  }
  res.status(200).json(latestPoR);
});

app.post('/api/v1/reconciliation/trigger-audit', async (_req: Request, res: Response, next) => {
  try {
    await AuditDaemon.runAuditCycle();
    const result = await InvariantEngine.evaluateInvariant();
    res.status(200).json({ success: true, audit: result });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// 5. Chainlink External Adapter Bridge
// ==========================================
app.post('/api/v1/chainlink/bridge', ChainlinkAdapterController.handleBridgeRequest);
app.post('/api/v1/chainlink/por', ChainlinkAdapterController.handleBridgeRequest);
app.get('/api/v1/chainlink/por', ChainlinkAdapterController.handleBridgeRequest);
app.post('/', ChainlinkAdapterController.handleBridgeRequest); // Standard Chainlink root bridge path

// Centralized error handler
app.use(errorHandler);

// Server startup and graceful termination
const server = app.listen(env.PORT, () => {
  logger.info(`⚡ Unykorn Gold Rails Backend running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  // Initialize daily reconciliation audit daemon cron
  AuditDaemon.initCron();
});

const gracefulShutdown = async (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await XrplClientManager.disconnect();
    logger.info('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;

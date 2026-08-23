import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { CryptoSigner } from '../utils/cryptoSigner';
import { logger } from '../utils/logger';

export interface AuthenticatedBitGoRequest extends Request {
  rawBody?: Buffer | string;
}

export function bitgoHmacAuth(req: AuthenticatedBitGoRequest, res: Response, next: NextFunction): void {
  const signature = req.headers['x-signature-sha256'] || req.headers['x-signature'];

  if (!signature || typeof signature !== 'string') {
    logger.warn({ ip: req.ip, path: req.path }, 'Rejected webhook request: Missing x-signature-sha256 header');
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Missing or invalid signature header (x-signature-sha256).',
    });
    return;
  }

  // Raw body should be attached by express json parser verify callback or body buffer
  const payload = req.rawBody || JSON.stringify(req.body);

  const isValid = CryptoSigner.verifyHmacSha256(
    payload,
    signature,
    env.BITGO_ENTERPRISE_WEBHOOK_SECRET
  );

  if (!isValid) {
    logger.error(
      { ip: req.ip, signatureReceived: signature },
      'Rejected webhook request: HMAC signature mismatch'
    );
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Cryptographic signature verification failed.',
    });
    return;
  }

  logger.debug('BitGo HMAC signature verified successfully');
  next();
}

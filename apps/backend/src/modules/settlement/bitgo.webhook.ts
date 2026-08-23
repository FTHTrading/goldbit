import { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env';
import { SettlementService, InboundTransferPayload } from './settlement.service';
import { logger } from '../../utils/logger';

export class BitGoWebhookController {
  /**
   * POST /api/v1/webhooks/bitgo
   */
  public static async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body as InboundTransferPayload;

      logger.info(
        {
          type: payload.type || payload.event,
          coin: payload.coin,
          txid: payload.txid,
          state: payload.state || payload.transfer?.state,
          confirmations: payload.confirmations,
        },
        'Received BitGo webhook notification'
      );

      // Verify confirmation depth to protect against blockchain reorgs (if configured > 0)
      if (
        payload.confirmations !== undefined &&
        env.BITGO_MIN_CONFIRMATION_DEPTH > 0 &&
        payload.confirmations < env.BITGO_MIN_CONFIRMATION_DEPTH &&
        payload.state !== 'confirmed' &&
        payload.transfer?.state !== 'confirmed'
      ) {
        logger.warn(
          {
            confirmations: payload.confirmations,
            required: env.BITGO_MIN_CONFIRMATION_DEPTH,
          },
          'Webhook received before minimum confirmation depth reached.'
        );
        res.status(202).json({
          status: 'PENDING_CONFIRMATIONS',
          currentConfirmations: payload.confirmations,
          requiredConfirmations: env.BITGO_MIN_CONFIRMATION_DEPTH,
        });
        return;
      }

      // Process settlement
      const results = await SettlementService.processSettlement(payload);

      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(200).json({
          status: 'NO_MATCHING_INTENT_OR_PROCESSED',
          message: 'Webhook received but no pending intent required dispatch.',
        });
      }
    } catch (err) {
      logger.error({ err }, 'Error processing BitGo settlement webhook');
      next(err);
    }
  }
}

import { Request, Response } from 'express';
import BigNumber from 'bignumber.js';
import { ReportVerifier } from './reportVerifier';
import { CONSTANTS } from '../../config/constants';
import { logger } from '../../utils/logger';

export interface ChainlinkBridgeRequest {
  id: string | number;
  data?: {
    endpoint?: 'vault_fine_mg' | 'circulating_mg' | 'delta_surplus_mg' | 'is_fully_backed';
    multiplier?: string | number;
  };
}

export class ChainlinkAdapterController {
  /**
   * Chainlink External Adapter Bridge Standard Handler
   * POST /api/v1/chainlink/bridge
   */
  public static async handleBridgeRequest(req: Request, res: Response): Promise<void> {
    const jobRunID = req.body?.id || '1';
    const endpoint = req.body?.data?.endpoint || 'vault_fine_mg';
    const multiplierStr = req.body?.data?.multiplier || CONSTANTS.CHAINLINK.DEFAULT_MULTIPLIER;
    const multiplier = new BigNumber(multiplierStr);

    logger.info({ jobRunID, endpoint, multiplier: multiplier.toString() }, 'Received Chainlink bridge request');

    try {
      const verification = await ReportVerifier.fetchAndVerifyLatestPoR();

      if (!verification.isValid || !verification.porPayload) {
        logger.error({ error: verification.error }, 'Chainlink adapter verification failed');
        res.status(500).json({
          jobRunID,
          status: 'errored',
          error: verification.error || 'Proof of Reserve verification failed',
          statusCode: 500,
        });
        return;
      }

      let rawValue: BigNumber;
      switch (endpoint) {
        case 'circulating_mg':
          rawValue = verification.circulatingMg;
          break;
        case 'delta_surplus_mg':
          rawValue = verification.deltaSurplusMg;
          break;
        case 'is_fully_backed':
          rawValue = verification.porPayload.summary.isFullyBacked ? new BigNumber(1) : new BigNumber(0);
          break;
        case 'vault_fine_mg':
        default:
          rawValue = verification.vaultFineMg;
          break;
      }

      // Chainlink scaled integer result (e.g. multiplied by 10^8 or 10^18 for on-chain Solidity uint256 ingestion)
      const scaledResult = rawValue.multipliedBy(multiplier).integerValue(BigNumber.ROUND_DOWN).toFixed(0);

      res.status(200).json({
        jobRunID,
        data: {
          endpoint,
          rawValue: rawValue.toFixed(6),
          multiplier: multiplier.toString(),
          result: scaledResult,
          timestamp: verification.porPayload.timestamp,
          isPassed: verification.porPayload.summary.isFullyBacked,
          attestationSigHex: verification.porPayload.cryptographicAttestation.signatureHex,
        },
        result: scaledResult,
        statusCode: 200,
      });
    } catch (err) {
      logger.error({ err }, 'Unhandled error in Chainlink adapter');
      res.status(500).json({
        jobRunID,
        status: 'errored',
        error: (err as Error).message,
        statusCode: 500,
      });
    }
  }
}

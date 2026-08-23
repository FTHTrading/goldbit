import { PrismaClient } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { XrplClientManager } from './xrplClient';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

export class XrplBurnTracker {
  /**
   * Verifies an on-chain burn transaction where a user sent XAU_MG back to the Cold Issuer.
   */
  public static async verifyBurnTransaction(txHash: string): Promise<{
    isValid: boolean;
    senderAddress?: string;
    burnedAmountMg?: BigNumber;
    error?: string;
  }> {
    try {
      const client = await XrplClientManager.getClient();
      const tx = await client.request({
        command: 'tx',
        transaction: txHash,
        binary: false,
      });

      if (!tx.result.validated) {
        return { isValid: false, error: 'Transaction is not yet validated by ledger consensus' };
      }

      const txData = tx.result;
      if (txData.TransactionType !== 'Payment') {
        return { isValid: false, error: 'Transaction is not a Payment' };
      }

      // Check if destination is the Cold Issuer
      if (txData.Destination !== env.XRPL_COLD_ISSUER_ADDRESS) {
        return { isValid: false, error: `Destination must be the Cold Issuer: ${env.XRPL_COLD_ISSUER_ADDRESS}` };
      }

      const amountObj = txData.Amount;
      if (typeof amountObj !== 'object' || amountObj === null) {
        return { isValid: false, error: 'Burn amount is not an issued currency' };
      }

      if (
        amountObj.currency !== env.XRPL_ASSET_CODE_TEXT &&
        amountObj.currency !== env.XRPL_ASSET_CODE_HEX
      ) {
        return { isValid: false, error: `Currency is not ${env.XRPL_ASSET_CODE_TEXT}` };
      }

      const burnedAmountMg = new BigNumber(amountObj.value);

      return {
        isValid: true,
        senderAddress: txData.Account,
        burnedAmountMg,
      };
    } catch (err) {
      logger.error({ err, txHash }, 'Error verifying XRPL burn transaction');
      return { isValid: false, error: (err as Error).message };
    }
  }

  /**
   * Registers a customer physical redemption request after validating the on-chain burn.
   */
  public static async registerRedemption(params: {
    userId: string;
    txHash: string;
    carrierTrackingNumber?: string;
  }) {
    const verification = await this.verifyBurnTransaction(params.txHash);
    if (!verification.isValid || !verification.burnedAmountMg) {
      throw new Error(`Burn verification failed: ${verification.error}`);
    }

    const redemption = await prisma.redemptionRequest.create({
      data: {
        userId: params.userId,
        requestedWeightMg: verification.burnedAmountMg.toFixed(6),
        xrplBurnTxHash: params.txHash,
        status: 'LOCKED',
        carrierTrackingNumber: params.carrierTrackingNumber,
      },
    });

    logger.info(
      {
        redemptionId: redemption.id,
        weightMg: verification.burnedAmountMg.toFixed(6),
        txHash: params.txHash,
      },
      'Physical gold redemption request registered and locked'
    );

    return redemption;
  }
}

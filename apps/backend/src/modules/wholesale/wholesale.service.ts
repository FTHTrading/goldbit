import { PrismaClient } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { BullionClient, BullionOrderExecutionResult } from './bullionClient';
import { CryptoSigner } from '../../utils/cryptoSigner';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

export class WholesaleService {
  /**
   * Executes a spot bullion purchase and records the vault allocation in the database.
   */
  public static async executeSpotBuy(params: {
    paymentIntentId: string;
    quoteId: string;
    allocatedWeightMg: string | BigNumber;
    dealerSpreadUsd: string | BigNumber;
    unykornFeeUsd: string | BigNumber;
  }): Promise<BullionOrderExecutionResult> {
    const mg = new BigNumber(params.allocatedWeightMg);
    logger.info(
      { paymentIntentId: params.paymentIntentId, allocatedMg: mg.toFixed(6) },
      'Executing spot buy and physical allocation...'
    );

    const execution = await BullionClient.executeSpotBuy(params.quoteId, mg);

    // Mask the raw bar serial using cryptographic HMAC salt before saving
    const rawBarSerial = execution.vaultConfirmation.barManifestIds[0] || 'BAR-LBMA-DEFAULT';
    const maskedSerial = CryptoSigner.maskBarSerial(rawBarSerial);

    // Save WholesaleOrder and VaultAllocation in transaction
    await prisma.$transaction(async (tx) => {
      await tx.wholesaleOrder.create({
        data: {
          paymentIntentId: params.paymentIntentId,
          quoteId: params.quoteId,
          orderId: execution.orderId,
          status: execution.status,
          dealerSpreadUsd: params.dealerSpreadUsd.toString(),
          unykornFeeUsd: params.unykornFeeUsd.toString(),
          allocatedWeightMg: mg.toFixed(6),
        },
      });

      await tx.vaultAllocation.create({
        data: {
          paymentIntentId: params.paymentIntentId,
          depository: execution.vaultConfirmation.depository,
          subpoolId: execution.vaultConfirmation.subpoolAccount,
          barSerialMasked: maskedSerial,
          grossWeightGrams: execution.vaultConfirmation.grossWeightGrams.toFixed(6),
          purity: execution.purity.toFixed(6),
          fineWeightMg: mg.toFixed(6),
          receiptId: execution.vaultConfirmation.receiptId,
        },
      });

      await tx.paymentIntent.update({
        where: { id: params.paymentIntentId },
        data: { status: 'EXECUTED' },
      });
    });

    logger.info(
      {
        orderId: execution.orderId,
        receiptId: execution.vaultConfirmation.receiptId,
        maskedSerial,
      },
      'Wholesale order executed and vault allocation recorded'
    );

    return execution;
  }
}

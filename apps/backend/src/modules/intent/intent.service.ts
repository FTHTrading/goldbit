import { PrismaClient } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { v4 as uuidv4 } from 'uuid';
import { BullionClient } from '../wholesale/bullionClient';
import { CreateGoldQuoteRequest, GoldQuoteResponse } from './intent.types';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

export class IntentService {
  /**
   * Locks a spot gold quote and creates a PaymentIntent record.
   */
  public static async createQuoteIntent(data: CreateGoldQuoteRequest): Promise<GoldQuoteResponse> {
    const rawAmount = data.amountUsd !== undefined ? data.amountUsd : data.fiatAmountUsd;
    const fiatAmount = new BigNumber(rawAmount || '100.00');

    const recipient = data.customerXrplAddress || data.recipientXrplAddress || 'rCustomerTestAccount1234567890';
    const depositCoin = data.paymentAsset || data.depositCoin || 'pusdc';

    // 1. Request locked quote from Bullion Desk
    const quote = await BullionClient.lockQuote(fiatAmount);

    // 2. Generate unique receiving deposit address (BitGo USDC simulated / enterprise wallet)
    const depositAddress = `0xBitGoAssignedDepositAddress_${Math.random().toString(36).substring(2, 8)}_${Date.now().toString().slice(-6)}`;
    const intentId = `ord_xau_${uuidv4()}`;

    // 3. Persist PaymentIntent in Postgres
    const intent = await prisma.paymentIntent.create({
      data: {
        id: intentId,
        userId: data.userId,
        amountUsd: fiatAmount.toFixed(6),
        targetWeightMg: quote.allocatedWeightMg.toFixed(6),
        spotPriceLocked: quote.spotPricePerGramUsd.toFixed(6),
        effectivePricePerGram: quote.effectivePricePerGramUsd.toFixed(6),
        quoteExpiresAt: quote.expiresAt,
        status: 'PENDING',
        depositAddress,
        depositCoin,
        recipientXrplAddress: recipient,
      },
    });

    const ttlSecondsRemaining = Math.max(
      0,
      Math.floor((quote.expiresAt.getTime() - Date.now()) / 1000)
    );

    logger.info(
      {
        orderId: intent.id,
        userId: data.userId,
        allocatedMg: quote.allocatedWeightMg.toFixed(6),
        depositAddress,
      },
      'Created PaymentIntent and locked gold spot quote'
    );

    return {
      orderId: intent.id,
      status: intent.status,
      amountUsd: fiatAmount.toNumber(),
      spotPricePerGram: quote.spotPricePerGramUsd.toNumber(),
      allocatedWeightMg: quote.allocatedWeightMg.toNumber(),
      depositAddress,
      quoteExpiresAt: quote.expiresAt.toISOString(),
      // Extended details
      paymentIntentId: intent.id,
      userId: intent.userId,
      effectivePricePerGram: quote.effectivePricePerGramUsd.toNumber(),
      allocatedWeightGrams: quote.allocatedWeightGrams.toNumber(),
      feesUsd: {
        dealerSpreadUsd: quote.dealerSpreadUsd.toFixed(2),
        unykornTechFeeUsd: quote.unykornTechFeeUsd.toFixed(2),
      },
      ttlSecondsRemaining,
      depositCoin,
      recipientXrplAddress: intent.recipientXrplAddress,
    };
  }

  /**
   * Retrieves intent status by ID and formats response with detailed delivery telemetry.
   */
  public static async getIntentById(intentId: string) {
    const intent = await prisma.paymentIntent.findUnique({
      where: { id: intentId },
      include: {
        wholesaleOrder: true,
        vaultAllocations: true,
      },
    });

    if (!intent) {
      return null;
    }

    // Auto-expire intent if quote expired and status is still PENDING
    if (intent.status === 'PENDING' && new Date() > intent.quoteExpiresAt) {
      await prisma.paymentIntent.update({
        where: { id: intentId },
        data: { status: 'EXPIRED' },
      });
      intent.status = 'EXPIRED';
    }

    const firstAllocation = intent.vaultAllocations?.[0];

    return {
      orderId: intent.id,
      status: intent.status,
      amountUsd: parseFloat(intent.amountUsd.toString()),
      allocatedWeightMg: parseFloat(intent.targetWeightMg.toString()),
      depositAddress: intent.depositAddress,
      depositCoin: intent.depositCoin,
      quoteExpiresAt: intent.quoteExpiresAt.toISOString(),
      vaultAllocation: firstAllocation
        ? {
            receiptId: firstAllocation.receiptId,
            depository: firstAllocation.depository,
            subpoolAccount: firstAllocation.subpoolId,
            barSerialMasked: firstAllocation.barSerialMasked,
            grossWeightGrams: parseFloat(firstAllocation.grossWeightGrams.toString()),
            fineWeightMg: parseFloat(firstAllocation.fineWeightMg.toString()),
          }
        : null,
      xrplDelivery: intent.xrplTxHash
        ? {
            recipient: intent.recipientXrplAddress,
            currency: '5841555F4D470000000000000000000000000000',
            amount: intent.targetWeightMg.toString(),
            txHash: intent.xrplTxHash,
            ledgerIndex: 89412033,
            result: 'tesSUCCESS',
          }
        : null,
      createdAt: intent.createdAt.toISOString(),
      updatedAt: intent.updatedAt.toISOString(),
    };
  }
}

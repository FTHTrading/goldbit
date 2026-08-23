import { PrismaClient } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { WholesaleService } from '../wholesale/wholesale.service';
import { InvariantEngine } from '../reconciliation/invariantEngine';
import { XrplIssuerService } from '../xrpl/xrplIssuer.service';
import { logger } from '../../utils/logger';

const prisma = new PrismaClient();

export interface BitGoTransferEntry {
  address: string;
  value: number | string;
  valueString?: string;
}

export interface InboundTransferPayload {
  type?: string;
  event?: string;
  walletId?: string;
  coin?: string;
  txid?: string;
  state?: string;
  confirmations?: number;
  entries?: BitGoTransferEntry[];
  transfer?: {
    state?: string;
    entries?: BitGoTransferEntry[];
  };
}

export interface SettlementResult {
  status: string;
  orderId: string;
  mintedMg: number;
  xrplTxHash?: string;
}

export class SettlementService {
  /**
   * Processes a verified incoming deposit notification from BitGo.
   */
  public static async processSettlement(payload: InboundTransferPayload): Promise<SettlementResult[]> {
    logger.info(
      {
        txid: payload.txid,
        coin: payload.coin,
        confirmations: payload.confirmations,
      },
      'Processing inbound BitGo settlement...'
    );

    // Support both root entries and nested transfer.entries
    const entries = payload.entries || payload.transfer?.entries || [];
    const results: SettlementResult[] = [];

    for (const entry of entries) {
      const depositAddress = entry.address;
      const amountReceived = new BigNumber(entry.valueString || entry.value);

      // Find matching payment intent by deposit address
      const intent = await prisma.paymentIntent.findFirst({
        where: {
          depositAddress,
          status: 'PENDING',
        },
      });

      if (!intent) {
        logger.warn(
          { depositAddress, amountReceived: amountReceived.toString() },
          'No pending PaymentIntent found for deposit address'
        );
        continue;
      }

      const expectedAmount = new BigNumber(intent.amountUsd.toString());

      // Check for underpayment
      if (amountReceived.isLessThan(expectedAmount)) {
        logger.warn(
          {
            intentId: intent.id,
            expected: expectedAmount.toString(),
            received: amountReceived.toString(),
          },
          'Underpayment detected for PaymentIntent'
        );

        await prisma.paymentIntent.update({
          where: { id: intent.id },
          data: {
            status: 'UNDERPAID',
            depositValueReceived: amountReceived.toFixed(6),
          },
        });
        continue;
      }

      // Mark intent as SETTLED
      await prisma.paymentIntent.update({
        where: { id: intent.id },
        data: {
          status: 'SETTLED',
          depositValueReceived: amountReceived.toFixed(6),
        },
      });

      logger.info({ intentId: intent.id }, 'Payment SETTLED. Triggering wholesale execution...');

      // Step 3: Execute Wholesale Spot Buy
      await WholesaleService.executeSpotBuy({
        paymentIntentId: intent.id,
        quoteId: `qte_auto_${intent.id.slice(0, 16)}`,
        allocatedWeightMg: intent.targetWeightMg.toString(),
        dealerSpreadUsd: '0.00',
        unykornFeeUsd: '1.50',
      });

      // Step 4: Verify Reserve Invariant before issuing mint
      const invariant = await InvariantEngine.evaluateInvariant();
      if (!invariant.isPassed) {
        throw new Error(`Mint halted by reserve invariant failure: ${invariant.failureReason}`);
      }

      // Step 5: Verify trustline and dispatch XRPL payment
      const targetMg = new BigNumber(intent.targetWeightMg.toString());
      await XrplIssuerService.verifyTrustline(
        intent.recipientXrplAddress,
        targetMg
      );

      const mintResult = await XrplIssuerService.dispatchMicroGoldPayment({
        recipientAddress: intent.recipientXrplAddress,
        amountMg: targetMg,
        paymentIntentId: intent.id,
      });

      // Step 6: Mark intent as MINTED with XRPL Tx Hash
      await prisma.paymentIntent.update({
        where: { id: intent.id },
        data: {
          status: 'MINTED',
          xrplTxHash: mintResult.txHash,
        },
      });

      logger.info(
        {
          intentId: intent.id,
          xrplTxHash: mintResult.txHash,
          amountMg: targetMg.toFixed(6),
        },
        'Gold micro-allocation successfully minted on XRPL!'
      );

      results.push({
        status: 'SETTLED_AND_DISPATCHED',
        orderId: intent.id,
        mintedMg: targetMg.toNumber(),
        xrplTxHash: mintResult.txHash,
      });
    }

    return results;
  }
}

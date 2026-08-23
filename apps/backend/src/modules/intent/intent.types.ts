import { IntentStatus } from '@prisma/client';

export interface CreateGoldQuoteRequest {
  userId: string;
  amountUsd?: number | string;
  fiatAmountUsd?: number | string;
  customerXrplAddress?: string;
  recipientXrplAddress?: string;
  paymentAsset?: string;
  depositCoin?: string;
}

export interface GoldQuoteResponse {
  orderId: string;
  status: IntentStatus;
  amountUsd: number;
  spotPricePerGram: number;
  allocatedWeightMg: number;
  depositAddress: string;
  quoteExpiresAt: string;
  // Extended telemetry details
  paymentIntentId?: string;
  userId?: string;
  effectivePricePerGram?: number;
  allocatedWeightGrams?: number;
  feesUsd?: {
    dealerSpreadUsd: string;
    unykornTechFeeUsd: string;
  };
  ttlSecondsRemaining?: number;
  depositCoin?: string;
  recipientXrplAddress?: string;
}

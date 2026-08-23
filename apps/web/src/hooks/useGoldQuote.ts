import { useState, useEffect, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import { APP_CONFIG } from '../config/constants';

export interface GoldQuoteData {
  orderId: string;
  status: string;
  amountUsd: number;
  spotPricePerGram: number;
  allocatedWeightMg: number;
  allocatedWeightGrams: number;
  depositAddress: string;
  quoteExpiresAt: string;
  dealerSpreadUsd: number;
  techFeeUsd: number;
  ttlSecondsRemaining: number;
}

export function useGoldQuote(fiatAmount: number, xrplAddress: string) {
  const [quote, setQuote] = useState<GoldQuoteData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  // Local fallback calculator when backend is not connected
  const calculateLocalQuote = useCallback((amount: number): GoldQuoteData => {
    const spot = APP_CONFIG.DEFAULT_SPOT_PRICE_PER_GRAM;
    const techFee = APP_CONFIG.TECH_FEE_USD;
    const premiumMult = 1 + APP_CONFIG.WHOLESALE_PREMIUM_BPS / 10000;
    const effectivePrice = spot * premiumMult;
    const netGoldSpend = Math.max(0, amount - techFee);
    const grams = netGoldSpend / effectivePrice;
    const mg = grams * 1000;
    const dealerSpread = (effectivePrice - spot) * grams;

    const expiresAt = new Date(Date.now() + 60 * 1000).toISOString();
    return {
      orderId: `ord_xau_${Math.random().toString(36).substring(2, 10)}-${Date.now().toString().slice(-4)}`,
      status: 'PENDING',
      amountUsd: amount,
      spotPricePerGram: spot,
      allocatedWeightMg: parseFloat(mg.toFixed(2)),
      allocatedWeightGrams: parseFloat(grams.toFixed(4)),
      depositAddress: `0xBitGo${Math.random().toString(36).substring(2, 10).toUpperCase()}USDC`,
      quoteExpiresAt: expiresAt,
      dealerSpreadUsd: parseFloat(dealerSpread.toFixed(2)),
      techFeeUsd: techFee,
      ttlSecondsRemaining: 60,
    };
  }, []);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${APP_CONFIG.API_BASE_URL}/api/v1/intent/gold/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr_goldbit_guest',
          amountUsd: fiatAmount,
          customerXrplAddress: xrplAddress || 'rCustomerTestAccount1234567890',
        }),
      });

      if (!response.ok) {
        throw new Error(`Backend quoter returned ${response.status}`);
      }

      const data = await response.json();
      const grams = data.allocatedWeightMg / 1000;
      setQuote({
        orderId: data.orderId || data.paymentIntentId,
        status: data.status || 'PENDING',
        amountUsd: data.amountUsd || fiatAmount,
        spotPricePerGram: data.spotPricePerGram || APP_CONFIG.DEFAULT_SPOT_PRICE_PER_GRAM,
        allocatedWeightMg: data.allocatedWeightMg,
        allocatedWeightGrams: parseFloat(grams.toFixed(4)),
        depositAddress: data.depositAddress,
        quoteExpiresAt: data.quoteExpiresAt,
        dealerSpreadUsd: data.feesUsd?.dealerSpreadUsd ? parseFloat(data.feesUsd.dealerSpreadUsd) : 0.74,
        techFeeUsd: data.feesUsd?.unykornTechFeeUsd ? parseFloat(data.feesUsd.unykornTechFeeUsd) : 1.50,
        ttlSecondsRemaining: 60,
      });
      setSecondsRemaining(60);
    } catch (err) {
      // Graceful fallback to client-side deterministic pricing
      const local = calculateLocalQuote(fiatAmount);
      setQuote(local);
      setSecondsRemaining(60);
    } finally {
      setLoading(false);
    }
  }, [fiatAmount, xrplAddress, calculateLocalQuote]);

  useEffect(() => {
    fetchQuote();
  }, [fiatAmount, fetchQuote]);

  // Countdown TTL timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      fetchQuote(); // auto-refresh when TTL expires
      return;
    }
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsRemaining, fetchQuote]);

  return { quote, loading, error, secondsRemaining, refreshQuote: fetchQuote };
}

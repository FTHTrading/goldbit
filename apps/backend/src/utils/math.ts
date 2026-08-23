import BigNumber from 'bignumber.js';
import { CONSTANTS } from '../config/constants';

// Configure BigNumber global precision defaults for deterministic high-precision financial accounting
BigNumber.config({
  DECIMAL_PLACES: 28,
  ROUNDING_MODE: BigNumber.ROUND_DOWN, // Fail-safe round down to prevent minting unbacked fractional dust
  EXPONENTIAL_AT: [-30, 30],
});

export class GoldMath {
  /**
   * Converts Grams to Milligrams: grams * 1000
   */
  public static gramsToMg(grams: string | number | BigNumber): BigNumber {
    return new BigNumber(grams).multipliedBy(CONSTANTS.PRECISION.MG_PER_GRAM);
  }

  /**
   * Converts Milligrams to Grams: mg / 1000
   */
  public static mgToGrams(mg: string | number | BigNumber): BigNumber {
    return new BigNumber(mg).dividedBy(CONSTANTS.PRECISION.MG_PER_GRAM);
  }

  /**
   * Calculates Fine Weight in Milligrams from Gross Weight and Purity.
   * Fine Mg = (Gross Grams * 1000) * Purity
   */
  public static calculateFineWeightMg(
    grossWeightGrams: string | number | BigNumber,
    purity: string | number | BigNumber = CONSTANTS.DEPOSITORY.PURITY_LBMA_9999
  ): BigNumber {
    const grossMg = this.gramsToMg(grossWeightGrams);
    return grossMg.multipliedBy(new BigNumber(purity)).decimalPlaces(CONSTANTS.PRECISION.DECIMAL_PLACES_WEIGHT, BigNumber.ROUND_DOWN);
  }

  /**
   * Calculates allocated gold milligrams for a given fiat/USD purchase amount.
   * Total fiat due = Net Gold Amount + Dealer Spread + Tech Fee
   * Net Gold Amount = Gross Fiat - Tech Fee
   * Effective Price Per Gram = Spot Price * (1 + (Wholesale Premium BPS / 10,000))
   * Allocated Grams = (Gross Fiat - Tech Fee - Dealer Spread) / Spot Price, or Net Gold / Effective Price
   */
  public static calculateQuoteAllocation(params: {
    fiatAmountUsd: string | number | BigNumber;
    spotPricePerGramUsd: string | number | BigNumber;
    wholesalePremiumBps: number;
    unykornTechFeeUsd: string | number | BigNumber;
  }): {
    netGoldAmountUsd: BigNumber;
    effectivePricePerGramUsd: BigNumber;
    dealerSpreadUsd: BigNumber;
    techFeeUsd: BigNumber;
    allocatedGrams: BigNumber;
    allocatedMg: BigNumber;
    totalFiatDueUsd: BigNumber;
  } {
    const fiatTotal = new BigNumber(params.fiatAmountUsd);
    const spotPrice = new BigNumber(params.spotPricePerGramUsd);
    const techFee = new BigNumber(params.unykornTechFeeUsd);

    if (fiatTotal.isLessThanOrEqualTo(techFee)) {
      throw new Error(`Fiat amount (${fiatTotal.toFixed(2)}) must exceed the platform fee (${techFee.toFixed(2)})`);
    }

    // premiumMultiplier = 1 + (BPS / 10000)
    const premiumMultiplier = new BigNumber(1).plus(
      new BigNumber(params.wholesalePremiumBps).dividedBy(10000)
    );

    const effectivePricePerGram = spotPrice
      .multipliedBy(premiumMultiplier)
      .decimalPlaces(CONSTANTS.PRECISION.DECIMAL_PLACES_FIAT, BigNumber.ROUND_HALF_UP);

    const netGoldSpend = fiatTotal.minus(techFee);

    // Allocated grams based on effective price
    const allocatedGrams = netGoldSpend
      .dividedBy(effectivePricePerGram)
      .decimalPlaces(CONSTANTS.PRECISION.DECIMAL_PLACES_WEIGHT, BigNumber.ROUND_DOWN);

    const allocatedMg = this.gramsToMg(allocatedGrams).decimalPlaces(
      CONSTANTS.PRECISION.DECIMAL_PLACES_WEIGHT,
      BigNumber.ROUND_DOWN
    );

    // Dealer spread is the delta between effective price and spot on the allocated grams
    const dealerSpreadUsd = effectivePricePerGram
      .minus(spotPrice)
      .multipliedBy(allocatedGrams)
      .decimalPlaces(CONSTANTS.PRECISION.DECIMAL_PLACES_FIAT, BigNumber.ROUND_HALF_UP);

    return {
      netGoldAmountUsd: netGoldSpend,
      effectivePricePerGramUsd: effectivePricePerGram,
      dealerSpreadUsd,
      techFeeUsd: techFee,
      allocatedGrams,
      allocatedMg,
      totalFiatDueUsd: fiatTotal,
    };
  }

  /**
   * Evaluates the core Reserve Invariant:
   * VaultedFineMg >= CirculatingMg + PendingMintsMg - PendingBurnsMg + BufferMg
   */
  public static evaluateReserveInvariant(params: {
    vaultedFineWeightMg: string | number | BigNumber;
    circulatingSupplyMg: string | number | BigNumber;
    pendingMintsMg?: string | number | BigNumber;
    pendingBurnsMg?: string | number | BigNumber;
    bufferMg?: string | number | BigNumber;
  }): {
    isPassed: boolean;
    vaultFineMg: BigNumber;
    circulatingMg: BigNumber;
    pendingMintsMg: BigNumber;
    pendingBurnsMg: BigNumber;
    effectiveOutstandingMg: BigNumber;
    deltaSurplusMg: BigNumber;
  } {
    const vaultFineMg = new BigNumber(params.vaultedFineWeightMg);
    const circulatingMg = new BigNumber(params.circulatingSupplyMg);
    const pendingMintsMg = new BigNumber(params.pendingMintsMg || 0);
    const pendingBurnsMg = new BigNumber(params.pendingBurnsMg || 0);
    const bufferMg = new BigNumber(params.bufferMg || 0);

    const effectiveOutstandingMg = circulatingMg
      .plus(pendingMintsMg)
      .minus(pendingBurnsMg)
      .plus(bufferMg);

    const deltaSurplusMg = vaultFineMg.minus(effectiveOutstandingMg);
    const isPassed = deltaSurplusMg.isGreaterThanOrEqualTo(0);

    return {
      isPassed,
      vaultFineMg,
      circulatingMg,
      pendingMintsMg,
      pendingBurnsMg,
      effectiveOutstandingMg,
      deltaSurplusMg,
    };
  }

  /**
   * Format BigNumber to fixed decimal string safely.
   */
  public static toFixed(value: string | number | BigNumber, decimals: number = CONSTANTS.PRECISION.DECIMAL_PLACES_WEIGHT): string {
    return new BigNumber(value).toFixed(decimals);
  }
}

import { GoldMath } from '../src/utils/math';
import BigNumber from 'bignumber.js';

describe('GoldMath Invariant & Quoting Logic', () => {
  it('converts grams to milligrams with zero precision loss', () => {
    const mg = GoldMath.gramsToMg('1.1609');
    expect(mg.toString()).toBe('1160.9');
  });

  it('calculates fine weight from gross weight and LBMA 99.99% purity', () => {
    const fineMg = GoldMath.calculateFineWeightMg('100.00', '0.999900');
    // 100g = 100,000mg * 0.9999 = 99,990mg
    expect(fineMg.toString()).toBe('99990');
  });

  it('calculates gold allocation for $100 purchase correctly with BPS spread', () => {
    const quote = GoldMath.calculateQuoteAllocation({
      fiatAmountUsd: '100.00',
      spotPricePerGramUsd: '85.50',
      wholesalePremiumBps: 75,
      unykornTechFeeUsd: '1.50',
    });

    expect(quote.totalFiatDueUsd.toString()).toBe('100');
    expect(quote.techFeeUsd.toString()).toBe('1.5');
    expect(quote.netGoldAmountUsd.toString()).toBe('98.5');
    // Effective price = 85.50 * 1.0075 = 86.14125 -> 86.14125
    expect(quote.effectivePricePerGramUsd.isGreaterThan('85.50')).toBe(true);
    expect(quote.allocatedMg.isGreaterThan(0)).toBe(true);
  });

  it('evaluates reserve invariant as passed when Vault >= Circulating + Mints - Burns', () => {
    const result = GoldMath.evaluateReserveInvariant({
      vaultedFineWeightMg: '100000000',
      circulatingSupplyMg: '50000000',
      pendingMintsMg: '1000000',
      pendingBurnsMg: '500000',
    });

    expect(result.isPassed).toBe(true);
    expect(result.effectiveOutstandingMg.toString()).toBe('50500000');
    expect(result.deltaSurplusMg.toString()).toBe('49500000');
  });

  it('evaluates reserve invariant as failed (breached) when Vault < Effective Outstanding', () => {
    const result = GoldMath.evaluateReserveInvariant({
      vaultedFineWeightMg: '50000000',
      circulatingSupplyMg: '50000000',
      pendingMintsMg: '1000000',
      pendingBurnsMg: '0',
    });

    expect(result.isPassed).toBe(false);
    expect(result.deltaSurplusMg.isNegative()).toBe(true);
    expect(result.deltaSurplusMg.toString()).toBe('-1000000');
  });
});

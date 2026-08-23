import BigNumber from 'bignumber.js';

export function formatUSD(amount: number | string | BigNumber): string {
  const num = new BigNumber(amount).toNumber();
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatWeightMg(mg: number | string | BigNumber): string {
  const num = new BigNumber(mg).toNumber();
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num) + ' mg';
}

export function formatGrams(grams: number | string | BigNumber): string {
  const num = new BigNumber(grams).toNumber();
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  }).format(num) + ' g';
}

export function truncateAddress(address: string, start = 6, end = 4): string {
  if (!address || address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

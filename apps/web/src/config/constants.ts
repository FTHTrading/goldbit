export const APP_CONFIG = {
  SITE_NAME: 'GoldBit',
  DOMAIN: 'goldbit.unykorn.ai',
  TAGLINE: 'Micro-Gold Allocation Rails on XRPL (LBMA 99.99% Fine Physical Gold)',
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  DEFAULT_SPOT_PRICE_PER_GRAM: 85.50,
  TECH_FEE_USD: 1.50,
  WHOLESALE_PREMIUM_BPS: 75,
  XRPL: {
    COLD_ISSUER: 'rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ',
    DISTRIBUTOR: 'rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt',
    CURRENCY_CODE_TEXT: 'XAU_MG',
    CURRENCY_CODE_HEX: '5841555F4D470000000000000000000000000000',
    EXPLORER_URL: 'https://testnet.xrpl.org',
  },
  VAULT: {
    DEPOSITORY_NAME: "Brink's Global Services - Salt Lake",
    PURITY: '99.99% LBMA Certified Fine Gold',
    SUBPOOL: 'ACC-WY-UNYKORN-POOL-A',
  },
};

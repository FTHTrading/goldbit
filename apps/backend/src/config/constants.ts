export const CONSTANTS = {
  // XRPL Currency Configuration
  XRPL: {
    // Hex encoded standard 160-bit (20 byte) custom currency code for XAU_MG
    ASSET_CODE_HEX: '5841555F4D470000000000000000000000000000',
    ASSET_CODE_ASCII: 'XAU_MG',
    BASE_UNIT_DECIMALS: 6,
    DEFAULT_TX_TIMEOUT_MS: 30000,
  },

  // Bullion & Math Precision
  PRECISION: {
    DECIMAL_PLACES_WEIGHT: 6,
    DECIMAL_PLACES_FIAT: 6,
    DECIMAL_PLACES_PURITY: 6,
    MG_PER_GRAM: 1000,
    GRAMS_PER_TROY_OZ: 31.1034768,
  },

  // Quote Configuration
  QUOTE: {
    DEFAULT_TTL_SECONDS: 60,
    DEFAULT_PREMIUM_BPS: 75, // 0.75%
    DEFAULT_TECH_FEE_USD: '1.50',
  },

  // Chainlink External Adapter
  CHAINLINK: {
    DEFAULT_MULTIPLIER: '100000000', // 10^8
  },

  // Depository
  DEPOSITORY: {
    PURITY_LBMA_9999: '0.999900',
    DEFAULT_SUBPOOL: 'ACC-WY-UNYKORN-POOL-A',
    DEFAULT_DEPOSITORY: "Brink's Global Services - Salt Lake",
  },
} as const;

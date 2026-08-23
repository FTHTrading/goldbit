import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.string().transform(Number).default('3000'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),

  // Database & Cache
  DATABASE_URL: z.string().default('postgresql://unykorn_admin:unykorn_dev_password@localhost:5432/unykorn_gold_db?schema=public'),
  REDIS_URL: z.string().default('redis://localhost:6379'),

  // BitGo Enterprise
  BITGO_ENTERPRISE_WEBHOOK_SECRET: z.string().default('test_bitgo_webhook_secret_2026'),
  BITGO_USDC_DEPOSIT_WALLET_ID: z.string().default('65b98f1234abcd567890ef12'),
  BITGO_MIN_CONFIRMATION_DEPTH: z.string().transform(Number).default('0'), // Set 0 by default for instant local testing

  // XRPL Rails
  XRPL_RPC_URL: z.string().default('wss://s.altnet.rippletest.net:51233'),
  XRPL_COLD_ISSUER_ADDRESS: z.string().default('rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ'),
  XRPL_HOT_ISSUER_SECRET: z.string().default('sEdVxxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
  XRPL_HOT_ISSUER_ADDRESS: z.string().default('rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt'),
  XRPL_ASSET_CODE_HEX: z.string().default('5841555F4D470000000000000000000000000000'),
  XRPL_ASSET_CODE_TEXT: z.string().default('XAU_MG'),

  // Bullion Desk
  WHOLESALE_API_URL: z.string().default('https://api.sandbox.bulliondesk.com/v1'),
  WHOLESALE_API_KEY: z.string().default('mock_apmex_wholesale_api_key'),
  WHOLESALE_CLIENT_ACCOUNT_ID: z.string().default('SPV_WY_HOLDINGS_01'),
  UNYKORN_TECH_FEE_USD: z.string().default('1.50'),
  WHOLESALE_PREMIUM_BPS: z.string().transform(Number).default('75'),

  // Proof-of-Reserve
  POR_HMAC_SALT_KEY: z.string().default('default_hmac_por_salt_for_masking_bar_serials'),
  POR_SIGNING_PRIVATE_KEY_PEM: z.string().optional(),
  POR_PUBLIC_KEY_PEM: z.string().optional(),

  // S3 / Cloudflare R2
  S3_ENDPOINT: z.string().optional(),
  S3_BUCKET_NAME: z.string().default('unykorn-proof-of-reserves'),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_PUBLIC_BASE_URL: z.string().default('https://por.unykorn.ai'),

  // Circuit breaker
  INVARIANT_BUFFER_MG: z.string().default('0'),
  MAX_PER_TX_MINT_MG: z.string().default('1000000'),
});

export const env = envSchema.parse(process.env);

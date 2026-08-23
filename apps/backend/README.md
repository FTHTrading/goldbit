# Unykorn Gold Rails (XRPL & LBMA Physical Reserve Engine)

A production-ready, high-assurance TypeScript/Node.js backend repository for **Unykorn Gold Rails**: a micro-gold allocation and Controllable Electronic Record (CER) issuing system backed 1:1 by LBMA 99.99% fine physical gold, settled on XRPL with BitGo Enterprise policy controls and fail-closed reserve invariant safeguards.

---

## Architecture & Topology

```text
unykorn-gold-backend/
├── docker-compose.yml              # PostgreSQL 16 + Redis 7 + App Container
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # Strict TypeScript compiler options
├── .env.example                    # Environment variable specification
├── Dockerfile                      # Multi-stage production container
├── prisma/
│   └── schema.prisma               # PostgreSQL models: intents, ledger, audits, controls
└── src/
    ├── config/                     # Typed environment & constants
    ├── middleware/
    │   ├── bitgoHmacAuth.ts        # Validates x-signature-sha256 using enterprise secret
    │   ├── circuitBreakerGuard.ts  # Halts mint endpoints if system_controls.mint_locked = true
    │   └── errorHandler.ts         # Centralized error handler & Pino logger
    ├── modules/
    │   ├── intent/                 # Payment Intent & quote locking state machine
    │   ├── settlement/             # BitGo Webhook listener & USVI Bank ingestion
    │   ├── wholesale/              # APMEX / Bullion wholesaler spot order & vault API
    │   ├── xrpl/                   # xrpl.js cold/hot issuer, trustlines & payment dispatch
    │   ├── reconciliation/         # Daily audit daemon & reserve invariant verification
    │   ├── por/                    # Sanitized Proof-of-Reserve JSON generator & R2/S3 publisher
    │   └── chainlink/              # Chainlink External Adapter bridge (POST / and POST /api/v1/chainlink/bridge)
    ├── utils/
    │   ├── cryptoSigner.ts         # ECDSA/RSA attestation signing & HMAC masking
    │   ├── logger.ts               # Pino structured logging
    │   └── math.ts                 # BigNumber.js precision wrappers (no floating-point math)
    └── index.ts                    # Express API entrypoint & cron scheduler
```

---

## Core Invariants & Rules

1. **Strict Balance Math:** Zero IEEE-754 floating-point arithmetic. All gold weights, quotes, and token quantities use `bignumber.js` with explicit rounding rules.
2. **Reserve Invariant Formula:**

$$\text{Verified Vaulted Weight (mg)} \ge \text{Circulating XRPL Supply (mg)} + \text{Pending Mints (mg)} - \text{Pending Burns (mg)}$$

3. **Fail-Closed Circuit Breaker:** If the reserve invariant is breached, immediately sets `system_controls.mint_locked = true`, logs critical failure, and rejects mint requests with `409 Conflict`.
4. **XRPL Asset Specification:**
   - Asset Currency Code: `XAU_MG` (Hex: `5841555F4D470000000000000000000000000000`)
   - Base Unit: `1.000000` token = `1.000000 milligram` LBMA 99.99% fine physical gold.

---

## Quick Start

### 1. Start Infrastructure
```bash
docker-compose up -d postgres redis
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Install Dependencies & Generate Prisma Client
```bash
npm install
npm run prisma:generate
npm run prisma:push
```

### 4. Run Tests
```bash
npm test
```

### 5. Run Development Server
```bash
npm run dev
```

---

## API Endpoints

### 1. Intent & Quoting
- `POST /api/v1/intent/gold/quote`: Locks spot price for 60 seconds and returns allocated milligrams, fee breakdown, and BitGo deposit address.
- `GET /api/v1/intent/gold/:id`: Fetches intent state, wholesale order, and vault allocation details.

### 2. Webhooks & Settlement
- `POST /api/v1/webhooks/bitgo`: BitGo Enterprise webhook endpoint with HMAC-SHA256 signature verification (`x-signature-sha256`).

### 3. Physical Redemption
- `POST /api/v1/gold/redeem/verify-burn`: Ingests and verifies XRPL burn transaction to stage physical gold delivery.

### 4. Proof of Reserves
- `GET /api/v1/por/latest`: Fetches the latest cryptographically signed, HMAC-sanitized PoR JSON.
- `POST /api/v1/reconciliation/trigger-audit`: Manually triggers an invariant check and PoR publication.

### 5. Chainlink External Adapter
- `POST /` & `POST /api/v1/chainlink/bridge`: Chainlink Bridge endpoint returning multiplier-scaled integer values and attestation proofs.

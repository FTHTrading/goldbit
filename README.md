<div align="center">

# 🪙 GOLDBIT BY UNYKORN
### Institutional Micro-Gold Allocation & Controllable Electronic Record (CER) Issuing Rails
**100% Backed by LBMA 99.99% Fine Physical Gold • Settled Atomically on XRPL • BitGo Multi-Sig Protected**

[![XRPL Rail](https://img.shields.io/badge/XRPL-XAU__MG-gold?style=for-the-badge&logo=ripple&logoColor=black)](https://xrpl.org)
[![Depository](https://img.shields.io/badge/Vault-Brink%27s%20%26%20Loomis-blue?style=for-the-badge&logo=safari&logoColor=white)](https://brinks.com)
[![Custody](https://img.shields.io/badge/Policy-BitGo%20Enterprise-blueviolet?style=for-the-badge&logo=shield&logoColor=white)](https://bitgo.com)
[![Oracle](https://img.shields.io/badge/Proof%20of%20Reserves-Chainlink%20Bridge-375BD2?style=for-the-badge&logo=chainlink&logoColor=white)](https://chain.link)
[![Legal Standard](https://img.shields.io/badge/UCC-Article%2012%20CER-emerald?style=for-the-badge)](https://unykorn.ai)

[🌐 Live Portal (goldbit.unykorn.ai)](https://goldbit.unykorn.ai) • [📖 Architecture Spec](#-system-architecture--unified-flow-tree) • [⚡ API Reference](#-backend-api--webhook-routing) • [🚀 Quick Start](#-monorepo-quick-start)

---

</div>

## 📌 Executive Summary

**GoldBit** (`goldbit.unykorn.ai`) is the institutional-grade micro-gold allocation system developed by **UnyKorn LLC** (Wyoming, USA). It enables consumers and institutions to acquire physical gold in precise **milligram increments** ($XAU\_MG$), backed 1:1 by LBMA 99.99% fine gold bars stored inside Brink's and Loomis segregated subpool vaults.

Each allocation is issued as a legally perfected **Controllable Electronic Record (CER)** under UCC Article 12, verifiable in real time via an on-chain Proof-of-Reserve invariant oracle.

---

## 🌳 System Architecture & Unified Flow Tree

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT SURFACES & REELS                                       │
│                    (Web Portal / Mobile DApp / Wholesale Partner REST Gateways)                  │
└────────────────────────────────────────────────┬─────────────────────────────────────────────────┘
                                                 │ HTTPS / WSS
                                                 ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               EXPRESS BACKEND GATEWAY & STATE MACHINE                            │
│                                                                                                  │
│  ┌───────────────────────────────┐ ┌───────────────────────────────┐ ┌────────────────────────┐  │
│  │   Payment Intent State        │ │      Wholesale Spot Quoter    │ │   BitGo HMAC-SHA256    │  │
│  │   (UUID, TTL, 60s Price Lock) │ │   (APMEX / StoneX / Bullion)  │ │   (Signature Auth)     │  │
│  └───────────────┬───────────────┘ └───────────────┬───────────────┘ └───────────┬────────────┘  │
│                  │                                 │                             │               │
│  ┌───────────────┴─────────────────────────────────┴─────────────────────────────┴────────────┐  │
│  │                              PROMPT INVARIANT VERIFICATION ENGINE                          │  │
│  │         Σ(Vaulted Fine mg) ≥ Σ(Circulating XRPL mg) + Pending Mints - Pending Burns        │  │
│  │                                                                                            │  │
│  │   [Fail-Closed Circuit Breaker: If Breached -> Lock Mints -> 409 Conflict]                 │  │
│  └───────────────────────────────────────────────┬────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┼───────────────────────────────────────────────┘
                                                   │
                 ┌─────────────────────────────────┴─────────────────────────────────┐
                 │                                                                   │
                 ▼                                                                   ▼
┌───────────────────────────────────────────────┐   ┌───────────────────────────────────────────────┐
│           BITGO ENTERPRISE POLICY             │   │               XRPL LEDGER ENGINE              │
│       (Multi-Party Signer & Settlement)       │   │           (Rippled RPC / WebSocket)           │
│                                               │   │                                               │
│ • USDC Receiving & Settlement Wallets         │   │ • Cold Issuer Account                         │
│ • Webhook Policy Velocity Approver            │   │   (rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ)        │
│ • Multi-Sig Authorization Governance          │   │ • Hot Operational Issuing Key                │
│ • Segregated Vault Title Co-Signer            │   │   (rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt)        │
└───────────────────────┬───────────────────────┘   │ • Custom Issued Currency: XAU_MG              │
                        │                           │ • Verified Trustlines & Payment Dispatch      │
                        │                           └───────────────────────┬───────────────────────┘
                        ▼                                                   ▼
┌───────────────────────────────────────────────┐   ┌───────────────────────────────────────────────┐
│           SETTLEMENT & BULLION RAILS          │   │             PHYSICAL VAULT LEVEL              │
│                                               │   │                                               │
│ • USVI Commercial Bank (Fiat ACH/Wire)        │   │ • LBMA Certified Good Delivery Bars           │
│ • APMEX Wholesale Spot Execution Desk         │   │ • Brink's / Loomis Salt Lake City Subpools    │
│ • Idempotent Trade Allocation Confirms        │   │ • Salted Bar Serial Manifest Telemetry        │
└───────────────────────────────────────────────┘   └───────────────────────────────────────────────┘
```

---

## 🗂️ Monorepo Workspace Topology

```text
goldbit/
├── apps/
│   ├── backend/                     # Unykorn Gold Rails Backend Daemon (Node/TypeScript/Prisma)
│   │   ├── prisma/schema.prisma     # Postgres Models: Intents, Audits, Allocations, Controls
│   │   ├── src/
│   │   │   ├── config/              # Typed Env & XRPL Constants
│   │   │   ├── middleware/          # BitGo HMAC & Circuit Breaker Guard
│   │   │   ├── modules/
│   │   │   │   ├── intent/          # Quote Locking & Intent State Machine
│   │   │   │   ├── settlement/      # BitGo Inbound Webhooks & USVI Processing
│   │   │   │   ├── wholesale/       # APMEX Spot Desk Connector & Vault Receipting
│   │   │   │   ├── xrpl/            # Hot/Cold Key Issuer & Burn Tracker
│   │   │   │   ├── reconciliation/  # Daily 0 0 * * * Audit Daemon & Invariant Engine
│   │   │   │   ├── por/             # HMAC Bar Sanitizer & Public PoR Publisher
│   │   │   │   └── chainlink/       # Chainlink External Adapter Bridge (POST /)
│   │   │   └── utils/               # BigNumber Math (Zero Floats) & ECDSA Signer
│   │   └── tests/                   # Jest Unit Test Suites (100% Passing)
│   │
│   └── web/                         # GoldBit Consumer Portal & Sales Engine (React/Vite/Tailwind)
│       ├── public/media/            # High-Energy WhatsApp Videos & Depository Assets
│       └── src/
│           ├── components/
│           │   ├── BuyTerminal/     # $10-$1,000 Spot Quoter, BitGo USDC QR Modal
│           │   ├── VideoShowcase/   # Eccentric Video Reels Grid & High-Res Player
│           │   ├── ProofOfReserve/  # Live Solvency Gauge & Salted Bar Manifest Table
│           │   ├── CerCertificate/  # 3D Holographic UCC Article 12 Deed Card
│           │   └── PhysicalStacking/# 10g Bar Accumulation & Courier Dispatch Progress
│           └── hooks/               # useGoldQuote & useProofOfReserve Hooks
│
├── deploy/
│   └── cloudflare/                  # Cloudflare Pages, Workers & R2 Storage Bindings
│       └── wrangler.toml
│
├── .github/workflows/
│   └── ci-deploy.yml                # Automated CI/CD: Test -> Build -> Cloudflare Pages
│
├── package.json                     # Monorepo NPM Workspace root
└── .gitignore                       # Strict secret & credential exclusion
```

---

## ⚡ Backend API & Webhook Routing

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/intent/gold/quote` | Public / Breaker | Locks spot gold quote for 60s; generates BitGo deposit address |
| `GET` | `/api/v1/intent/gold/:id` | Public | Returns complete intent lifecycle, vault allocation & XRPL tx hash |
| `POST` | `/api/v1/webhooks/bitgo` | **HMAC-SHA256** | Verifies `x-signature-sha256`, advances state to `SETTLED`, executes spot buy & mints $XAU\_MG$ |
| `POST` | `/api/v1/gold/redeem/verify-burn` | User Auth | Verifies on-chain XRPL burn transaction to stage physical courier dispatch |
| `GET` | `/api/v1/por/latest` | Public | Returns ECDSA-signed, HMAC-masked Proof-of-Reserves JSON |
| `POST` | `/api/v1/chainlink/por` | Chainlink Oracle | Chainlink Bridge adapter returning multiplier-scaled ($10^8$) reserve data |
| `GET` | `/health` | Public | Service health, XRPL network status, and CER LBMA compliance tags |

---

## 🔒 Hard Invariants & Fail-Closed Guards

1. **Zero Floating-Point Math**: Native JavaScript IEEE-754 numbers are strictly prohibited. All financial calculations, weight conversions, and quotes use `bignumber.js` with deterministic rounding.
2. **Reserve Invariant Formula**:
   $$\text{Verified Vault Fine Weight (mg)} \ge \text{Circulating XRPL Supply (mg)} + \text{Pending Mints (mg)} - \text{Pending Burns (mg)}$$
3. **Fail-Closed Circuit Breaker**: If the invariant formula is breached, `system_controls.mint_locked = true` is immediately committed, halting all minting APIs with `409 Conflict`.
4. **XRPL Custom Currency Specification**:
   - Currency Code: `XAU_MG` (Hex: `5841555F4D470000000000000000000000000000`)
   - 1 Token Unit = 1.000000 Milligram of physical LBMA 99.99% fine gold.

---

## 🚀 Monorepo Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/FTHTrading/goldbit.git
cd goldbit
npm install
```

### 2. Configure Environment Files
```bash
cp apps/backend/.env.example apps/backend/.env
```

### 3. Spin Up PostgreSQL & Redis Infrastructure
```bash
cd apps/backend
docker compose up -d postgres redis
npx prisma db push
```

### 4. Run Test Suite
```bash
# Run unit tests across workspace
npm run test
```

### 5. Launch Backend & Web Portal Concurrently
```bash
# Terminal 1: Backend Daemon (Port 3000)
npm run dev:backend

# Terminal 2: GoldBit Web Portal (Port 5173)
npm run dev:web
```

---

## ☁️ Cloudflare Pages & R2 Deployment

1. Set repository secrets in GitHub (`Settings -> Secrets and variables -> Actions`):
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API Token (Permissions: *Cloudflare Pages:Edit*, *R2:Edit*).
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
2. Every push to `main` automatically executes tests, builds the web application, and deploys directly to Cloudflare Pages.

---

## ⚖️ Legal & Governance Perfection

- **Custodian & Trustee**: Wyoming Statutory SPV Trust #01
- **Depository**: Brink's Global Services (Salt Lake City, UT) / Loomis International
- **Regulatory Framework**: Uniform Commercial Code (UCC) Article 12 (Controllable Electronic Records)
- **Assay Standard**: LBMA Good Delivery 99.99% Fine Gold (Assay certified)
- **Corporate Entity**: UnyKorn LLC (Wyoming, USA • EIN: 42-3536633 • LEI: 9845001234ABCDEF • MIC: UBEC)

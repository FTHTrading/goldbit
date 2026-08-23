import React, { useState } from 'react';
import {
  ShieldCheck,
  Scale,
  Building2,
  Cpu,
  Layers,
  Sparkles,
  DollarSign,
  TrendingUp,
  Award,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  Clock,
  Coins,
  FileText,
  BarChart3
} from 'lucide-react';
import { formatUSD } from '../utils/formatters';

export const UnykornClubBlueprint: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'monetization' | 'compliance'>('blueprint');

  const phases = [
    {
      number: '01',
      title: 'The Legal Bedrock',
      statute: 'Wyoming SF0125, HB0043 & UCC Article 12',
      tagline: 'Eliminating counterparty & bankruptcy risk via direct bailment.',
      description: 'Physical gold is held under a true bailor-bailee relationship. Under 11 U.S.C. § 541, the gold is non-estate property shielded from operating liabilities. Private key control of the XRPL wallet constitutes legal possession of the Controllable Electronic Record (CER).',
      badge: 'BANKRUPTCY REMOTE',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      number: '02',
      title: 'Tactile Front-End Terminal',
      statute: 'APMEX Wholesale API & 60s TTL Price Lock',
      tagline: 'Wholesale spot pricing locked for sixty seconds with instant USDC settlement.',
      description: 'The user selects an allocation weight. A live spot price is locked with zero slippage. Funds clear directly to BitGo Bank & Trust (OCC-chartered national trust bank) into segregated escrow.',
      badge: 'SPOT PRICING DESK',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      number: '03',
      title: 'CFTC 28-Day Actual Delivery',
      statute: 'Commodity Exchange Act (CEA) Bailment Rule',
      tagline: 'Immediate physical spot purchase & segregation into Brink’s/Loomis vaults.',
      description: 'Rather than waiting 28 days, Unykorn executes immediate spot bullion acquisition. The fine gold is physically segregated into insured depository vault subpools with signed Allocation Certificates.',
      badge: 'CFTC COMPLIANT',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      number: '04',
      title: 'Ledger Minting & KYC Trustlines',
      statute: 'XRPL XLS-40/80 DID & FinCEN Closed Loop',
      tagline: 'Cold Issuer 3-of-4 MPC multi-sig minting of XAU_MG micro-units.',
      description: 'Tokens are minted from a locked Cold Issuer Address (SPDI, Vault Telemetry, Trustee, Unykorn). Transferred exclusively to KYC/AML-cleared wallets with dedicated trustlines, insulating from money-transmitter liabilities.',
      badge: 'FINCEN FIREWALL',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      number: '05',
      title: 'Chainlink Proof of Reserve Audit',
      statute: 'Daily Automated On-Chain Solvency Check',
      tagline: 'Decentralized circuit breaker trips if token supply exceeds vault inventory.',
      description: 'Vault managers output daily cryptographically signed inventory telemetry. The GoldProofOfReserveConsumer.sol smart contract verifies signatures and pauses minting if supply deviates from physical reserves. 100% 1:1 backed.',
      badge: 'FAIL-CLOSED ORACLE',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      number: '06',
      title: 'Regulatory Utility Firewall (PAXO)',
      statute: 'Utility Separation & Armored Dispatch',
      tagline: 'Consumptive fees settled via PAXO; physical delivery to door via Brink’s.',
      description: 'Platform fees, API calls, and assay lookups are settled via the non-gold utility token PAXO. Users can aggregate micro-certificates to standard 10g LBMA increments and trigger insured armored courier delivery.',
      badge: 'DUAL-TOKEN ARCHITECTURE',
      badgeColor: 'text-amber-300 bg-amber-500/10 border-amber-500/20'
    }
  ];

  const revenueStreams = [
    {
      title: 'Wholesale Spot Markup & Minting Spread',
      metric: '0.50% - 1.50%',
      type: 'Per Transaction',
      description: 'Captured on every spot buy and sell execution between cash/USDC and physical gold, capitalizing on wholesale bullion desk integration.',
      icon: DollarSign,
      color: 'from-amber-400 to-amber-600'
    },
    {
      title: 'Vault Custody & AUM Management',
      metric: '0.25% - 0.40%',
      type: 'Annualized Recurring',
      description: 'Annual management fee for insured Brink’s/Loomis vault storage, continuous telemetry auditing, and fiduciary custody administration.',
      icon: Building2,
      color: 'from-rose-500 to-rose-700'
    },
    {
      title: 'Physical Armored Delivery Premiums',
      metric: '$50 - $150',
      type: 'Per Physical Dispatch',
      description: 'Fabrication, assay verification, and insured courier delivery fees charged when users convert micro-units into physical 10g LBMA bars.',
      icon: Award,
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      title: 'Enterprise GaaS & API SaaS Licensing',
      metric: 'Subscription + Metered',
      type: 'B2B Software Fee',
      description: 'Private banks, wealth managers, and neobanks pay SaaS fees to license Unykorn’s 3D deed viewer, XRPL rails, and automated PoR daemon.',
      icon: Cpu,
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      title: 'PAXO Token Utility Consumption',
      metric: 'Gas & Prepaid Credits',
      type: 'Volume-Linked Burn',
      description: 'Developers and institutional clients consume PAXO tokens to settle oracle requests, custom audit reports, and high-frequency API lookups.',
      icon: Sparkles,
      color: 'from-amber-300 to-yellow-500'
    },
    {
      title: 'Sovereign Rails: USD1 & SOFI Minting',
      metric: 'Origination & Routing',
      type: 'Institutional Facility',
      description: 'Sovereign asset rails allowing institutional participants to mint USD1 and SOFI asset units against vaulted collateral and Treasury reserves.',
      icon: TrendingUp,
      color: 'from-cyan-400 to-blue-600'
    }
  ];

  return (
    <section id="unykorn-club" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3 shadow-sm">
          <Layers className="w-3.5 h-3.5" /> UNYKORN CLUB MASTER ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          The Full Commercial <span className="liquid-gold-text">& Legal Engine</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl mx-auto font-sans leading-relaxed">
          From 60-second spot lock to physical armored delivery: how the legal, cryptographic, and monetization layers work in unison.
        </p>
      </div>

      {/* Navigation Switcher */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <div className="p-1.5 bg-[#070709] rounded-2xl border border-white/[0.1] flex items-center gap-1 font-mono text-xs shadow-xl">
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'blueprint'
                ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-black font-extrabold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>6-Phase Technical Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('monetization')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'monetization'
                ? 'bg-white text-black font-extrabold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>6-Stream Revenue Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'compliance'
                ? 'bg-gradient-to-r from-rose-500 to-rose-700 text-white font-extrabold shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Tri-Party Legal Fortress</span>
          </button>
        </div>
      </div>

      {/* TAB 1: 6-PHASE OPERATIONAL BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="frosty-glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-amber-400/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-white/30 group-hover:text-amber-400 transition-colors">
                    {phase.number}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${phase.badgeColor}`}>
                    {phase.badge}
                  </span>
                </div>

                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                  {phase.statute}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                  {phase.title}
                </h3>
                <p className="text-xs text-amber-300 font-sans font-medium mb-3">
                  {phase.tagline}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {phase.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>STAGE {phase.number} OF 06</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: 6-STREAM COMMERCIAL MONETIZATION ENGINE */}
      {activeTab === 'monetization' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {revenueStreams.map((rev) => {
              const Icon = rev.icon;
              return (
                <div
                  key={rev.title}
                  className="frosty-glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-amber-400/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${rev.color} flex items-center justify-center text-black shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                          {rev.metric}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase">
                          {rev.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight mb-2">
                      {rev.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {rev.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-amber-300">
                    <span>ACTIVE MONETIZATION</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Institutional Asset Minting Architecture (USD1 & SOFI) */}
          <div className="frosty-glass-gold p-8 rounded-3xl border border-amber-500/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block mb-1">
                  SOVEREIGN LIQUIDITY EXPANSION
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  USD1 & SOFI Institutional Asset Minting Rails
                </h3>
                <p className="text-xs text-zinc-300 mt-2 max-w-2xl font-sans leading-relaxed">
                  Institutional treasuries can mint USD1 (sovereign settlement dollar) and SOFI (sovereign finance unit) natively over Unykorn multi-chain rails, backed 100% by vaulted fine gold and tokenized US Treasuries under strict LTV covenants.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                <div className="px-4 py-3 rounded-2xl bg-[#070709] border border-white/[0.1] text-center">
                  <div className="text-white font-bold">USD1 MINTING</div>
                  <div className="text-emerald-400 text-[10px]">100% RWA Collateral</div>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#070709] border border-white/[0.1] text-center">
                  <div className="text-white font-bold">SOFI RAILS</div>
                  <div className="text-amber-400 text-[10px]">Institutional Yield</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TRI-PARTY LEGAL COMPLIANCE FORTRESS */}
      {activeTab === 'compliance' && (
        <div className="frosty-glass-panel p-8 sm:p-12 rounded-3xl border border-rose-500/30 space-y-8 animate-in fade-in duration-300">
          <div className="border-b border-white/[0.1] pb-6">
            <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest font-bold block mb-1">
              REGULATORY MEMORANDUM & COMPLIANCE MEMO
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Tri-Party Depository & Legal Shield
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-3xl font-sans">
              Ensuring complete isolation from third-party warehouse liens, bankruptcy estates, and money transmission liabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="bg-[#070709]/80 p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-white font-mono">Tri-Party Control Agreement</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Executed between Wyoming Statutory Trust #01, BitGo OCC Trust, and Brink’s/Loomis, explicitly waiving general UCC Article 7 warehouse liens and cross-collateralization.
              </p>
            </div>

            <div className="bg-[#070709]/80 p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-white font-mono">FinCEN 31 CFR Part 1027</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Formal written AML/CFT compliance program for covered precious metals dealers, paired with XLS-40/80 DID identity-restricted trustlines.
              </p>
            </div>

            <div className="bg-[#070709]/80 p-6 rounded-2xl border border-white/[0.08] space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-white font-mono">Bankruptcy Remote Trust</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Under 11 U.S.C. § 541, customer bullion is held as non-estate property under true bailment, fully insulated from any operating insolvency.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { Layers, ShieldCheck, FileText, CheckCircle2, Lock, ArrowRight, Activity, Terminal } from 'lucide-react';
import { formatUSD } from '../utils/formatters';

export const ReserveSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'legal' | 'redemption' | 'apmex'>('architecture');

  return (
    <section id="reserve" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Layers className="w-3.5 h-3.5" /> UNYKORN Reserve System
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Verifiable Allocation Infrastructure for <span className="liquid-gold-text">Real-World Assets</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          A programmable RWA framework bridging institutional bullion wholesale execution (APMEX / Partner Desks) directly with XRPL ledger settlement and legal bailment deeds.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap gap-2 pb-4 mb-8 border-b border-white/[0.08] text-xs font-mono">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'architecture'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          1. Program Architecture
        </button>
        <button
          onClick={() => setActiveTab('apmex')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'apmex'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          2. Wholesale & APMEX Desk
        </button>
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'legal'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          3. UCC Article 12 & Legal Custody
        </button>
        <button
          onClick={() => setActiveTab('redemption')}
          className={`px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'redemption'
              ? 'bg-white text-black font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.08]'
          }`}
        >
          4. Physical Redemption Policy
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="institutional-panel p-8 sm:p-12 rounded-3xl border border-white/[0.08] relative overflow-hidden">
        {activeTab === 'architecture' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Non-Fractional Micro-Allocation Framework
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                UNYKORN Reserve operates on a strict mathematical invariant where every on-chain unit corresponds to an unencumbered, physical fine-gold allocation in an accredited depository.
              </p>

              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08] font-mono text-xs mb-6 space-y-3">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                  Hard Invariant Proof Formula
                </span>
                <div className="text-amber-300 font-bold text-sm">
                  Σ(Vaulted Fine Weight mg) ≥ Σ(XRPL Supply mg) + Pending Mints - Pending Burns
                </div>
                <p className="text-[11px] text-zinc-400">
                  Evaluated automatically before every ledger mint and verified daily by attestation daemons.
                </p>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Base Unit: 1.000000 Token = 1.000000 Milligram LBMA 99.99% Fine Gold</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero native floating-point math; enforced via BigNumber.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fail-closed circuit breaker locks mints on any telemetry deficit</span>
                </div>
              </div>
            </div>

            <div className="bg-[#070709] p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                  Protocol Disclosures
                </span>
                <h4 className="text-sm font-bold text-white mb-2">
                  Eligibility & Jurisdiction Notice
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  UNYKORN Reserve is an infrastructure framework for sovereign asset allocation and title registry. Product access, custody agreements, and issuance depend on applicable legal, AML/KYC screening, and jurisdictional qualifications.
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">XRPL Code:</span>
                <span className="text-amber-400 font-bold">XAU_MG (5841555F4D47...)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apmex' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              Institutional Bullion Execution (APMEX / Wholesaler Spot Rails)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
              When client funds settle via BitGo USDC or bank wire, the UNYKORN quoter executes spot purchase orders against pre-funded institutional bullion accounts. The depository delivers certified trade manifests and assigns physical bar subpool serial numbers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Spot Price Locking</span>
                <div className="text-base font-bold text-white">60-Second TTL Lock</div>
                <p className="text-xs text-zinc-400 mt-1">Direct wholesale spot quote with locked BPS dealer spread.</p>
              </div>

              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Assay Certification</span>
                <div className="text-base font-bold text-white">99.99% Fine Gold</div>
                <p className="text-xs text-zinc-400 mt-1">Certified LBMA Good Delivery bars in Brink's / Loomis vaults.</p>
              </div>

              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Idempotency Key</span>
                <div className="text-base font-bold text-white">Zero Double Allocation</div>
                <p className="text-xs text-zinc-400 mt-1">Cryptographic idempotency keys prevent duplicate mint orders.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'legal' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              Uniform Commercial Code (UCC) Article 12 & Statutory Trust Perfection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
              Under recent Uniform Commercial Code revisions (UCC Article 12), tokenized allocations function as **Controllable Electronic Records (CERs)**. The token holder holds verifiable legal title to the underlying physical bailment held in custody by the Wyoming Statutory SPV Trust.
            </p>

            <div className="bg-[#070709] p-6 rounded-2xl border border-white/[0.08] font-mono text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Fiduciary Trustee:</span>
                <span className="text-white">Wyoming Gold Statutory Trust #01</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Legal Classification:</span>
                <span className="text-white">UCC Article 12 Controllable Electronic Record</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Custodial Segregation:</span>
                <span className="text-white">Segregated Client Subpool Account</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Bailment Verification:</span>
                <span className="text-emerald-400">Perpetual Cryptographic Attestation</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'redemption' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">
              Physical Vault Redemption & Armored Courier Dispatch
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">
              Allocated token holders can aggregate micro-units to standard bar denominations (10g, 50g, 100g, 1kg). Submitting an on-chain XRPL burn transaction triggers the depository release protocol, packaging the serialized LBMA bar for insured armored courier delivery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Step 1</span>
                <div className="text-sm font-bold text-white">Threshold Reached</div>
                <p className="text-xs text-zinc-400 mt-1">Accumulate 10,000 mg (10g) minimum bar increment.</p>
              </div>

              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Step 2</span>
                <div className="text-sm font-bold text-white">Ledger Burn Event</div>
                <p className="text-xs text-zinc-400 mt-1">Burn XAU_MG units on XRPL to cold issuer gateway.</p>
              </div>

              <div className="bg-[#070709] p-5 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Step 3</span>
                <div className="text-sm font-bold text-white">Insured Dispatch</div>
                <p className="text-xs text-zinc-400 mt-1">Vault issues physical bar release with tracking manifest.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from 'react';
import { Cpu, ShieldCheck, ArrowUpRight, Lock, Key, Terminal } from 'lucide-react';

export const RailSection: React.FC = () => {
  return (
    <section id="rail" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Cpu className="w-3.5 h-3.5" /> UNYKORN Rail Infrastructure
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Multi-Chain Settlement & <span className="liquid-metal-text">Policy Rails</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Non-custodial key separation, atomic token issuance, and enterprise multi-party policy signing across sovereign chains.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XRPL Issuance Topology */}
        <div className="institutional-panel p-8 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">XRPL KEY TOPOLOGY</span>
            <span className="text-xs font-mono text-amber-400 font-bold">XAU_MG RAILS</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            Cold Issuer / Hot Dispatcher Separation
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Master asset supply is anchored to an immutable cold account governed by a 3-of-4 Multi-Sig SignerList. The operational hot key signs micro-unit Payment transactions within strict velocity caps.
          </p>

          <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08] font-mono text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">Cold Issuer Root:</span>
              <span className="text-zinc-300">rJLMST...qN3FQ</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">Operational Hot Key:</span>
              <span className="text-zinc-300">rNX4fa...AYyCt</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Governance:</span>
              <span className="text-emerald-400">BitGo MPC 3-of-4 SignerList</span>
            </div>
          </div>
        </div>

        {/* BitGo Enterprise Policy Controls */}
        <div className="institutional-panel p-8 rounded-3xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">ENTERPRISE POLICY</span>
            <span className="text-xs font-mono text-indigo-400 font-bold">BITGO INTEGRATION</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">
            Automated Webhook Signature & AML Gates
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Every incoming USDC deposit and wire transfer is authenticated via constant-time HMAC-SHA256 signature checks and screened against automated OFAC sanctions lists before allocation.
          </p>

          <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08] font-mono text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">Authentication:</span>
              <span className="text-zinc-300">x-signature-sha256 HMAC Header</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-400">Reorg Protection:</span>
              <span className="text-zinc-300">64-128 Confirmation Depth</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-400">Attestation Feed:</span>
              <span className="text-emerald-400">Chainlink External Adapter Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Key, Award, Sparkles, Database } from 'lucide-react';
import { truncateAddress } from '../utils/formatters';

export const VaultSection: React.FC = () => {
  return (
    <section id="vaults" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> UNYKORN Vaults & Sovereign Namespace Anchors
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Programmable Smart-Account <span className="crimson-text-gradient">Vault Ecosystem</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          ERC-6551 Token Bound Accounts and cryptographic Genesis Certificates anchoring sovereign asset titles across Polygon, XRPL, and EVM architectures.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Primary Contract Registry */}
        <div className="institutional-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
              PRIMARY ANCHOR CONTRACT
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              Sovereign Root Contract
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              The immutable smart contract governing root Genesis suffix namespaces and ERC-6551 vault registries.
            </p>

            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08] font-mono text-xs text-zinc-300 space-y-2 mb-6">
              <span className="text-[10px] text-zinc-400 uppercase block">Polygon Admin Contract:</span>
              <div className="text-rose-400 break-all text-xs font-bold">
                0x4E574939D460d284B5D990646D4aeaEF2D49Fa13
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Multi-Chain Registry</span>
            <span className="text-emerald-400">Validated Active</span>
          </div>
        </div>

        {/* Panel 2: Genesis Certificates of Origin */}
        <div className="institutional-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
              IMMUTABLE CERTIFICATE DEEDS
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              Genesis Certificates of Origin
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Cryptographic ownership titles anchoring 78 Genesis Suffix Roots, 60 Athlete Generational Trust Namespaces, and RWA Vault Relics.
            </p>

            <div className="space-y-2 text-xs font-mono text-zinc-300">
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-zinc-400">Genesis Roots:</span>
                <span className="text-white font-bold">78 Suffix Anchors</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.04]">
                <span className="text-zinc-400">Athlete Namespaces:</span>
                <span className="text-white font-bold">60 Sovereign Vaults</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-400">Total Assets Under Custody:</span>
                <span className="text-amber-400 font-bold">$4.82B Institutional AUC</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Standard</span>
            <span className="text-white font-bold">ERC-6551 + CER</span>
          </div>
        </div>

        {/* Panel 3: Vault Telemetry */}
        <div className="institutional-panel p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
              DISTRIBUTED ASSET LEDGER
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              Multi-Chain Balance Sync
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Continuous state synchronisation between XRPL, Polygon POS, Stellar, and Apostle Chain nodes.
            </p>

            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08] font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">XRPL Issuer:</span>
                <span className="text-zinc-300">rJLMST...qN3FQ</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Stellar Issuer:</span>
                <span className="text-zinc-300">GB4FHG...4JGEG4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Polygon Admin:</span>
                <span className="text-zinc-300">0x8aced2...Ac7A</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Ledger Nodes</span>
            <span className="text-emerald-400">4 Layer-1s Synced</span>
          </div>
        </div>
      </div>
    </section>
  );
};

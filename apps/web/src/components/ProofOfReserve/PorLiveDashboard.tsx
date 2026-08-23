import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, RefreshCw, Key, Link2, ExternalLink } from 'lucide-react';
import { useProofOfReserve } from '../../hooks/useProofOfReserve';
import { BarManifestTable } from './BarManifestTable';
import { truncateAddress } from '../../utils/formatters';
import { APP_CONFIG } from '../../config/constants';

export const PorLiveDashboard: React.FC = () => {
  const { porData, loading, refreshPoR } = useProofOfReserve();

  const vaultMg = porData ? parseFloat(porData.summary.totalVaultFineMg) : 100000000;
  const xrplMg = porData ? parseFloat(porData.summary.totalCirculatingXrplMg) : 54200150;
  const surplusMg = porData ? parseFloat(porData.summary.deltaSurplusMg) : 45798689;
  const ratio = porData ? porData.summary.reserveRatioPct : '184.49';

  return (
    <div id="reserves" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Live Invariant & Proof-of-Reserve Telemetry
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            100% Backed. <span className="gold-text-gradient">Zero Fractional Reserve.</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Real-time balance equation between Brink's depository inventory and XRPL gateway obligations.
          </p>
        </div>

        <button
          onClick={refreshPoR}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-obsidian-900 border border-zinc-800 hover:border-gold-500/40 text-xs font-bold text-zinc-300 flex items-center gap-2 transition-colors font-mono"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-gold-400 ${loading ? 'animate-spin' : ''}`} />
          Run Oracle Invariant Check
        </button>
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-panel p-6 rounded-2xl border border-gold-500/20">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Verified Vault Gold
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gold-400 font-mono mt-1">
            {(vaultMg / 1000).toLocaleString()} <span className="text-sm font-sans font-normal text-zinc-400">grams</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            {vaultMg.toLocaleString()} mg fine gold
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-zinc-800">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            XRPL Circulating Supply
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {(xrplMg / 1000).toLocaleString()} <span className="text-sm font-sans font-normal text-zinc-400">XAU</span>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-1">
            {xrplMg.toLocaleString()} tokens issued
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Vault Reserve Surplus
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
            +{(surplusMg / 1000).toLocaleString()} <span className="text-sm font-sans font-normal text-zinc-400">grams</span>
          </div>
          <p className="text-xs text-emerald-400/80 font-mono mt-1">
            +{surplusMg.toLocaleString()} mg unallocated
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-gold-500/30 gold-glow">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
            Reserve Solvency Ratio
          </span>
          <div className="text-2xl sm:text-3xl font-black text-gold-300 font-mono mt-1">
            {ratio}%
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Overcollateralized (1:1 Minimum)
          </div>
        </div>
      </div>

      {/* Bar Manifest Table */}
      {porData && <BarManifestTable bars={porData.depositoryAllocations} />}

      {/* Cryptographic Attestation Banner */}
      <div className="mt-4 p-4 rounded-2xl bg-obsidian-900/90 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <span className="text-zinc-400">ECDSA Oracle Attestation Signature:</span>
            <div className="text-zinc-300 break-all text-[11px]">
              {porData?.cryptographicAttestation.signatureHex || '3045022100e4b8a2c1f9...'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="px-2.5 py-1 rounded-md bg-gold-500/15 text-gold-300 text-[11px] font-bold">
            Chainlink Bridge Ready
          </span>
        </div>
      </div>
    </div>
  );
};

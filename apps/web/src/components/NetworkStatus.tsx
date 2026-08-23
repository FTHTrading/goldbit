import React from 'react';
import { Activity, Server, Database, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
  return (
    <section id="network" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Activity className="w-3.5 h-3.5" /> UNYKORN Network Telemetry
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System & Service <span className="liquid-metal-text">Operational Status</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Real-time health monitoring of multi-chain RPCs, reserve audit daemons, and cryptographic signing engines.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="institutional-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-zinc-400">XRPL Consensus</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live
            </span>
          </div>
          <div className="text-xl font-bold text-white font-mono">Ledger #89,451,203</div>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">Validated latency: 3.4s</p>
        </div>

        <div className="institutional-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-zinc-400">Polygon POS Anchor</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live
            </span>
          </div>
          <div className="text-xl font-bold text-white font-mono">Block #60,119,482</div>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">Finality depth: 128</p>
        </div>

        <div className="institutional-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-zinc-400">Reserve Invariant Engine</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Passing
            </span>
          </div>
          <div className="text-xl font-bold text-white font-mono">Surplus +45,798 g</div>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">Circuit breaker: Arm / Clean</p>
        </div>

        <div className="institutional-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3 text-xs font-mono">
            <span className="text-zinc-400">Chainlink Oracle Feed</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Active
            </span>
          </div>
          <div className="text-xl font-bold text-white font-mono">10^8 Multiplier</div>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">ECDSA verified signature</p>
        </div>
      </div>
    </section>
  );
};

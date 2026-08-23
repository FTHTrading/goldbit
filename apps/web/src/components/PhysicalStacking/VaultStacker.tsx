import React, { useState } from 'react';
import { Package, Truck, ShieldCheck, ArrowRight, Flame, CheckCircle2 } from 'lucide-react';
import { formatWeightMg } from '../../utils/formatters';

export const VaultStacker: React.FC = () => {
  const [currentBalanceMg, setCurrentBalanceMg] = useState<number>(3480);
  const targetBarIncrementMg = 10000; // 10 grams in mg

  const progressPct = Math.min(100, (currentBalanceMg / targetBarIncrementMg) * 100);

  return (
    <div id="vault" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold-500/25 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase mb-4">
              <Package className="w-3.5 h-3.5" /> Physical Bar Conversion & Vault Dispatch
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Stack Micro-Units To <span className="gold-text-gradient">Physical 10g Bars</span>
            </h2>
            <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
              When your accumulated milligram holdings reach standard bar sizes (10g, 50g, 100g, 1kg), burn your XRPL tokens on-chain to trigger physical packaging and insured armored courier delivery directly from Brink's or Loomis vaults.
            </p>

            {/* 3 Step Process */}
            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Stack Milligrams Over Time</h4>
                  <p className="text-xs text-zinc-400">Buy in small increments ($10, $50) with zero storage fees.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Burn on XRPL to Cold Issuer</h4>
                  <p className="text-xs text-zinc-400">Submit an on-chain Payment transaction burning your XAU_MG units.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-gold-500/20 text-gold-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Armored Courier Delivery</h4>
                  <p className="text-xs text-zinc-400">Receive serialized, assay-stamped LBMA gold with tracking ID.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stacking Progress Visualizer Card */}
          <div className="bg-obsidian-950 p-6 sm:p-8 rounded-3xl border border-zinc-800 gold-glow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase text-zinc-400 font-mono">
                10g Bar Stacking Progress
              </span>
              <span className="text-xs font-bold text-gold-400 font-mono">
                {progressPct.toFixed(1)}% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 bg-obsidian-900 rounded-full overflow-hidden p-0.5 border border-zinc-800 mb-6">
              <div
                className="h-full bg-gradient-to-r from-gold-400 via-amber-400 to-yellow-300 rounded-full transition-all duration-500 shadow-md shadow-gold-500/50"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>

            {/* Weight Status */}
            <div className="grid grid-cols-2 gap-4 bg-obsidian-900/80 p-4 rounded-2xl border border-zinc-800/80 mb-6 font-mono text-xs">
              <div>
                <span className="text-zinc-400 text-[10px] uppercase block">Current Balance</span>
                <span className="text-lg font-black text-white">{currentBalanceMg.toLocaleString()} mg</span>
                <span className="text-[11px] text-zinc-400 block">({(currentBalanceMg / 1000).toFixed(2)} grams)</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-400 text-[10px] uppercase block">Target Bar</span>
                <span className="text-lg font-black text-gold-400">10,000 mg</span>
                <span className="text-[11px] text-zinc-400 block">(10.00 grams)</span>
              </div>
            </div>

            {/* Simulation Button */}
            <button
              onClick={() => setCurrentBalanceMg((prev) => Math.min(10000, prev + 1160.9))}
              className="w-full py-3.5 rounded-xl bg-obsidian-900 border border-gold-500/30 hover:border-gold-400 text-gold-300 font-bold text-xs flex items-center justify-center gap-2 transition-all mb-3"
            >
              <span>+ Add $100 Gold (1,160.90 mg) To Stack</span>
            </button>

            <button
              disabled={progressPct < 100}
              className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                progressPct >= 100
                  ? 'bg-gradient-to-r from-gold-300 to-amber-500 text-black shadow-lg shadow-gold-500/30 cursor-pointer'
                  : 'bg-obsidian-900 border border-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>{progressPct >= 100 ? 'Request Armored Vault Delivery' : 'Reach 10g To Request Delivery'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Lock, Award, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

interface HeroSectionProps {
  onStartBuying: () => void;
  onExplorePoR: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartBuying,
  onExplorePoR,
}) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Ambient Video with Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter blur-[2px] scale-105"
        >
          <source src="/media/unykorn gold.mp4" type="video/mp4" />
          <source src="/media/WhatsApp Video 2026-08-23 at 7.10.42 AM.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950 via-obsidian-950/80 to-obsidian-950"></div>
      </div>

      {/* Radiant Gold Glow Background elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/15 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wide uppercase mb-8 shadow-lg shadow-gold-500/10">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          LBMA 99.99% FINE GOLD • BITGO ENTERPRISE POLICY • XRPL SETTLED
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Stack Pure Gold In <span className="gold-text-gradient">Milligrams</span>. <br />
          Instant Micro-Allocation on XRPL.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          No minimums. No fractional paper claims. Own physical LBMA 99.99% fine gold stored inside Brink's & Loomis vaults, verified cryptographically in real time and delivered directly to your XRPL wallet.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartBuying}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-black font-extrabold text-lg flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-gold-500/30 gold-shimmer-sweep"
          >
            Start With $10 Gold <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExplorePoR}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-obsidian-900/80 border border-gold-500/30 hover:border-gold-400 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-obsidian-800 transition-all"
          >
            <Lock className="w-5 h-5 text-gold-400" /> Inspect Vault Proofs
          </button>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
          <div className="glass-panel p-5 rounded-2xl border border-gold-500/15">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 text-gold-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">1:1 Micro-Weight</h3>
            <p className="text-xs text-zinc-400">1 Token = 1 Milligram of physical 99.99% LBMA fine gold.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gold-500/15">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 text-gold-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Segregated Vaults</h3>
            <p className="text-xs text-zinc-400">Brink's & Loomis allocated vaults with audited bar manifests.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gold-500/15">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 text-gold-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">BitGo Governed</h3>
            <p className="text-xs text-zinc-400">Enterprise multi-sig policy signing & instant USDC rails.</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-gold-500/15">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-3 text-gold-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Physical Delivery</h3>
            <p className="text-xs text-zinc-400">Stack up to 10g bar increments for insured courier delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

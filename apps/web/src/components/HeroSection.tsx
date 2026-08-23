import React from 'react';
import { ArrowRight, Terminal, Layers, ShieldCheck, Activity, Key } from 'lucide-react';

interface HeroSectionProps {
  onEnterNetwork: () => void;
  onViewInfrastructure: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterNetwork,
  onViewInfrastructure,
}) => {
  return (
    <div className="relative overflow-hidden pt-16 pb-28 lg:pt-28 lg:pb-36">
      {/* Background Liquid Metal Video Canvas */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter contrast-125 brightness-90 scale-105"
        >
          <source src="/media/WhatsApp Video 2026-08-23 at 6.54.30 AM.mp4" type="video/mp4" />
          <source src="/media/WhatsApp Video 2026-08-23 at 4.03.01 AM.mp4" type="video/mp4" />
          <source src="/media/C_Users_Kevan_OneDrive_FTH (1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-[#070709]/75 to-[#070709]"></div>
      </div>

      {/* Crimson Ambient Glow Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-zinc-300 text-xs font-mono tracking-widest uppercase mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
          UNYKORN PROTOCOL SPECIFICATION v2.4
        </div>

        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] mb-8 font-sans">
          Infrastructure for <br />
          <span className="liquid-metal-text">verifiable digital ownership.</span>
        </h1>

        {/* Institutional Description */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-12 font-normal leading-relaxed">
          Institutional-grade systems for tokenized assets, identity-bound certificates, programmable vaults, and interoperable multi-chain settlement.
        </p>

        {/* Primary Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={onEnterNetwork}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 hover:bg-zinc-200 transition-all shadow-xl hover:shadow-rose-500/10"
          >
            <span>Enter the Network</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewInfrastructure}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-white/30 text-zinc-300 hover:text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
          >
            <Terminal className="w-4 h-4 text-zinc-400" />
            <span>View Infrastructure</span>
          </button>
        </div>

        {/* Restrained Proof Row */}
        <div className="pt-8 border-t border-white/[0.08] max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            <span>Asset Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            <span>Programmable Vaults</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            <span>Verification Systems</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
            <span>Multi-Chain Settlement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

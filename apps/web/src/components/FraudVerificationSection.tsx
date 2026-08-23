import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  ExternalLink,
  Gift,
  Copy,
  Check,
  AlertTriangle,
  Flame,
  Sparkles,
  Lock,
  ArrowRight,
  HelpCircle,
  Film
} from 'lucide-react';

export const FraudVerificationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'UNYKORN-VERIFY-FREE';

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="fraud-verification" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Container with High-Impact Frosted Glass & Crimson Warning Hue */}
      <div className="frosty-glass-crimson p-6 sm:p-12 rounded-3xl border border-rose-500/40 shadow-2xl relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 blur-[120px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Video Reel & Casino Theme */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-rose-500/30 bg-[#070709] relative shadow-2xl group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-72 object-cover filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-500"
              >
                <source src="/media/blockchainfraudorg_sorry.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                INDEPENDENT DUE DILIGENCE
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-zinc-300">
                <span className="flex items-center gap-1.5 text-rose-300 font-bold">
                  <Film className="w-3.5 h-3.5" /> BLOCKCHAINFRAUD.ORG BRIEF
                </span>
                <span className="text-zinc-400">LOST ASSET RECOVERY</span>
              </div>
            </div>

            {/* Casino Slot Warning Callout */}
            <div className="p-4 rounded-2xl bg-[#070709]/80 border border-white/[0.08] text-xs font-mono text-zinc-300 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                🎰
              </div>
              <p className="leading-snug text-zinc-400">
                <strong className="text-white font-mono">Stop gambling with your wealth.</strong> Unbacked tokens and crypto casinos are games of chance. Demand real LBMA fine gold title.
              </p>
            </div>
          </div>

          {/* Right Column: Verification & $30 Free Client Pass */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase">
              <ShieldAlert className="w-3.5 h-3.5" /> THIRD-PARTY VERIFICATION & ASSET RECOVERY
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Verify If We (Or Anyone Else) Are Legitimate. <br />
              <span className="crimson-text-gradient">Recover Lost Blockchain Funds.</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Never take an issuer’s word for granted. Use our official partnership with <strong className="text-white">BlockchainFraud.org</strong> to run independent cryptographic forensics, audit corporate SPV filings, verify token legitimacy, or initiate institutional lost-asset recovery proceedings.
            </p>

            {/* Free $30 Client Pass Box */}
            <div className="bg-[#070709]/90 p-6 rounded-2xl border border-rose-500/30 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shadow-md">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
                      EXCLUSIVE CLIENT PASS ($30 VALUE • 100% OFF)
                    </span>
                    <h4 className="text-sm font-bold text-white font-mono">
                      Save $30 on Any Asset Verification
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-black/60 px-3.5 py-2 rounded-xl border border-white/[0.1] font-mono text-xs">
                  <span className="text-amber-300 font-bold">{couponCode}</span>
                  <button
                    onClick={handleCopyCoupon}
                    className="p-1 rounded-lg hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                    title="Copy Coupon"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href="https://blockchainfraud.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                >
                  <Search className="w-4 h-4" />
                  <span>Audit Unykorn on BlockchainFraud.org</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-75" />
                </a>

                <a
                  href="https://blockchainfraud.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/[0.08] flex items-center justify-center gap-2 text-center"
                >
                  <span>Submit Lost Asset Claim</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

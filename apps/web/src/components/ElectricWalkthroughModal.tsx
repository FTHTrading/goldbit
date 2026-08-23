import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Scale,
  Building2,
  Award,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Lock,
  ExternalLink
} from 'lucide-react';
import { formatUSD } from '../utils/formatters';

interface ElectricWalkthroughModalProps {
  onClose: () => void;
  onOpenAccess: () => void;
}

export const ElectricWalkthroughModal: React.FC<ElectricWalkthroughModalProps> = ({
  onClose,
  onOpenAccess,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      stepNumber: '01',
      title: 'Define Allocation Weight & Sovereign Treasuries',
      badge: 'ASSET ALLOCATION & INGESTION',
      icon: Scale,
      color: 'from-amber-400 to-amber-600',
      tagline: 'Precision micro-weights from 1.000 mg to 1,000.000 kg and institutional T-Bills.',
      details: [
        'Select fine weight in LBMA Good Delivery 99.99% gold or ingest tokenized US Treasuries.',
        '60-second TTL spot quote lock connected directly to APMEX / Wholesaler bullion desks.',
        'Zero fractional reserve: every milligram is 1:1 allocated before minting.'
      ],
      mockMetric: '1,000.000 Grams Fine Gold • Spot Locked @ $82.50/g',
    },
    {
      stepNumber: '02',
      title: 'Custody Segregation & Bailment Agreement',
      badge: 'ACCREDITED DEPOSITORY',
      icon: Building2,
      color: 'from-rose-500 to-rose-700',
      tagline: 'Physical bullion stays protected in Brink’s & Loomis vaults under statutory trust.',
      details: [
        'Assay spectrometry verification (999.9 fineness) and physical bar serial assignment.',
        'Wyoming Statutory SPV Trust #01 & Virgin Islands international charter governance.',
        'The client retains direct, unencumbered legal beneficial ownership.'
      ],
      mockMetric: 'Vault: Brink’s Depository NY • Bar Lot #8849-B • Fiduciary Protected',
    },
    {
      stepNumber: '03',
      title: 'UCC Article 12 CER Holographic Deed Minting',
      badge: 'STATUTORY TITLE PERFECTION',
      icon: Award,
      color: 'from-emerald-400 to-emerald-600',
      tagline: 'Documented rights perfected as Controllable Electronic Records (CER).',
      details: [
        'Complete 6-document title bundle: Allocation Certificate, Assay, Custody, Invoice, Deed, Proof.',
        'Non-fungible cryptographic title deed binding holder identity directly to physical bar bailment.',
        'Perfected commercial security interest under uniform digital asset statutes.'
      ],
      mockMetric: 'CER Deed #CER-UCC12-WY-9941 • Legally Enforceable Title',
    },
    {
      stepNumber: '04',
      title: 'Multi-Chain Ledger Settlement & Velocity Gates',
      badge: 'XRPL & POLYGON ANCHOR',
      icon: Cpu,
      color: 'from-indigo-400 to-indigo-600',
      tagline: 'Atomic issuance on XRPL rails with BitGo 3-of-4 MPC multi-sig policy controls.',
      details: [
        'XAU_MG token issued to whitelisted customer wallet within strict velocity thresholds.',
        'Polygon master anchor contract 0x4E574939D460d284B5D990646D4aeaEF2D49Fa13.',
        'Automated fail-closed circuit breaker enforces daily proof-of-reserve solvency.'
      ],
      mockMetric: 'XRPL Tx: 4E574939... • Polygon Anchor Verified • Multi-Sig Signed',
    },
    {
      stepNumber: '05',
      title: 'Controlled Collateral Cycling & Liquidity Facility',
      badge: 'GOVERNED FINANCING',
      icon: Zap,
      color: 'from-amber-400 to-rose-500',
      tagline: 'Access measured liquidity while your verified gold stays safe in qualified custody.',
      details: [
        'Disciplined LTV ceiling (65% Max Safe LTV) and automated 80% liquidation buffers.',
        'Real-time valuation feeds via Chainlink bridge adapter with continuous revaluation checks.',
        'Flexible repayment or physical bar dispatch to your door via insured armored courier.'
      ],
      mockMetric: 'Available Liquidity: $37,125.00 USDC • Current LTV: 45% (Safe)',
    }
  ];

  // Auto-advance walkthrough steps every 5.5 seconds if auto-playing
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
      <div className="relative w-full max-w-3xl frosty-glass-panel rounded-3xl p-6 sm:p-10 border border-amber-500/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Top Glow & Close */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center text-black font-black text-xs shadow-md">
              𐌖
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-widest uppercase">
                UNYKORN Protocol Walkthrough
              </span>
              <span className="text-[10px] font-mono text-amber-400 block -mt-0.5">
                Automated Interactive Tour • Step {step.stepNumber} of 05
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors border border-white/[0.08]"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isAutoPlaying ? 'Auto-Advance' : 'Paused'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2 rounded-xl bg-white/[0.04] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Navigation Dots Bar */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${
                currentStep === idx
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-500/50'
                  : currentStep > idx
                  ? 'bg-amber-400/40'
                  : 'bg-white/[0.1]'
              }`}
            />
          ))}
        </div>

        {/* Main Step Content */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-black shrink-0 shadow-lg`}>
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-amber-300 uppercase tracking-wider mb-1.5">
                {step.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-300 font-sans mt-1">
                {step.tagline}
              </p>
            </div>
          </div>

          {/* Details Bullet List */}
          <div className="bg-[#070709]/80 p-5 rounded-2xl border border-white/[0.08] space-y-2.5 font-mono text-xs text-zinc-300">
            {step.details.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Live Mock Metric Pill */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">TELEMETRY STATE:</span>
            <span className="text-amber-300 font-bold">{step.mockMetric}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-6 mt-8 border-t border-white/[0.08]">
          <button
            onClick={() => {
              setCurrentStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
              setIsAutoPlaying(false);
            }}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-300 flex items-center gap-1.5 transition-colors border border-white/[0.08]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenAccess();
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Enter Reserve Platform</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentStep((prev) => (prev + 1) % steps.length);
                  setIsAutoPlaying(false);
                }}
                className="px-6 py-3 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

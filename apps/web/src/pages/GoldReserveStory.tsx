import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Layers,
  FileText,
  Lock,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Scale,
  Database,
  Key,
  Globe,
  Sliders,
  ExternalLink,
  Radio,
  Sparkles
} from 'lucide-react';
import { formatUSD } from '../utils/formatters';
import { FraudVerificationSection } from '../components/FraudVerificationSection';

interface GoldReserveStoryProps {
  onOpenAccess: () => void;
  onSwitchToPlatform: () => void;
}

export const GoldReserveStory: React.FC<GoldReserveStoryProps> = ({
  onOpenAccess,
  onSwitchToPlatform,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(65);
  const [activeVoiceStep, setActiveVoiceStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [goldWeightGrams, setGoldWeightGrams] = useState(1000); // 1kg default
  const [ltvPercent, setLtvPercent] = useState(45); // 45% conservative LTV
  const [selectedDoc, setSelectedDoc] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const spotGoldPerGram = 82.50; // $82.50/g ($2,566/oz)
  const collateralValue = goldWeightGrams * spotGoldPerGram;
  const availableLiquidity = collateralValue * (ltvPercent / 100);
  const maxSafeLtv = 65;
  const liquidationBuffer = 80;

  const scriptLines = [
    { start: 0, text: "This is gold ownership—reengineered for the digital era." },
    { start: 5, text: "You acquire a verified, weighted allocation of physical gold from an approved vault program." },
    { start: 12, text: "Every allocation is documented: weight, purity, custody, title records, and supporting papers—organized into one verifiable ownership package." },
    { start: 22, text: "UNYKORN then creates a secure digital representation of those documented asset rights. The physical metal does not need to move. It remains protected in custody while its verified record is anchored to the UNYKORN charter ledger." },
    { start: 35, text: "Your ownership stays clear. Your documentation stays connected. Your asset remains visible, verifiable, and ready when you need it." },
    { start: 43, text: "For qualified participants, verified holdings may support carefully managed liquidity or collateral programs through approved custody and financing pathways." },
    { start: 53, text: "Your position is monitored against defined collateral limits. As value changes, your dashboard shows the asset weight, verified records, available liquidity, and risk controls in real time." },
    { start: 63, text: "Gold stays allocated. Ownership stays documented. Liquidity becomes more accessible—under disciplined controls." },
    { start: 70, text: "UNYKORN Gold Reserve. Own the weight. Verify the record. Build with control." }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setAudioProgress((audio.currentTime / (audio.duration || 1)) * 100);

      // Highlight corresponding subtitle
      const cur = audio.currentTime;
      for (let i = scriptLines.length - 1; i >= 0; i--) {
        if (cur >= scriptLines[i].start) {
          setActiveVoiceStep(i);
          break;
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlayingAudio(false);
      setAudioProgress(0);
      setActiveVoiceStep(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio playback error:', e));
      setIsPlayingAudio(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const targetPercent = Number(e.target.value);
    const targetTime = ((audioRef.current.duration || duration) * targetPercent) / 100;
    audioRef.current.currentTime = targetTime;
    setAudioProgress(targetPercent);
  };

  const documentBundle = [
    {
      title: 'Allocation Certificate',
      code: 'CERT-LBMA-2026-9941',
      issuer: 'Brink’s Global Services / Depository Vault',
      spec: 'Fine Weight: 1,000.000 g • Bar Lot #8849-B • Purity 999.9',
      status: 'VERIFIED BAILMENT'
    },
    {
      title: 'Assay & Purity Record',
      code: 'ASSAY-LBMA-9999-FINE',
      issuer: 'Royal Canadian Mint / LBMA Good Delivery Standard',
      spec: 'Assay Fineness: 0.9999 Fine Gold • Non-Destructive Spectrometry',
      status: 'ASSAY PERFECTED'
    },
    {
      title: 'Custody Bailment Statement',
      code: 'CUST-WY-SPV-01-SEC',
      issuer: 'Wyoming Statutory SPV Trust #01',
      spec: 'Segregated Subpool Storage • Non-Fungible Physical Segregation',
      status: 'FIDUCIARY SEGREGATED'
    },
    {
      title: 'Acquisition & Invoice Record',
      code: 'INV-APMEX-WHOLESALE-772',
      issuer: 'APMEX Institutional Bullion Clearing Desk',
      spec: 'Settlement: BitGo USDC Wire • Spot Locked @ 60s TTL',
      status: 'PAID & EXECUTED'
    },
    {
      title: 'UCC Article 12 Title Deed',
      code: 'CER-UCC12-DEED-4401',
      issuer: 'Controllable Electronic Record (CER) Registry',
      spec: 'Exclusive Beneficial Ownership • Sovereign Control Holder',
      status: 'LEGAL TITLE PERFECTED'
    },
    {
      title: 'Charter Ledger Proof Receipt',
      code: 'XRPL-TX-5841555F4D47...',
      issuer: 'UNYKORN Immutable Charter Ledger (XRPL + Polygon)',
      spec: 'Ledger Sequence: #89,451,203 • ECDSA secp256k1 Signature',
      status: 'CRYPTOGRAPHIC ANCHOR'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-black">
      {/* Hidden Studio Audio Player */}
      <audio
        ref={audioRef}
        src="/media/unykorn-voiceover.mp3"
        preload="auto"
        muted={isMuted}
      />

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 p-0.5 bg-[#070709]">
              <img
                src="/brand/unykorn-logo-titanium.jpg"
                alt="UnyKorn Logo"
                className="w-full h-full object-cover rounded-[9px]"
              />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-[0.2em] text-white">
                UNYKORN
              </span>
              <span className="text-[10px] font-mono text-amber-400 block tracking-widest uppercase -mt-0.5">
                Gold Reserve • g.unykorn.ai
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSwitchToPlatform}
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-white/20 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Institutional OS</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </button>

            <button
              onClick={onOpenAccess}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
            >
              Request Access
            </button>
          </div>
        </div>
      </header>

      {/* Hero Cinematic Video Opening Reel */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
        {/* Full Screen Dali Liquid Gold Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter contrast-125 brightness-75 scale-105"
          >
            <source src="/media/unykorn-gold-reserve-hero.mp4" type="video/mp4" />
            <source src="/media/WhatsApp Video 2026-08-23 at 6.54.30 AM.mp4" type="video/mp4" />
          </video>
          {/* Black / Titanium 45-55% Overlay for maximum editorial clarity */}
          <div className="absolute inset-0 bg-[#070709]/55"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#070709] via-transparent to-[#070709]"></div>
        </div>

        {/* Deep Crimson Ambient Light Sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rose-600/15 blur-[180px] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Brand Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            UNYKORN GOLD RESERVE SPECIFICATION
          </div>

          {/* Master Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
            UNYKORN <span className="liquid-gold-text">GOLD RESERVE</span>
          </h1>

          <p className="text-xl sm:text-2xl font-light text-zinc-200 tracking-wide mb-4">
            Own the weight. Keep the custody. Access liquidity with control.
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Allocated physical gold. Complete documentation. Verifiable digital records. Eligibility-based collateral access.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="#cycle"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl"
            >
              <span>Explore the Gold Cycle</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenAccess}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.06] border border-white/20 hover:border-white/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all backdrop-blur-md"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Request Reserve Access</span>
            </button>
          </div>

          {/* Studio-Grade AI Voice-Over Player Bar */}
          <div className="institutional-panel p-5 rounded-2xl border border-amber-500/30 max-w-3xl mx-auto shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-left mb-3">
              <button
                onClick={toggleAudio}
                className="p-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110 transition-all shrink-0 shadow-lg flex items-center gap-2 font-bold text-xs uppercase font-mono"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlayingAudio ? 'Pause Studio Voice' : 'Play Studio Voice-Over'}</span>
              </button>

              <div className="flex-1 text-xs font-mono text-zinc-300 overflow-hidden w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                    Neural Studio Broadcast Track (HD Audio)
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {Math.floor(currentTime)}s / {Math.floor(duration)}s
                  </span>
                </div>
                <p className="text-zinc-100 text-xs italic font-sans font-medium line-clamp-1">
                  "{scriptLines[activeVoiceStep]?.text}"
                </p>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
            </div>

            {/* Audio Scrubber */}
            <div className="w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={audioProgress}
                onChange={handleSeek}
                className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Sequence */}
      <div id="cycle" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {/* Step 1: Weighted Ownership */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
              01 • WEIGHTED OWNERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              You buy the weight.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
              Your allocation begins with defined fine weight, documented quality, and an ownership record built for verification.
            </p>
            <div className="bg-[#0C0C12] p-5 rounded-2xl border border-white/[0.08] font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Standard Purity:</span>
                <span className="text-amber-400 font-bold">99.99% Fine Gold (LBMA Good Delivery)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Allocation Granularity:</span>
                <span className="text-white">1.000000 mg to 1,000.000 g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Custodial Status:</span>
                <span className="text-emerald-400">Allocated & Non-Fungible Segregated</span>
              </div>
            </div>
          </div>

          <div className="institutional-panel p-8 rounded-3xl border border-amber-500/20 text-center relative overflow-hidden">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-10 h-10" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono mb-1">
              1,000.000000 GRAMS
            </div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-4">
              FINE GOLD • LBMA CERTIFIED #8849-B
            </div>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Every milligram is backed 1:1 by LBMA Good Delivery bars stored in accredited vaults (Brink's / Loomis).
            </p>
          </div>
        </section>

        {/* Step 2: Documentation Binder */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
              02 • COMPREHENSIVE TITLE DOSSIER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Every paper. One record.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              Animate the following documents folding into a signed UNYKORN certificate vault: allocation, assay, custody, invoice, title, and ledger proof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {documentBundle.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDoc(idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedDoc === idx
                    ? 'bg-[#12121A] border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-[#0C0C12] border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[10px] font-mono">
                    <span className="text-amber-400 font-bold">{doc.status}</span>
                    <span className="text-zinc-400">{doc.code}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{doc.title}</h3>
                  <p className="text-xs text-zinc-400 font-mono mb-4">{doc.spec}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-zinc-400">
                  {doc.issuer}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: Mint and Ledger */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 institutional-panel p-8 rounded-3xl border border-white/[0.08] font-mono text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <span className="text-zinc-400">LEDGER ANCHOR</span>
              <span className="text-emerald-400 font-bold">ACTIVE DEED #CER-9941</span>
            </div>
            <div className="space-y-2 text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-400">Token Standard:</span>
                <span className="text-white">XRPL XAU_MG (Hex: 5841555F4D47...)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Contract Registry:</span>
                <span className="text-white">Polygon 0x4E574939...Fa13</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Bailment Law:</span>
                <span className="text-white">UCC Article 12 CER Perfection</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
              03 • DIGITAL REPRESENTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Documented asset rights become a verifiable digital record.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              The digital record reflects the documented rights and restrictions of the underlying allocation. It is not a substitute for the custody agreement, allocation record, or applicable legal terms.
            </p>
          </div>
        </section>

        {/* Step 4: Custody */}
        <section className="institutional-panel p-8 sm:p-12 rounded-3xl border border-white/[0.08] text-center max-w-4xl mx-auto">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
            04 • QUALIFIED CUSTODY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            The gold does not need to move.
          </h2>
          <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-8">
            The physical allocation remains within its designated custody arrangement while UNYKORN maintains a verifiable record of the associated asset documentation and permissions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-left">
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Vault Storage</span>
              <div className="font-bold text-white">Accredited Depository</div>
              <p className="text-zinc-400 text-[11px] mt-1">Brink's / Loomis allocated subpool vault.</p>
            </div>
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Beneficial Ownership</span>
              <div className="font-bold text-white">Client Retains Title</div>
              <p className="text-zinc-400 text-[11px] mt-1">Direct unencumbered property right.</p>
            </div>
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Attestation Frequency</span>
              <div className="font-bold text-white">24/7 Automated Invariant</div>
              <p className="text-zinc-400 text-[11px] mt-1">Zero fractional reserve circuit breaker.</p>
            </div>
          </div>
        </section>

        {/* Step 5: Controlled Liquidity (Controlled Collateral Cycling) */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-widest block mb-2">
              05 • CONTROLLED COLLATERAL CYCLING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Access liquidity without surrendering clarity.
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed">
              Leverage is requested—not assumed. Eligible financing is issued only within defined collateral limits, valuation thresholds, and program controls. The system monitors risk continuously and can limit new borrowing when buffers are reached.
            </p>
          </div>

          {/* Hard Guardrails Flow Loop Diagram */}
          <div className="institutional-panel p-6 sm:p-8 rounded-3xl border border-rose-500/20">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block text-center mb-6">
              COLLATERAL GOVERNANCE & RISK CYCLE
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-mono text-xs">
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">1. BASE</span>
                <span className="text-white font-bold text-xs">Allocated Gold</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">2. PROOF</span>
                <span className="text-white font-bold text-xs">Verified Papers</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">3. RECORD</span>
                <span className="text-white font-bold text-xs">Digital Asset</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">4. AUDIT</span>
                <span className="text-white font-bold text-xs">Eligibility</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">5. FACILITY</span>
                <span className="text-white font-bold text-xs">Collateral Desk</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-rose-500/30">
                <span className="text-rose-400 text-[9px] block">6. GUARD</span>
                <span className="text-rose-300 font-bold text-xs">LTV Monitor</span>
              </div>
              <div className="bg-[#070709] p-3 rounded-xl border border-white/[0.08]">
                <span className="text-zinc-400 text-[9px] block">7. REPAY</span>
                <span className="text-white font-bold text-xs">Reallocation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive 3-Module Console: Allocation Record, Charter Ledger, Liquidity Console */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-2">
              LIVE POSITION SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Interactive Reserve Position Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module 1: Allocation Record */}
            <div className="institutional-panel p-6 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-3">
                  MODULE 1 • ALLOCATION RECORD
                </span>
                <h3 className="text-lg font-bold text-white mb-4">
                  Fine Weight & Physical Lot
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="text-zinc-400 text-[11px] block mb-1">Select Weight (Grams):</label>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={goldWeightGrams}
                      onChange={(e) => setGoldWeightGrams(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between text-zinc-400 text-[10px] mt-1">
                      <span>100g</span>
                      <span className="text-amber-400 font-bold">{goldWeightGrams.toLocaleString()} g</span>
                      <span>10kg</span>
                    </div>
                  </div>

                  <div className="bg-[#070709] p-3.5 rounded-xl border border-white/[0.08] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Estimated Value:</span>
                      <span className="text-white font-bold">{formatUSD(collateralValue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Vault Location:</span>
                      <span className="text-zinc-300">Brink's Depository NY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Purity Standard:</span>
                      <span className="text-amber-400">999.9 Fine</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 2: Charter Ledger */}
            <div className="institutional-panel p-6 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block mb-3">
                  MODULE 2 • CHARTER LEDGER
                </span>
                <h3 className="text-lg font-bold text-white mb-4">
                  Deed & Attestation Anchors
                </h3>

                <div className="space-y-2.5 font-mono text-xs bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase block">Asset Token:</span>
                    <span className="text-zinc-200">XAU_MG ({goldWeightGrams * 1000} mg)</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase block">Signer Authority:</span>
                    <span className="text-emerald-400">BitGo 3-of-4 Multi-Sig</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase block">Transfer Restrictions:</span>
                    <span className="text-zinc-300">KYC/AML Whitelisted Only</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 text-[10px] uppercase block">Attestation Hash:</span>
                    <span className="text-amber-400 text-[10px] truncate block">0x4E57...Fa13</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Module 3: Liquidity Console */}
            <div className="institutional-panel p-6 rounded-3xl border border-rose-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block mb-3">
                  MODULE 3 • LIQUIDITY CONSOLE
                </span>
                <h3 className="text-lg font-bold text-white mb-4">
                  Controlled Collateral Facility
                </h3>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-zinc-400 text-[11px] block mb-1">Target LTV (%):</label>
                    <input
                      type="range"
                      min="10"
                      max="75"
                      step="5"
                      value={ltvPercent}
                      onChange={(e) => setLtvPercent(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] mt-1">
                      <span className="text-zinc-400">10%</span>
                      <span className={`font-bold ${ltvPercent > maxSafeLtv ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {ltvPercent}% LTV
                      </span>
                      <span className="text-zinc-400">75%</span>
                    </div>
                  </div>

                  <div className="bg-[#070709] p-3.5 rounded-xl border border-white/[0.08] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Available Liquidity:</span>
                      <span className="text-emerald-400 font-bold">{formatUSD(availableLiquidity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Max Safe Ceiling:</span>
                      <span className="text-white">65% LTV</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Risk Status:</span>
                      <span className={ltvPercent > maxSafeLtv ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {ltvPercent > maxSafeLtv ? 'BUFFER CAUTION' : 'CONSERVATIVE'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="institutional-panel p-12 rounded-3xl border border-amber-500/30 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
              ENTER THE RESERVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Gold ownership, built for motion.
            </h2>
            <p className="text-sm text-zinc-300 max-w-xl mx-auto mb-8 font-normal">
              Begin with a verified allocation. Enter the reserve network when eligible.
            </p>
            <button
              onClick={onOpenAccess}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-xl"
            >
              REQUEST RESERVE ACCESS
            </button>
          </div>
        </section>

        {/* Third-Party Due Diligence & Free $30 Client Pass */}
        <FraudVerificationSection />

        {/* Important Fiduciary Notice */}
        <footer className="pt-12 border-t border-white/[0.08] text-xs font-mono text-zinc-400 leading-relaxed space-y-3">
          <p>
            <strong className="text-zinc-300">Fiduciary & Risk Notice:</strong> Eligible holders may elect to use verified gold collateral within approved liquidity or financing programs. Any yield, financing, or return is separate from the bullion allocation and subject to program terms, counterparty risk, collateral requirements, and eligibility.
          </p>
          <p>
            Controlled collateral cycling operates under hard-coded LTV ceilings, automated revaluation triggers, required margin buffers, and automatic repayment rules. Physical metal remains bailment-segregated in accredited vault custody under Wyoming Statutory SPV Trust #01 and Virgin Islands international charter governance.
          </p>
        </footer>
      </div>
    </div>
  );
};

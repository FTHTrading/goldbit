import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Layers, ShieldCheck, Activity, Key, Globe, Shield, Play, Pause, Volume2, VolumeX, Radio, Zap } from 'lucide-react';

interface HeroSectionProps {
  onEnterNetwork: () => void;
  onViewInfrastructure: () => void;
  onStartWalkthrough?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterNetwork,
  onViewInfrastructure,
  onStartWalkthrough,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(65);
  const [activeVoiceStep, setActiveVoiceStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <div className="relative overflow-hidden pt-12 pb-28 lg:pt-20 lg:pb-36">
      {/* Hidden Studio Audio Player */}
      <audio
        ref={audioRef}
        src="/media/unykorn-voiceover.mp3"
        preload="auto"
        muted={isMuted}
      />

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

      {/* Crimson & Molten Gold Ambient Glow Core */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[420px] bg-gradient-to-r from-rose-600/10 via-amber-500/10 to-rose-600/10 blur-[180px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle Sovereign Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs font-mono tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            UNYKORN PROTOCOL SPECIFICATION v2.4
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-wider shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            DUAL CHARTER: VIRGIN ISLANDS & WYOMING
          </div>
        </div>

        {/* Master Heading with 3D Liquid-Gold & Glass Finish */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.06] mb-6 font-sans">
          Infrastructure for <br />
          <span className="liquid-gold-text">verifiable digital ownership.</span>
        </h1>

        {/* Institutional Description */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          Institutional-grade systems for weighted gold allocation, tokenized sovereign treasuries, identity-bound certificates, and interoperable multi-chain settlement.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onEnterNetwork}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 hover:brightness-110 transition-all shadow-xl shadow-amber-500/15"
          >
            <span>Enter Sales Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onStartWalkthrough && (
            <button
              onClick={onStartWalkthrough}
              className="w-full sm:w-auto px-8 py-4 rounded-xl frosty-glass-gold hover:border-amber-400/60 text-amber-300 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg"
            >
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Electric Protocol Tour</span>
            </button>
          )}

          <button
            onClick={onViewInfrastructure}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] border border-white/[0.12] hover:border-white/30 text-zinc-300 hover:text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all"
          >
            <Terminal className="w-4 h-4 text-zinc-400" />
            <span>Infrastructure Spec</span>
          </button>
        </div>

        {/* Studio-Grade Neural Broadcast Audio Player Bar */}
        <div className="frosty-glass-panel p-5 rounded-2xl border border-amber-500/30 max-w-3xl mx-auto shadow-2xl backdrop-blur-xl mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-left mb-3">
            <button
              onClick={toggleAudio}
              className="p-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black hover:brightness-110 transition-all shrink-0 shadow-lg flex items-center gap-2 font-bold text-xs uppercase font-mono"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Pause Studio Voice' : 'Play Institutional Voice-Over'}</span>
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

        {/* Restrained Proof Row */}
        <div className="pt-8 border-t border-white/[0.08] max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Weighted Gold Allocation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Sovereign US Treasuries Ingestion</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>UCC Article 12 CER Deeds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>Multi-Chain XRPL Settlement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

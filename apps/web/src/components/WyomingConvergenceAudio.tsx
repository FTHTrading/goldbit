import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Scale,
  Award,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface WyomingConvergenceAudioProps {
  onOpenTerminal?: () => void;
  onOpenCinematic?: () => void;
}

export const WyomingConvergenceAudio: React.FC<WyomingConvergenceAudioProps> = ({
  onOpenTerminal,
  onOpenCinematic,
}) => {
  const [selectedTrack, setSelectedTrack] = useState<'convergence' | 'reserve'>('convergence');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(115);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = {
    convergence: {
      title: 'The Wyoming Convergence: Who UNYKORN Is',
      category: 'TACTICAL AUDIO DOC • LEGAL FORTRESS & FINTECH DEEP-DIVE',
      src: '/media/unykorn-wyoming-convergence.mp3',
      estimatedDuration: 115,
      sections: [
        {
          start: 0,
          label: 'THE CONVERGENCE: WHY NOW?',
          text: 'For thousands of years, gold was the ultimate shield against the collapse of paper empires. But it lacked velocity. For fifteen years, blockchains promised digital freedom, but they lacked legal finality. In 2026, those two worlds collided. We are not living in the era of speculation anymore. We are living in the era of the Wyoming Convergence.'
        },
        {
          start: 22,
          label: 'THE LEGAL TRINITY: REWRITING THE RULES',
          text: 'How did we do it? We didn’t wait for the old system to catch up—we built on the most advanced commercial legal frameworks on Earth. First, Wyoming’s pioneer digital asset statutes recognized digital assets as direct personal property. Next, the landmark adoption of UCC Article 12 legally codified Controllable Electronic Records. When you hold a UNYKORN 3D deed, commercial law grants you the status of a Qualifying Purchaser—taking free of any competing claims. Finally, we satisfy the CFTC strict 28-day actual delivery rule under a true bailor-bailee relationship.'
        },
        {
          start: 58,
          label: 'THE INFRASTRUCTURE: TRUST THE MATH',
          text: 'We backed this legal fortress with a world-class technical stack. XRP Ledger Speed: instant settlement with whitelisted KYC trustlines. BitGo OCC Trust Security: multi-signature cold-storage. Chainlink Proof of Reserve: daily automated off-chain telemetry from Brink’s and Loomis written directly on-chain with decentralized circuit breakers. Zero fractional reserves. Period.'
        },
        {
          start: 92,
          label: 'WHAT UNYKORN REPRESENTS: THE NEW STANDARD',
          text: 'UNYKORN does not build toys. We build sovereign financial infrastructure. We represent the end of the counterparty risk era—the absolute fusion of physical weight and digital light. Stop renting your net worth from fractional banks. Own the asset. Control the code. UNYKORN: Sovereign asset ownership, engineered for the speed of light.'
        }
      ]
    },
    reserve: {
      title: 'UNYKORN Gold Reserve: Core Vision',
      category: 'EXECUTIVE OVERVIEW • WEIGHTED ALLOCATION & LIQUIDITY',
      src: '/media/unykorn-voiceover.mp3',
      estimatedDuration: 65,
      sections: [
        {
          start: 0,
          label: 'REENGINEERED GOLD OWNERSHIP',
          text: 'This is gold ownership—reengineered for the digital era. You acquire a verified, weighted allocation of physical gold from an approved vault program. Every allocation is documented: weight, purity, custody, title records, and supporting papers.'
        },
        {
          start: 22,
          label: 'DOCUMENTED RIGHTS & CHARTER LEDGER',
          text: 'UNYKORN creates a secure digital representation of those documented asset rights. The physical metal does not need to move. It remains protected in custody while its verified record is anchored to the UNYKORN charter ledger.'
        },
        {
          start: 45,
          label: 'DISCIPLINED COLLATERAL LIQUIDITY',
          text: 'For qualified participants, verified holdings may support carefully managed liquidity programs. Gold stays allocated. Ownership stays documented. Liquidity becomes accessible under disciplined controls. Own the weight. Verify the record. Build with control.'
        }
      ]
    }
  };

  const currentTrackData = tracks[selectedTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setAudioProgress((audio.currentTime / (audio.duration || 1)) * 100);

      const cur = audio.currentTime;
      for (let i = currentTrackData.sections.length - 1; i >= 0; i--) {
        if (cur >= currentTrackData.sections[i].start) {
          setActiveSectionIdx(i);
          break;
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      setActiveSectionIdx(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [selectedTrack, currentTrackData]);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log('Playback error:', e));
      setIsPlaying(true);
    }
  };

  const switchTrack = (trackKey: 'convergence' | 'reserve') => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedTrack(trackKey);
    setIsPlaying(false);
    setAudioProgress(0);
    setCurrentTime(0);
    setActiveSectionIdx(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const targetPercent = Number(e.target.value);
    const targetTime = ((audioRef.current.duration || duration) * targetPercent) / 100;
    audioRef.current.currentTime = targetTime;
    setAudioProgress(targetPercent);
  };

  const seekToSection = (startTime: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = startTime;
    if (!isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section id="audio-doc" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrackData.src}
        preload="auto"
        muted={isMuted}
      />

      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-3 shadow-sm">
          <Radio className="w-3.5 h-3.5 animate-pulse" /> UNYKORN Audio Studio Broadcast
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Wyoming Convergence <span className="crimson-text-gradient">• Who UNYKORN Is</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-sans">
          A tactical, legally bulletproof deep-dive into the legal trinity, physical bailment, XRPL rails, and why UNYKORN is the sovereign standard.
        </p>
      </div>

      {/* Master Audio Console Card */}
      <div className="frosty-glass-panel rounded-3xl p-6 sm:p-10 border border-rose-500/30 shadow-2xl relative overflow-hidden mb-12">
        {/* Track Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.1]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => switchTrack('convergence')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                selectedTrack === 'convergence'
                  ? 'bg-gradient-to-r from-rose-500 to-rose-700 text-white font-extrabold shadow-lg'
                  : 'bg-[#070709] text-zinc-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Track 01: The Wyoming Convergence (Deep-Dive)</span>
            </button>

            <button
              onClick={() => switchTrack('reserve')}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                selectedTrack === 'reserve'
                  ? 'bg-gradient-to-r from-amber-300 to-amber-500 text-black font-extrabold shadow-lg'
                  : 'bg-[#070709] text-zinc-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Track 02: Gold Reserve Vision</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>STUDIO MASTER BROADCAST • HD 320KBPS</span>
          </div>
        </div>

        {/* Player Bar & Controls */}
        <div className="bg-[#070709]/90 p-6 rounded-2xl border border-white/[0.1] shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
            <button
              onClick={togglePlayback}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-rose-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-rose-500/20 shrink-0"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white ml-0.5" />}
            </button>

            <div className="flex-1 w-full overflow-hidden">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block mb-1">
                {currentTrackData.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                {currentTrackData.title}
              </h3>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mt-1">
                <span className="text-zinc-300">
                  {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
                </span>
                <span className="text-amber-400 font-bold">
                  {currentTrackData.sections[activeSectionIdx]?.label}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-amber-400" />}
            </button>
          </div>

          {/* Timeline Scrubber */}
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={audioProgress}
              onChange={handleSeek}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>

        {/* Interactive Chapters / Transcript Sections */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
            Interactive Chapter Jump & Live Transcript:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTrackData.sections.map((sec, idx) => (
              <div
                key={idx}
                onClick={() => seekToSection(sec.start)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeSectionIdx === idx
                    ? 'bg-[#151522] border-rose-500/80 shadow-lg shadow-rose-500/10'
                    : 'bg-[#070709]/80 border-white/[0.08] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-[10px] font-mono">
                    <span className={activeSectionIdx === idx ? 'text-rose-400 font-bold' : 'text-zinc-400'}>
                      CHAPTER {idx + 1}
                    </span>
                    <span className="text-zinc-400">{sec.start}s</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-2 font-mono">{sec.label}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans line-clamp-3">
                    "{sec.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Key Architectural Pillars from the Promo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="frosty-glass-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
            <Scale className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">Digital Property Statutes</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Wyoming SF0125 & HB0043 recognize digital assets as direct personal property held off-balance-sheet.
          </p>
        </div>

        <div className="frosty-glass-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">UCC Article 12 CER</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Qualifying Purchaser status takes free of competing property claims with cryptographic control perfection.
          </p>
        </div>

        <div className="frosty-glass-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">CFTC 28-Day Actual Bailment</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Immediate physical allocation into Brink's/Loomis vaults fully insulated from commercial insolvency.
          </p>
        </div>

        <div className="frosty-glass-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1.5">XRPL & BitGo OCC Trust</h4>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Instant KYC-cleared trustlines with automated Chainlink daily PoR circuit breakers.
          </p>
        </div>
      </div>
    </section>
  );
};

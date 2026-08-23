import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  ShieldCheck,
  Scale,
  Sparkles,
  ExternalLink,
  Clock,
  Download,
  Flame,
  Film
} from 'lucide-react';

export const LegalBlogSection: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(720); // ~12 mins
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration) setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlayingAudio(false);
      setProgress(0);
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

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch((e) => console.log('Audio error:', e));
      setIsPlayingAudio(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const targetPercent = Number(e.target.value);
    const targetTime = ((audioRef.current.duration || duration) * targetPercent) / 100;
    audioRef.current.currentTime = targetTime;
    setProgress(targetPercent);
  };

  const blogPosts = [
    {
      date: 'AUG 2026',
      readTime: '8 MIN READ',
      tag: 'WYOMING BAILMENT',
      title: 'How Wyoming Bailment Law Shields Physical Gold from Operating Insolvency',
      summary: 'A definitive breakdown of 11 U.S.C. § 541, bailor-bailee trust relations, and why Unykorn Club gold is legally classified as non-estate property under Wyoming Statutory SPV Trust #01.',
      audioTrackAvailable: true,
    },
    {
      date: 'JUL 2026',
      readTime: '6 MIN READ',
      tag: 'UCC ARTICLE 12',
      title: 'Controllable Electronic Records (CERs): Perfecting Super-Priority Title',
      summary: 'Why control of private cryptographic keys legally replaces traditional paper bills of lading, granting the token holder Qualifying Purchaser immunity against competing creditor liens.',
      audioTrackAvailable: false,
    },
    {
      date: 'JUN 2026',
      readTime: '5 MIN READ',
      tag: 'CFTC COMPLIANCE',
      title: 'Satisfying the CFTC 28-Day Actual Delivery Rule in Spot Commodity Tokenization',
      summary: 'How Unykorn executes immediate spot bullion acquisition and vault subpool allocation into Brink’s/Loomis depositories, eliminating synthetic commodity classification.',
      audioTrackAvailable: false,
    }
  ];

  return (
    <section id="legal-blog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/media/wyoming-bailment-law.mp3"
        preload="metadata"
        muted={isMuted}
      />

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" /> UNYKORN RESEARCH DISPATCH & LEGAL BLOG
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Wyoming Bailment Law <span className="liquid-gold-text">& Sovereign Research</span>
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-3xl font-sans">
          In-depth legal briefs, fiduciary podcast audio lectures, and architectural papers on asset-backed commercial law.
        </p>
      </div>

      {/* Featured Master Podcast Card: Wyoming Bailment Law */}
      <div className="frosty-glass-gold p-6 sm:p-10 rounded-3xl border border-amber-500/40 shadow-2xl relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Cyber Vault Video Reel */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/[0.12] bg-[#070709] relative shadow-xl group">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 object-cover filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-500"
            >
              <source src="/media/grok-cyber-vault.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Film className="w-3.5 h-3.5" /> CYBER VAULT ENCLAVE
              </span>
              <span className="text-zinc-400">TELEMETRY SECURE</span>
            </div>
          </div>

          {/* Right Column: Audio Brief Player */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-extrabold uppercase tracking-wider">
                FEATURED AUDIO BRIEF
              </span>
              <span className="text-zinc-400 flex items-center gap-1">
                <Headphones className="w-3.5 h-3.5 text-amber-400" /> MASTERCLASS AUDIO LECTURE
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Wyoming Bailment Law for Unykorn Club Gold
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Listen to the comprehensive legal breakdown detailing why Unykorn Club’s physical gold bailment is insulated from bankruptcy estates under 11 U.S.C. § 541, eliminating all counterparty credit risk.
            </p>

            {/* Audio Control Bar */}
            <div className="bg-[#070709]/90 p-5 rounded-2xl border border-white/[0.1] shadow-xl space-y-3 font-mono">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-amber-500/20 shrink-0 font-bold"
                >
                  {isPlayingAudio ? <Pause className="w-6 h-6 fill-black" /> : <Play className="w-6 h-6 fill-black ml-0.5" />}
                </button>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-amber-300 font-bold truncate">
                      {isPlayingAudio ? 'Playing Wyoming Bailment Masterclass...' : 'Listen to 12-Min Legal Breakdown'}
                    </span>
                    <span className="text-zinc-400 shrink-0">
                      {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-white/[0.06] text-zinc-300 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Legal Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.title}
            className="frosty-glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-amber-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4 text-[10px] font-mono">
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-amber-300 font-bold uppercase">
                  {post.tag}
                </span>
                <span className="text-zinc-400">{post.readTime}</span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors mb-2.5">
                {post.title}
              </h4>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-300">
              <span className="text-[11px] text-zinc-400">{post.date}</span>
              <span className="text-amber-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                Read Brief <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

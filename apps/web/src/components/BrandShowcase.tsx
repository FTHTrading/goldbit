import React, { useState, useRef } from 'react';
import { Sparkles, Shield, Globe, Award, Zap, Layers, Play, Pause, Volume2, VolumeX, Flame } from 'lucide-react';

export const BrandShowcase: React.FC = () => {
  const [video1Playing, setVideo1Playing] = useState(true);
  const [video1Muted, setVideo1Muted] = useState(true);
  const [video2Playing, setVideo2Playing] = useState(true);
  const [video2Muted, setVideo2Muted] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const toggleVideo1 = () => {
    if (!video1Ref.current) return;
    if (video1Playing) {
      video1Ref.current.pause();
      setVideo1Playing(false);
    } else {
      video1Ref.current.play();
      setVideo1Playing(true);
    }
  };

  const toggleVideo2 = () => {
    if (!video2Ref.current) return;
    if (video2Playing) {
      video2Ref.current.pause();
      setVideo2Playing(false);
    } else {
      video2Ref.current.play();
      setVideo2Playing(true);
    }
  };

  return (
    <section id="identity" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Flame className="w-3.5 h-3.5" /> Sovereign Power & Regional Divisions
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Elite Titanium Core & <span className="crimson-text-gradient">Down South Sovereign Force</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl font-sans">
          Engineered for raw sovereign energy, high-velocity asset rails, and multi-jurisdictional athletic namespace governance.
        </p>
      </div>

      {/* Badass Dual Video Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Video 1: Sovereign Titanium Core */}
        <div className="institutional-panel rounded-3xl border border-white/[0.1] overflow-hidden group relative flex flex-col justify-between">
          <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
            <video
              ref={video1Ref}
              src="/media/WhatsApp Video 2026-08-23 at 4.03.01 AM.mp4"
              autoPlay
              loop
              muted={video1Muted}
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C12] via-transparent to-black/30 pointer-events-none"></div>

            {/* Video Controls Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-rose-500/30 text-[10px] font-mono text-rose-300 uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                TITANIUM CORE REEL
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={toggleVideo1}
                className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 transition-colors shadow-lg"
                title={video1Playing ? 'Pause' : 'Play'}
              >
                {video1Playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideo1Muted(!video1Muted)}
                className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 transition-colors shadow-lg"
                title={video1Muted ? 'Unmute' : 'Mute'}
              >
                {video1Muted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-rose-400" />}
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
              Sovereign UnyKorn Titanium Protocol Core
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Raw, uncompromising liquid-metal and titanium architecture powering autonomous non-custodial asset registries and UCC Article 12 title perfection.
            </p>
          </div>
        </div>

        {/* Video 2: Down South Teams & Sovereign Force */}
        <div className="institutional-panel rounded-3xl border border-white/[0.1] overflow-hidden group relative flex flex-col justify-between">
          <div className="relative aspect-[16/10] w-full bg-black overflow-hidden">
            <video
              ref={video2Ref}
              src="/media/C_Users_Kevan_OneDrive_FTH (1).mp4"
              autoPlay
              loop
              muted={video2Muted}
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C12] via-transparent to-black/30 pointer-events-none"></div>

            {/* Video Controls Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-[10px] font-mono text-amber-300 uppercase font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                DOWN SOUTH SOVEREIGN DIVISION
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={toggleVideo2}
                className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 transition-colors shadow-lg"
                title={video2Playing ? 'Pause' : 'Play'}
              >
                {video2Playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setVideo2Muted(!video2Muted)}
                className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/20 transition-colors shadow-lg"
                title={video2Muted ? 'Unmute' : 'Mute'}
              >
                {video2Muted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              Southern Regional Force & Athlete Namespaces
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Representing our down-south division, 60 collegiate & professional athlete generational trust namespaces, and 8 CWS team suffix anchors under sovereign management.
            </p>
          </div>
        </div>
      </div>

      {/* Dual Charter SPV & Clean Energy Synergy */}
      <div className="institutional-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
            <Globe className="w-4 h-4" />
            <span>DUAL-CHARTER INSTITUTIONAL SPV</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Virgin Islands & Wyoming Legal Architecture
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
            UnyKorn unites a Virgin Islands international asset SPV for global multi-currency clearing with a Wyoming Statutory SPV Trust for UCC Article 12 bailment perfection.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Virgin Islands</span>
              <div className="text-sm font-bold text-white">Global Asset SPV</div>
              <p className="text-[11px] text-zinc-400 mt-1">Cross-border settlement & trust parity.</p>
            </div>
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Wyoming LLC</span>
              <div className="text-sm font-bold text-white">Statutory SPV Trust</div>
              <p className="text-[11px] text-zinc-400 mt-1">UCC Article 12 CER title perfection.</p>
            </div>
          </div>
        </div>

        {/* 3D Brand Mark & Gear Showcase */}
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setActiveImage('/brand/unykorn-avatar-3d.jpg')}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#070709] cursor-pointer hover:border-rose-500/50 transition-colors"
          >
            <img
              src="/brand/unykorn-avatar-3d.jpg"
              alt="Titanium UnyKorn"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <span className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-300 uppercase font-bold">
              Titanium Avatar
            </span>
          </div>

          <div
            onClick={() => setActiveImage('/brand/unykorn-gear-elite.jpg')}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1] bg-[#070709] cursor-pointer hover:border-amber-500/50 transition-colors"
          >
            <img
              src="/brand/unykorn-gear-elite.jpg"
              alt="Elite Operator Gear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <span className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-300 uppercase font-bold">
              Operator Gear
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
        >
          <div className="max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 bg-[#0C0C12] p-2">
            <img
              src={activeImage}
              alt="Preview"
              className="w-full h-full object-contain rounded-xl max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
};

import React, { useState } from 'react';
import { Play, Sparkles, Flame, Eye, Film } from 'lucide-react';
import { VideoModalPlayer } from './VideoModalPlayer';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  tag: string;
}

const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'v1',
    title: 'The Micro-Gold Revolution',
    category: 'Gold Rails',
    src: '/media/WhatsApp Video 2026-08-23 at 7.10.42 AM.mp4',
    description: 'How Unykorn fractionalizes LBMA 99.99% fine gold bars into milligram CER units on XRPL.',
    tag: 'Trending 🔥',
  },
  {
    id: 'v2',
    title: 'Brink’s & Loomis Vault Audit',
    category: 'Vault Security',
    src: '/media/33WhatsApp Video 2026-08-23 at 7.25.36 AM.mp4',
    description: 'Direct footage of segregated bullion subpools and automated assay telemetry.',
    tag: 'Verified 🛡️',
  },
  {
    id: 'v3',
    title: 'BitGo Enterprise Signer Policy',
    category: 'Institutional Rails',
    src: '/media/2WhatsApp Video 2026-08-23 at 7.25.36 AM.mp4',
    description: 'Multi-party custody and instant USDC settlement with zero reserve slippage.',
    tag: 'Policy ⚡',
  },
  {
    id: 'v4',
    title: 'Physical Stacking & Courier Pick-Up',
    category: 'Delivery',
    src: '/media/WhatsApp Video 2026-08-23 at 7.31.29 AM.mp4',
    description: 'From digital XRPL micro-lines to certified 10g LBMA bar home delivery.',
    tag: 'Redemption 📦',
  },
  {
    id: 'v5',
    title: 'Sovereign Controllable Electronic Records',
    category: 'UCC Article 12',
    src: '/media/W2hatsApp Video 2026-08-23 at 7.31.29 AM.mp4',
    description: 'Controllable Electronic Record (CER) legal perfection under Wyoming SPV Trust.',
    tag: 'Legal CER 📜',
  },
  {
    id: 'v6',
    title: 'Unykorn Pure Gold Vision',
    category: 'Ecosystem',
    src: '/media/unykorn gold.mp4',
    description: 'The global standard for decentralized, non-fractional reserve micro-wealth.',
    tag: 'Featured 💎',
  },
];

export const VideoReelsGrid: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  return (
    <div id="reels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase mb-3">
          <Film className="w-3.5 h-3.5" /> Media & High-Energy Vault Stories
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Watch The <span className="gold-text-gradient">GoldBit Experience</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl mx-auto">
          Explore real-world vault allocations, BitGo multi-sig signing, and physical gold redemption journeys.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_VIDEOS.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="group relative glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-400 transition-all cursor-pointer gold-glow-hover flex flex-col"
          >
            {/* Video Thumbnail / Preview Loop */}
            <div className="relative aspect-[16/10] bg-black overflow-hidden">
              <video
                src={vid.src}
                muted
                loop
                playsInline
                onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLVideoElement;
                  el.pause();
                  el.currentTime = 0;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent"></div>

              {/* Tag Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-obsidian-950/80 border border-gold-500/30 text-[11px] font-bold text-gold-300">
                {vid.tag}
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gold-400/90 text-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/40">
                  <Play className="w-5 h-5 ml-1 fill-black" />
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-gold-400/80 uppercase font-semibold">
                  {vid.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors mt-0.5 mb-2">
                  {vid.title}
                </h3>
                <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                  {vid.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs text-gold-400 font-semibold">
                <span>Play High-Res Video</span>
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Player */}
      <VideoModalPlayer
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

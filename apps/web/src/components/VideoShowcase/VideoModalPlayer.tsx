import React from 'react';
import { X, Play, Volume2, Sparkles, ExternalLink } from 'lucide-react';

interface VideoModalPlayerProps {
  video: {
    src: string;
    title: string;
    description: string;
    category: string;
  } | null;
  onClose: () => void;
}

export const VideoModalPlayer: React.FC<VideoModalPlayerProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-obsidian-950 border border-gold-500/40 rounded-3xl overflow-hidden gold-glow-lg animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-zinc-300 hover:text-white p-2.5 rounded-full bg-obsidian-900/80 hover:bg-obsidian-800 transition-colors border border-gold-500/20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <video
            src={video.src}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Metadata Footer */}
        <div className="p-6 bg-obsidian-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold uppercase mb-1">
              <Sparkles className="w-3 h-3 text-gold-400" /> {video.category}
            </div>
            <h3 className="text-xl font-bold text-white">{video.title}</h3>
            <p className="text-zinc-400 text-xs mt-1">{video.description}</p>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-black font-extrabold text-xs hover:brightness-110 transition-all shadow-md shrink-0"
          >
            Buy Gold Now
          </button>
        </div>
      </div>
    </div>
  );
};

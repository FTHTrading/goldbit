import React, { useState } from 'react';
import { Sparkles, Shield, Globe, Award, Zap, Layers, ArrowUpRight } from 'lucide-react';

export const BrandShowcase: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const brandArtifacts = [
    {
      title: 'Gunmetal Titanium Sovereign Avatar',
      category: '3D SCULPTED IDENTITY',
      image: '/brand/unykorn-avatar-3d.jpg',
      desc: 'Layered matte-graphite dragon scales sculpted from gunmetal titanium, symbolizing unyielding non-custodial cryptographic sovereignty.',
    },
    {
      title: '5D Multi-Dimensional Protocol Schema',
      category: 'SYSTEM ARCHITECTURE',
      image: '/brand/unykorn-brand-5d.jpg',
      desc: 'Conceptual 5D hyper-framework mapping sovereign namespaces, token bound accounts, and physical custody rails across state boundaries.',
    },
    {
      title: 'Elite Operational Grade Gear',
      category: 'INSTITUTIONAL APPAREL',
      image: '/brand/unykorn-gear-elite.jpg',
      desc: 'Professional-grade, ultra-modern UnyKorn gear engineered for enterprise operators and fiduciary executives.',
    },
  ];

  const energyGrid = [
    { title: 'Sovereign Microgrid v1', img: '/brand/unykorn-energy-1.jpeg' },
    { title: 'Hyperscale Generation v2', img: '/brand/unykorn-energy-2.jpeg' },
    { title: 'Sustainable Compute v3', img: '/brand/unykorn-energy-3.jpeg' },
    { title: 'Megawatt Infrastructure v4', img: '/brand/unykorn-energy-4.jpeg' },
    { title: 'Zero-Carbon Power v5', img: '/brand/unykorn-energy-5.jpeg' },
    { title: 'Modular Energy Cell v6', img: '/brand/unykorn-energy-6.jpeg' },
  ];

  return (
    <section id="identity" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Sovereign Identity & Dual-Charter Foundation
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          3D Titanium Mark & <span className="liquid-metal-text">Sovereign Energy Grid</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Anchored under dual institutional charters in the Virgin Islands and Wyoming, uniting sovereign AI architecture with physical clean-energy infrastructure.
        </p>
      </div>

      {/* 3D Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {brandArtifacts.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(item.image)}
            className="institutional-panel rounded-3xl border border-white/[0.08] overflow-hidden group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#070709]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C12] via-transparent to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-300 uppercase">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dual Charter & Sovereign Infrastructure Panel */}
      <div className="institutional-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-2">
            <Globe className="w-4 h-4" />
            <span>GLOBAL JURISDICTIONAL FOOTPRINT</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            Virgin Islands & Wyoming Dual-Charter SPV
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-sans">
            UnyKorn combines a specialized Virgin Islands institutional charter for cross-border digital asset orchestration with a Wyoming Statutory SPV Trust for UCC Article 12 physical title perfection.
          </p>

          <div className="grid grid-cols-2 gap-4 font-mono text-xs">
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Virgin Islands</span>
              <div className="text-sm font-bold text-white">Global Asset SPV</div>
              <p className="text-[11px] text-zinc-400 mt-1">Cross-border settlement & international trust parity.</p>
            </div>
            <div className="bg-[#070709] p-4 rounded-xl border border-white/[0.08]">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1">Wyoming LLC</span>
              <div className="text-sm font-bold text-white">Statutory SPV Trust</div>
              <p className="text-[11px] text-zinc-400 mt-1">UCC Article 12 CER legal title perfection.</p>
            </div>
          </div>
        </div>

        {/* Clean Energy Grid Thumbnails */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-400 uppercase">
              Unykorn Clean Energy & Microgrid Units
            </span>
            <span className="text-xs font-mono text-emerald-400">Zero-Emission</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {energyGrid.map((e, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(e.img)}
                className="group relative aspect-square rounded-xl overflow-hidden border border-white/[0.1] bg-[#070709] cursor-pointer hover:border-rose-500/50 transition-colors"
              >
                <img
                  src={e.img}
                  alt={e.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
              </div>
            ))}
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

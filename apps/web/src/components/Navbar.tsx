import React, { useState } from 'react';
import { Shield, Activity, Terminal, ArrowUpRight, Menu, X, Lock, Radio } from 'lucide-react';

interface NavbarProps {
  onOpenAccess: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccess, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Terminal', href: '#terminal' },
    { label: 'Audio Doc', href: '#audio-doc' },
    { label: 'Blueprint', href: '#unykorn-club' },
    { label: 'Blog & Law', href: '#legal-blog' },
    { label: 'Fraud Audit', href: '#fraud-verification' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Vaults', href: '#vaults' },
    { label: 'Verify', href: '#verify' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Master Brand with Real Gunmetal Titanium UnyKorn Mark */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 group-hover:border-rose-500/50 transition-colors shadow-lg bg-[#070709] p-0.5">
              <img
                src="/brand/unykorn-logo-titanium.jpg"
                alt="UnyKorn Official Sovereign Mark"
                className="w-full h-full object-cover rounded-[9px] group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-[0.2em] text-white">
                UNYKORN
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-0.5">
                Institutional OS • VI & WY
              </span>
            </div>
          </a>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center gap-5 text-xs font-medium tracking-wider text-zinc-400 uppercase">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-white transition-colors flex items-center gap-1 group py-1"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Side: Network Status & Access Platform */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] text-zinc-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span>DUAL CHARTER • VI / WY</span>
            </div>

            <button
              onClick={onOpenAccess}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-sm hover:shadow-rose-500/10"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Access Platform</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-2 rounded-lg"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0C0C12] border-b border-white/[0.08] px-6 py-6 space-y-4 text-sm font-mono">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-zinc-300 hover:text-white uppercase tracking-wider"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenAccess();
            }}
            className="w-full mt-4 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" /> Access Platform
          </button>
        </div>
      )}
    </nav>
  );
};

import React, { useState } from 'react';
import { Shield, Activity, Terminal, ArrowUpRight, Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAccess: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccess, activeSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Infrastructure', href: '#infrastructure' },
    { label: 'Vaults', href: '#vaults' },
    { label: 'Reserve', href: '#reserve' },
    { label: 'Verify', href: '#verify' },
    { label: 'Rail', href: '#rail' },
    { label: 'Network', href: '#network' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Master Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/90 via-zinc-400 to-rose-600 p-[1px] shadow-sm">
              <div className="w-full h-full bg-[#070709] rounded-[7px] flex items-center justify-center">
                <span className="font-mono font-black text-sm text-white group-hover:text-rose-400 transition-colors">
                  𐌖
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-[0.2em] text-white">
                UNYKORN
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase -mt-0.5">
                Institutional OS
              </span>
            </div>
          </a>

          {/* Center Quiet Navigation */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wider text-zinc-400 uppercase">
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
              <span>MAINNET • OPERATIONAL</span>
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

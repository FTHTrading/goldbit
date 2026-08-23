import React, { useState } from 'react';
import { ShieldCheck, Coins, Sparkles, ExternalLink, Wallet, Activity } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';
import { truncateAddress } from '../utils/formatters';

interface NavbarProps {
  onOpenQuoter: () => void;
  walletAddress: string;
  onConnectWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuoter,
  walletAddress,
  onConnectWallet,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-obsidian-950/80 backdrop-blur-xl border-b border-gold-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold-300 via-gold-500 to-amber-700 p-0.5 shadow-lg shadow-gold-500/20">
              <div className="w-full h-full bg-obsidian-950 rounded-[10px] flex items-center justify-center">
                <Coins className="w-6 h-6 text-gold-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-wider text-white">
                  GOLD<span className="gold-text-gradient">BIT</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  XRPL RAILS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">by UNYKORN • LBMA 99.99% FINE</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            <a href="#quoter" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-400" /> Buy Gold
            </a>
            <a href="#reels" className="hover:text-gold-400 transition-colors">
              Video Showcase
            </a>
            <a href="#reserves" className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Proof of Reserves
            </a>
            <a href="#certificate" className="hover:text-gold-400 transition-colors">
              CER Certificate
            </a>
            <a href="#vault" className="hover:text-gold-400 transition-colors">
              Vault Delivery
            </a>
          </div>

          {/* Live Spot Price Badge & Wallet Button */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-900 border border-gold-500/20 font-mono text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              <span className="text-zinc-400">GOLD SPOT:</span>
              <span className="text-gold-400 font-bold">$85.50/g</span>
            </div>

            <button
              onClick={onConnectWallet}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-obsidian-900 border border-gold-500/30 hover:border-gold-400 text-gold-300 font-semibold text-xs transition-all shadow-sm"
            >
              <Wallet className="w-3.5 h-3.5 text-gold-400" />
              {walletAddress ? truncateAddress(walletAddress) : 'Connect XRPL'}
            </button>

            <button
              onClick={onOpenQuoter}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 text-black font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-gold-500/25 gold-shimmer-sweep"
            >
              Get Gold ($10+)
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

import React from 'react';
import { Shield, Lock, Coins, ExternalLink, Heart } from 'lucide-react';
import { APP_CONFIG } from '../config/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian-950 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400">
                <Coins className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-wider">
                GOLDBIT<span className="gold-text-gradient">.UNYKORN.AI</span>
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              GoldBit is the institutional-grade micro-gold allocation and Controllable Electronic Record (CER) issuing rail operated by Unykorn LLC. 100% backed by LBMA 99.99% fine gold in Brink's & Loomis vaults, settled atomically on the XRPL with BitGo policy safeguards.
            </p>
          </div>

          {/* Institutional Rails */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 font-mono">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>XRPL Cold Issuer: rJLMST...qN3FQ</li>
              <li>Depository: Brink's Salt Lake</li>
              <li>Settlement: BitGo Enterprise</li>
              <li>Oracle: Chainlink PoR Bridge</li>
            </ul>
          </div>

          {/* Legal Trust */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 font-mono">
              Legal & Perfection
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>Wyoming SPV Statutory Trust</li>
              <li>UCC Article 12 CER Perfection</li>
              <li>Segregated Subpool Storage</li>
              <li>LBMA Good Delivery Standard</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} UnyKorn LLC (Wyoming, USA). All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>LEI: 9845001234ABCDEF</span>
            <span>MIC: UBEC</span>
            <span>XRPL Currency: XAU_MG</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

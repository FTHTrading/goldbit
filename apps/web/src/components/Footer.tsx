import React from 'react';
import { Shield, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#070709] border-t border-white/[0.08] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/brand/unykorn-logo-titanium.jpg"
                alt="UnyKorn Logo"
                className="w-7 h-7 rounded-lg object-cover border border-white/20"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-extrabold text-xl text-white tracking-[0.2em]">
                UNYKORN
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md font-sans">
              UnyKorn LLC is an institutional digital-asset infrastructure provider operating under dual charters in the Virgin Islands and Wyoming, engineering verifiable digital ownership, programmable smart-account vaults, and asset-backed settlement rails under UCC Article 12 statutory perfection.
            </p>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 font-mono">
              Systems
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li><a href="#reserve" className="hover:text-white transition-colors">UNYKORN Reserve</a></li>
              <li><a href="#vaults" className="hover:text-white transition-colors">UNYKORN Vault (ERC-6551)</a></li>
              <li><a href="#rail" className="hover:text-white transition-colors">UNYKORN Rail (XRPL/EVM)</a></li>
              <li><a href="#verify" className="hover:text-white transition-colors">UNYKORN Verify</a></li>
              <li><a href="#identity" className="hover:text-white transition-colors">3D Brand & Energy Grid</a></li>
              <li><a href="#network" className="hover:text-white transition-colors">Network Telemetry</a></li>
            </ul>
          </div>

          {/* Legal & Dual Charter */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 font-mono">
              Charters & Standards
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono text-[11px]">
              <li>Dual Charter: Virgin Islands & Wyoming, USA</li>
              <li>Filing: July 1, 2026 • EIN: 42-3536633</li>
              <li>GLEIF LEI: 9845001234ABCDEF</li>
              <li>ISO MIC: UBEC</li>
              <li>Wyoming Statutory SPV Trust #01</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} UnyKorn LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Virgin Islands SPV</span>
            <span>Wyoming UCC Article 12 CER</span>
            <span>LBMA 99.99% Assay Benchmark</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

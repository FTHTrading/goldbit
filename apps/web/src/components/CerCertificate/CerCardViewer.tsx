import React from 'react';
import { Award, ShieldCheck, Download, ExternalLink, QrCode, Lock, CheckCircle2 } from 'lucide-react';
import { truncateAddress } from '../../utils/formatters';
import { APP_CONFIG } from '../../config/constants';

interface CerCardViewerProps {
  ownerAddress?: string;
  weightMg?: number;
}

export const CerCardViewer: React.FC<CerCardViewerProps> = ({
  ownerAddress = 'rCustomerTestAccount1234567890',
  weightMg = 1160.90,
}) => {
  return (
    <div id="certificate" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase mb-3">
          <Award className="w-3.5 h-3.5" /> Uniform Commercial Code (UCC) Article 12
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Controllable Electronic Record <span className="gold-text-gradient">(CER)</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-xl mx-auto">
          Your unencumbered title to physical fine gold legally perfected under Wyoming Statutory Trust.
        </p>
      </div>

      {/* Holographic 3D Certificate Card */}
      <div className="relative max-w-2xl mx-auto rounded-3xl p-1 bg-gradient-to-br from-gold-300 via-gold-500 to-amber-700 shadow-2xl shadow-gold-500/20 gold-shimmer-sweep">
        <div className="bg-obsidian-950 rounded-[22px] p-6 sm:p-10 border border-gold-500/30 text-white relative overflow-hidden">
          {/* Subtle watermark */}
          <div className="absolute right-[-20px] bottom-[-20px] text-gold-500/5 font-black text-9xl select-none pointer-events-none">
            LBMA
          </div>

          {/* Top Certificate Bar */}
          <div className="flex items-center justify-between border-b border-gold-500/20 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 border border-gold-400/40 flex items-center justify-center text-gold-400 shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block">
                  CONTROLLABLE ELECTRONIC RECORD
                </span>
                <h4 className="text-lg font-black tracking-wider text-white">
                  CERTIFICATE OF GOLD ALLOCATION
                </h4>
              </div>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-zinc-400 uppercase block">CER Serial</span>
              <span className="text-xs font-bold text-gold-300">CER-2026-XAU-9941</span>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 font-mono text-xs">
            <div>
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Fine Gold Weight</span>
              <div className="text-xl font-black text-gold-400">
                {weightMg.toFixed(2)} mg
              </div>
              <span className="text-[11px] text-zinc-400">≈ {(weightMg / 1000).toFixed(4)} grams</span>
            </div>

            <div>
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Certified Purity</span>
              <div className="text-xl font-black text-white">
                99.99%
              </div>
              <span className="text-[11px] text-emerald-400">LBMA Fine Gold</span>
            </div>

            <div>
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Depository Vault</span>
              <div className="text-sm font-bold text-zinc-200">
                Brink's Salt Lake
              </div>
              <span className="text-[11px] text-zinc-400">Subpool ACC-A</span>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">XRPL Legal Controller</span>
              <div className="text-xs font-bold text-gold-300 bg-obsidian-900 px-3 py-1.5 rounded-lg border border-zinc-800 break-all">
                {ownerAddress}
              </div>
            </div>

            <div>
              <span className="text-zinc-400 text-[10px] uppercase block mb-1">Attestation Hash</span>
              <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Valid
              </div>
            </div>
          </div>

          {/* Bottom Security Seals & Signatures */}
          <div className="pt-6 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>SPV Custody: WY Gold Statutory Trust #01</span>
            </div>
            <button
              onClick={() => alert('CER Certificate PDF downloaded!')}
              className="px-4 py-2 rounded-xl bg-obsidian-900 border border-gold-500/30 hover:border-gold-400 text-gold-300 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Download CER Deed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Lock, ExternalLink, Hash } from 'lucide-react';
import { truncateAddress } from '../../utils/formatters';

interface BarRecord {
  maskedBarSerial: string;
  grossWeightGrams: string;
  purity: string;
  fineWeightMg: string;
  subpoolId: string;
  depository: string;
  receiptId: string;
}

interface BarManifestTableProps {
  bars: BarRecord[];
}

export const BarManifestTable: React.FC<BarManifestTableProps> = ({ bars }) => {
  return (
    <div className="bg-obsidian-950 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="p-4 bg-obsidian-900 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gold-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Allocated Depository Bar Manifest (HMAC Salt Masked)
          </span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">
          Total Allocations: {bars.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-obsidian-900/50 text-zinc-400 border-b border-zinc-800/80">
            <tr>
              <th className="py-3 px-4">Masked Bar Serial</th>
              <th className="py-3 px-4">Depository & Subpool</th>
              <th className="py-3 px-4">Purity</th>
              <th className="py-3 px-4">Gross Grams</th>
              <th className="py-3 px-4 text-right">Fine Gold (mg)</th>
              <th className="py-3 px-4 text-right">Assay Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
            {bars.map((bar, idx) => (
              <tr key={idx} className="hover:bg-obsidian-900/40 transition-colors">
                <td className="py-3 px-4 text-gold-300 font-bold flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-gold-400" />
                  {bar.maskedBarSerial}
                </td>
                <td className="py-3 px-4 text-zinc-400">
                  {bar.depository} • {bar.subpoolId}
                </td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">
                  {(parseFloat(bar.purity) * 100).toFixed(2)}% LBMA
                </td>
                <td className="py-3 px-4 font-mono">{parseFloat(bar.grossWeightGrams).toLocaleString()} g</td>
                <td className="py-3 px-4 text-right text-white font-bold font-mono">
                  {parseFloat(bar.fineWeightMg).toLocaleString()} mg
                </td>
                <td className="py-3 px-4 text-right text-gold-400">
                  {bar.receiptId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, Shield, RefreshCw, Check, Info, Scale, Building2, Layers, DollarSign } from 'lucide-react';
import { useGoldQuote } from '../../hooks/useGoldQuote';
import { formatUSD, formatWeightMg, formatGrams } from '../../utils/formatters';

interface GoldQuoterProps {
  onProceedToCheckout: (quote: any) => void;
  userXrplAddress: string;
}

const PRESET_WEIGHTS = [
  { label: '10g Bar', grams: 10, usd: 825 },
  { label: '50g Bar', grams: 50, usd: 4125 },
  { label: '100g Bar', grams: 100, usd: 8250 },
  { label: '10 Oz Cast', grams: 311.035, usd: 25660 },
  { label: '1kg LBMA Bar', grams: 1000, usd: 82500 },
];

const PRESET_TREASURIES = [
  { name: 'US 4-Week Treasury Bill (TBILL-4W)', yieldRate: '5.28%', minFace: 10000, rating: 'AAA / US Gov' },
  { name: 'US 13-Week Treasury Bill (TBILL-13W)', yieldRate: '5.34%', minFace: 25000, rating: 'AAA / US Gov' },
  { name: 'US 10-Year Benchmark Note (UST-10Y)', yieldRate: '4.42%', minFace: 50000, rating: 'AAA / US Gov' },
];

export const GoldQuoter: React.FC<GoldQuoterProps> = ({
  onProceedToCheckout,
  userXrplAddress,
}) => {
  const [activeTab, setActiveTab] = useState<'gold-weight' | 'treasuries'>('gold-weight');
  const [fiatAmount, setFiatAmount] = useState<number>(100);
  const [customGrams, setCustomGrams] = useState<string>('1.212');
  const [selectedTreasury, setSelectedTreasury] = useState(PRESET_TREASURIES[0]);
  const [treasuryFaceValue, setTreasuryFaceValue] = useState<number>(50000);

  const { quote, loading, secondsRemaining, refreshQuote } = useGoldQuote(
    fiatAmount,
    userXrplAddress
  );

  const spotRatePerGram = 82.50;

  const handleGramsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomGrams(val);
    const g = parseFloat(val);
    if (!isNaN(g) && g > 0) {
      setFiatAmount(Math.round(g * spotRatePerGram));
    }
  };

  const handleFiatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setFiatAmount(num);
      setCustomGrams((num / spotRatePerGram).toFixed(3));
    }
  };

  const handleSelectWeightPreset = (preset: typeof PRESET_WEIGHTS[0]) => {
    setFiatAmount(preset.usd);
    setCustomGrams(preset.grams.toString());
  };

  return (
    <div id="quoter" className="relative max-w-4xl mx-auto px-4 sm:px-6 mb-24">
      <div className="frosty-glass-gold rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Header Tabs: Buy Gold By Weight vs Ingest Treasuries */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.1]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-widest uppercase mb-2">
              <Scale className="w-3.5 h-3.5" /> UNYKORN Execution Terminal
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Physical Gold & <span className="liquid-gold-text">Treasuries Ingestion</span>
            </h2>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#070709] rounded-xl border border-white/[0.1] text-xs font-mono">
            <button
              onClick={() => setActiveTab('gold-weight')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'gold-weight'
                  ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Gold By Weight</span>
            </button>

            <button
              onClick={() => setActiveTab('treasuries')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'treasuries'
                  ? 'bg-white text-black font-extrabold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>US Treasuries</span>
            </button>
          </div>
        </div>

        {activeTab === 'gold-weight' ? (
          /* TAB 1: BUY PHYSICAL GOLD BY WEIGHT */
          <div className="space-y-8">
            {/* Quick Weight Selector Buttons */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2.5">
                Standard LBMA Delivery Bar Presets:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {PRESET_WEIGHTS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handleSelectWeightPreset(preset)}
                    className={`p-3 rounded-xl text-center font-mono transition-all ${
                      Math.abs(fiatAmount - preset.usd) < 5
                        ? 'bg-gradient-to-br from-amber-300 to-amber-500 text-black font-extrabold shadow-lg scale-[1.02]'
                        : 'bg-[#070709]/80 border border-white/[0.08] text-zinc-300 hover:border-amber-400/40'
                    }`}
                  >
                    <div className="text-xs font-bold">{preset.label}</div>
                    <div className="text-[10px] opacity-80 mt-0.5">{formatUSD(preset.usd)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Weight & USD Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#070709]/80 p-5 rounded-2xl border border-white/[0.1]">
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Target Fine Weight (Grams)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.001"
                    min="0.01"
                    value={customGrams}
                    onChange={handleGramsChange}
                    className="w-full bg-transparent text-2xl font-mono font-bold text-white focus:outline-none"
                  />
                  <span className="text-sm font-mono text-amber-400 font-bold shrink-0">g FINE</span>
                </div>
              </div>

              <div className="bg-[#070709]/80 p-5 rounded-2xl border border-white/[0.1]">
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
                  Spot Execution Value (USD)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    min="5"
                    value={fiatAmount}
                    onChange={handleFiatChange}
                    className="w-full bg-transparent text-2xl font-mono font-bold text-white focus:outline-none"
                  />
                  <span className="text-sm font-mono text-emerald-400 font-bold shrink-0">USDC / USD</span>
                </div>
              </div>
            </div>

            {/* Live Spot Lock Banner & Summary */}
            <div className="p-4 rounded-xl bg-[#070709] border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-amber-300">
                <Clock className="w-4 h-4 animate-spin text-amber-400" />
                <span>Spot Price Locked: {secondsRemaining}s remaining (@ $82.50 / g)</span>
              </div>
              <button
                onClick={refreshQuote}
                className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
              >
                <RefreshCw className="w-3 h-3" /> Refresh Quote
              </button>
            </div>

            {/* Execute Buy CTA */}
            <button
              onClick={() => onProceedToCheckout(quote)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>Proceed to Custody Allocation & BitGo Settlement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* TAB 2: INGEST US TREASURIES & SOVEREIGN RWA */
          <div className="space-y-6">
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              Deposit tokenized US Treasury Bills and Sovereign Bond Collateral into the UNYKORN Multi-Chain Charter Ledger to anchor automated yield and expand your borrowing capacity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRESET_TREASURIES.map((t) => (
                <div
                  key={t.name}
                  onClick={() => setSelectedTreasury(t)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedTreasury.name === t.name
                      ? 'bg-[#14141E] border-amber-400 shadow-md'
                      : 'bg-[#070709] border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                    Yield: {t.yieldRate}
                  </span>
                  <h4 className="text-xs font-bold text-white mb-2">{t.name}</h4>
                  <div className="text-[11px] font-mono text-zinc-400">{t.rating}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#070709]/80 p-5 rounded-2xl border border-white/[0.1] font-mono text-xs space-y-3">
              <label className="block text-zinc-400 uppercase">
                Treasury Allocation Amount (USD Face Value):
              </label>
              <input
                type="number"
                step="1000"
                min="10000"
                value={treasuryFaceValue}
                onChange={(e) => setTreasuryFaceValue(Number(e.target.value))}
                className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none"
              />
              <div className="pt-3 border-t border-white/[0.06] flex justify-between text-zinc-400 text-[11px]">
                <span>Estimated Annual Yield:</span>
                <span className="text-emerald-400 font-bold">
                  {formatUSD(treasuryFaceValue * 0.053)} / Year
                </span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout({ ...quote, usdAmount: treasuryFaceValue, isTreasury: true })}
              className="w-full py-4 rounded-2xl bg-white text-black font-extrabold text-sm uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <span>Ingest Sovereign Treasuries into Charter Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

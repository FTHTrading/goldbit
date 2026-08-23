import React, { useState } from 'react';
import { Sparkles, Clock, ArrowRight, Shield, RefreshCw, Check, Info } from 'lucide-react';
import { useGoldQuote } from '../../hooks/useGoldQuote';
import { formatUSD, formatWeightMg, formatGrams } from '../../utils/formatters';

interface GoldQuoterProps {
  onProceedToCheckout: (quote: any) => void;
  userXrplAddress: string;
}

const PRESET_AMOUNTS = [10, 50, 100, 250, 500, 1000];

export const GoldQuoter: React.FC<GoldQuoterProps> = ({
  onProceedToCheckout,
  userXrplAddress,
}) => {
  const [fiatAmount, setFiatAmount] = useState<number>(100);
  const [customInput, setCustomInput] = useState<string>('100');
  const { quote, loading, secondsRemaining, refreshQuote } = useGoldQuote(
    fiatAmount,
    userXrplAddress
  );

  const handlePresetClick = (amount: number) => {
    setFiatAmount(amount);
    setCustomInput(amount.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomInput(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 5 && num <= 50000) {
      setFiatAmount(num);
    }
  };

  return (
    <div id="quoter" className="relative max-w-4xl mx-auto px-4 sm:px-6 mb-24">
      {/* Decorative Gold Glow Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Wholesale Quoter & Allocation Engine
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Instant Micro-Gold <span className="gold-text-gradient">Spot Quoter</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-lg mx-auto">
          Locked wholesale price direct from APMEX / Bullion Desks with zero paper slippage.
        </p>
      </div>

      {/* Main Glassmorphic Quoter Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-gold-500/25 gold-glow relative overflow-hidden">
        {/* Shimmer top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent"></div>

        {/* Quick Select Presets */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Select Fiat / USDC Spend Amount
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => handlePresetClick(amt)}
                className={`py-3 rounded-xl font-extrabold text-sm transition-all ${
                  fiatAmount === amt
                    ? 'bg-gradient-to-br from-gold-400 to-amber-500 text-black shadow-lg shadow-gold-500/25 scale-[1.03]'
                    : 'bg-obsidian-900 border border-zinc-800 text-zinc-300 hover:border-gold-500/40 hover:text-white'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input & Slider */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
            <span>Or enter custom amount:</span>
            <span className="font-mono">$5 min • $50,000 max</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gold-400">
              $
            </span>
            <input
              type="number"
              min="5"
              max="50000"
              value={customInput}
              onChange={handleCustomChange}
              className="w-full bg-obsidian-900 border border-gold-500/30 rounded-2xl py-4 pl-10 pr-4 text-2xl font-black text-white focus:outline-none focus:border-gold-400 transition-colors font-mono"
            />
          </div>
        </div>

        {/* Live Quoting Metrics Display */}
        <div className="bg-obsidian-900/80 rounded-2xl p-6 border border-zinc-800/80 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-400 animate-spin" />
              <span>
                QUOTE LOCK EXPIRES IN:{' '}
                <span className="text-gold-400 font-bold text-sm">
                  {secondsRemaining}s
                </span>
              </span>
            </div>
            <button
              onClick={refreshQuote}
              className="text-zinc-400 hover:text-gold-300 flex items-center gap-1 text-[11px]"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5">
            <div>
              <span className="text-xs text-zinc-400 uppercase font-semibold">
                Allocated Fine Gold Weight
              </span>
              <div className="text-3xl sm:text-4xl font-black gold-text-gradient mt-1">
                {quote ? formatWeightMg(quote.allocatedWeightMg) : '0.00 mg'}
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                ≈ {quote ? formatGrams(quote.allocatedWeightGrams) : '0.0000 g'} LBMA 99.99% Fine
              </p>
            </div>

            <div className="space-y-1.5 text-xs font-mono border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-6">
              <div className="flex justify-between text-zinc-400">
                <span>Spot Gold Price:</span>
                <span className="text-zinc-200">${quote?.spotPricePerGram.toFixed(2)}/g</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Dealer Wholesale Spread:</span>
                <span className="text-zinc-200">${quote?.dealerSpreadUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Unykorn Platform Fee:</span>
                <span className="text-zinc-200">${quote?.techFeeUsd.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total Settled Due:</span>
                <span className="text-gold-400">{formatUSD(fiatAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Proceed to Checkout CTA */}
        <button
          onClick={() => quote && onProceedToCheckout(quote)}
          disabled={loading || !quote}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-black font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-gold-500/25 gold-shimmer-sweep"
        >
          <span>Lock In & Pay {formatUSD(fiatAmount)}</span>
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Depository Security Guarantee */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Backed 1:1 by physical LBMA bars allocated at Brink's Salt Lake.</span>
        </div>
      </div>
    </div>
  );
};

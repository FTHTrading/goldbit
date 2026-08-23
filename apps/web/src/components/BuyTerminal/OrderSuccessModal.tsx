import React, { useEffect } from 'react';
import { CheckCircle2, X, ExternalLink, ShieldCheck, Download, Award, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatUSD, formatWeightMg, truncateAddress } from '../../utils/formatters';
import { APP_CONFIG } from '../../config/constants';

interface OrderSuccessModalProps {
  orderResult: any;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderResult,
  onClose,
}) => {
  useEffect(() => {
    // Launch gold celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFE57F', '#D4AF37', '#FFA500'],
      });
    } catch (e) {}
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-obsidian-900 border border-gold-400/40 rounded-3xl p-6 sm:p-8 gold-glow-lg text-center animate-in zoom-in fade-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-obsidian-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto mb-4 shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-obsidian-950 rounded-[14px] flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase mb-2">
          <ShieldCheck className="w-3.5 h-3.5" /> Allocated & Minted on XRPL
        </div>
        <h3 className="text-2xl font-black text-white">
          Micro-Gold Mint Successful!
        </h3>
        <p className="text-zinc-400 text-xs mt-1">
          {formatWeightMg(orderResult.allocatedWeightMg)} of LBMA 99.99% fine gold is now bound to your XRPL wallet.
        </p>

        {/* Receipt Details Card */}
        <div className="bg-obsidian-950 rounded-2xl p-5 border border-zinc-800 my-6 text-left space-y-2.5 font-mono text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-400">Order ID:</span>
            <span className="text-gold-400 font-bold">{orderResult.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Fiat Settled:</span>
            <span className="text-white">{formatUSD(orderResult.amountUsd)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">XRPL Recipient:</span>
            <span className="text-zinc-300">{truncateAddress(orderResult.recipientAddress)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Depository Receipt:</span>
            <span className="text-emerald-400">{orderResult.vaultReceiptId}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-zinc-800">
            <span className="text-zinc-400">XRPL Tx Hash:</span>
            <a
              href={`${APP_CONFIG.XRPL.EXPLORER_URL}/transactions/${orderResult.xrplTxHash}`}
              target="_blank"
              rel="noreferrer"
              className="text-gold-400 hover:underline flex items-center gap-1"
            >
              {truncateAddress(orderResult.xrplTxHash, 8, 6)}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-black font-extrabold text-sm hover:brightness-110 transition-all shadow-md"
          >
            View in CER Certificate Wallet
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-zinc-300 font-bold text-xs transition-colors"
          >
            Buy More Micro-Gold
          </button>
        </div>
      </div>
    </div>
  );
};

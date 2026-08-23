import React, { useState } from 'react';
import { X, QrCode, Copy, Check, ShieldCheck, Zap, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { formatUSD, formatWeightMg, truncateAddress } from '../../utils/formatters';
import { APP_CONFIG } from '../../config/constants';

interface CheckoutModalProps {
  quote: any;
  onClose: () => void;
  onPaymentSettled: (orderResult: any) => void;
  userXrplAddress: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  quote,
  onClose,
  onPaymentSettled,
  userXrplAddress,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'usdc' | 'card'>('usdc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [xrplDest, setXrplDest] = useState(userXrplAddress || 'rCustomerTestAccount1234567890');

  const handleCopy = () => {
    navigator.clipboard.writeText(quote.depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate BitGo webhook confirmation and XRPL mint
  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    try {
      // 1. Post to backend webhook simulator if available
      const payload = {
        type: 'transfer',
        walletId: '65b98f1234abcd567890ef12',
        coin: 'pusdc',
        txid: `0x${Math.random().toString(36).substring(2)}${Date.now().toString(16)}`,
        state: 'confirmed',
        transfer: {
          state: 'confirmed',
          entries: [
            {
              address: quote.depositAddress,
              value: quote.amountUsd * 1000000,
              valueString: quote.amountUsd.toFixed(2),
            },
          ],
        },
      };

      try {
        const res = await fetch(`${APP_CONFIG.API_BASE_URL}/api/v1/webhooks/bitgo`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-signature-sha256': 'test_bitgo_webhook_secret_2026', // backend dev secret
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const result = await res.json();
          onPaymentSettled({
            orderId: quote.orderId,
            status: 'MINTED',
            amountUsd: quote.amountUsd,
            allocatedWeightMg: quote.allocatedWeightMg,
            xrplTxHash: result.xrplTxHash || `XRPL_${Date.now()}_994A1F`,
            recipientAddress: xrplDest,
            vaultReceiptId: 'VREC-SL-2026-00441',
          });
          return;
        }
      } catch (err) {
        // Backend not active, proceed with fallback simulation
      }

      // Standalone simulation fallback
      setTimeout(() => {
        onPaymentSettled({
          orderId: quote.orderId,
          status: 'MINTED',
          amountUsd: quote.amountUsd,
          allocatedWeightMg: quote.allocatedWeightMg,
          xrplTxHash: `E3A85B1298403C78B4598216DAA8A34F5F9802B376EFE1D835157140B480021A`,
          recipientAddress: xrplDest,
          vaultReceiptId: 'VREC-SL-2026-00441',
        });
      }, 1500);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 gold-glow-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Shimmer top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-obsidian-800/80 hover:bg-obsidian-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-bold uppercase mb-2">
            <Zap className="w-3.5 h-3.5 text-gold-400" /> BitGo Enterprise Settlement Rails
          </div>
          <h3 className="text-2xl font-black text-white">
            Complete Your Micro-Gold Allocation
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Order ID: <span className="font-mono text-gold-400">{quote.orderId}</span>
          </p>
        </div>

        {/* Order Summary Pill */}
        <div className="bg-obsidian-950 rounded-2xl p-4 border border-zinc-800 flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] text-zinc-400 uppercase font-semibold">Total Fiat Spend</span>
            <div className="text-xl font-black text-white">{formatUSD(quote.amountUsd)}</div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-zinc-400 uppercase font-semibold">Allocating Weight</span>
            <div className="text-xl font-black gold-text-gradient">
              {formatWeightMg(quote.allocatedWeightMg)}
            </div>
          </div>
        </div>

        {/* Recipient XRPL Account Destination */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">
            Recipient XRPL Wallet Address (XAU_MG Trustline)
          </label>
          <input
            type="text"
            value={xrplDest}
            onChange={(e) => setXrplDest(e.target.value)}
            placeholder="rCustomerTestAccount..."
            className="w-full bg-obsidian-950 border border-zinc-700 focus:border-gold-400 rounded-xl px-4 py-2.5 text-sm font-mono text-zinc-200 focus:outline-none"
          />
        </div>

        {/* Settlement Method Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setSelectedTab('usdc')}
            className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
              selectedTab === 'usdc'
                ? 'bg-gold-500/15 border-gold-500 text-gold-300'
                : 'bg-obsidian-950 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" /> BitGo USDC (Polygon/EVM)
          </button>
          <button
            onClick={() => setSelectedTab('card')}
            className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border transition-all ${
              selectedTab === 'card'
                ? 'bg-gold-500/15 border-gold-500 text-gold-300'
                : 'bg-obsidian-950 border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Card / Apple Pay
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'usdc' ? (
          <div className="bg-obsidian-950 p-5 rounded-2xl border border-zinc-800 mb-6">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-3 rounded-xl shadow-md">
                <QRCodeSVG value={quote.depositAddress} size={110} />
              </div>
              <div className="flex-1 w-full text-center sm:text-left">
                <div className="text-xs text-zinc-400 mb-1 font-semibold uppercase">
                  Assigned BitGo Receiving Address:
                </div>
                <div className="font-mono text-xs text-zinc-300 bg-obsidian-900 px-3 py-2 rounded-lg border border-zinc-800 break-all mb-3">
                  {quote.depositAddress}
                </div>
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-gold-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Deposit Address!' : 'Copy Deposit Address'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-obsidian-950 p-5 rounded-2xl border border-zinc-800 mb-6 space-y-3">
            <input
              type="text"
              placeholder="Cardholder Name"
              defaultValue="Kevan Unykorn"
              className="w-full bg-obsidian-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Card Number: 4242 •••• •••• 4242"
              defaultValue="4242 •••• •••• 4242"
              className="w-full bg-obsidian-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                defaultValue="12/28"
                className="bg-obsidian-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              />
              <input
                type="text"
                placeholder="CVC"
                defaultValue="888"
                className="bg-obsidian-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* Live Simulation Trigger */}
        <button
          onClick={handleSimulatePayment}
          disabled={isProcessing}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500 text-black font-extrabold text-base flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-gold-500/25 gold-shimmer-sweep"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Settlement & Minting on XRPL...</span>
            </>
          ) : (
            <>
              <span>Simulate Instant Deposit & Mint</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

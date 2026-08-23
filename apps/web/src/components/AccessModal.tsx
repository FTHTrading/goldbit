import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ArrowRight, Terminal, Key, Wallet } from 'lucide-react';

interface AccessModalProps {
  onClose: () => void;
}

export const AccessModal: React.FC<AccessModalProps> = ({ onClose }) => {
  const [operatorId, setOperatorId] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0C0C12] border border-white/[0.12] rounded-3xl p-8 shadow-2xl text-left animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-xl bg-white/[0.04] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-mono font-bold uppercase mb-3">
            <Lock className="w-3 h-3" /> Institutional Gateway
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            UNYKORN Platform Access
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Authenticate operator identity, institution credentials, or connect an authorized hardware signer.
          </p>
        </div>

        {connected ? (
          <div className="bg-[#070709] p-6 rounded-2xl border border-emerald-500/30 text-center space-y-3 font-mono text-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Operator Authenticated</h4>
            <p className="text-zinc-400 text-xs">
              Access granted to UNYKORN Command Center & Settlement Rails.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider mt-2"
            >
              Enter Console
            </button>
          </div>
        ) : (
          <form onSubmit={handleAccess} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                Operator / Entity Identifier
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="SPV-WY-UNYKORN-01"
                className="w-full bg-[#070709] border border-white/[0.1] focus:border-white rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1.5">
                Multi-Sig Session Secret / Hardware Public Key
              </label>
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="••••••••••••••••••••••••"
                className="w-full bg-[#070709] border border-white/[0.1] focus:border-white rounded-xl px-4 py-3 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={connecting}
              className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 mt-6"
            >
              <Key className="w-4 h-4" />
              <span>{connecting ? 'Authenticating Operator...' : 'Authenticate Access'}</span>
            </button>

            <div className="pt-4 border-t border-white/[0.06] text-center">
              <span className="text-[10px] font-mono text-zinc-400">
                Secured by BitGo Enterprise MPC & Webhook Signatures
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

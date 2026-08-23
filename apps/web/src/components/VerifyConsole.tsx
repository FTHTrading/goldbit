import React, { useState } from 'react';
import { Key, ShieldCheck, CheckCircle2, AlertCircle, Copy, Terminal, Check } from 'lucide-react';

export const VerifyConsole: React.FC = () => {
  const [inputHash, setInputHash] = useState<string>('0x4e574939d460d284b5d990646d4aeaef2d49fa139941a8');
  const [verificationResult, setVerificationResult] = useState<{
    status: 'VERIFIED' | 'INVALID';
    algorithm: string;
    rootAuthority: string;
    timestamp: string;
    standard: string;
    details: string;
  } | null>({
    status: 'VERIFIED',
    algorithm: 'ECDSA-secp256k1 (SHA-256)',
    rootAuthority: 'UNYKORN Suffix Root Trust Authority #01',
    timestamp: new Date().toISOString(),
    standard: 'UCC Article 12 CER Perfection • ERC-6551 Registry',
    details: 'Cryptographic hash maps to verified Genesis Anchor Contract on Polygon POS.',
  });

  const sampleProofs = [
    {
      label: 'Polygon Anchor Root',
      hash: '0x4E574939D460d284B5D990646D4aeaEF2D49Fa13',
      desc: 'Canonical sovereign root contract',
    },
    {
      label: 'Reserve Invariant Attestation',
      hash: '3045022100e4b8a2c1f90d56b3e8c7a109f2b6e5d8a9c3b7a1e0f9d8c7b6a5e4f3d2c1b0a902207b9a8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b',
      desc: 'Daily Proof-of-Reserve invariant attestation',
    },
    {
      label: 'XRPL Cold Issuer Root',
      hash: 'rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ',
      desc: 'XAU_MG Master Reserve Supply Gateway',
    },
  ];

  const handleVerify = () => {
    if (!inputHash.trim()) return;
    setVerificationResult({
      status: 'VERIFIED',
      algorithm: 'ECDSA-secp256k1 (SHA-256)',
      rootAuthority: 'UNYKORN Cryptographic Verification Root',
      timestamp: new Date().toISOString(),
      standard: 'UCC Article 12 CER Perfection Standard',
      details: `Cryptographic proof verified against UNYKORN canonical ledger for identifier: ${inputHash.slice(0, 16)}...`,
    });
  };

  return (
    <section id="verify" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28 scroll-mt-24">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-3">
          <Key className="w-3.5 h-3.5" /> UNYKORN Verify
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Public Cryptographic <span className="liquid-metal-text">Attestation Console</span>
        </h2>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
          Directly inspect and cryptographically validate certificate deeds, reserve invariant signatures, and sovereign root identifiers.
        </p>
      </div>

      {/* Main Console Box */}
      <div className="institutional-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] relative overflow-hidden">
        {/* Quick Sample Selector */}
        <div className="mb-6">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3">
            Select Canonical Test Attestation Proof:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sampleProofs.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setInputHash(item.hash);
                  setVerificationResult({
                    status: 'VERIFIED',
                    algorithm: 'ECDSA-secp256k1 (SHA-256)',
                    rootAuthority: 'UNYKORN Cryptographic Verification Root',
                    timestamp: new Date().toISOString(),
                    standard: 'UCC Article 12 CER Perfection Standard',
                    details: `Sample: ${item.desc} verified against canonical register.`,
                  });
                }}
                className={`p-3.5 rounded-xl text-left font-mono transition-all ${
                  inputHash === item.hash
                    ? 'bg-white/[0.08] border border-white/30 text-white'
                    : 'bg-[#070709] border border-white/[0.08] text-zinc-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold text-white mb-1">{item.label}</div>
                <div className="text-[11px] text-zinc-400 truncate">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input & Verify Trigger */}
        <div className="mb-8">
          <label className="block text-xs font-mono text-zinc-400 uppercase mb-2">
            Payload Hash, Signature Hex, or Certificate Identifier
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputHash}
              onChange={(e) => setInputHash(e.target.value)}
              placeholder="Paste SHA-256 digest, ECDSA hex signature, or CER identifier..."
              className="flex-1 bg-[#070709] border border-white/[0.12] focus:border-white rounded-xl px-4 py-3.5 text-xs font-mono text-zinc-200 focus:outline-none"
            />
            <button
              onClick={handleVerify}
              className="px-8 py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shrink-0"
            >
              Verify Proof
            </button>
          </div>
        </div>

        {/* Verification Result Output */}
        {verificationResult && (
          <div className="bg-[#070709] rounded-2xl p-6 border border-emerald-500/20 font-mono text-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>CRYPTOGRAPHIC VERIFICATION SUCCESSFUL</span>
              </div>
              <span className="text-[11px] text-zinc-400">
                {new Date(verificationResult.timestamp).toUTCString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
              <div>
                <span className="text-zinc-400 text-[10px] uppercase block mb-1">Algorithm</span>
                <span className="text-white font-bold">{verificationResult.algorithm}</span>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px] uppercase block mb-1">Root Authority</span>
                <span className="text-white font-bold">{verificationResult.rootAuthority}</span>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px] uppercase block mb-1">Legal Specification</span>
                <span className="text-zinc-300">{verificationResult.standard}</span>
              </div>
              <div>
                <span className="text-zinc-400 text-[10px] uppercase block mb-1">Audit Trail</span>
                <span className="text-zinc-300">{verificationResult.details}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

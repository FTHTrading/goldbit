import React from 'react';
import { Layers, ShieldCheck, Cpu, Key, ArrowUpRight } from 'lucide-react';

interface SystemsGridProps {
  onSelectSystem: (systemId: string) => void;
}

export const SystemsGrid: React.FC<SystemsGridProps> = ({ onSelectSystem }) => {
  const systems = [
    {
      id: 'reserve',
      title: 'Reserve',
      tag: 'ASSET ALLOCATION',
      description: 'Structures for asset allocation, cryptographic proof, reporting, and verifiable redemption workflows.',
      icon: Layers,
      highlightColor: 'hover:border-amber-500/30 group-hover:text-amber-400',
    },
    {
      id: 'vault',
      title: 'Vault',
      tag: 'ERC-6551 ACCOUNTS',
      description: 'Smart-account ownership, sovereign namespaces, Genesis certificates, and programmable asset controls.',
      icon: ShieldCheck,
      highlightColor: 'hover:border-rose-500/30 group-hover:text-rose-400',
    },
    {
      id: 'rail',
      title: 'Rail',
      tag: 'SETTLEMENT & CUSTODY',
      description: 'Atomic issuance and settlement infrastructure across approved ledger rails (XRPL, Polygon, EVM) with BitGo policy gates.',
      icon: Cpu,
      highlightColor: 'hover:border-indigo-500/30 group-hover:text-indigo-400',
    },
    {
      id: 'verify',
      title: 'Verify',
      tag: 'PUBLIC ATTESTATION',
      description: 'Cryptographic attestation verification, certificate validation, root registry checks, and chain provenance records.',
      icon: Key,
      highlightColor: 'hover:border-emerald-500/30 group-hover:text-emerald-400',
    },
  ];

  return (
    <section id="infrastructure" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-2">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What UNYKORN Does
          </h2>
        </div>
        <p className="text-xs text-zinc-400 font-mono max-w-md">
          Four modular subsystems engineered for non-custodial cryptographic sovereignty and regulatory perfection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systems.map((sys) => {
          const Icon = sys.icon;
          return (
            <div
              key={sys.id}
              onClick={() => onSelectSystem(sys.id)}
              className={`group institutional-panel p-8 rounded-2xl border border-white/[0.08] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[260px] ${sys.highlightColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    {sys.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>

                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-5 text-zinc-300 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                  {sys.title}
                </h3>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {sys.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

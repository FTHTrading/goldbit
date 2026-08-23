import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SystemsGrid } from './components/SystemsGrid';
import { ReserveSection } from './components/ReserveSection';
import { VaultSection } from './components/VaultSection';
import { VerifyConsole } from './components/VerifyConsole';
import { RailSection } from './components/RailSection';
import { BrandShowcase } from './components/BrandShowcase';
import { NetworkStatus } from './components/NetworkStatus';
import { AccessModal } from './components/AccessModal';
import { Footer } from './components/Footer';
import { GoldReserveStory } from './pages/GoldReserveStory';
import { Layers, Sparkles } from 'lucide-react';

export function App() {
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('infrastructure');
  
  // Detect if accessing via g.unykorn.ai subdomain or URL param / route
  const [currentView, setCurrentView] = useState<'platform' | 'gold-reserve'>('platform');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname.toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (hostname.startsWith('g.') || pathname.includes('/gold') || search.includes('view=gold')) {
        setCurrentView('gold-reserve');
      }
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-rose-600 selection:text-white font-sans antialiased">
      {/* Floating Global Switcher Pill between UNYKORN OS & g.unykorn.ai */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#0C0C12]/90 backdrop-blur-xl border border-white/[0.12] rounded-full p-1.5 shadow-2xl flex items-center gap-1 text-xs font-mono">
        <button
          onClick={() => setCurrentView('platform')}
          className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentView === 'platform'
              ? 'bg-white text-black font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Institutional OS</span>
        </button>

        <button
          onClick={() => setCurrentView('gold-reserve')}
          className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentView === 'gold-reserve'
              ? 'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 text-black font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>g.unykorn.ai Story</span>
        </button>
      </div>

      {currentView === 'gold-reserve' ? (
        /* Cinematic g.unykorn.ai Experience */
        <GoldReserveStory
          onOpenAccess={() => setAccessModalOpen(true)}
          onSwitchToPlatform={() => setCurrentView('platform')}
        />
      ) : (
        /* Wide UNYKORN Master Institutional Platform */
        <>
          {/* Institutional Top Navbar */}
          <Navbar
            onOpenAccess={() => setAccessModalOpen(true)}
            activeSection={activeSection}
          />

          {/* Main Content Sections */}
          <main>
            {/* Salvador Dali Liquid-Metal Hero */}
            <HeroSection
              onEnterNetwork={() => setAccessModalOpen(true)}
              onViewInfrastructure={() => scrollToSection('infrastructure')}
            />

            {/* 4 Systems Editorial Grid (Reserve, Vault, Rail, Verify) */}
            <SystemsGrid
              onSelectSystem={(sysId) => {
                if (sysId === 'reserve') {
                  setCurrentView('gold-reserve');
                } else {
                  scrollToSection(sysId);
                }
              }}
            />

            {/* UNYKORN Reserve: RWA & APMEX Wholesale Framework */}
            <ReserveSection />

            {/* UNYKORN Vaults: ERC-6551 & Genesis Certificates */}
            <VaultSection />

            {/* UNYKORN Verify: Interactive Cryptographic Attestation Console */}
            <VerifyConsole />

            {/* UNYKORN Rail: Settlement & Multi-Sig Custody */}
            <RailSection />

            {/* UNYKORN 3D Brand & Sovereign Force Showcase */}
            <BrandShowcase />

            {/* UNYKORN Network: Live System & Node Telemetry */}
            <NetworkStatus />
          </main>

          {/* Institutional Fiduciary Footer */}
          <Footer />
        </>
      )}

      {/* Access Gateway Modal */}
      {accessModalOpen && (
        <AccessModal onClose={() => setAccessModalOpen(false)} />
      )}
    </div>
  );
}

export default App;

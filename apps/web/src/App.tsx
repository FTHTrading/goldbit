import React, { useState } from 'react';
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

export function App() {
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('infrastructure');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-rose-600 selection:text-white font-sans antialiased">
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
          onSelectSystem={(sysId) => scrollToSection(sysId)}
        />

        {/* UNYKORN Reserve: RWA & APMEX Wholesale Framework */}
        <ReserveSection />

        {/* UNYKORN Vaults: ERC-6551 & Genesis Certificates */}
        <VaultSection />

        {/* UNYKORN Verify: Interactive Cryptographic Attestation Console */}
        <VerifyConsole />

        {/* UNYKORN Rail: Settlement & Multi-Sig Custody */}
        <RailSection />

        {/* UNYKORN 3D Brand & Sovereign Energy Grid Showcase */}
        <BrandShowcase />

        {/* UNYKORN Network: Live System & Node Telemetry */}
        <NetworkStatus />
      </main>

      {/* Institutional Fiduciary Footer */}
      <Footer />

      {/* Access Gateway Modal */}
      {accessModalOpen && (
        <AccessModal onClose={() => setAccessModalOpen(false)} />
      )}
    </div>
  );
}

export default App;

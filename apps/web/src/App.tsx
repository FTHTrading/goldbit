import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SystemsGrid } from './components/SystemsGrid';
import { GoldQuoter } from './components/BuyTerminal/GoldQuoter';
import { CheckoutModal } from './components/BuyTerminal/CheckoutModal';
import { OrderSuccessModal } from './components/BuyTerminal/OrderSuccessModal';
import { CerCardViewer } from './components/CerCertificate/CerCardViewer';
import { VaultStacker } from './components/PhysicalStacking/VaultStacker';
import { PorLiveDashboard } from './components/ProofOfReserve/PorLiveDashboard';
import { VideoReelsGrid } from './components/VideoShowcase/VideoReelsGrid';
import { UnykornClubBlueprint } from './components/UnykornClubBlueprint';
import { ReserveSection } from './components/ReserveSection';
import { VaultSection } from './components/VaultSection';
import { VerifyConsole } from './components/VerifyConsole';
import { RailSection } from './components/RailSection';
import { BrandShowcase } from './components/BrandShowcase';
import { WyomingConvergenceAudio } from './components/WyomingConvergenceAudio';
import { NetworkStatus } from './components/NetworkStatus';
import { AccessModal } from './components/AccessModal';
import { ElectricWalkthroughModal } from './components/ElectricWalkthroughModal';
import { Footer } from './components/Footer';
import { GoldReserveStory } from './pages/GoldReserveStory';
import { Layers, Sparkles, Zap } from 'lucide-react';

export function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'platform' | 'gold-reserve'>('platform');
  const [accessModalOpen, setAccessModalOpen] = useState(false);
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('infrastructure');

  // Checkout & Modal States
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const userXrplAddress = 'rCustomerTestAccount1234567890';

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

  const handleProceedToCheckout = (quote: any) => {
    setSelectedQuote(quote);
    setCheckoutModalOpen(true);
  };

  const handlePaymentSettled = (orderResult: any) => {
    setCompletedOrder(orderResult);
    setCheckoutModalOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 selection:bg-rose-600 selection:text-white font-sans antialiased">
      {/* Global View Switcher Pill */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#0C0C12]/95 backdrop-blur-xl border border-white/[0.15] rounded-full p-1.5 shadow-2xl flex items-center gap-1 text-xs font-mono">
        <button
          onClick={() => setCurrentView('platform')}
          className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
            currentView === 'platform'
              ? 'bg-white text-black font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Full OS & Terminal</span>
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
        /* Master Interactive UNYKORN Institutional OS & Sales Terminal */
        <>
          {/* Institutional Top Navbar */}
          <Navbar
            onOpenAccess={() => setAccessModalOpen(true)}
            activeSection={activeSection}
          />

          <main>
            {/* Salvador Dali Liquid-Metal Hero with Studio Voiceover & Guided Tour Trigger */}
            <HeroSection
              onEnterNetwork={() => scrollToSection('terminal')}
              onViewInfrastructure={() => scrollToSection('infrastructure')}
              onStartWalkthrough={() => setWalkthroughOpen(true)}
            />

            {/* 4 Systems Editorial Architecture Grid */}
            <SystemsGrid
              onSelectSystem={(sysId) => {
                if (sysId === 'reserve') {
                  scrollToSection('terminal');
                } else {
                  scrollToSection(sysId);
                }
              }}
            />

            {/* SECTION: Live Interactive Gold by Weight & Treasuries Ingestion Terminal */}
            <section id="terminal" className="scroll-mt-24">
              <GoldQuoter
                onProceedToCheckout={handleProceedToCheckout}
                userXrplAddress={userXrplAddress}
              />
            </section>

            {/* SECTION: The Wyoming Convergence Audio Deep-Dive Studio */}
            <WyomingConvergenceAudio
              onOpenTerminal={() => scrollToSection('terminal')}
              onOpenCinematic={() => setCurrentView('gold-reserve')}
            />

            {/* SECTION: Unykorn Club Architecture & 6-Stream Monetization Blueprint */}
            <UnykornClubBlueprint />

            {/* SECTION: 3D Holographic CER Deed Certificate Viewer */}
            <section>
              <CerCardViewer
                ownerAddress={userXrplAddress}
                weightMg={selectedQuote ? selectedQuote.goldMg : 1160.90}
              />
            </section>

            {/* SECTION: Physical Vault Stacking & Armored Courier Progress */}
            <section>
              <VaultStacker />
            </section>

            {/* SECTION: Real-Time Proof-of-Reserve Solvency Gauge */}
            <section>
              <PorLiveDashboard />
            </section>

            {/* SECTION: High-Energy Video Reels Grid */}
            <section>
              <VideoReelsGrid />
            </section>

            {/* SECTION: UNYKORN Reserve (APMEX Wholesale & Legal Custody) */}
            <ReserveSection />

            {/* SECTION: UNYKORN Vaults (ERC-6551 Smart Accounts) */}
            <VaultSection />

            {/* SECTION: UNYKORN Verify (Interactive Cryptographic Hash Inspector) */}
            <VerifyConsole />

            {/* SECTION: UNYKORN Rail (XRPL Cold/Hot & BitGo Multi-Sig) */}
            <RailSection />

            {/* SECTION: 3D Titanium Brand & Sovereign Energy Force */}
            <BrandShowcase />

            {/* SECTION: Network Status & Consensus Telemetry */}
            <NetworkStatus />
          </main>

          {/* Institutional Fiduciary Footer */}
          <Footer />

          {/* Interactive Checkout Modal (BitGo USDC QR + Sim) */}
          {checkoutModalOpen && selectedQuote && (
            <CheckoutModal
              quote={selectedQuote}
              onClose={() => setCheckoutModalOpen(false)}
              onPaymentSettled={handlePaymentSettled}
              userXrplAddress={userXrplAddress}
            />
          )}

          {/* Order Success Holographic Receipt Modal with Confetti */}
          {successModalOpen && completedOrder && (
            <OrderSuccessModal
              orderResult={completedOrder}
              onClose={() => setSuccessModalOpen(false)}
            />
          )}

          {/* Electric Automated Walkthrough Modal */}
          {walkthroughOpen && (
            <ElectricWalkthroughModal
              onClose={() => setWalkthroughOpen(false)}
              onOpenAccess={() => {
                setWalkthroughOpen(false);
                setAccessModalOpen(true);
              }}
            />
          )}
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

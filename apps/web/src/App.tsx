import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GoldQuoter } from './components/BuyTerminal/GoldQuoter';
import { CheckoutModal } from './components/BuyTerminal/CheckoutModal';
import { OrderSuccessModal } from './components/BuyTerminal/OrderSuccessModal';
import { VideoReelsGrid } from './components/VideoShowcase/VideoReelsGrid';
import { PorLiveDashboard } from './components/ProofOfReserve/PorLiveDashboard';
import { CerCardViewer } from './components/CerCertificate/CerCardViewer';
import { VaultStacker } from './components/PhysicalStacking/VaultStacker';
import { Footer } from './components/Footer';

export function App() {
  const [walletAddress, setWalletAddress] = useState<string>('rCustomerTestAccount1234567890');
  const [activeQuoteForCheckout, setActiveQuoteForCheckout] = useState<any | null>(null);
  const [settledOrderResult, setSettledOrderResult] = useState<any | null>(null);

  const handleConnectWallet = () => {
    const mockWallets = [
      'rJLMSTy77hTxqgDw9WMxCnYC8m5vhqN3FQ',
      'rNX4faQ35SdtE4rDoEg8YeVLQKQ57AYyCt',
      'rCustomerTestAccount1234567890',
    ];
    const nextWallet = mockWallets[Math.floor(Math.random() * mockWallets.length)];
    setWalletAddress(nextWallet);
  };

  const scrollToQuoter = () => {
    const el = document.getElementById('quoter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReserves = () => {
    const el = document.getElementById('reserves');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 selection:bg-gold-500 selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenQuoter={scrollToQuoter}
        walletAddress={walletAddress}
        onConnectWallet={handleConnectWallet}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onStartBuying={scrollToQuoter}
          onExplorePoR={scrollToReserves}
        />

        {/* Live Quoter & Purchase Terminal */}
        <GoldQuoter
          onProceedToCheckout={(quote) => setActiveQuoteForCheckout(quote)}
          userXrplAddress={walletAddress}
        />

        {/* Video Showcase Grid (Featuring Downloads Media) */}
        <VideoReelsGrid />

        {/* Live Proof-of-Reserve Invariant Dashboard */}
        <PorLiveDashboard />

        {/* Controllable Electronic Record (CER) Certificate Viewer */}
        <CerCardViewer
          ownerAddress={walletAddress}
          weightMg={settledOrderResult?.allocatedWeightMg || 1160.90}
        />

        {/* Physical Stacking & Vault Courier Delivery Progress */}
        <VaultStacker />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {activeQuoteForCheckout && (
        <CheckoutModal
          quote={activeQuoteForCheckout}
          onClose={() => setActiveQuoteForCheckout(null)}
          onPaymentSettled={(orderResult) => {
            setActiveQuoteForCheckout(null);
            setSettledOrderResult(orderResult);
          }}
          userXrplAddress={walletAddress}
        />
      )}

      {settledOrderResult && (
        <OrderSuccessModal
          orderResult={settledOrderResult}
          onClose={() => setSettledOrderResult(null)}
        />
      )}
    </div>
  );
}

export default App;

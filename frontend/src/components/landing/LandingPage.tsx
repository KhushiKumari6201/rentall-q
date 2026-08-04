'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { IndustryMarquee } from '@/components/landing/IndustryMarquee';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { PricingSection } from '@/components/landing/PricingSection';
import { CompaniesSection } from '@/components/landing/CompaniesSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';
import { FreeTrialModal } from '@/components/landing/FreeTrialModal';

export function LandingPage() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  const handleOpenTrialModal = () => {
    setTrialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-cream-100 text-navy-900 font-sans antialiased selection:bg-amber-200 selection:text-navy-900">
      {/* Translucent Free Trial Modal */}
      <FreeTrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
      />

      {/* Section 1: Sticky Shrinking Navbar */}
      <Navbar onOpenTrialModal={handleOpenTrialModal} />

      {/* Section 2: Hero with Staggered Fade-Up & Parallax Preview */}
      <HeroSection onOpenTrialModal={handleOpenTrialModal} />

      {/* Section 3: Infinite Auto-Scrolling Industry Marquee */}
      <IndustryMarquee />

      {/* Section 4: Six-Module Feature Grid with Scroll Reveal */}
      <FeatureGrid />

      {/* Section 5: Pricing Section with Spring Toggle */}
      <PricingSection onOpenTrialModal={handleOpenTrialModal} />

      {/* Section 6: Companies Associated */}
      <CompaniesSection />

      {/* Section 7: Animated FAQ Accordion */}
      <FaqSection />

      {/* Section 7: Final CTA Banner with Magnetic Button */}
      <FinalCta onOpenTrialModal={handleOpenTrialModal} />

      {/* Section 8: Footer with Pulsing WhatsApp FAB */}
      <Footer onOpenTrialModal={handleOpenTrialModal} />
    </div>
  );
}

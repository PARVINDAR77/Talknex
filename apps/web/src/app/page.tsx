import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustedCompanies } from '../components/home/TrustedCompanies';
import { CapabilitiesAndUseCases } from '../components/home/CapabilitiesAndUseCases';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { AudioActionCard } from '../components/home/AudioActionCard';
import { PricingSection } from '../components/home/PricingSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { BlogSection } from '../components/home/BlogSection';
import { FaqSection } from '../components/home/FaqSection';
import { CtaBanner } from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero with Interactive AI Agent Playground Mockup */}
      <Hero />

      {/* 2. Trusted By Growing Businesses Strip */}
      <TrustedCompanies />

      {/* 3. Capabilities & Real Business Use Cases */}
      <CapabilitiesAndUseCases />

      {/* 4. How TalkNex Works (4-Step Architecture) */}
      <HowItWorksSection />

      {/* 5. Audio Player Demonstration, Verified Reviews & Transparent Pricing */}
      <section className="bg-slate-50/80 py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Hear it in Action Player & Loved by Businesses Testimonial Card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <AudioActionCard />
              <TestimonialsSection />
            </div>

            {/* Right Column: 4-Tier Pricing Grid with Monthly/Yearly 20% discount switch */}
            <div className="lg:col-span-8">
              <PricingSection />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Blog Insights & Frequently Asked Questions (Side-by-Side Reference Layout) */}
      <section className="bg-gradient-to-b from-white via-slate-50/40 to-white py-20 sm:py-24 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left: From Our Blog (3 articles) */}
            <div className="lg:col-span-7">
              <BlogSection />
            </div>

            {/* Right: Frequently Asked Questions Accordion */}
            <div className="lg:col-span-5">
              <FaqSection />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ready to Build Your AI Voice Workforce CTA */}
      <CtaBanner />
    </div>
  );
}

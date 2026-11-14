import React from 'react';
import Link from 'next/link';
import { PricingSection } from '../../components/home/PricingSection';
import { FaqSection } from '../../components/home/FaqSection';
import { CtaBanner } from '../../components/home/CtaBanner';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Pricing Plans — TalkNex Transparent Telephony & AI Voice Pricing',
  description: 'Explore simple, predictable pricing for TalkNex AI voice agents. Choose from Starter, Growth, Business, and Enterprise plans with zero hidden fees.'
};

export default function PricingPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent, Usage-Based Telephony Pricing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Predictable Plans That Scale With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Your Growth
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Start free with included call minutes. Upgrade seamlessly as your call volume expands across India. No hidden telecom setup fees.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-mono pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f59b]" />
              <span>14-Day Full-Featured Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f59b]" />
              <span>Zero Setup or Per-Seat Platform Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00f59b]" />
              <span>Cancel or Switch Tiers Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <ScrollReveal direction="up" delay={50}>
          <PricingSection />
        </ScrollReveal>

        {/* Detailed Feature Comparison Link Card */}
        <ScrollReveal direction="up" delay={150}>
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Need a Detailed Feature-by-Feature Breakdown?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Inspect full technical capabilities, concurrency limits, API rates, and SLA guarantees across all plans.
              </p>
            </div>
            <Link
              href="/pricing/compare"
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Compare All Plan Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Pricing FAQs */}
        <ScrollReveal direction="up" delay={200}>
          <div className="max-w-4xl mx-auto">
            <FaqSection />
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

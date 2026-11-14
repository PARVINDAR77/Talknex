'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles } from 'lucide-react';
import { PricingPlanModel } from '@talknex/shared';

interface PricingSectionProps {
  initialPlans?: PricingPlanModel[];
  compact?: boolean;
}

// Helper to format Indian Rupee values with proper commas
function formatInr(num: number): string {
  const str = Math.round(num).toString();
  if (str.length <= 3) return str;
  const last3 = str.slice(-3);
  const remaining = str.slice(0, -3);
  const formatted = remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  return `${formatted},${last3}`;
}

export function PricingSection({ initialPlans, compact = false }: PricingSectionProps = {}) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const defaultPlans: PricingPlanModel[] = [
    {
      id: '1',
      slug: 'starter',
      name: 'Starter',
      monthlyPriceInr: 1499,
      yearlyPriceInr: 14390,
      callMinutesIncluded: 500,
      voiceAgentsLimit: 1,
      isPopular: false,
      ctaText: 'Get Started',
      ctaHref: '/book-demo?plan=starter',
      displayOrder: 1,
      isActive: true,
      tagline: 'Ideal for small businesses starting with voice automation.',
      features: [
        { id: '1', planId: '1', featureId: 'f1', isIncluded: true, valueText: 'Up to 500 call minutes' },
        { id: '2', planId: '1', featureId: 'f2', isIncluded: true, valueText: '1 AI Voice Agent' },
        { id: '3', planId: '1', featureId: 'f3', isIncluded: true, valueText: 'Basic Campaigns' },
        { id: '4', planId: '1', featureId: 'f4', isIncluded: true, valueText: 'Call Recordings' }
      ]
    },
    {
      id: '2',
      slug: 'growth',
      name: 'Growth',
      monthlyPriceInr: 4999,
      yearlyPriceInr: 47990,
      callMinutesIncluded: 2500,
      voiceAgentsLimit: 5,
      isPopular: true,
      ctaText: 'Start Free Trial',
      ctaHref: '/book-demo?plan=growth',
      displayOrder: 2,
      isActive: true,
      tagline: 'Most popular plan for growing businesses scaling outreach.',
      features: [
        { id: '5', planId: '2', featureId: 'f1', isIncluded: true, valueText: 'Up to 2,500 call minutes' },
        { id: '6', planId: '2', featureId: 'f2', isIncluded: true, valueText: '5 AI Voice Agents' },
        { id: '7', planId: '2', featureId: 'f3', isIncluded: true, valueText: 'Advanced Campaigns' },
        { id: '8', planId: '2', featureId: 'f4', isIncluded: true, valueText: 'Lead & CRM' },
        { id: '9', planId: '2', featureId: 'f5', isIncluded: true, valueText: 'Analytics & Reports' }
      ]
    },
    {
      id: '3',
      slug: 'business',
      name: 'Business',
      monthlyPriceInr: 9999,
      yearlyPriceInr: 95990,
      callMinutesIncluded: 10000,
      voiceAgentsLimit: 10,
      isPopular: false,
      ctaText: 'Get Started',
      ctaHref: '/book-demo?plan=business',
      displayOrder: 3,
      isActive: true,
      tagline: 'Comprehensive capabilities for high-volume sales and operations teams.',
      features: [
        { id: '10', planId: '3', featureId: 'f1', isIncluded: true, valueText: 'Up to 10,000 call minutes' },
        { id: '11', planId: '3', featureId: 'f2', isIncluded: true, valueText: '10 AI Voice Agents' },
        { id: '12', planId: '3', featureId: 'f3', isIncluded: true, valueText: 'Team Collaboration' },
        { id: '13', planId: '3', featureId: 'f4', isIncluded: true, valueText: 'Integrations (CRM, Calendar)' },
        { id: '14', planId: '3', featureId: 'f5', isIncluded: true, valueText: 'Priority Support' }
      ]
    },
    {
      id: '4',
      slug: 'enterprise',
      name: 'Enterprise',
      monthlyPriceInr: 0,
      yearlyPriceInr: 0,
      callMinutesIncluded: 0,
      voiceAgentsLimit: 0,
      isPopular: false,
      ctaText: 'Talk to Sales',
      ctaHref: '/contact?subject=Enterprise+Inquiry',
      displayOrder: 4,
      isActive: true,
      tagline: 'Dedicated infrastructure, custom integrations and guaranteed SLAs.',
      features: [
        { id: '15', planId: '4', featureId: 'f1', isIncluded: true, valueText: 'High-volume & custom needs' },
        { id: '16', planId: '4', featureId: 'f2', isIncluded: true, valueText: 'Unlimited Agents' },
        { id: '17', planId: '4', featureId: 'f3', isIncluded: true, valueText: 'Dedicated Infrastructure' },
        { id: '18', planId: '4', featureId: 'f4', isIncluded: true, valueText: 'Custom Integrations' },
        { id: '19', planId: '4', featureId: 'f5', isIncluded: true, valueText: 'SLA & Priority Support' }
      ]
    }
  ];

  const plans = (Array.isArray(initialPlans) && initialPlans.length > 0) ? initialPlans : defaultPlans;

  return (
    <div className="relative">
      {/* Header with Monthly/Yearly toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Usage-Based Telephony Pricing</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Simple &amp; Transparent Pricing
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Choose a plan that fits your business scale. Scale as you grow.
          </p>
        </div>

        {/* Billing cycle pill: Monthly / Yearly */}
        <div className="inline-flex items-center p-1 rounded-full bg-slate-200/90 border border-slate-300 self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-[#060b18] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#060b18] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Yearly</span>
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-400 text-[#060b18] text-[9px] font-extrabold shadow-sm">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* 4-Column Horizontal Grid Strictly Matching the Approved Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
        {plans.map((p) => {
          const isGrowth = !!p.isPopular;
          const monthlyPrice = Number(p.monthlyPriceInr) || 0;
          const yearlyPrice = Number(p.yearlyPriceInr) || 0;

          const displayPrice =
            monthlyPrice === 0
              ? 'Custom Pricing'
              : billingCycle === 'yearly'
              ? `₹${formatInr(Math.round(yearlyPrice / 12))}`
              : `₹${formatInr(monthlyPrice)}`;

          return (
            <div
              key={p.slug || p.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isGrowth
                  ? 'bg-gradient-to-b from-emerald-50/70 via-white to-white border-2 border-[#00f59b] shadow-[0_20px_45px_-10px_rgba(0,245,155,0.25)] ring-4 ring-emerald-500/10 hover:-translate-y-2'
                  : 'bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-slate-300 hover:-translate-y-1.5'
              }`}
            >
              {/* Popular Floating Badge on Growth Card */}
              {isGrowth && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00f59b] text-[#060b18] text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap z-20">
                  ⭐ MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-base font-extrabold text-slate-900">{p.name}</div>
                  {isGrowth && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </div>

                {/* Price Block */}
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {displayPrice}
                    </span>
                    {monthlyPrice > 0 && (
                      <span className="text-xs text-slate-500 font-medium">/mo</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && yearlyPrice > 0 && (
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      Billed ₹{formatInr(yearlyPrice)} annually
                    </div>
                  )}
                </div>

                {/* Features List with Soft Green Checks */}
                <div className="space-y-3 mb-8">
                  {Array.isArray(p.features) &&
                    p.features.map((f: any, fi: number) => (
                      <div key={f?.id || fi} className="flex items-start gap-2.5 text-xs text-slate-600 leading-snug">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-medium text-slate-700">{f?.valueText || f?.feature?.name || ''}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <Link
                href={p.ctaHref || `/book-demo?plan=${p.slug}`}
                className={`w-full py-3.5 px-4 rounded-full text-xs font-bold text-center transition-all block shadow-sm ${
                  isGrowth
                    ? 'bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] shadow-glow hover:shadow-glow-sm transform hover:scale-[1.02]'
                    : 'bg-[#0b1329] hover:bg-[#111e3f] text-white'
                }`}
              >
                {p.ctaText || 'Get Started'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

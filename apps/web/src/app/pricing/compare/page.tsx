'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Languages,
  Zap,
  Layers,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Sliders,
  HelpCircle
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';
import { ScrollReveal } from '../../../components/shared/ScrollReveal';

export default function PricingComparePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      slug: 'starter',
      name: 'Starter',
      badge: 'Pilot & Small Biz',
      tagline: 'Ideal for small businesses starting with voice automation.',
      monthlyPrice: 1499,
      yearlyPricePerMonth: 1199,
      yearlyTotal: 14390,
      minutes: '500 mins/mo',
      agents: '1 AI Agent',
      isPopular: false,
      ctaText: 'Get Started with Starter',
      ctaHref: '/book-demo?plan=starter'
    },
    {
      slug: 'growth',
      name: 'Growth',
      badge: 'Most Popular',
      tagline: 'Most popular plan for growing businesses scaling outreach.',
      monthlyPrice: 4999,
      yearlyPricePerMonth: 3999,
      yearlyTotal: 47990,
      minutes: '2,500 mins/mo',
      agents: '5 AI Agents',
      isPopular: true,
      ctaText: 'Start Free Trial',
      ctaHref: '/book-demo?plan=growth'
    },
    {
      slug: 'business',
      name: 'Business',
      badge: 'High Concurrency',
      tagline: 'High-throughput calling for scaling sales and support teams.',
      monthlyPrice: 9999,
      yearlyPricePerMonth: 7999,
      yearlyTotal: 95990,
      minutes: '10,000 mins/mo',
      agents: '10 AI Agents',
      isPopular: false,
      ctaText: 'Select Business Plan',
      ctaHref: '/book-demo?plan=business'
    },
    {
      slug: 'enterprise',
      name: 'Enterprise',
      badge: 'Carrier Custom',
      tagline: 'Carrier-grade SIP trunking, bespoke Indic AI & custom SLAs.',
      monthlyPrice: 0,
      yearlyPricePerMonth: 0,
      yearlyTotal: 0,
      minutes: 'Custom Volume',
      agents: 'Unlimited Agents',
      isPopular: false,
      ctaText: 'Talk to Enterprise Sales',
      ctaHref: '/contact?subject=Enterprise+Custom+Pricing'
    }
  ];

  const comparisonCategories = [
    {
      category: 'Calling & Concurrency Capacity',
      icon: PhoneCall,
      features: [
        {
          name: 'Included Call Minutes',
          desc: 'Connected inbound and outbound phone duration per month',
          values: {
            starter: '500 mins/mo',
            growth: '2,500 mins/mo',
            business: '10,000 mins/mo',
            enterprise: 'Unlimited / Custom Volume'
          }
        },
        {
          name: 'Active AI Voice Agents',
          desc: 'Concurrent independent bots with distinct personality profiles',
          values: {
            starter: '1 Agent',
            growth: '5 Agents',
            business: '10 Agents',
            enterprise: 'Unlimited Agents'
          }
        },
        {
          name: 'Concurrent Calling Channels',
          desc: 'Simultaneous telephone lines ringing and interacting at the exact same second',
          values: {
            starter: '5 lines',
            growth: '25 lines',
            business: '100 lines',
            enterprise: '1,000+ lines (Dedicated SIP)'
          }
        },
        {
          name: 'Overage Rate (Per Minute)',
          desc: 'Predictable per-minute fee for calls beyond included plan quota',
          values: {
            starter: '₹1.80 / min',
            growth: '₹1.50 / min',
            business: '₹1.20 / min',
            enterprise: 'Volume Discount Tier'
          }
        }
      ]
    },
    {
      category: 'Languages & Speech Intelligence',
      icon: Languages,
      features: [
        {
          name: 'Indian Languages & Dialects',
          desc: 'Trained Indic neural acoustic models with regional accent comprehension',
          values: {
            starter: 'Hindi & Indian English',
            growth: 'Hindi, Gujarati, English + 4 more',
            business: 'All 12+ Indian Languages',
            enterprise: 'All 12+ Indic + Custom Dialect Tuning'
          }
        },
        {
          name: 'Conversational Code-Mixing (Hinglish/Gujlish)',
          desc: 'Seamless mid-sentence switching between Hindi, English, and Gujarati',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Full-Duplex Interruption Handling',
          desc: 'Instant VAD halting AI speech mid-syllable when the human speaks',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Streaming Speech Latency',
          desc: 'Acoustic processing and neural TTS generation speed',
          values: {
            starter: '< 600ms',
            growth: '< 450ms',
            business: '< 400ms',
            enterprise: 'Ultra-low < 350ms Edge'
          }
        },
        {
          name: 'Enterprise Knowledge Base RAG',
          desc: 'Upload PDFs, price books, and FAQs for factual grounded answers without hallucinations',
          values: {
            starter: 'Up to 5 Documents',
            growth: 'Up to 25 Documents',
            business: 'Up to 100 Documents',
            enterprise: 'Unlimited Vectorized Corpus'
          }
        }
      ]
    },
    {
      category: 'Campaign Engines & CRM Sync',
      icon: Zap,
      features: [
        {
          name: 'Automated Outbound Campaigns',
          desc: 'Bulk outreach with speed-to-lead and automated list scheduling',
          values: {
            starter: 'Basic Campaign Scheduler',
            growth: 'Smart Retries & Speed-to-Lead',
            business: 'Multi-Campaign Parallelism',
            enterprise: 'Enterprise Cluster Orchestration'
          }
        },
        {
          name: 'Lead Intent Scoring (BANT Framework)',
          desc: 'Extract budget, decision authority, need, and timeline scores (0-100)',
          values: {
            starter: 'Basic Intent Flag',
            growth: 'Full BANT Scoring',
            business: 'Custom Qualification Scripting',
            enterprise: 'Dynamic Algorithmic Scoring'
          }
        },
        {
          name: 'Calendar Two-Way Booking',
          desc: 'Direct synchronization with Google Calendar, Outlook, and Calendly',
          values: {
            starter: false,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'CRM Integrations (HubSpot, Salesforce, Zoho)',
          desc: 'Automated dispatch of recordings, transcripts, and lead fields into contact records',
          values: {
            starter: 'CSV & Manual Webhook',
            growth: 'HubSpot & Zoho Sync',
            business: 'HubSpot, Salesforce, Zoho, LeadSquared',
            enterprise: 'Full Two-Way Sync + Custom ERP'
          }
        },
        {
          name: 'Post-Call WhatsApp & SMS Dispatch',
          desc: 'Automated delivery of brochures, payment links, and confirmation cards',
          values: {
            starter: false,
            growth: true,
            business: true,
            enterprise: true
          }
        }
      ]
    },
    {
      category: 'Telephony & Carrier Interconnects',
      icon: Layers,
      features: [
        {
          name: 'TRAI 140 Commercial Prefix Compliance',
          desc: 'Mandatory commercial calling prefix enforcement for consumer trust',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Real-Time DND (Do-Not-Disturb) Scrubbing',
          desc: 'Automatic NCPR registry exclusion before outbound calls initiate',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Calling Time-Window Hard Controls (9 AM - 9 PM)',
          desc: 'Statutory adherence prevents calls during restricted nighttime hours',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Bring-Your-Own-Carrier (BYOC / SIP Trunking)',
          desc: 'Connect your existing Tata Tele, Airtel IQ, Exotel, or Twilio trunks',
          values: {
            starter: false,
            growth: 'Add-on Supported',
            business: true,
            enterprise: 'Native Dedicated BYOC'
          }
        }
      ]
    },
    {
      category: 'Security, Compliance & Support',
      icon: ShieldCheck,
      features: [
        {
          name: 'Call Audio Recordings Vault & Diarization',
          desc: 'Encrypted cloud storage with audio waveforms and speaker timeline separation',
          values: {
            starter: '30-Day Retention',
            growth: '90-Day Retention',
            business: '365-Day Retention',
            enterprise: 'Custom Retention & Cold Storage'
          }
        },
        {
          name: 'Full-Text Bilingual Transcript Search',
          desc: 'Search keywords, customer objections, and competitor mentions',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'India DPDP Compliance & 256-Bit Encryption',
          desc: 'In-country data residency with automated PII masking and TLS 1.3',
          values: {
            starter: true,
            growth: true,
            business: true,
            enterprise: true
          }
        },
        {
          name: 'Customer Support & Guaranteed SLA',
          desc: 'Technical assistance channel and incident response commitment',
          values: {
            starter: 'Email Support (48h SLA)',
            growth: 'Priority Email & Chat (12h SLA)',
            business: 'Direct Phone & Slack (2h SLA)',
            enterprise: '24/7 Dedicated TAM & 99.99% Uptime'
          }
        }
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal direction="down">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Pricing Overview</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#00f59b] backdrop-blur-md">
              <Sliders className="w-3.5 h-3.5" />
              <span>Granular Features, Telephony &amp; Concurrency Matrix</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Compare TalkNex{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                Subscription Plans
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={150}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Detailed audit of concurrency channels, regional Indic models, CRM connectors, and enterprise telephony specifications.
            </p>
          </ScrollReveal>

          {/* Billing Cycle Switcher Toggle */}
          <ScrollReveal direction="up" delay={200}>
            <div className="pt-4 flex items-center justify-center">
              <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    billingCycle === 'yearly'
                      ? 'bg-[#00f59b] text-[#060b18] shadow-glow-sm font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>Annual Commitment</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#060b18] text-[#00f59b] text-[10px] font-extrabold uppercase tracking-wider">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 2. MASTER COMPARISON TABLE ================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] overflow-hidden mb-16 ring-1 ring-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                {/* Sticky Header Row */}
                <thead className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-xs">
                  <tr>
                    {/* Corner Cell */}
                    <th className="p-6 text-sm font-bold text-slate-900 w-[28%] bg-white/95 border-r border-slate-100">
                      <div className="text-base font-extrabold text-slate-900">Features &amp; Specifications</div>
                      <div className="text-xs text-slate-500 font-normal mt-1">
                        {billingCycle === 'yearly' ? 'Annual commitment (2 months free)' : 'Monthly flexible commitment'}
                      </div>
                    </th>

                    {/* 4 Plan Columns */}
                    {plans.map((p) => {
                      const isPopular = p.isPopular;
                      const displayPrice =
                        p.monthlyPrice === 0
                          ? 'Custom'
                          : billingCycle === 'yearly'
                          ? `₹${p.yearlyPricePerMonth.toLocaleString('en-IN')}`
                          : `₹${p.monthlyPrice.toLocaleString('en-IN')}`;

                      return (
                        <th
                          key={p.slug}
                          className={`p-6 text-center w-[18%] transition-colors relative ${
                            isPopular
                              ? 'bg-emerald-500/[0.05] border-x-2 border-emerald-500/30'
                              : 'bg-white/95 border-r border-slate-100'
                          }`}
                        >
                          {/* Top Tag for Popular Tier */}
                          {isPopular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#00f59b] text-[#060b18] text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#060b18]" />
                              <span>{p.badge}</span>
                            </div>
                          )}

                          <div className="text-lg font-extrabold text-slate-900">{p.name}</div>

                          <div className="mt-2 mb-1">
                            <span className="text-2xl font-extrabold text-slate-900">{displayPrice}</span>
                            {p.monthlyPrice > 0 && (
                              <span className="text-xs text-slate-500 font-medium"> /month</span>
                            )}
                          </div>

                          <div className="text-[11px] font-mono text-emerald-700 font-semibold mb-4">
                            {p.minutes}
                          </div>

                          <Link
                            href={p.ctaHref}
                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all block text-center ${
                              isPopular
                                ? 'bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] shadow-glow hover:shadow-glow-sm font-extrabold transform hover:-translate-y-0.5'
                                : 'bg-[#060b18] hover:bg-slate-800 text-white shadow-sm'
                            }`}
                          >
                            {isPopular ? 'Start Free Trial' : 'Select'}
                          </Link>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* Table Body with Categorized Sections */}
                <tbody>
                  {comparisonCategories.map((cat, catIdx) => {
                    const CatIcon = cat.icon;
                    return (
                      <React.Fragment key={catIdx}>
                        {/* Category Divider Header */}
                        <tr className="bg-slate-100/80 border-t-2 border-b border-slate-200">
                          <td
                            colSpan={5}
                            className="py-3 px-6 text-xs font-extrabold uppercase tracking-wider text-slate-800 bg-gradient-to-r from-slate-100 via-slate-50 to-white"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                                <CatIcon className="w-3.5 h-3.5" />
                              </div>
                              <span>{cat.category}</span>
                            </div>
                          </td>
                        </tr>

                        {/* Feature Rows */}
                        {cat.features.map((feature, fIdx) => (
                          <tr
                            key={fIdx}
                            className="border-b border-slate-150 hover:bg-slate-50/60 transition-colors group"
                          >
                            {/* Feature Title & Description */}
                            <td className="p-5 text-xs sm:text-sm font-medium text-slate-900 border-r border-slate-100">
                              <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {feature.name}
                              </div>
                              {feature.desc && (
                                <div className="text-[11px] text-slate-500 font-normal mt-0.5 leading-relaxed">
                                  {feature.desc}
                                </div>
                              )}
                            </td>

                            {/* 4 Plan Values */}
                            {plans.map((p) => {
                              const val = (feature.values as any)[p.slug];
                              const isPopular = p.isPopular;
                              const isBoolean = typeof val === 'boolean';
                              const isString = typeof val === 'string';

                              return (
                                <td
                                  key={p.slug}
                                  className={`p-5 text-center text-xs align-middle ${
                                    isPopular
                                      ? 'bg-emerald-500/[0.04] border-x-2 border-emerald-500/30 font-semibold'
                                      : 'border-r border-slate-100 text-slate-700'
                                  }`}
                                >
                                  {isBoolean ? (
                                    val ? (
                                      <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                                        <Check className="w-4 h-4 stroke-[2.5]" />
                                      </div>
                                    ) : (
                                      <span className="text-slate-300 font-bold text-lg select-none">
                                        —
                                      </span>
                                    )
                                  ) : isString ? (
                                    <span
                                      className={`text-xs px-2.5 py-1 rounded-lg inline-block leading-snug ${
                                        isPopular
                                          ? 'font-bold text-emerald-950 bg-emerald-100/70 border border-emerald-200'
                                          : 'font-semibold text-slate-800 bg-slate-100/90 border border-slate-200/60'
                                      }`}
                                    >
                                      {val}
                                    </span>
                                  ) : (
                                    <span className="text-slate-300 font-bold select-none text-base">
                                      —
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>

                {/* Table Footer Action Row */}
                <tfoot>
                  <tr className="bg-slate-50/80 border-t-2 border-slate-200">
                    <td className="p-6 text-xs text-slate-500 font-semibold border-r border-slate-100">
                      Need custom SIP concurrency or enterprise volume pricing?
                    </td>
                    {plans.map((p) => {
                      const isPopular = p.isPopular;
                      return (
                        <td
                          key={p.slug}
                          className={`p-6 text-center ${
                            isPopular ? 'bg-emerald-500/[0.05] border-x-2 border-emerald-500/30' : 'border-r border-slate-100'
                          }`}
                        >
                          <Link
                            href={p.ctaHref}
                            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all block text-center ${
                              isPopular
                                ? 'bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] shadow-glow font-extrabold'
                                : 'bg-[#060b18] hover:bg-slate-800 text-white'
                            }`}
                          >
                            {isPopular ? 'Start Free Trial' : 'Select'}
                          </Link>
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* ================= 3. QUICK DECISION ADVISORY ================= */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Starter Tier
              </span>
              <h3 className="font-bold text-slate-900 mb-2">Small Business Testing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perfect for solo founders, boutique clinics, and small teams testing AI voice qualification on pilot campaigns with 500 included minutes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border-2 border-emerald-500/40 shadow-soft-card relative">
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#00f59b] text-[#060b18] text-[9px] font-extrabold uppercase tracking-wider">
                Recommended
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                Growth Tier
              </span>
              <h3 className="font-bold text-slate-900 mb-2">Scaling Outreach Teams</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chosen by 75% of Indian sales organizations for speed-to-lead qualification, WhatsApp triggers, and automated calendar meeting bookings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Business Tier
              </span>
              <h3 className="font-bold text-slate-900 mb-2">High-Volume Operations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Designed for high-throughput contact centers requiring 100 concurrent lines, full two-way CRM syncing, and multi-department agent routing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                Enterprise Tier
              </span>
              <h3 className="font-bold text-slate-900 mb-2">Carrier &amp; Custom SLAs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For banks, insurance providers, and conglomerates bringing existing Tata/Airtel SIP trunks with custom Indic fine-tuning and 99.99% SLAs.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ================= 4. REASSURANCE & CONTACT BOX ================= */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl relative overflow-hidden bg-tech-grid flex flex-col md:flex-row items-center justify-between gap-8 mb-20 border border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#00f59b] mb-2 block">
                Enterprise Telephony Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Unsure Which Plan Fits Your Call Volume?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
                Our voice engineers will review your past call CDRs, lead conversion targets, and CRM requirements to architect the ideal telephony package.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors border border-white/15"
              >
                Talk to Voice Architect
              </Link>
              <Link
                href="/book-demo"
                className="px-7 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] font-bold text-xs shadow-glow transition-all"
              >
                Schedule Live Demonstration
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Banner */}
        <CtaBanner />
      </section>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mic,
  PhoneForwarded,
  Headphones,
  Languages,
  CheckCircle2,
  Calendar,
  LayoutGrid,
  BarChart3,
  ArrowRight,
  Sparkles,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Car,
  TrendingUp,
  Layers
} from 'lucide-react';

export function CapabilitiesAndUseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const capabilities = [
    {
      title: 'AI Voice Agents',
      desc: 'Deploy human-like voice agents that understand tone, emotion, and natural pauses.',
      metric: '<450ms Latency',
      icon: Mic,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      href: '/product/ai-voice-agents'
    },
    {
      title: 'Outbound Calling',
      desc: 'Automate high-volume lead outreach, follow-ups, and reminders without drop-offs.',
      metric: '10k+ Calls/Hr',
      icon: PhoneForwarded,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-200/80',
      href: '/product/outbound-calling'
    },
    {
      title: 'Inbound Support',
      desc: 'Handle 24/7 customer queries, call routing, and answers without wait queues.',
      metric: 'Zero Hold Time',
      icon: Headphones,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      href: '/product/inbound-calling'
    },
    {
      title: 'Multi-language',
      desc: 'Fluent speech in Hindi, Gujarati, Indian English, and regional dialect mixes.',
      metric: '10+ Languages',
      icon: Languages,
      iconColor: 'text-cyan-600 bg-cyan-50 border-cyan-200/80',
      href: '/product/ai-voice-agents#multilingual'
    },
    {
      title: 'Lead Qualification',
      desc: 'Score customer intent, capture budget and timeline, and push leads to CRM.',
      metric: 'Instant Sync',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      href: '/product/lead-qualification'
    },
    {
      title: 'Appointment Booking',
      desc: 'Coordinate schedules in live dialogue and book meetings into your calendar.',
      metric: 'Calendar Sync',
      icon: Calendar,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-200/80',
      href: '/product/appointment-booking'
    },
    {
      title: 'Integrations',
      desc: 'Connect seamlessly with HubSpot, Salesforce, Zoho, LeadSquared, and APIs.',
      metric: '50+ Apps',
      icon: LayoutGrid,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-200/80',
      href: '/product/integrations'
    },
    {
      title: 'Analytics & Reports',
      desc: 'Live call transcripts, sentiment scores, drop-off analytics, and audio replays.',
      metric: 'Live Insights',
      icon: BarChart3,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
      href: '/product/analytics'
    }
  ];

  const useCases = [
    {
      title: 'Real Estate',
      badge: 'PropTech',
      roi: '3x Site Visits',
      desc: 'Qualify prospective buyers, share brochures, and book weekend site visits.',
      href: '/use-cases/real-estate',
      icon: Building2,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=480&auto=format&fit=crop'
    },
    {
      title: 'Healthcare',
      badge: 'Clinics',
      roi: '40% Less No-Shows',
      desc: 'Automate doctor appointments, reminder calls, and post-consultation checkups.',
      href: '/use-cases/healthcare',
      icon: Stethoscope,
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=480&auto=format&fit=crop'
    },
    {
      title: 'Education',
      badge: 'EdTech',
      roi: '10k+ Calls/Day',
      desc: 'Counsel student applicants, verify eligibility, and boost admission attendance.',
      href: '/use-cases/education',
      icon: GraduationCap,
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=480&auto=format&fit=crop'
    },
    {
      title: 'E-commerce',
      badge: 'Retail',
      roi: 'COD Verified',
      desc: 'Confirm COD order addresses, provide dispatch updates, and win back carts.',
      href: '/use-cases/ecommerce',
      icon: ShoppingBag,
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=480&auto=format&fit=crop'
    },
    {
      title: 'Automotive',
      badge: 'Dealerships',
      roi: '+45% Test Drives',
      desc: 'Generate test drive bookings, service reminders, and warranty follow-ups.',
      href: '/use-cases/automotive',
      icon: Car,
      imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=480&auto=format&fit=crop'
    },
    {
      title: 'Enterprise Workflows',
      badge: 'BFSI & More',
      roi: 'Custom Flows',
      desc: 'Tailored conversation flows for banking, logistics, insurance, and services.',
      href: '/use-cases',
      icon: Sparkles,
      imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=480&auto=format&fit=crop'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-slate-50/80 py-24 sm:py-28 border-b border-slate-200/90 overflow-hidden"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Balanced 2-Column Grid (6 cols left, 6 cols right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">
          
          {/* ================= Left Column: Platform Capabilities ================= */}
          <div>
            <div
              className={`mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-emerald-800 mb-3.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>Next-Generation Voice Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-3">
                Everything You Need for<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600">
                  AI-Powered Business Conversations
                </span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                A complete, end-to-end platform to build, deploy, train, and scale human-like AI voice agents across all your customer touchpoints.
              </p>
            </div>

            {/* 8 Capability Cards in a 2x4 Spacious Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {capabilities.map((c, i) => {
                const Icon = c.icon;
                const delayMs = i * 50;

                return (
                  <Link
                    key={i}
                    href={c.href}
                    style={{
                      transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                      transitionDuration: '500ms',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)'
                    }}
                    className={`group relative p-4 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                      isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
                    }`}
                  >
                    <div>
                      {/* Top Row: Icon + Metric Pill */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-9 h-9 rounded-xl ${c.iconColor} border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold tracking-tight">
                          {c.metric}
                        </span>
                      </div>

                      {/* Content */}
                      <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {c.desc}
                      </p>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-600">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ================= Right Column: Real Business Use Cases ================= */}
          <div>
            <div
              className={`mb-8 transition-all duration-700 delay-150 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-xs font-bold text-teal-800 mb-3.5 shadow-sm">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                <span>Industry-Proven Outcomes</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-3">
                Real Business Use Cases
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg">
                See how forward-thinking Indian enterprises deploy TalkNex to automate high-touch client conversations with proven ROI.
              </p>
            </div>

            {/* 6 Use Case Cards in a 2x3 Spacious Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useCases.map((u, i) => {
                const Icon = u.icon;
                const delayMs = 100 + i * 60;

                return (
                  <Link
                    key={i}
                    href={u.href}
                    style={{
                      transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                      transitionDuration: '500ms',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)'
                    }}
                    className={`group relative rounded-2xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden justify-between ${
                      isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
                    }`}
                  >
                    {/* Visual Photo Header with 16:9 Aspect Ratio */}
                    <div className="h-32 w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={u.imageUrl}
                        alt={u.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/15 shadow-sm">
                          {u.badge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-[#060b18] text-[10px] font-extrabold shadow-sm">
                          {u.roi}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Below Photo */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                            {u.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {u.desc}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-600 group-hover:text-emerald-700">
                        <span>View Workflow</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Catalog Link */}
            <div
              className={`mt-6 transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href="/use-cases"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-700 shadow-sm transition-all group"
              >
                <span>Explore all industry voice workflows</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Bot,
  PhoneCall,
  Headphones,
  UserCheck,
  CalendarCheck,
  BarChart3,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Languages,
  CheckCircle2,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';

export default function ProductIndexPage() {
  const [filterCategory, setFilterCategory] = useState<'all' | 'speech' | 'campaign' | 'data'>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.08 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const products = [
    {
      title: 'AI Voice Agents',
      slug: 'ai-voice-agents',
      category: 'speech',
      icon: Bot,
      badge: 'Core Engine',
      metric: '<450ms Latency',
      headline: 'Autonomous Human-like Voice Agents with Sub-450ms Streaming Latency',
      description:
        'Deploy speech agents that converse fluently in Hindi, Gujarati, English, and regional Indian languages with natural prosody and full-duplex interruption handling.',
      capabilities: ['Sub-450ms streaming latency', 'Bilingual code-mixing (Hinglish/Gujlish)', 'Active emotional prosody modulation', 'Full-duplex instant interruption listening']
    },
    {
      title: 'Outbound Calling Campaigns',
      slug: 'outbound-calling',
      category: 'campaign',
      icon: PhoneCall,
      badge: 'High Throughput',
      metric: '10,000+ Calls/Hr',
      headline: 'High-Throughput Autonomous Outbound Outreach at Enterprise Scale',
      description:
        'Trigger thousands of automated outbound qualification and follow-up calls simultaneously with TRAI 140-series compliance and DND scrubbing.',
      capabilities: ['Sub-30 second instant speed-to-lead', 'Automatic DND & TRAI 140 scrubbing', 'Smart retry scheduling & voicemail detection', 'Direct multi-channel WhatsApp sync']
    },
    {
      title: 'Inbound AI Receptionist',
      slug: 'inbound-calling',
      category: 'speech',
      icon: Headphones,
      badge: '24/7 Operations',
      metric: '0s Queue Time',
      headline: '24/7 Zero-Wait Inbound Call Reception & Intelligent Routing',
      description:
        'Answer every inbound telephone call on the first ring. Resolve customer queries, provide order updates, and route calls with context to human specialists.',
      capabilities: ['Zero caller queue hold times', 'Multi-department contextual routing', 'Instant CRM identity lookup', 'Warm transfer with live transcript']
    },
    {
      title: 'Lead Qualification & Scoring',
      slug: 'lead-qualification',
      category: 'campaign',
      icon: UserCheck,
      badge: 'Revenue Engine',
      metric: 'BANT Framework',
      headline: 'Real-Time Intent Scoring & Automated CRM Field Injection',
      description:
        'Verify buyer budgets, timelines, and decision authority during live conversations. Instantly filter and push qualified leads into your CRM.',
      capabilities: ['BANT qualification framework', 'Dynamic buyer intent scoring (0-100)', 'Real-time webhook triggers', 'Custom qualification questionnaires']
    },
    {
      title: 'Appointment Booking',
      slug: 'appointment-booking',
      category: 'campaign',
      icon: CalendarCheck,
      badge: 'Calendar Sync',
      metric: 'Two-Way Sync',
      headline: 'Direct Two-Way Calendar Booking via Phone Conversation',
      description:
        'Let conversational voice bots query live availability and lock meetings directly into Google Calendar, Outlook, and Calendly without double-booking.',
      capabilities: ['Two-way real-time calendar availability', 'Automated WhatsApp & SMS reminders', 'Voice-driven rescheduling & cancellation', 'Timezone-aware scheduling']
    },
    {
      title: 'Analytics & Conversation Insights',
      slug: 'analytics',
      category: 'data',
      icon: BarChart3,
      badge: 'Intelligence',
      metric: 'Sentiment Heatmap',
      headline: 'Deep Call Transcripts, Audio Recording & Sentiment Analysis',
      description:
        'Gain total visibility into call duration, customer sentiment, objection reasons, and agent conversion rates through unified real-time dashboards.',
      capabilities: ['Full-text bilingual transcript search', 'Call sentiment & objection heatmaps', 'Conversion rate funnel analytics', 'Per-agent performance benchmarks']
    },
    {
      title: 'Ecosystem Integrations',
      slug: 'integrations',
      category: 'data',
      icon: LayoutGrid,
      badge: 'Extensibility',
      metric: 'Pre-Built Connectors',
      headline: 'Native Connections with HubSpot, Salesforce, Zoho & Webhooks',
      description:
        'Stream call audio, transcripts, and lead fields into your CRM, WhatsApp Business, and custom backend APIs via enterprise webhooks.',
      capabilities: ['Pre-built connectors for top Indian CRMs', 'Real-time JSON webhook dispatch', 'Cloud telephony BYOC (Tata, Exotel, Airtel)', 'RESTful developer APIs']
    }
  ];

  const filteredProducts = filterCategory === 'all'
    ? products
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM SUITE HERO ================= */}
      <section className="relative pt-32 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#00f59b]" />
            <span>Complete Voice Automation Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
            The TalkNex{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Enterprise Platform Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            A unified, low-latency conversational platform uniting neural speech recognition, bilingual Indian language models, high-concurrency telephony, and intelligent CRM automation.
          </p>

          {/* Quick Technical Architecture Stat Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-300">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[#00f59b] font-bold">&lt; 450ms</span> Response Latency
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-cyan-400 font-bold">12+</span> Indian Languages
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[#00f59b] font-bold">100%</span> TRAI 140 Compliant
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-purple-400 font-bold">99.99%</span> Telephony Uptime
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE MODULE DIRECTORY ================= */}
      <section ref={sectionRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Filter Tabs */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'all'
                ? 'bg-[#060b18] text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            All Modules ({products.length})
          </button>
          <button
            onClick={() => setFilterCategory('speech')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'speech'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Speech &amp; Intelligence
          </button>
          <button
            onClick={() => setFilterCategory('campaign')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'campaign'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Campaign Engines
          </button>
          <button
            onClick={() => setFilterCategory('data')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterCategory === 'data'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            Telemetry &amp; Integrations
          </button>
        </div>

        {/* Main Product Cards List with Staggered Scroll Animation */}
        <div className="space-y-8">
          {filteredProducts.map((p, idx) => {
            const Icon = p.icon;
            const delayMs = idx * 60;

            return (
              <div
                key={p.slug}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
                }}
                className={`p-7 sm:p-9 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-6 scale-98 pointer-events-none'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                            {p.badge}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                            {p.metric}
                          </span>
                        </div>
                        <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {p.title}
                        </h2>
                      </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2.5">
                      {p.headline}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {p.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {p.capabilities.map((cap, ci) => (
                        <div key={ci} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between h-full pt-4 lg:pt-0 lg:pl-6 lg:border-l border-slate-100">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 mb-6">
                      <div className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>Enterprise Production SLA</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Ready to deploy in minutes with native carrier SIP trunking and complete CRM field mapping.
                      </p>
                    </div>

                    <Link
                      href={`/product/${p.slug}`}
                      className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-[#060b18] hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md group/btn"
                    >
                      <span>Explore {p.title}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}

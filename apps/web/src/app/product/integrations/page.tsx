'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutGrid,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  PhoneCall,
  MessageSquare,
  Zap,
  Globe,
  Check,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function ProductIntegrationsPage() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      name: 'CRM & Lead Management',
      description: 'Stream structured BANT lead parameters, call audio recordings, and bilingual transcripts directly into customer contact records.',
      tools: ['Salesforce', 'HubSpot', 'Zoho CRM', 'LeadSquared', 'Pipedrive'],
      icon: Database,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      badge: 'Two-Way Sync'
    },
    {
      name: 'Telephony & Carrier SIP Trunks',
      description: 'Bring your existing business landlines or mobile numbers via carrier-grade SIP trunking with official commercial 140 CLI support.',
      tools: ['Tata Tele Business', 'Airtel IQ', 'Exotel', 'Twilio', 'Asterisk / FreePBX'],
      icon: PhoneCall,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80',
      badge: 'BYOC Telephony'
    },
    {
      name: 'Messaging & Omnichannel Alerts',
      description: 'Trigger automated WhatsApp product brochures, SMS confirmation cards, and email calendar invites immediately post-call.',
      tools: ['WhatsApp Business API', 'Gupshup', 'Karix', 'Interakt', 'SendGrid'],
      icon: MessageSquare,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
      badge: 'Instant Dispatch'
    },
    {
      name: 'Webhooks & Custom APIs',
      description: 'Real-time JSON webhook dispatch on call initiated, answered, completed, and qualified with HMAC signature security.',
      tools: ['Custom HTTPS Endpoints', 'Zapier', 'Make / Integromat', 'AWS Lambda', 'Google Cloud Functions'],
      icon: Code2,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
      badge: '<100ms Dispatch'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
                <LayoutGrid className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Unified Telephony &amp; SaaS Connectivity</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Native Integrations with Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  Entire Tech Stack
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Connect TalkNex with your CRM, cloud telephony carrier, WhatsApp Business API, and internal data lakes. Zero complex custom telephony code required.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">50+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Pre-Built Connectors</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">&lt;100ms</div>
                  <div className="text-[11px] text-slate-400 font-medium">Webhook Latency</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">BYOC</div>
                  <div className="text-[11px] text-slate-400 font-medium">Carrier Support</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/integrations"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Explore Integrations Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/book-demo"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  Request Custom Connector
                </Link>
              </div>
            </div>

            {/* Right Column: Live Integration Terminal Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Connected Telemetry Mesh</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    All Systems Operational
                  </span>
                </div>

                {/* Live Integrations Feed */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#060b18] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div>
                        <div className="font-bold text-white">HubSpot CRM Connector</div>
                        <div className="text-[10px] text-slate-400">Bidirectional contact &amp; call transcript sync</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-[10px]">Connected (0.12s)</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#060b18] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-[#00f59b]" />
                      <div>
                        <div className="font-bold text-white">Tata Tele SIP Carrier Trunk</div>
                        <div className="text-[10px] text-slate-400">140 commercial CLI registration active</div>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-[10px]">Carrier Active</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#060b18] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <div className="font-bold text-white">WhatsApp Business API</div>
                        <div className="text-[10px] text-slate-400">Automatic brochure &amp; calendar card dispatch</div>
                      </div>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold text-[10px]">100% Delivery</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#060b18] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-400" />
                      <div>
                        <div className="font-bold text-white">Custom Webhook Dispatcher</div>
                        <div className="text-[10px] text-slate-400">JSON payload on call completed &amp; scored</div>
                      </div>
                    </div>
                    <span className="text-indigo-400 font-mono font-bold text-[10px]">200 OK</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">HMAC SHA-256 Encrypted</span>
                  <span className="font-mono">Security: Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. INTEGRATION CATEGORIES GRID WITH SCROLL POPUP ================= */}
      <section ref={sectionRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Plug-and-Play Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Zero-Code Integration with Your Critical Tools
          </h2>
          <p className="text-sm text-slate-600">
            Deploy in minutes with pre-built connectors or use our developer-friendly webhooks and REST APIs.
          </p>
        </div>

        {/* 4 Category Cards with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {categories.map((c, i) => {
            const Icon = c.icon;
            const delayMs = 100 + i * 100;

            return (
              <div
                key={i}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
                }}
                className={`group p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${c.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {c.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {c.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {c.tools.map((t, ti) => (
                      <span
                        key={ti}
                        className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Pre-Built &amp; Verified</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}

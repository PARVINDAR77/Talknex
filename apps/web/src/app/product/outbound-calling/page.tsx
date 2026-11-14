'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  PhoneForwarded,
  Sliders,
  Send,
  Zap,
  Check,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function OutboundCallingPage() {
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

  const features = [
    {
      title: 'Instant Lead Contact (<30s)',
      desc: 'Connect with prospective buyers within 30 seconds of web form or Meta Ad submission when buyer intent and recall are at their absolute peak.',
      metric: '<30s Speed-to-Lead',
      icon: Clock,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    },
    {
      title: 'TRAI & 140-Series Compliance',
      desc: 'Automatic Do-Not-Disturb (DND) scrubbing, calling time-window enforcement (9 AM - 9 PM), and support for official commercial telephony headers.',
      metric: '100% TRAI Compliant',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80'
    },
    {
      title: 'Dynamic Multi-Channel Sync',
      desc: 'Trigger instant WhatsApp product brochures, SMS confirmation summaries, and calendar invites immediately following the conversation.',
      metric: 'Omnichannel Sync',
      icon: Send,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80'
    },
    {
      title: 'Smart Cadence & Redialing',
      desc: 'Automatically re-attempt unanswered or busy numbers with optimal time-of-day cadence and intelligent voicemail detection.',
      metric: 'Smart Retry',
      icon: PhoneForwarded,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80'
    },
    {
      title: 'Real-Time Intent Scoring',
      desc: 'Extract caller requirements, purchase timeline, and budget parameters into structured CRM fields during live conversations.',
      metric: 'BANT Scoring',
      icon: Sliders,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    },
    {
      title: 'Warm Human Agent Escalation',
      desc: 'Transfer high-intent hot buyers directly to senior sales executives with full audio context, customer sentiment, and conversation notes.',
      metric: 'Warm Transfer',
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-teal-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
                <PhoneCall className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>High-Throughput Autonomous Outbound Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Autonomous Outbound Calling{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  at Enterprise Scale
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Reach thousands of inbound leads, pending applicants, or renewal clients concurrently. TalkNex voice agents qualify buyer intent, answer queries, and schedule meetings with zero human agent burnout.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">10k+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Calls / Hour</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">&lt;30s</div>
                  <div className="text-[11px] text-slate-400 font-medium">Speed to Lead</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">TRAI Compliant</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Launch Outbound Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  Calculate Outreach ROI
                </Link>
              </div>
            </div>

            {/* Right Column: Live Outbound Dialer Console Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Active Campaign Monitor</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    TRAI 140 Active
                  </span>
                </div>

                {/* Campaign Progress Gauge */}
                <div className="p-4 rounded-2xl bg-[#060b18] border border-white/5 mb-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-300 font-bold">Real Estate Q4 Outreach</span>
                    <span className="text-[#00f59b] font-mono font-extrabold">12,450 / 15,000 (83%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-[#00f59b] rounded-full w-[83%] animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between mt-3 text-[11px] text-slate-400 font-mono">
                    <span>Speed: 3,200 Calls/Hr</span>
                    <span className="text-emerald-400 font-bold">Answer Rate: 78.4%</span>
                  </div>
                </div>

                {/* Live Call Activity Log */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-mono text-slate-300">+91 98250 •••••</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[11px]">Site Visit Booked (Sat 2 PM)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="font-mono text-slate-300">+91 99099 •••••</span>
                    </div>
                    <span className="text-cyan-400 font-medium text-[11px]">WhatsApp Brochure Sent</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span className="font-mono text-slate-400">+91 97241 •••••</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">DND Scrubbed • Logged</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CAPABILITIES GRID WITH SCROLL POPUP ================= */}
      <section ref={sectionRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>High-Yield Telephony</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Engineered for Maximum Contact Rates &amp; Compliance
          </h2>
          <p className="text-sm text-slate-600">
            Everything your sales and operations teams need to execute enterprise voice outreach with zero friction.
          </p>
        </div>

        {/* 6 Feature Cards with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f, i) => {
            const Icon = f.icon;
            const delayMs = 80 + i * 80;

            return (
              <div
                key={i}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
                }}
                className={`group p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${f.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {f.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Outbound Standard</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Campaign Workflow */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl mb-20 relative overflow-hidden bg-tech-grid border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00f59b] mb-2 block">
              Automated Outbound Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              From Lead Capture to Qualified Sales Meeting in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">01</div>
              <div className="text-white font-bold text-sm mb-2">Ingestion &amp; DND</div>
              <p className="text-slate-400 leading-relaxed">Instant webhook trigger from Facebook Ads, web forms, or CSV with real-time TRAI DND filter.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">02</div>
              <div className="text-white font-bold text-sm mb-2">Sub-30s Dialing</div>
              <p className="text-slate-400 leading-relaxed">Calls prospect within 30 seconds via 140 commercial CLI when interest is warmest.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">03</div>
              <div className="text-white font-bold text-sm mb-2">BANT Qualification</div>
              <p className="text-slate-400 leading-relaxed">Conversational agent verifies budget, purchase timeline, and books meeting slots.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">04</div>
              <div className="text-white font-bold text-sm mb-2">CRM &amp; WhatsApp</div>
              <p className="text-slate-400 leading-relaxed">Syncs call audio and score to CRM; instantly sends meeting confirmation via WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Sliders,
  Database,
  BarChart2,
  FileCheck2,
  Check,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function LeadQualificationPage() {
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

  const bantSteps = [
    {
      letter: 'B',
      title: 'Budget Verification',
      desc: 'Verify purchase budget range in local currency conversationally without awkward robotic questions.',
      metric: 'Budget Qualified',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    },
    {
      letter: 'A',
      title: 'Authority Check',
      desc: 'Identify if the caller is the primary decision maker, co-buyer, or corporate executive authorized to close.',
      metric: 'Decision Authority',
      color: 'bg-teal-500/10 text-teal-600 border-teal-500/20'
    },
    {
      letter: 'N',
      title: 'Need Discovery',
      desc: 'Probe core pain points, property unit preferences, vehicle specs, or enterprise software requirements.',
      metric: 'Need Verified',
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20'
    },
    {
      letter: 'T',
      title: 'Timeline to Purchase',
      desc: 'Ascertain immediate readiness (this month) versus casual exploration (next year) to prioritize high-intent pipeline.',
      metric: 'Timeline Locked',
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20'
    }
  ];

  const features = [
    {
      title: 'Dynamic Intent Scoring (0-100)',
      desc: 'Objective algorithms evaluate vocal tone, urgency keywords, and answer quality into a standardized 100-point score.',
      icon: Target,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Real-Time CRM Field Injection',
      desc: 'Inject structured parameters directly into custom fields in HubSpot, Salesforce, Zoho, LeadSquared, and custom CRMs.',
      icon: Database,
      color: 'bg-teal-50 text-teal-600'
    },
    {
      title: 'Custom Qualification Scripts',
      desc: 'Define custom qualification questions, conditional branching logic, and required verification criteria per campaign.',
      icon: Sliders,
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      title: 'Bilingual Call Transcripts & Audio',
      desc: 'Every qualified lead arrives in your CRM alongside timestamped bilingual transcripts and downloadable audio recordings.',
      icon: FileCheck2,
      color: 'bg-indigo-50 text-indigo-600'
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
                <UserCheck className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Automated Sales Pipeline Acceleration</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Real-Time Lead Qualification &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  Intent Scoring
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Stop wasting senior sales hours on unverified leads. TalkNex conversational voice agents extract buyer intent parameters, score leads objectively, and push structured data directly into your CRM.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">94%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Scoring Accuracy</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">3.8x</div>
                  <div className="text-[11px] text-slate-400 font-medium">Sales Velocity</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">Instant</div>
                  <div className="text-[11px] text-slate-400 font-medium">CRM Webhook Sync</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Schedule Qualification Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  See Qualification Plans
                </Link>
              </div>
            </div>

            {/* Right Column: Live Intent Scoring Engine Console */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">BANT Intent Engine</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    Live Call In Progress
                  </span>
                </div>

                {/* Scored Lead Card */}
                <div className="p-4 rounded-2xl bg-[#060b18] border border-white/5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Rakesh Sharma</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00f59b] text-[10px] font-bold">
                      Score: 94/100 (Hot Lead 🔥)
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">Prospect: 3 BHK SG Highway Project • Ahmedabad</div>
                </div>

                {/* BANT Evaluation Matrix */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Budget Check: ₹1.2 Cr - ₹1.5 Cr</span>
                    <span className="text-emerald-400 font-bold text-[11px]">✓ Verified</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Authority: Sole Decision Maker</span>
                    <span className="text-emerald-400 font-bold text-[11px]">✓ Confirmed</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Need: Ready-to-Move-In Unit</span>
                    <span className="text-emerald-400 font-bold text-[11px]">✓ Matched</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Timeline: Ready within 30 Days</span>
                    <span className="text-emerald-400 font-bold text-[11px]">✓ High Urgency</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">Pushed to Salesforce CRM</span>
                  <span className="font-mono">Sync: 0.12s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. BANT FRAMEWORK DEEP DIVE WITH SCROLL POPUP ================= */}
      <section ref={sectionRef} className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Sales Qualification</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Objective BANT Qualification on Every Single Call
          </h2>
          <p className="text-sm text-slate-600">
            Extract structured buyer signals conversationally while maintaining natural, friendly dialogue.
          </p>
        </div>

        {/* 4 BANT Cards with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {bantSteps.map((b, i) => {
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
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold text-xl border shadow-sm ${b.color}`}>
                      {b.letter}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {b.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>BANT Signal</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Qualification Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((f, i) => {
            const Icon = f.icon;
            const delayMs = 120 + i * 80;

            return (
              <div
                key={i}
                style={{
                  transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
                }}
                className={`p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-lg transition-all duration-300 ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-6 scale-98 pointer-events-none'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-2">{f.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
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

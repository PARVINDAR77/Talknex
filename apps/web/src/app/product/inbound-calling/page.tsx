'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Headphones,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Check,
  MessageSquare,
  Activity,
  Layers
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function InboundCallingPage() {
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

  const capabilities = [
    {
      title: 'Zero Caller Hold Time',
      desc: 'Never let customers wait in frustrating queues or abandon calls during unexpected inquiry surges. Every call answered on the first ring.',
      metric: '0s Queue Time',
      icon: Zap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    },
    {
      title: '24/7/365 Receptionist Coverage',
      desc: 'Capture late-night emergency queries, weekend bookings, and holiday support calls with 100% uptime and full conversational comprehension.',
      metric: '24/7 Availability',
      icon: Clock,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    },
    {
      title: 'Smart Human Warm Transfer',
      desc: 'Seamlessly forward VIP or complex escalations to human specialists alongside live audio transcripts and complete customer context.',
      metric: 'Live Context Handover',
      icon: UserCheck,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80'
    },
    {
      title: 'Enterprise Knowledge RAG Engine',
      desc: 'Answer complex product specs, order tracking queries, warranty policies, and clinic hours accurately from your uploaded knowledge bases.',
      metric: 'Zero Hallucinations',
      icon: HelpCircle,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80'
    },
    {
      title: 'BYOC & SIP Carrier Integration',
      desc: 'Bring your existing phone numbers from Tata Tele, Airtel, Exotel, or Twilio with seamless SIP trunk forwarding and caller ID preservation.',
      metric: 'BYOC Ready',
      icon: PhoneCall,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80'
    },
    {
      title: 'Real-Time CRM Identity Lookup',
      desc: 'Recognizes returning customers by phone number, greeting them by name and referencing active service tickets or previous orders.',
      metric: 'Personalized Greeting',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ================= 1. PREMIUM HERO SECTION ================= */}
      <section className="relative pt-32 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-[480px] h-[480px] bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-indigo-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
                <Headphones className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Autonomous Inbound Reception Architecture</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                24/7 Inbound AI Receptionist with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  Zero Wait Time
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Eliminate traditional keypad trees. Answer every inbound telephone call on the first ring with an intelligent voice agent that understands caller intent, answers questions from your docs, and books meetings.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">0s</div>
                  <div className="text-[11px] text-slate-400 font-medium">Caller Wait Time</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">1st Ring</div>
                  <div className="text-[11px] text-slate-400 font-medium">Instant Answer</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">98.6%</div>
                  <div className="text-[11px] text-slate-400 font-medium">FCR Accuracy</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Test Inbound Receptionist</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  View Inbound Plans
                </Link>
              </div>
            </div>

            {/* Right Column: Live Inbound Console Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Inbound Call Terminal</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    Queue: 0 Wait
                  </span>
                </div>

                {/* Live Caller Card */}
                <div className="p-4 rounded-2xl bg-[#060b18] border border-white/5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">● Active Call • 00:00:38</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">HubSpot Matched</span>
                  </div>
                  <div className="text-sm font-extrabold text-white">Caller: Priya Mehta (+91 98251 •••••)</div>
                  <div className="text-xs text-slate-400 mt-1">Intent: Appointment Reschedule Request</div>
                </div>

                {/* Real-Time Resolution Flow */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Caller Speech</span>
                    &ldquo;Can I move my consultation from Friday to Saturday at 3 PM?&rdquo;
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-100">
                    <span className="text-[10px] font-mono text-[#00f59b] block mb-0.5">TalkNex AI Action</span>
                    &ldquo;Calendar checked: Dr. Sharma is available Saturday 3 PM. Rescheduled &amp; WhatsApp confirmation dispatched!&rdquo;
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">Auto-Resolved without Queue</span>
                  <span className="font-mono">FCR: Success</span>
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
            <span>Always-On Front Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Empower Your Front Desk with Autonomous Intelligence
          </h2>
          <p className="text-sm text-slate-600">
            Handle infinite simultaneous inbound calls, route contextually to human agents, and guarantee zero abandoned calls.
          </p>
        </div>

        {/* 6 High-Impact Inbound Cards with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
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
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${c.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {c.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Inbound Standard</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Inbound Resolution Architecture */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl mb-20 relative overflow-hidden bg-tech-grid border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00f59b] mb-2 block">
              Autonomous Inbound Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How TalkNex Handles Inbound Telephone Calls
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">01</div>
              <div className="text-white font-bold text-sm mb-2">First-Ring Ingestion</div>
              <p className="text-slate-400 leading-relaxed">Answers immediately with zero hold queue, greeting the caller in their preferred dialect.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">02</div>
              <div className="text-white font-bold text-sm mb-2">CRM Context Lookup</div>
              <p className="text-slate-400 leading-relaxed">Instantly checks customer record, past purchases, open tickets, and appointment status.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">03</div>
              <div className="text-white font-bold text-sm mb-2">Knowledge RAG</div>
              <p className="text-slate-400 leading-relaxed">Resolves questions regarding inventory, warranties, or services directly from your uploaded docs.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">04</div>
              <div className="text-white font-bold text-sm mb-2">Action / Warm Transfer</div>
              <p className="text-slate-400 leading-relaxed">Dispatches WhatsApp confirmation or transfers VIP cases to live specialists with full transcript.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Send,
  RefreshCw,
  Bell,
  Users,
  Check,
  CalendarDays,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function AppointmentBookingPage() {
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
      title: 'Two-Way Live Calendar Sync',
      desc: 'Query real-time calendar availability across your sales, clinic, or consulting team, preventing conflicting bookings or double-allocations.',
      metric: 'Google & Outlook Sync',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    },
    {
      title: 'Bilingual Time Negotiation',
      desc: 'Conversational agent negotiates suitable slots naturally: "क्या आप शनिवार सुबह 11 बजे या दोपहर 3 बजे आ सकते हैं?"',
      metric: 'Natural Scheduling',
      icon: Clock,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80'
    },
    {
      title: 'Automated Multi-Channel Reminders',
      desc: 'Send instant WhatsApp confirmation cards with GPS location links, and trigger proactive voice reminder calls 24 hours prior.',
      metric: '40% Less No-Shows',
      icon: Bell,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    },
    {
      title: 'Voice Rescheduling & Cancellations',
      desc: 'Customers can call anytime to effortlessly shift, reschedule, or cancel appointments without speaking to busy front-desk staff.',
      metric: 'Zero Staff Burden',
      icon: RefreshCw,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80'
    },
    {
      title: 'Multi-Executive Routing',
      desc: 'Automatically round-robin or skill-route bookings to available sales reps based on geography, project tier, or language preference.',
      metric: 'Round-Robin Routing',
      icon: Users,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80'
    },
    {
      title: 'Timezone-Aware Global Scheduling',
      desc: 'Accurately convert caller timezones for NRI investors and international clients with automatic daylight-saving adjustment.',
      metric: 'Global Timezones',
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
          <div className="absolute top-24 right-1/4 w-[480px] h-[480px] bg-teal-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Pitch & CTAs */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#00f59b] mb-6 backdrop-blur-md">
                <CalendarCheck className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Autonomous Calendar Scheduling Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Direct Two-Way Calendar Booking{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  via Phone Conversation
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Let AI voice agents check live availability in Google Calendar, Outlook, and Calendly. Book site visits, clinical consultations, and sales demos in real time without human coordination.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">0%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Double-Bookings</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">40% Less</div>
                  <div className="text-[11px] text-slate-400 font-medium">No-Show Rates</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">Instant</div>
                  <div className="text-[11px] text-slate-400 font-medium">WhatsApp Sync</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Test Voice Scheduling</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  View Calendar Integration Plans
                </Link>
              </div>
            </div>

            {/* Right Column: Live Calendar Booking Mockup */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Live Calendar Terminal</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    Google Calendar Synced
                  </span>
                </div>

                {/* Slot Selection Grid */}
                <div className="p-4 rounded-2xl bg-[#060b18] border border-white/5 mb-4">
                  <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
                    <span>Available Slots (Tomorrow):</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Dr. Sharma OPD</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-center line-through">
                      10:00 AM (Occupied)
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-950/60 border border-[#00f59b] text-emerald-300 font-bold text-center">
                      10:30 AM (Selected ✓)
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-center">
                      02:00 PM (Available)
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-center">
                      04:30 PM (Available)
                    </div>
                  </div>
                </div>

                {/* Instant WhatsApp Dispatch Preview */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-100">
                  <div className="flex items-center gap-2 mb-1 text-[11px] font-bold text-[#00f59b]">
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Instant WhatsApp Summary Dispatched:</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    &ldquo;Appointment confirmed for Sat 10:30 AM. Location: SG Highway Clinic. Tap to add to Google Calendar.&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">Two-Way Live Sync Active</span>
                  <span className="font-mono">Conflict Check: Pass</span>
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
            <span>Frictionless Scheduling</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Fill Your Appointment Calendar Automatically
          </h2>
          <p className="text-sm text-slate-600">
            Never lose a hot prospect to endless email back-and-forth or missed front-desk callbacks.
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
                  <span>Calendar Standard</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Scheduling Flow */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl mb-20 relative overflow-hidden bg-tech-grid border border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00f59b] mb-2 block">
              Automated Booking Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              From Live Phone Call to Confirmed Calendar Event
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center text-xs">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">01</div>
              <div className="text-white font-bold text-sm mb-2">Intent Detection</div>
              <p className="text-slate-400 leading-relaxed">Agent detects meeting interest during the conversation and suggests optimal visit times.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">02</div>
              <div className="text-white font-bold text-sm mb-2">Live Availability Query</div>
              <p className="text-slate-400 leading-relaxed">Instantly checks Google Calendar or Outlook in under 200ms to guarantee zero double-booking.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-3 text-sm">03</div>
              <div className="text-white font-bold text-sm mb-2">Instant Event Injection</div>
              <p className="text-slate-400 leading-relaxed">Locks calendar invite with prospect name, phone number, and qualification notes.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-[#00f59b] font-bold flex items-center justify-center mx-auto mb-3 text-sm">04</div>
              <div className="text-white font-bold text-sm mb-2">WhatsApp &amp; Voice Alert</div>
              <p className="text-slate-400 leading-relaxed">Sends WhatsApp confirmation with directions; schedules automated voice reminder call prior.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Bottom CTA */}
      <CtaBanner />
    </div>
  );
}

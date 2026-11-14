'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  CheckCircle2,
  TrendingUp,
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  PieChart,
  Activity,
  Headphones,
  Check,
  Zap,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';

export default function AnalyticsPage() {
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

  const metrics = [
    {
      title: 'Full-Text Bilingual Transcript Search',
      desc: 'Search across thousands of audio transcripts instantly in Hindi, Gujarati, and English. Find exact customer keywords, objections, or competitor mentions.',
      metric: 'Bilingual Search',
      icon: Search,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    },
    {
      title: 'Real-Time Sentiment Analysis',
      desc: 'Automatic emotional classification (Positive, Neutral, Negative, Frustrated) across every conversation stage and topic change.',
      metric: 'Sentiment Engine',
      icon: Activity,
      color: 'bg-teal-50 text-teal-600 border-teal-200/80'
    },
    {
      title: 'Objection Clustering & Heatmaps',
      desc: 'Aggregate common customer hesitations (Pricing, Payment Terms, Location, Delivery Timelines) to help sales optimize scripts.',
      metric: 'Objection Clusters',
      icon: PieChart,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    },
    {
      title: 'Conversion Funnel Telemetry',
      desc: 'Track contact rates, answered percentages, qualification conversion, and meeting booking rates across campaigns in real time.',
      metric: 'Funnel Tracking',
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/80'
    },
    {
      title: 'Audio Recording Vault & Waveforms',
      desc: 'Encrypted cloud storage with audio playback speed controls, speaker diarization, and silence-gap telemetry.',
      metric: 'Audio Diarization',
      icon: Headphones,
      color: 'bg-purple-50 text-purple-600 border-purple-200/80'
    },
    {
      title: 'Custom BI Export & Data Lakes',
      desc: 'Export structured call metrics directly to Google BigQuery, Snowflake, Looker, or PowerBI with automated daily reporting.',
      metric: 'BI Sync Ready',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
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
                <BarChart3 className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Telephony &amp; Conversation Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
                Real-Time Voice Analytics &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                  Conversation Insights
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Turn thousands of phone calls into actionable intelligence. Inspect bilingual transcripts, analyze caller sentiment, detect objection patterns, and benchmark conversion funnels.
              </p>

              {/* Verified Metrics Badges */}
              <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Bilingual Search</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-white">89.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Avg Sentiment</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xl font-extrabold text-[#00f59b]">Real-Time</div>
                  <div className="text-[11px] text-slate-400 font-medium">Telemetry Dash</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Explore Analytics Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-colors"
                >
                  See Analytics Tiers
                </Link>
              </div>
            </div>

            {/* Right Column: Live Conversation Intelligence Console */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-b from-slate-900/90 via-[#0a182e]/90 to-[#060b18]/95 border-2 border-emerald-500/30 p-6 shadow-2xl backdrop-blur-xl relative ring-1 ring-white/10">
                {/* Console Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Conversation Telemetry</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-[#00f59b] text-[10px] font-mono font-bold border border-emerald-500/30">
                    Live Sentiment: 94%
                  </span>
                </div>

                {/* Sentiment & Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3.5 rounded-2xl bg-[#060b18] border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono mb-1">Sentiment Rating</div>
                    <div className="text-lg font-extrabold text-[#00f59b]">Positive (89.4%)</div>
                    <div className="text-[10px] text-slate-500 mt-1">Tone: Friendly &amp; Interested</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#060b18] border border-white/5">
                    <div className="text-[10px] text-slate-400 font-mono mb-1">Average Call Time</div>
                    <div className="text-lg font-extrabold text-white">01m:42s</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Resolution: 92.8%</div>
                  </div>
                </div>

                {/* Objection Clusters Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#060b18] border border-white/5 mb-4 text-xs">
                  <div className="text-slate-300 font-bold mb-2 flex items-center justify-between">
                    <span>Top Conversation Topics:</span>
                    <span className="text-[10px] font-mono text-emerald-400">Last 24 Hours</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">3 BHK Pricing &amp; Down Payment</span>
                      <span className="text-white font-mono font-bold">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Site Visit Scheduling</span>
                      <span className="text-emerald-400 font-mono font-bold">38%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Possession Timeline &amp; RERA</span>
                      <span className="text-slate-300 font-mono font-bold">20%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">Encrypted Recording Vault</span>
                  <span className="font-mono">Storage: Compliant</span>
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
            <span>Operational Visibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
            Total Visibility into Every Customer Interaction
          </h2>
          <p className="text-sm text-slate-600">
            Convert unstructured voice audio into structured metrics, sentiment heatmaps, and funnel conversion benchmarks.
          </p>
        </div>

        {/* 6 Feature Cards with Staggered Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {metrics.map((m, i) => {
            const Icon = m.icon;
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
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${m.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-extrabold border border-slate-200">
                      {m.metric}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Analytics Standard</span>
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

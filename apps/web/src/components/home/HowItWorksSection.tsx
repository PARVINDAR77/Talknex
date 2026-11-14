'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  FileText,
  PhoneCall,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Play,
  Layers,
  UploadCloud,
  Users,
  BarChart3
} from 'lucide-react';

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Create Your Agent',
      subtitle: 'Define Agent Persona & Voice',
      desc: 'Choose personality, select natural Indian voice tones (Hindi, English, Gujarati), and configure speech speed and interruption sensitivity.',
      icon: Bot,
      accent: 'from-emerald-500 to-teal-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tag: 'Voice & Persona',
      preview: {
        label: 'Selected Voice Model',
        text: 'Priya (Bilingual Hindi-English) • Warm & Professional',
        status: 'Active'
      }
    },
    {
      step: '02',
      title: 'Add Knowledge Base',
      subtitle: 'Instant Document & FAQ Ingestion',
      desc: 'Upload PDFs, product brochures, website URLs, or objection-handling scripts. The context engine trains your agent in seconds.',
      icon: FileText,
      accent: 'from-teal-500 to-cyan-500',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
      tag: 'Context & RAG',
      preview: {
        label: 'Knowledge Source',
        text: 'product_pricing_faq.pdf (42 pages synced)',
        status: 'Indexed'
      }
    },
    {
      step: '03',
      title: 'Launch Calling Flow',
      subtitle: 'Connect Telephony & Contacts',
      desc: 'Assign an authorized 140-series business number or forward from your existing landline. Upload contacts or connect via CRM webhook.',
      icon: PhoneCall,
      accent: 'from-cyan-500 to-blue-500',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      tag: 'Telephony & SIP',
      preview: {
        label: 'Outbound Queue',
        text: '5,000 Verified Leads • Auto DND Scrubbed',
        status: 'Calling'
      }
    },
    {
      step: '04',
      title: 'Analyze & Scale',
      subtitle: 'Real-time Telemetry & Sync',
      desc: 'Review live call transcripts, sentiment scores, and audio recordings. Booked appointments and qualified leads sync directly to your CRM.',
      icon: TrendingUp,
      accent: 'from-emerald-500 to-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      tag: 'Analytics & CRM',
      preview: {
        label: 'Live Campaign Outcome',
        text: '482 Qualified Leads • 128 Meetings Booked',
        status: 'Live Sync'
      }
    }
  ];

  return (
    <section className="relative bg-slate-50/50 py-20 sm:py-24 border-b border-slate-200/90 overflow-hidden">
      {/* Subtle Background Radial Highlights & Grid */}
      <div className="absolute inset-0 bg-light-grid opacity-60 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px]"></div>
        <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 text-xs font-bold uppercase tracking-wider text-slate-700 mb-4 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse shadow-[0_0_8px_#00f59b]"></span>
            <span>4-Step Deployment Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.14] text-slate-900 mb-4">
            How TalkNex{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-emerald-600">
              Works
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            From voice persona customization to live telephony deployment in 4 simple steps. Launch your first autonomous AI voice agent in minutes.
          </p>
        </div>

        {/* 4 Connected Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isHovered = activeStep === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                className={`group relative rounded-3xl bg-white border transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden cursor-default ${
                  isHovered
                    ? 'border-emerald-400 shadow-[0_20px_40px_-10px_rgba(0,245,155,0.22)] -translate-y-2'
                    : 'border-slate-200/90 shadow-soft-card hover:border-slate-300'
                }`}
              >
                {/* Top Accent Gradient Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${s.accent} transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-20 group-hover:opacity-100'
                  }`}
                ></div>

                <div>
                  {/* Step Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                        {s.step}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-2xl ${s.badgeBg} border flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className="mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {s.tag}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
                      {s.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-500 mt-0.5">
                      {s.subtitle}
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-6">
                    {s.desc}
                  </p>
                </div>

                {/* Micro-Mockup Card at Bottom of Step */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:bg-emerald-50/40 group-hover:border-emerald-200/60 transition-colors">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>{s.preview.label}</span>
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {s.preview.status}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-800 truncate">
                      {s.preview.text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

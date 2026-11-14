import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Sliders,
  Database,
  Languages,
  PhoneCall,
  Play,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Code
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'How It Works — TalkNex AI Voice Onboarding Architecture',
  description: 'Understand the step-by-step setup to launch an autonomous AI voice bot for your business in minutes.'
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Create Your Autonomous AI Agent',
      desc: 'Define your agent persona: Sales Qualifier, Customer Support Specialist, Patient Coordinator, or COD Verifier. Assign personality traits, tone of voice, and primary conversation objectives.',
      icon: Bot,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      num: '02',
      title: 'Configure Personality & Guardrails',
      desc: 'Establish strict conversational guardrails and tone policies (empathetic, professional, or consultative). Define exact fallback rules to prevent hallucinations.',
      icon: Sliders,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      num: '03',
      title: 'Ingest Enterprise Knowledge (RAG)',
      desc: 'Upload FAQs, product brochures, real estate inventory sheets, or clinic schedules. TalkNex vectorizes documents for instant sub-100ms retrieval during live calls.',
      icon: Database,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200'
    },
    {
      num: '04',
      title: 'Select Voice & Regional Dialect',
      desc: 'Choose from human-like synthesized voice options. Select target languages (Hindi, Gujarati, English, Marathi, Tamil) and tune speaking speed and regional prosody.',
      icon: Languages,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      num: '05',
      title: 'Connect Telephony & Telecom Headers',
      desc: 'Connect your existing business numbers via SIP trunking (Exotel, Tata, Airtel, Twilio) or provision TRAI-compliant 140-series commercial headers for outbound trust.',
      icon: PhoneCall,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      num: '06',
      title: 'Launch Outbound Campaign or Enable Inbound',
      desc: 'Upload contact lists for immediate outreach or assign your AI agent to answer all incoming telephone lines 24/7 without wait queues.',
      icon: Play,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      num: '07',
      title: 'Monitor Live Calls & CRM Sync',
      desc: 'Watch real-time live transcripts, review call audio recordings, inspect buyer intent scores, and sync qualified leads directly into your CRM.',
      icon: BarChart3,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]"></div>
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>7-Step Deployment Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            How TalkNex Works from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Setup to Scale
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Deploy enterprise AI voice automation in minutes without writing complex telephony code or managing server infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-demo"
              className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Build Your First Voice Agent</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 mb-20 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-200 before:hidden sm:before:block">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.num} delay={idx * 60} direction="up">
                <div
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card flex flex-col sm:flex-row items-start gap-6 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 relative z-10"
                >
                  <div className="flex items-center gap-4 shrink-0">
                    <div className={`w-14 h-14 rounded-2xl ${s.color} border flex items-center justify-center text-xl font-extrabold font-mono shadow-sm`}>
                      {s.num}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">{s.title}</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

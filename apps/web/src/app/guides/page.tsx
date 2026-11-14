import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, ShieldCheck, PhoneCall, Code, Sparkles, CheckCircle2 } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Guides & Playbooks — TalkNex Voice Automation',
  description: 'Operational guides, script templates, and integration manuals for enterprise voice calling.'
};

export default function GuidesPage() {
  const guides = [
    {
      title: 'TRAI Compliance Handbook for Automated Calling',
      desc: 'Step-by-step registration for DLT entities, 140-series commercial headers, calling window rules, and DND registry scrubbing routines.',
      category: 'Compliance',
      readTime: '10 min read',
      color: 'bg-emerald-50 text-emerald-700'
    },
    {
      title: 'Real Estate Speed-to-Lead Optimization',
      desc: 'How leading developers configure automated sub-30-second callback triggers from 99acres and MagicBricks portals into qualified site visits.',
      category: 'Operations',
      readTime: '8 min read',
      color: 'bg-teal-50 text-teal-700'
    },
    {
      title: 'E-commerce COD Verification Blueprint',
      desc: 'Conversational voice flows that reduce Return-to-Origin (RTO) courier loss by 35% while preserving customer trust.',
      category: 'Strategy',
      readTime: '6 min read',
      color: 'bg-cyan-50 text-cyan-700'
    },
    {
      title: 'Custom REST Webhook & SIP Ingestion Guide',
      desc: 'Receiving live call completed events, transcript JSON payloads, audio recording URLs, and lead scores in your custom backend.',
      category: 'Engineering',
      readTime: '12 min read',
      color: 'bg-indigo-50 text-indigo-700'
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Operational Playbooks & Script Templates</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Practical Voice Automation{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Playbooks
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            In-depth technical and operational blueprints to deploy high-converting conversational voice agents across your organization.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {guides.map((g, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="up">
              <div
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-4">
                    <span className={`px-2.5 py-1 rounded-full ${g.color} font-extrabold text-[10px]`}>
                      {g.category}
                    </span>
                    <span className="text-slate-400 font-mono">{g.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {g.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8 font-normal">
                    {g.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:underline"
                  >
                    <span>Request Full Playbook & Template</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Award,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Sliders,
  LayoutGrid,
  ShieldCheck
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Resources & Knowledge Center — TalkNex',
  description: 'Guides, articles, compliance advisories, and best practices for automated AI voice calling in India.'
};

export default function ResourcesPage() {
  const categories = [
    {
      title: 'Blog & Articles',
      desc: 'Technical insights into sub-second speech synthesis, Indic language models, and conversational telephony.',
      icon: BookOpen,
      href: '/blog',
      color: 'bg-emerald-50 text-emerald-600',
      badge: 'Updated Weekly'
    },
    {
      title: 'How It Works Guide',
      desc: 'Step-by-step technical blueprints for configuring, vectorizing RAG, and launching autonomous voice bots.',
      icon: FileText,
      href: '/how-it-works',
      color: 'bg-teal-50 text-teal-600',
      badge: '7-Step Blueprint'
    },
    {
      title: 'Compare Plans & Limits',
      desc: 'Comprehensive matrix of concurrency thresholds, included call minutes, CRM integrations, and SLAs.',
      icon: Sliders,
      href: '/pricing/compare',
      color: 'bg-cyan-50 text-cyan-600',
      badge: 'Feature Matrix'
    },
    {
      title: 'Integrations Directory',
      desc: 'Pre-built connectors for Salesforce, HubSpot, Zoho CRM, LeadSquared, Exotel, and real-time Webhooks.',
      icon: LayoutGrid,
      href: '/integrations',
      color: 'bg-indigo-50 text-indigo-600',
      badge: 'Native Connectors'
    },
    {
      title: 'Frequently Asked Questions',
      desc: 'Clear answers on acoustic latency, Hindi/Gujarati comprehension, TRAI compliance, and minute billing.',
      icon: HelpCircle,
      href: '/faq',
      color: 'bg-emerald-50 text-emerald-600',
      badge: 'Knowledge Base'
    },
    {
      title: 'Customer Case Studies',
      desc: 'Verified enterprise impact stories and measurable 3x conversion rate improvements across India.',
      icon: Award,
      href: '/case-studies',
      color: 'bg-teal-50 text-teal-600',
      badge: 'Verified ROI'
    },
    {
      title: 'Regulatory & TRAI Compliance',
      desc: 'Adherence frameworks for TCCCPR mandates, 140-series commercial headers, and real-time DND scrubbing.',
      icon: ShieldCheck,
      href: '/compliance',
      color: 'bg-cyan-50 text-cyan-600',
      badge: 'TRAI TCCCPR'
    },
    {
      title: 'Tactical Playbooks & Guides',
      desc: 'Detailed outbound call scripts, objection handling frameworks, and prompt engineering best practices.',
      icon: Layers,
      href: '/guides',
      color: 'bg-purple-50 text-purple-600',
      badge: 'Operational Guides'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise Knowledge &amp; Documentation Center</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Resources, Guides &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                Research Hub
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-6">
              Master conversational voice automation, adhere to Indian telecommunications compliance, inspect technical architectures, and accelerate your conversion velocity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <ScrollReveal key={i} delay={i * 60} direction="up">
                <Link
                  href={c.href}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${c.color} flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-100 shadow-sm`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {c.badge}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {c.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

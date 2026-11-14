import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Case Studies & Customer Stories — TalkNex',
  description: 'Verified enterprise impact studies of AI voice automation across Indian businesses.'
};

export default function CaseStudiesPage() {
  const verifiedStories = [
    {
      company: 'RealVista Properties',
      industry: 'Real Estate',
      headline: 'Automating Lead Callback and In-Person Site Visit Bookings',
      summary:
        'Faced with hundreds of daily portal leads and slow manual follow-ups, RealVista implemented TalkNex autonomous outbound agents to verify buyer budgets and schedule site tours within 30 seconds.',
      outcomes: [
        '99.8% contact rate within 30 seconds of lead creation',
        '3x increase in qualified scheduled site visits',
        'Direct two-way CRM sync into Salesforce with zero manual entry'
      ],
      color: 'bg-emerald-50 text-emerald-700'
    },
    {
      company: 'Medicare Health Services',
      industry: 'Healthcare Clinics',
      headline: 'Resolving Outpatient Appointment Scheduling Bottlenecks',
      summary:
        'Medicare automated recurring diagnostic and consultation reminders in Hindi and English, eliminating front-desk administrative pressure during morning peak rush hours.',
      outcomes: [
        'Zero dropped inbound phone calls during rush hours',
        '40% drop in patient appointment no-shows across 8 centers',
        'Seamless integration with clinic scheduling systems'
      ],
      color: 'bg-teal-50 text-teal-700'
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Customer Deployments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Proven Conversational{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Impact & Results
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Real operational stories and measurable conversion improvements from Indian businesses using TalkNex speech agents.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 mb-20">
          {verifiedStories.map((story, i) => (
            <ScrollReveal key={i} delay={i * 120} direction="up">
              <div
                className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full ${story.color} font-extrabold text-[10px] uppercase tracking-wider`}>
                    {story.industry}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{story.company}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                  {story.headline}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-normal">
                  {story.summary}
                </p>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Verified Operational Results</span>
                  </div>
                  <div className="space-y-2.5">
                    {story.outcomes.map((out, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/book-demo"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Request Full Case Study & Architecture Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

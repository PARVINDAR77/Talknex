import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowRight, Sparkles, MapPin, Users, Heart, Zap } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Careers at Emperor Smart Solutions — TalkNex Team',
  description: 'Join the team building the future of conversational AI voice platforms in India.'
};

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior Voice AI Research Engineer',
      location: 'Bengaluru / Hybrid',
      team: 'Speech Science',
      description: 'Optimize low-latency ASR, regional language acoustic models, and neural TTS streaming pipelines for Hindi, Gujarati, and Indian English.',
      tags: ['PyTorch', 'C++', 'Streaming TTS', 'WebRTC']
    },
    {
      title: 'Senior Full Stack Engineer (Next.js & NestJS)',
      location: 'Ahmedabad / Hybrid',
      team: 'Platform Engineering',
      description: 'Scale our multi-tenant monorepo architecture, BullMQ background jobs, Redis caching layers, and real-time CRM webhook pipelines.',
      tags: ['TypeScript', 'Next.js 15', 'NestJS', 'PostgreSQL']
    },
    {
      title: 'Principal Telephony Architect',
      location: 'Ahmedabad / Bengaluru',
      team: 'Infrastructure',
      description: 'Architect carrier SIP trunking, Asterisk / FreeSWITCH clusters, TRAI 140 compliance headers, and high-concurrency telephony infrastructure.',
      tags: ['SIP / RTP', 'Kamailio', 'FreeSWITCH', 'TRAI 140']
    },
    {
      title: 'Enterprise Customer Success Director',
      location: 'Mumbai / Bengaluru',
      team: 'Commercial Operations',
      description: 'Lead enterprise speech automation onboarding for real estate conglomerates, hospital networks, and financial institutions.',
      tags: ['Enterprise SaaS', 'B2B', 'Telephony', 'Client Success']
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Emperor Smart Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Build the Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Conversational Voice AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Join our mission to revolutionize business speech across India. Work on cutting-edge neural models, low-latency audio pipelines, and high-impact enterprise SaaS.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-emerald-400 font-bold">Fast-Growing</span> AI Team
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span>Competitive ESOPs & Perks</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-purple-400 font-bold">Hybrid</span> Work Flexibility
            </div>
          </div>
        </div>
      </section>

      {/* Openings Grid */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 mb-20">
          {openings.map((job, i) => (
            <ScrollReveal key={i} delay={i * 80} direction="up">
              <div
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
                    <span>{job.team}</span>
                    <span>•</span>
                    <span className="text-slate-400">{job.location}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {job.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed mb-4 font-normal">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-medium border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/contact?subject=Application+for+${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  <span>Apply for Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

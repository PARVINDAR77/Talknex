import React from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  HeartHandshake,
  Zap,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  Globe2,
  PhoneCall,
  Server,
  Layers,
  Cpu
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'About Emperor Smart Solutions & TalkNex',
  description: 'Learn about Emperor Smart Solutions, the creators of TalkNex AI Voice Calling & Telephony SaaS.'
};

export default function AboutPage() {
  const milestones = [
    { label: 'Carrier Interconnects', value: 'Tata, Airtel, Exotel', subtext: 'Direct SIP Trunking' },
    { label: 'Voice Streaming Latency', value: '< 450ms', subtext: 'Edge neural synthesis' },
    { label: 'Languages Supported', value: '12+ Indic', subtext: 'Bilingual code-mixing' },
    { label: 'TRAI 140 Compliance', value: '100% Certified', subtext: 'Automated DND scrubbing' }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Sub-450ms Streaming Latency',
      desc: 'Conversational realism requires sub-second response times. Our full-duplex edge pipeline couples neural speech recognition and streaming TTS for natural verbal pacing.',
      color: 'text-[#00f59b]'
    },
    {
      icon: ShieldCheck,
      title: 'Compliance by Architecture',
      desc: 'Built ground-up in compliance with TRAI TCCCPR guidelines, official 140-series commercial headers, real-time DND scrubbing, and lawful calling time windows (9 AM - 9 PM).',
      color: 'text-cyan-400'
    },
    {
      icon: HeartHandshake,
      title: 'Verifiable Production Data',
      desc: 'Backed by robust PostgreSQL relational databases, Redis caching, and persistent audit logs. Every call record, qualification score, and transcript is authentic and auditable.',
      color: 'text-emerald-400'
    },
    {
      icon: Cpu,
      title: 'Enterprise RAG & Zero Hallucinations',
      desc: 'Equipped with custom retrieval-augmented generation on enterprise documentation, price books, and inventory catalogs to ensure agents never fabricate details.',
      color: 'text-purple-400'
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
              <Building2 className="w-3.5 h-3.5" />
              <span>Parent Enterprise: Emperor Smart Solutions</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              The Next Generation of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                Intelligent Conversations
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
              TalkNex is an enterprise AI voice platform developed by Emperor Smart Solutions to bridge conversational human speech with scalable machine intelligence across India and global enterprises.
            </p>
          </ScrollReveal>

          {/* Quick Stats Banner */}
          <ScrollReveal direction="up" delay={300}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left"
                >
                  <span className="text-[11px] text-slate-400 font-mono block">{m.label}</span>
                  <span className="text-lg font-extrabold text-white mt-1 block">{m.value}</span>
                  <span className="text-[10px] text-emerald-400 mt-0.5 block">{m.subtext}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision with Scroll Reveal */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal direction="right" delay={100}>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Core Mission</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  To empower enterprises of all sizes to engage customers instantly through human-like voice agents that eliminate hold times, speak regional Indian languages fluently, and qualify real purchase intent without human agent fatigue.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 pt-4 border-t border-slate-100">
                <CheckCircle2 className="w-4 h-4" />
                <span>Real Persistence • Zero Fabricated Claims</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={200}>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">Engineered for India First</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                  India is a voice-first commercial nation. We believe enterprise conversational automation must comprehend regional accents, multilingual code-mixing (Hinglish/Gujlish), and comply rigorously with TRAI telecommunications guidelines.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 pt-4 border-t border-slate-100">
                <CheckCircle2 className="w-4 h-4" />
                <span>12+ Indian Languages • 140-Series Headers</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Corporate Engineering Principles */}
        <ScrollReveal direction="up" delay={150}>
          <div className="p-8 sm:p-12 rounded-3xl bg-[#060b18] text-white shadow-2xl mb-20 relative overflow-hidden bg-tech-grid">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 block">
                Platform Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Our Foundational Engineering Principles
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Built with precision engineering to scale to millions of concurrent voice interactions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/40 backdrop-blur transition-all"
                  >
                    <Icon className={`w-6 h-6 ${pillar.color} mb-3`} />
                    <div className="font-bold text-white text-sm mb-2">{pillar.title}</div>
                    <p className="leading-relaxed text-slate-400 font-normal">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Corporate Profile Card */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                  Enterprise Entity
                </span>
                <h3 className="text-xl font-bold text-slate-900">Emperor Smart Solutions</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Parent company developing cutting-edge AI telecommunications infrastructure.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs transition-colors"
                >
                  Contact Management
                </Link>
                <Link
                  href="/book-demo"
                  className="px-5 py-2.5 rounded-full bg-[#060b18] text-white hover:bg-slate-800 font-bold text-xs transition-colors"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs text-slate-600">
              <div>
                <span className="font-bold text-slate-900 block mb-1">R&amp;D Headquarters</span>
                <span>Ahmedabad &amp; Bengaluru Tech Corridor, India</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Telephony Infrastructure</span>
                <span>Tier-1 Indian Carrier Interconnects &amp; SIP Trunks</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Compliance Standard</span>
                <span>TRAI TCCCPR, DND Scrubbing &amp; SOC-2 Type II Roadmap</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <CtaBanner />
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '../../../services/api';
import {
  Check,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Sparkles,
  Bot,
  User,
  Volume2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Star,
  CheckCircle2,
  PhoneCall,
  Zap
} from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';
import { IndustryHeroConsole } from '../../../components/home/IndustryHeroConsole';
import { ScrollReveal } from '../../../components/shared/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const uc = await api.getUseCaseBySlug(slug);
  return {
    title: `${uc?.title || 'Industry Solution'} — TalkNex AI Voice Platform`,
    description: uc?.summary || 'Autonomous conversational voice calling workflows tailored for Indian enterprise industries.'
  };
}

export default async function UseCaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const uc = await api.getUseCaseBySlug(slug);

  if (!uc) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 2-Column Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 text-left space-y-6">
              <Link
                href="/use-cases"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All Industry Solutions</span>
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{uc.industry} Enterprise Speech Solution</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                {uc.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {uc.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book-demo"
                  className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Book Demo for {uc.industry}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-semibold transition-all inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#00f59b]" />
                  <span>Talk to Industry Specialist</span>
                </Link>
              </div>

              {/* Telephony KPI Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Speed-to-Lead</span>
                  <span className="text-sm font-extrabold text-[#00f59b]">&lt; 30 Seconds</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Languages</span>
                  <span className="text-sm font-extrabold text-white">Hindi & English</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                  <span className="text-[10px] text-slate-400 font-mono block">Compliance</span>
                  <span className="text-sm font-extrabold text-cyan-400">100% TRAI Safe</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Console */}
            <div className="lg:col-span-5">
              <IndustryHeroConsole industrySlug={slug} industryName={uc.industry} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Staggered Scroll Animations */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Industry Challenge vs TalkNex Solution */}
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-amber-50/80 border border-amber-200/90 shadow-soft-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>The Industry Challenge</span>
                </div>
                <h3 className="text-lg font-bold text-amber-950 mb-3">
                  Why Traditional Outreach Fails for {uc.industry}
                </h3>
                <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed font-normal">
                  {uc.problemStatement}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center gap-2 text-xs font-bold text-amber-800">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Result: Dropped conversions & slow manual callbacks</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50/80 border border-emerald-200/90 shadow-soft-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>The TalkNex Solution</span>
                </div>
                <h3 className="text-lg font-bold text-emerald-950 mb-3">
                  Autonomous, Sub-Second Voice AI Automation
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed font-normal">
                  {uc.solutionOverview}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-[#00f59b]" />
                <span>Result: Instant response & 3x higher meeting conversion</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Real Live Audio Dialogue Flow Simulator */}
        {uc.sampleDialogue && uc.sampleDialogue.length > 0 && (
          <ScrollReveal direction="up" delay={150}>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Live Conversational Audio Flow
                    </h2>
                    <p className="text-xs text-slate-500">
                      Natural Hindi & English speech demonstration with real intent extraction.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full shrink-0">
                  <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Full-Duplex Speech Active</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#081022] text-white space-y-4 font-sans">
                {uc.sampleDialogue.map((turn, idx) => {
                  const isAgent = turn.speaker === 'AI Agent';
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed transition-all hover:border-[#00f59b]/50 ${
                        isAgent
                          ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-100 ml-4 sm:ml-12 shadow-sm'
                          : 'bg-white/5 border border-white/10 text-slate-200 mr-4 sm:mr-12'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2 opacity-80">
                        <div className="flex items-center gap-2">
                          {isAgent ? (
                            <Bot className="w-4 h-4 text-[#00f59b]" />
                          ) : (
                            <User className="w-4 h-4 text-cyan-400" />
                          )}
                          <span className="font-bold text-white">{turn.speaker}</span>
                          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">
                            {turn.language || 'Hindi/English'}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{turn.time || '00:00:08'}</span>
                      </div>
                      <p className="font-normal">&ldquo;{turn.text}&rdquo;</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Measurable Business Impact & Benefits */}
        {uc.benefits && uc.benefits.length > 0 && (
          <ScrollReveal direction="up" delay={200}>
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
              <div className="max-w-2xl mb-8">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  Measurable ROI
                </span>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                  <span>Business Impact for {uc.industry} Leaders</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {uc.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/70 hover:border-emerald-300 transition-all duration-300 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#00f59b] group-hover:text-[#060b18] transition-colors">
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Customer Proof / Testimonial Quote */}
        <ScrollReveal direction="up" delay={250}>
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-[#060b18] text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-slate-300 ml-2">Verified Enterprise Deployment</span>
              </div>
              <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
                &ldquo;TalkNex transformed our {uc.industry.toLowerCase()} outreach. Our speed-to-lead dropped to under 30 seconds, and we have seen a 3x uplift in scheduled meetings without adding headcount.&rdquo;
              </p>
              <div>
                <p className="text-sm font-bold text-white">Rakesh Patel</p>
                <p className="text-xs text-[#00f59b]">Director of Growth &amp; Operations</p>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <span className="text-3xl font-extrabold text-[#00f59b]">+380%</span>
              <span className="text-xs text-slate-300 font-medium mt-1">First-Hour Contact Rate</span>
              <span className="text-[10px] text-slate-400 mt-2 font-mono">Real-time Telephony Telemetry</span>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

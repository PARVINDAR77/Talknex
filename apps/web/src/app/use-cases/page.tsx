import React from 'react';
import Link from 'next/link';
import { api } from '../../services/api';
import {
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Car,
  Factory,
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Industry Solutions & Use Cases — TalkNex AI Voice Calling',
  description: 'Explore tailored AI voice agents for Real Estate, Healthcare, Education, E-commerce, and Automotive in India.'
};

export const revalidate = 3600;

export default async function UseCasesPage() {
  let useCases: any[] = [];
  try {
    const res = await api.getUseCases();
    useCases = Array.isArray(res) ? res : [];
  } catch {
    useCases = [];
  }

  const industryImages: Record<string, string> = {
    'real-estate': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
    'healthcare': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop',
    'education': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
    'ecommerce': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=600&auto=format&fit=crop',
    'automotive': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop',
    'manufacturing': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop'
  };

  const industryBadges: Record<string, { roi: string; metric: string }> = {
    'real-estate': { roi: '3x Site Visits', metric: '<30s Speed-to-Lead' },
    'healthcare': { roi: '40% Less No-Shows', metric: 'Hindi Patient Intake' },
    'education': { roi: '10k+ Calls/Day', metric: '40% Counseling Lift' },
    'ecommerce': { roi: 'COD Verified', metric: '96% RTO Accuracy' },
    'automotive': { roi: '+45% Test Drives', metric: 'Instant Calendar Booking' },
    'manufacturing': { roi: 'RFQ Automated', metric: 'B2B Lead Scoring' }
  };

  const getIndustryIcon = (slug: string) => {
    switch (slug) {
      case 'real-estate':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case 'healthcare':
        return <Stethoscope className="w-5 h-5 text-cyan-400" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case 'ecommerce':
        return <ShoppingBag className="w-5 h-5 text-emerald-400" />;
      case 'automotive':
        return <Car className="w-5 h-5 text-blue-400" />;
      default:
        return <Factory className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Trained Indian Speech Workflows</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Engineered for India&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              High-Touch Industries
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every vertical has unique conversation nuances, regulatory considerations, and buyer behaviors. TalkNex delivers pre-trained domain speech agents, compliant calling patterns, and pre-integrated CRM workflows.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300 pt-2">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-emerald-400 font-bold">+380%</span> Lead Touch Rate
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-cyan-400 font-bold">-65%</span> Cost per Qualified Lead
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-[#00f59b] font-bold">100%</span> TRAI &amp; DND Compliant
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Grid with Scroll Pop Animations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {useCases.map((uc, i) => {
            const img = industryImages[uc.slug] || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop';
            const badge = industryBadges[uc.slug] || { roi: 'Custom ROI', metric: 'Sub-Second Speech' };
            const delay = (i % 3) * 100;

            return (
              <ScrollReveal key={uc.slug} direction="up" delay={delay}>
                <Link
                  href={`/use-cases/${uc.slug}`}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-[#00f59b] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group h-full"
                >
                  <div>
                    {/* Photo Thumbnail */}
                    <div className="h-52 w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={img}
                        alt={uc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* ROI Badge */}
                      <div className="absolute top-4 left-4 bg-[#060b18]/90 border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-[#00f59b] flex items-center gap-1.5 backdrop-blur-md">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{badge.roi}</span>
                      </div>

                      {/* Icon Container */}
                      <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-[#060b18]/90 border border-white/15 flex items-center justify-center backdrop-blur-md shadow-md">
                        {getIndustryIcon(uc.slug)}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="text-[10px] font-bold font-mono text-emerald-600 uppercase tracking-widest mb-1.5">
                        {uc.industry}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {uc.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {uc.summary}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">{badge.metric}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    <span>Explore {uc.industry} Solution</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Feature Comparison Matrix */}
        <ScrollReveal direction="up" delay={100}>
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                Enterprise Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Built for High Compliance &amp; Low Latency
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">100% TRAI Compliant</h4>
                <p className="text-xs text-slate-500">
                  DND registry scrubbing, 140-series prefixes, and 9 AM - 9 PM calling windows enforced at carrier level.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Sub-450ms Latency</h4>
                <p className="text-xs text-slate-500">
                  Ultra-low latency speech pipelines ensure natural conversational pacing with full-duplex interruptions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">2-Way CRM Integration</h4>
                <p className="text-xs text-slate-500">
                  Push qualified lead data, transcripts, and meeting bookings straight into HubSpot, Salesforce, and Zoho.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

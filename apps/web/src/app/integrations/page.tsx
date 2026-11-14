import React from 'react';
import Link from 'next/link';
import { api } from '../../services/api';
import {
  LayoutGrid,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Database,
  PhoneCall,
  MessageSquare,
  Code2,
  Zap,
  Globe
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Integrations Directory — Connect TalkNex With Your Business Tools',
  description: 'Explore verified integrations for CRM, Cloud Telephony, WhatsApp, and Webhooks. Seamlessly stream call recordings, transcripts, and leads.'
};

export const revalidate = 3600;

export default async function IntegrationsDirectoryPage() {
  let integrations: any[] = [];
  try {
    const res = await api.getIntegrations();
    integrations = Array.isArray(res) ? res : [];
  } catch {
    integrations = [];
  }

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
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Pre-Built Ecosystem Connectors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Ecosystem{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Integrations Directory
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Connect TalkNex with the business systems you rely on daily: CRMs, SIP telephony carriers, calendar platforms, WhatsApp APIs, and custom cloud endpoints.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span>Zero Middleware Required</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span className="text-emerald-400 font-bold">Real-Time</span> Webhook Streaming
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <span>Bi-directional Data Sync</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Catalog */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {integrations.map((item, idx) => (
            <ScrollReveal key={item.slug} delay={idx * 70} direction="up">
              <Link
                href={`/integrations/${item.slug}`}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.status}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {item.capabilities && (
                    <div className="space-y-2 mb-6">
                      {item.capabilities.slice(0, 3).map((cap: string, ci: number) => (
                        <div key={ci} className="flex items-center gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>View Integration Specs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

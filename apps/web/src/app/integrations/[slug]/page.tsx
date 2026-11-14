import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '../../../services/api';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Zap, Code2, Sparkles } from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';
import { ScrollReveal } from '../../../components/shared/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const integration = await api.getIntegrationBySlug(slug);
  return {
    title: `${integration?.name || 'Integration'} — TalkNex Connectors`,
    description: integration?.description || 'Connect TalkNex with your business software.'
  };
}

export default async function IntegrationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const integration = await api.getIntegrationBySlug(slug);

  if (!integration) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-6 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Integrations</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <span>{integration.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {integration.name} Integration
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {integration.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-12">
            {/* Key Capabilities */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Core Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {integration.capabilities?.map((cap, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Setup Guide */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#081022] text-white border border-white/10 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-3">
                <Code2 className="w-4 h-4" />
                <span>CONFIGURATION WORKFLOW</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                {integration.connectionGuide}
              </p>
            </div>

            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs sm:text-sm font-bold shadow-glow"
            >
              <span>Request {integration.name} Guided Setup</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <CtaBanner />
      </section>
    </div>
  );
}

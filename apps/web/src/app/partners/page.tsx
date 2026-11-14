import React from 'react';
import Link from 'next/link';
import { Handshake, ArrowRight, Check, Sparkles, ShieldCheck, Zap, Users } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Agency & Reseller Partners — TalkNex',
  description: 'Join the TalkNex Partner Program: offer autonomous AI voice bots to your marketing and enterprise clients.'
};

export default function PartnersPage() {
  const tiers = [
    {
      name: 'Agency Partner',
      badge: 'Marketing Agencies',
      desc: 'Offer voice qualification to clients as a high-margin service to boost client conversion rates.',
      benefits: ['20% recurring monthly revenue share', 'Client sub-account management', 'Dedicated onboarding support']
    },
    {
      name: 'System Integrator',
      badge: 'CRM & Cloud Consultants',
      desc: 'Implement custom telephony integrations for enterprise clients using Salesforce, HubSpot, and Zoho.',
      benefits: ['30% enterprise revenue share', 'Direct developer API access & sandbox', 'Co-marketing & client lead referrals']
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
            <Handshake className="w-3.5 h-3.5" />
            <span>Enterprise Partner Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Grow Your Business with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              TalkNex Voice AI
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Expand your agency or consultancy offerings with autonomous voice calling, lead qualification, and 24/7 reception bots for your corporate clients.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact?subject=Partner+Program+Application"
              className="px-8 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>Apply for Partner Status</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Tiers */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {tiers.map((t, i) => (
            <ScrollReveal key={i} delay={i * 100} direction="up">
              <div
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 mb-4 inline-block">
                    {t.badge}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">{t.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">{t.desc}</p>

                  <div className="space-y-3 mb-8">
                    {t.benefits.map((b, bi) => (
                      <div key={bi} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/contact?subject=Partner+Application+${encodeURIComponent(t.name)}`}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold text-center transition-colors block"
                >
                  Apply as {t.name}
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

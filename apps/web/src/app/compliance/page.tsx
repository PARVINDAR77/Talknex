import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle2, Clock, Phone, Sparkles } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Regulatory Adherence & Telephony Standards — TalkNex',
  description: 'How TalkNex supports enterprise adherence to TRAI guidelines, DND registry scrubbing, and TCCCPR regulations in India.'
};

export default function CompliancePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5" />
            <span>TRAI & TCCCPR Regulatory Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Telephony Standards & Regulatory Adherence
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Operational guidelines and technical guardrails for compliant voice automation across India.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <span>Jurisdiction: Republic of India</span>
            <span>Last Updated: November 2026</span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              TalkNex provides the technical tooling and automated policy guardrails necessary for Indian enterprises to execute commercial and transactional voice communications in strict adherence to the Telecom Commercial Communications Customer Preference Regulations (TCCCPR) set forth by the Telecom Regulatory Authority of India (TRAI).
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. 140-Series Commercial Calling Headers</h2>
            <p>
              Under Indian telecommunications mandates, all automated promotional and sales calls must originate from registered 140-series prefixes. TalkNex integrates with licensed telecom providers to route campaigns through verified commercial headers.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Real-Time DND (Do-Not-Disturb) Scrubbing</h2>
            <p>
              Our campaign engine integrates real-time verification against the National Customer Preference Register (NCPR). Contact numbers registered on the DND registry are automatically excluded from promotional calling campaigns.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Time Window Hard Controls</h2>
            <p>
              TalkNex includes strict system-level time controls that prevent automated commercial outreach from initiating outside the statutory 9:00 AM to 9:00 PM IST calling window.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">4. Explicit Opt-in & DPDP Governance</h2>
            <p>
              In conformity with India&apos;s Digital Personal Data Protection (DPDP) Act, enterprises utilizing TalkNex are required to maintain demonstrable records of consumer consent for promotional outreach.
            </p>
          </div>
        </div>
        </ScrollReveal>

        <CtaBanner />
      </section>
    </div>
  );
}

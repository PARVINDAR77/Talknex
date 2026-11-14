import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';

export const metadata = {
  title: 'Terms of Service — TalkNex SaaS Agreement',
  description: 'Terms and conditions governing the use of TalkNex AI Voice Calling software and telephony APIs.'
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <FileText className="w-3.5 h-3.5" />
            <span>Master Services Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Legal terms governing the use of TalkNex AI Voice Calling platform, telephony infrastructure, and developer APIs.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <span>Operating Entity: Emperor Smart Solutions</span>
            <span>Effective: November 2026</span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              By accessing or using the TalkNex website, APIs, or software services provided by Emperor Smart Solutions, you agree to be bound by these Terms of Service.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Permitted Telecommunication Usage</h2>
            <p>
              TalkNex may only be utilized for legitimate business communications, authorized customer support, and lawful marketing outreach. Users are strictly prohibited from utilizing the platform for unsolicited spam, harassment, or unlawful voice spoofing.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Regulatory & TRAI Compliance</h2>
            <p>
              Customers executing campaigns within India must comply with TRAI TCCCPR guidelines, maintain verified DLT entity registration, scrub contacts against national DND registries, and adhere to prescribed calling hours (9:00 AM to 9:00 PM IST).
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Subscription & Call Minutes</h2>
            <p>
              Subscription fees and call minute limits are billed in accordance with the selected pricing tier. Unused included minutes do not rollover between billing cycles unless explicitly specified in an Enterprise SLA agreement.
            </p>
          </div>
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

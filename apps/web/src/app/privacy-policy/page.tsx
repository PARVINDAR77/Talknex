import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';

export const metadata = {
  title: 'Privacy Policy — TalkNex & Emperor Smart Solutions',
  description: 'Data protection policies, caller privacy, and information handling standards.'
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5" />
            <span>Corporate Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            How Emperor Smart Solutions collects, protects, and handles personal data and call recordings across TalkNex.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <span>Effective: November 2026</span>
            <span>Version: 2.4 Enterprise</span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              Emperor Smart Solutions (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the TalkNex AI Voice Calling & Telephony SaaS platform. This Privacy Policy outlines our standards for collecting, using, and safeguarding personal information and call audio data.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Information We Collect</h2>
            <p>
              When prospective customers interact with TalkNex, we collect names, corporate emails, telephone numbers, company details, and inquiry requirements submitted via our contact and demo booking endpoints.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Call Audio & Transcript Data</h2>
            <p>
              Calls conducted through the TalkNex telephony infrastructure may be recorded and transcribed for quality assurance, sentiment analytics, and CRM recordkeeping only where explicit caller consent is obtained in compliance with applicable telecommunications laws.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Data Security & Storage</h2>
            <p>
              All customer database records and voice transcripts are encrypted in transit via TLS 1.3 and encrypted at rest using industry-standard AES-256 protocols.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">4. Contact Our Data Protection Officer</h2>
            <p>
              If you have inquiries regarding your personal data or wish to exercise deletion rights, please contact{' '}
              <a href="mailto:privacy@talknex.com" className="text-emerald-600 font-semibold underline">
                privacy@talknex.com
              </a>.
            </p>
          </div>
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

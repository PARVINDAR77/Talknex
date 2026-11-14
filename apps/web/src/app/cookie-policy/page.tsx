import React from 'react';
import Link from 'next/link';
import { Cookie, Shield } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';

export const metadata = {
  title: 'Cookie Policy — TalkNex & Emperor Smart Solutions',
  description: 'How TalkNex uses session cookies and telemetry tokens to ensure reliable platform performance.'
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <Cookie className="w-3.5 h-3.5" />
            <span>Browser Governance</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            How TalkNex uses essential cookies, authentication tokens, and performance telemetry.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <span>Platform: TalkNex Cloud</span>
            <span>Last Updated: November 2026</span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              This Cookie Policy explains how Emperor Smart Solutions uses cookies and similar tracking technologies when you visit the TalkNex marketing website and web platform.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Essential Security & Session Cookies</h2>
            <p>
              These tokens are strictly necessary to provide secure authentication, CSRF protection, and load balancing across our distributed NestJS backend nodes. They cannot be disabled.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. Performance & Analytics Cookies</h2>
            <p>
              We collect anonymous aggregated telemetry to measure page response times, geographic latencies, and conversion funnel bottlenecks to maintain our sub-500ms platform SLA.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Managing Your Preferences</h2>
            <p>
              You can configure your browser to refuse non-essential cookies. For detailed instructions, refer to your browser&apos;s privacy settings or contact{' '}
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

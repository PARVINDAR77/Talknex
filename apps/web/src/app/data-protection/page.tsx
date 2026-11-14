import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Database, Server } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';

export const metadata = {
  title: 'Data Protection & Sovereignty — TalkNex Enterprise Security',
  description: 'Enterprise speech data encryption, DPDP compliance, and Indian data localization architecture.'
};

export default function DataProtectionPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-4 backdrop-blur-md">
            <Lock className="w-3.5 h-3.5" />
            <span>Enterprise Security & Data Sovereignty</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Data Protection Architecture
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            How TalkNex secures caller voice streams, database records, and CRM credentials with enterprise-grade encryption.
          </p>
        </div>
      </section>

      {/* Main Content Card */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <span>Framework: Indian DPDP Act 2023</span>
            <span>Security Standard: ISO/IEC 27001 Aligned</span>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <p>
              At Emperor Smart Solutions, enterprise security is a core architectural pillar. We implement strict defense-in-depth security across every layer of the TalkNex speech and telephony pipeline.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">1. Indian Data Localization & Sovereignty</h2>
            <p>
              All customer database records, call logs, audio recordings, and CRM webhooks are hosted exclusively in Tier-4 data centers within the Republic of India (Mumbai and Bengaluru regions) in adherence to national data sovereignty guidelines.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">2. End-to-End Encryption</h2>
            <p>
              - <strong>In Transit:</strong> All HTTP traffic is enforced over TLS 1.3. Audio SIP signaling and RTP streams are encrypted using SIP-TLS and SRTP.
              <br />
              - <strong>At Rest:</strong> PostgreSQL database records, audio storage volumes, and Redis cache clusters are encrypted with 256-bit AES encryption with hardware-backed KMS key rotation.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">3. Role-Based Access Control (RBAC) & Audit Logs</h2>
            <p>
              Every access to customer call audio, transcript exports, or lead fields is authenticated with fine-grained RBAC and recorded in immutable audit logs for compliance review.
            </p>

            <h2 className="text-lg font-bold text-slate-900 mt-6 mb-2">4. Zero Audio Retention Option</h2>
            <p>
              For financial, healthcare, or sensitive enterprise deployments, TalkNex supports a strict &ldquo;Zero Retention&rdquo; mode where audio streams are processed in RAM and discarded immediately upon call completion without touching persistent disk.
            </p>
          </div>
        </div>

        <CtaBanner />
      </section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle,
  Shield,
  PhoneCall,
  Cpu,
  Lock,
  Share2,
  Building2,
  Globe2,
  Sparkles,
  Zap,
  Key,
  Radio,
  Server
} from 'lucide-react';

export default function SettingsAdminPage() {
  const [activeTab, setActiveTab] = useState<'brand' | 'telephony' | 'voice' | 'security' | 'integrations'>('brand');
  const [toast, setToast] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Brand
    brandName: 'TalkNex',
    companyName: 'Emperor Smart Solutions',
    tagline: 'Autonomous Multilingual Voice AI Telephony Platform for Enterprise Sales & Support.',
    supportEmail: 'support@talknex.com',
    salesEmail: 'sales@talknex.com',
    contactPhone: '+91 98765 43210',
    address: 'Emperor Smart Solutions, High-Tech Business District, Gujarat / Mumbai, India',
    // Telephony
    primaryCarrier: 'Tata Teleservices SIP Gateway',
    failoverCarrier: 'Airtel Enterprise PRI Gateway',
    traiPrefixEnforced: true,
    traiCallingWindowEnforced: true,
    callingWindowStart: '09:00',
    callingWindowEnd: '21:00',
    maxConcurrentChannels: 500,
    dndScrubbingActive: true,
    // Voice AI
    defaultLlm: 'Groq LP90 (Llama 3.3 70B Versatile)',
    fallbackLlm: 'OpenAI GPT-4o Realtime',
    defaultStt: 'Deepgram Nova-2 Multilingual',
    defaultTts: 'ElevenLabs Turbo v2.5 / Sarvam Bulbul',
    vadSilenceThresholdMs: 850,
    samplingRateHz: 16000,
    bargeInSensitivity: 'High (Instant Interruption)',
    // Security
    dpdpCompliant: true,
    require2faAdmins: true,
    sessionTimeoutMinutes: 60,
    dataResidencyRegion: 'AWS in-west-1 (Mumbai, India)',
    auditLogRetentionDays: 365,
    // Integrations
    metaWhatsappToken: 'EAAK...9zX4 (Active Meta Graph Token)',
    hubspotWebhookUrl: 'https://api.hubapi.com/webhooks/v3/talknex_lead_sync',
    slackAlertWebhook: 'https://hooks.slack.com/services/T00/B00/talknex-alerts',
    webhookSecret: 'whsec_talknex_super_admin_signature_2026'
  });

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    setToast('Enterprise configurations & security policies updated successfully.');
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Toast */}
      {toast && (
        <div className="bg-[#00f59b] text-[#060b18] font-bold text-xs p-3.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Global Platform Settings</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Super Admin Level
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure platform branding, carrier SIP routing, AI model hyperparameters, DPDP compliance, and webhooks.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Deploying Changes...' : 'Save & Deploy Configuration'}</span>
        </button>
      </div>

      {/* 5 Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { key: 'brand', label: 'Brand & Organization', icon: <Building2 className="w-3.5 h-3.5" /> },
          { key: 'telephony', label: 'Telephony & Carrier Routing', icon: <PhoneCall className="w-3.5 h-3.5" /> },
          { key: 'voice', label: 'Voice AI & Synthesis', icon: <Cpu className="w-3.5 h-3.5" /> },
          { key: 'security', label: 'Security & DPDP 2023', icon: <Lock className="w-3.5 h-3.5" /> },
          { key: 'integrations', label: 'Webhooks & Integrations', icon: <Share2 className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === tab.key
                ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="bg-[#0a1329]/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-6">
        {/* Tab 1: Brand & Organization */}
        {activeTab === 'brand' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Platform Owner & Public Brand Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Product Brand Name</label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Parent Corporate Entity</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Marketing Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Customer Support Email Channel</label>
                <input
                  type="email"
                  value={formData.supportEmail}
                  onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Enterprise Sales Email</label>
                <input
                  type="email"
                  value={formData.salesEmail}
                  onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Official Contact Phone (Voice AI IVR)</label>
                <input
                  type="text"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Registered Indian Headquarters</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Telephony & Carrier Routing */}
        {activeTab === 'telephony' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Indian Telecom Regulatory Authority (TRAI) & Carrier Policy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Primary Telecom Carrier SIP</label>
                <input
                  type="text"
                  value={formData.primaryCarrier}
                  onChange={(e) => setFormData({ ...formData, primaryCarrier: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Redundant Carrier Failover</label>
                <input
                  type="text"
                  value={formData.failoverCarrier}
                  onChange={(e) => setFormData({ ...formData, failoverCarrier: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Max Platform Concurrency Limit</label>
                <input
                  type="number"
                  value={formData.maxConcurrentChannels}
                  onChange={(e) => setFormData({ ...formData, maxConcurrentChannels: Number(e.target.value) })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold block">TRAI 140 Header Prefix Mandate</label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.traiPrefixEnforced}
                    onChange={(e) => setFormData({ ...formData, traiPrefixEnforced: e.target.checked })}
                    className="rounded text-[#00f59b] focus:ring-0"
                  />
                  <span>Enforce 140-series virtual numbering on all commercial telemarketing campaigns</span>
                </label>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-slate-300 font-semibold block">TRAI Calling Hours Window (09:00 AM - 09:00 PM IST)</label>
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.traiCallingWindowEnforced}
                    onChange={(e) => setFormData({ ...formData, traiCallingWindowEnforced: e.target.checked })}
                    className="rounded text-[#00f59b] focus:ring-0"
                  />
                  <span>Automatically hold outbound queue items outside permitted 9 AM to 9 PM IST hours</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Voice AI & Synthesis */}
        {activeTab === 'voice' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              Neural Acoustic, Inference, and Speech Pipeline Hyperparameters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Default Low-Latency LLM Engine</label>
                <input
                  type="text"
                  value={formData.defaultLlm}
                  onChange={(e) => setFormData({ ...formData, defaultLlm: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Fallback LLM Failover Cluster</label>
                <input
                  type="text"
                  value={formData.fallbackLlm}
                  onChange={(e) => setFormData({ ...formData, fallbackLlm: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Voice Activity Detection Silence Cutoff (ms)</label>
                <input
                  type="number"
                  value={formData.vadSilenceThresholdMs}
                  onChange={(e) => setFormData({ ...formData, vadSilenceThresholdMs: Number(e.target.value) })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">Recommended: 800 - 900ms for Indian cadence</p>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Carrier Audio Sampling Rate (Hz)</label>
                <input
                  type="number"
                  value={formData.samplingRateHz}
                  onChange={(e) => setFormData({ ...formData, samplingRateHz: Number(e.target.value) })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 mt-1">16000 Hz wideband standard telephony</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Natural Barge-In Interrupt Sensitivity</label>
                <input
                  type="text"
                  value={formData.bargeInSensitivity}
                  onChange={(e) => setFormData({ ...formData, bargeInSensitivity: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & DPDP */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              India Digital Personal Data Protection (DPDP) Act 2023 & Security Controls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Sovereign Data Residency</label>
                <input
                  type="text"
                  value={formData.dataResidencyRegion}
                  disabled
                  className="w-full bg-[#060b18]/60 border border-slate-800 rounded-xl p-2.5 text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Session Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  value={formData.sessionTimeoutMinutes}
                  onChange={(e) => setFormData({ ...formData, sessionTimeoutMinutes: Number(e.target.value) })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dpdpCompliant}
                    onChange={(e) => setFormData({ ...formData, dpdpCompliant: e.target.checked })}
                    className="rounded text-[#00f59b] focus:ring-0"
                  />
                  <span className="font-semibold text-white">Enable DPDP 2023 Audio Encryption & Redaction</span>
                </label>
                <p className="text-[11px] text-slate-400 pl-6">
                  Automatically scrubs PAN card, Aadhaar number, and credit card digits from STT transcripts before storing in database.
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.require2faAdmins}
                    onChange={(e) => setFormData({ ...formData, require2faAdmins: e.target.checked })}
                    className="rounded text-[#00f59b] focus:ring-0"
                  />
                  <span className="font-semibold text-white">Mandate Two-Factor Authentication (2FA) for All Administrators</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Webhooks & Integrations */}
        {activeTab === 'integrations' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide border-b border-slate-800 pb-2">
              External Webhook Handshakes & CRM Webhook Keys
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Meta WhatsApp Cloud API Access Token</label>
                <input
                  type="password"
                  value={formData.metaWhatsappToken}
                  onChange={(e) => setFormData({ ...formData, metaWhatsappToken: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">HubSpot / Salesforce Lead Sync Webhook</label>
                <input
                  type="text"
                  value={formData.hubspotWebhookUrl}
                  onChange={(e) => setFormData({ ...formData, hubspotWebhookUrl: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Slack Platform Alert Webhook</label>
                <input
                  type="text"
                  value={formData.slackAlertWebhook}
                  onChange={(e) => setFormData({ ...formData, slackAlertWebhook: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-300 font-semibold block mb-1">Cryptographic Webhook Signature Secret</label>
                <input
                  type="text"
                  value={formData.webhookSecret}
                  disabled
                  className="w-full bg-[#060b18]/60 border border-slate-800 rounded-xl p-2.5 text-slate-400 font-mono"
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

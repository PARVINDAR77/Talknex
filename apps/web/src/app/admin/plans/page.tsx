'use client';

import React, { useState } from 'react';
import {
  Layers,
  Edit3,
  CheckCircle,
  Save,
  Check,
  Sparkles,
  PhoneCall,
  Bot,
  Zap,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface CommercialPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceInr: number;
  callMinutesIncluded: number;
  voiceAgentsLimit: number;
  concurrencyLimit: number;
  isPopular: boolean;
  features: string[];
}

export default function PlansAdminPage() {
  const [plans, setPlans] = useState<CommercialPlan[]>([
    {
      id: 'starter',
      name: 'Starter Tier',
      tagline: 'Ideal for local businesses and early sales outreach automation.',
      monthlyPriceInr: 1499,
      callMinutesIncluded: 1200,
      voiceAgentsLimit: 2,
      concurrencyLimit: 5,
      isPopular: false,
      features: [
        '1,200 Indian Call Minutes / mo',
        '2 Autonomous Voice Agents',
        'Hindi & English Dialects',
        'Sub-400ms Natural Barge-In',
        'Standard Email Support'
      ]
    },
    {
      id: 'growth',
      name: 'Growth Tier',
      tagline: 'Built for scaling sales teams, dealerships, and clinics.',
      monthlyPriceInr: 4999,
      callMinutesIncluded: 5000,
      voiceAgentsLimit: 5,
      concurrencyLimit: 25,
      isPopular: true,
      features: [
        '5,000 Indian Call Minutes / mo',
        '5 Autonomous Voice Agents',
        'Hindi, Gujarati & Marathi Dialects',
        'TRAI 140-Series Numbering',
        'Webhook & HubSpot Integration',
        'Priority Technical Support'
      ]
    },
    {
      id: 'business',
      name: 'Business Tier',
      tagline: 'Comprehensive solution for high-volume enterprise operations.',
      monthlyPriceInr: 9999,
      callMinutesIncluded: 25000,
      voiceAgentsLimit: 15,
      concurrencyLimit: 100,
      isPopular: false,
      features: [
        '25,000 Indian Call Minutes / mo',
        '15 Autonomous Voice Agents',
        'All 10+ Indic Regional Languages',
        'Real-time WhatsApp Follow-ups',
        'Dedicated Tata/Airtel SIP Trunk',
        '99.98% Gateway SLA Guarantee'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Custom',
      tagline: 'Custom infrastructure, bespoke models, and wholesale telephony.',
      monthlyPriceInr: 85000,
      callMinutesIncluded: 100000,
      voiceAgentsLimit: 50,
      concurrencyLimit: 500,
      isPopular: false,
      features: [
        '100,000+ Call Minutes Included',
        'Unlimited AI Voice Agents',
        'Custom Fine-Tuned LPU Models',
        'DPDP Sovereign On-Prem/VPC Option',
        'Dedicated 24/7 Account Engineer',
        'Direct Wholesale Telephony Rates'
      ]
    }
  ]);

  const [editingPlan, setEditingPlan] = useState<CommercialPlan | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function handleSavePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPlan) return;
    setPlans((prev) =>
      prev.map((p) => (p.id === editingPlan.id ? editingPlan : p))
    );
    setToast(`Plan '${editingPlan.name}' updated and synced with website pricing.`);
    setTimeout(() => setToast(null), 4000);
    setEditingPlan(null);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
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
            <h2 className="text-xl font-extrabold text-white tracking-tight">Commercial Plans & Pricing</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Public Website Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure dynamic commercial pricing tiers, included minutes allowances, and enterprise entitlements.
          </p>
        </div>
      </div>

      {/* 4 Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-[#0a1329]/90 rounded-2xl p-4 sm:p-6 border shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-5 transition-all ${
              p.isPopular
                ? 'border-[#00f59b]/50 shadow-[0_0_20px_rgba(0,245,155,0.15)] ring-1 ring-[#00f59b]/30'
                : 'border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">{p.name}</span>
                {p.isPopular && (
                  <span className="text-[10px] font-extrabold text-[#060b18] bg-[#00f59b] px-2.5 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,245,155,0.4)]">
                    MOST POPULAR
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 min-h-[36px]">{p.tagline}</p>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white">
                  ₹{p.monthlyPriceInr.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 font-medium"> /month</span>
              </div>

              {/* Quotas */}
              <div className="mt-4 bg-[#060b18] p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Included Minutes:</span>
                  <span className="font-bold text-[#00f59b] font-mono">{p.callMinutesIncluded.toLocaleString('en-IN')} mins</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Voice Agents:</span>
                  <span className="font-bold text-white font-mono">{p.voiceAgentsLimit} Agents</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Concurrency:</span>
                  <span className="font-bold text-white font-mono">{p.concurrencyLimit} Channels</span>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="mt-4 space-y-2 text-xs">
                {p.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#00f59b] shrink-0" />
                    <span className="text-[11px]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setEditingPlan(p)}
              className="w-full bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Plan & Quota</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSavePlan}
            className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">Modify Plan: {editingPlan.name}</h3>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="text-slate-400 hover:text-white text-base font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Monthly Pricing (₹ INR)</label>
                <input
                  type="number"
                  value={editingPlan.monthlyPriceInr}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, monthlyPriceInr: Number(e.target.value) })
                  }
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Included Calling Minutes</label>
                <input
                  type="number"
                  value={editingPlan.callMinutesIncluded}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, callMinutesIncluded: Number(e.target.value) })
                  }
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Active Voice Agents Limit</label>
                <input
                  type="number"
                  value={editingPlan.voiceAgentsLimit}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, voiceAgentsLimit: Number(e.target.value) })
                  }
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Trunk Concurrency Channels</label>
                <input
                  type="number"
                  value={editingPlan.concurrencyLimit}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, concurrencyLimit: Number(e.target.value) })
                  }
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(0,245,155,0.3)]"
              >
                Save & Sync With Website
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

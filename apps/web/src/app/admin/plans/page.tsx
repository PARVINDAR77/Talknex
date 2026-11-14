'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Edit3, CheckCircle, Save } from 'lucide-react';
import type { PricingPlanModel } from '@talknex/shared';

export default function PlansAdminPage() {
  const [plans, setPlans] = useState<PricingPlanModel[]>([]);
  const [editingPlan, setEditingPlan] = useState<PricingPlanModel | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadPlans() {
    try {
      const res = await fetch(`${apiUrl}/admin/plans`, {
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) setPlans(json.data);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleSavePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPlan) return;
    try {
      await fetch(`${apiUrl}/admin/plans/${editingPlan.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify(editingPlan)
      });
      setToast(`Plan '${editingPlan.name}' updated and synced with website pricing.`);
      setTimeout(() => setToast(null), 4000);
      setEditingPlan(null);
      loadPlans();
    } catch {
      setEditingPlan(null);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {toast && (
        <div className="bg-emerald-500 text-slate-900 font-bold text-xs p-3 rounded-xl flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Commercial Plans & Pricing</h2>
        <p className="text-xs text-slate-500 mt-0.5">Control dynamic pricing plans, call minute packages, and feature entitlements displayed on the public TalkNex website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {plans.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{p.name}</span>
                {p.isPopular && (
                  <span className="text-[10px] font-bold text-[#060b18] bg-[#00f59b] px-2 py-0.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{p.tagline}</p>

              <div className="mt-4">
                <span className="text-2xl font-extrabold text-slate-900">
                  {p.monthlyPriceInr > 0 ? `₹${p.monthlyPriceInr.toLocaleString('en-IN')}` : 'Custom'}
                </span>
                {p.monthlyPriceInr > 0 && <span className="text-xs text-slate-400 font-medium"> /month</span>}
              </div>

              <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Call Minutes:</span>
                  <span className="font-bold text-slate-900">{p.callMinutesIncluded.toLocaleString('en-IN')} mins</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Voice Agents:</span>
                  <span className="font-bold text-slate-900">{p.voiceAgentsLimit} Agents</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setEditingPlan(p)}
              className="w-full bg-slate-50 hover:bg-[#00f59b] hover:text-[#060b18] text-slate-700 text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Plan Configuration</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={handleSavePlan} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Plan: {editingPlan.name}</h3>
              <button type="button" onClick={() => setEditingPlan(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Plan Name</label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Monthly Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.monthlyPriceInr}
                    onChange={(e) => setEditingPlan({ ...editingPlan, monthlyPriceInr: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Yearly Price (₹)</label>
                  <input
                    type="number"
                    value={editingPlan.yearlyPriceInr}
                    onChange={(e) => setEditingPlan({ ...editingPlan, yearlyPriceInr: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Call Minutes</label>
                  <input
                    type="number"
                    value={editingPlan.callMinutesIncluded}
                    onChange={(e) => setEditingPlan({ ...editingPlan, callMinutesIncluded: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Voice Agents Limit</label>
                  <input
                    type="number"
                    value={editingPlan.voiceAgentsLimit}
                    onChange={(e) => setEditingPlan({ ...editingPlan, voiceAgentsLimit: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheckbox"
                  checked={editingPlan.isPopular}
                  onChange={(e) => setEditingPlan({ ...editingPlan, isPopular: e.target.checked })}
                  className="rounded text-[#00f59b] focus:ring-0"
                />
                <label htmlFor="popularCheckbox" className="font-semibold text-slate-700 select-none">
                  Highlight as Most Popular Plan
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Publish</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


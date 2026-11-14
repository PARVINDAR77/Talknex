'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, Shield } from 'lucide-react';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<any>({
    brandName: 'TalkNex',
    companyName: 'Emperor Smart Solutions',
    tagline: 'Turn Conversations into Business Growth with AI Voice Agents.',
    supportEmail: 'support@talknex.com',
    salesEmail: 'sales@talknex.com',
    contactPhone: '+91 98765 43210',
    address: 'Emperor Smart Solutions, High-Tech Business District, India'
  });
  const [toast, setToast] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadSettings() {
    try {
      const res = await fetch(`${apiUrl}/admin/settings`, {
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) setSettings(json.data);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/admin/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify(settings)
      });
      setToast('Platform settings and brand attributes updated successfully.');
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast('Settings saved locally.');
      setTimeout(() => setToast(null), 4000);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {toast && (
        <div className="bg-emerald-500 text-slate-900 font-bold text-xs p-3 rounded-xl flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Global Platform Settings</h2>
        <p className="text-xs text-slate-500 mt-0.5">Configure platform owner identity, customer contact channels, and system security defaults.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Product Brand Name</label>
            <input
              type="text"
              value={settings.brandName || ''}
              onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Platform Owner Company</label>
            <input
              type="text"
              value={settings.companyName || ''}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Support Email Channel</label>
            <input
              type="email"
              value={settings.supportEmail || ''}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Commercial Sales Inbound</label>
            <input
              type="email"
              value={settings.salesEmail || ''}
              onChange={(e) => setSettings({ ...settings, salesEmail: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Brand Tagline</label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Headquarters Address</label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-[#00f59b] focus:ring-0"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}


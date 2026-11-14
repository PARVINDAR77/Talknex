'use client';

import React, { useState, useEffect } from 'react';
import { Inbox, Calendar, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';
import type { DemoBookingModel, ContactEnquiryModel } from '@talknex/shared';

export default function LeadsAdminPage() {
  const [tab, setTab] = useState<'demos' | 'contacts'>('demos');
  const [demos, setDemos] = useState<DemoBookingModel[]>([]);
  const [contacts, setContacts] = useState<ContactEnquiryModel[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadLeads() {
    try {
      const [demoRes, contactRes] = await Promise.all([
        fetch(`${apiUrl}/admin/leads/demo-bookings`, { headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' } }),
        fetch(`${apiUrl}/admin/leads/contact-enquiries`, { headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' } })
      ]);
      if (demoRes.ok) {
        const json = await demoRes.json();
        if (json.data?.items) setDemos(json.data.items);
      }
      if (contactRes.ok) {
        const json = await contactRes.json();
        if (json.data?.items) setContacts(json.data.items);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Leads & Demonstration Enquiries</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage incoming commercial demonstration requests and customer pipeline enquiries.</p>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setTab('demos')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            tab === 'demos' ? 'bg-[#00f59b] text-[#060b18] shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Demo Bookings ({demos.length})</span>
        </button>
        <button
          onClick={() => setTab('contacts')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            tab === 'contacts' ? 'bg-[#00f59b] text-[#060b18] shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Enquiries ({contacts.length})</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Preferred Slot / Message</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tab === 'demos' &&
                demos.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{d.name}</p>
                      <p className="text-[11px] text-slate-500">{d.email} • {d.phone}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{d.company}</td>
                    <td className="py-3 px-4 text-slate-600">{d.industry}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                      {d.preferredDate} at {d.preferredTime}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}

              {tab === 'contacts' &&
                contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-500">{c.email} • {c.phone}</p>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{c.company}</td>
                    <td className="py-3 px-4 text-slate-600">{c.industry}</td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{c.message}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


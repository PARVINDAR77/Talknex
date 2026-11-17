'use client';

import React, { useState, useMemo } from 'react';
import {
  Inbox,
  Calendar,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  Search,
  Download,
  ArrowUpRight,
  Sparkles,
  Clock,
  Filter
} from 'lucide-react';

interface DemoLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  preferredDate: string;
  preferredTime: string;
  status: 'NEW' | 'CONTACTED' | 'DEMO_SCHEDULED' | 'WON';
  createdAt: string;
}

export default function LeadsAdminPage() {
  const [tab, setTab] = useState<'demos' | 'contacts'>('demos');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState<string | null>(null);

  const [demos, setDemos] = useState<DemoLead[]>([
    {
      id: 'demo_101',
      name: 'Rajesh Singhania',
      email: 'rajesh@singhaniaproperties.com',
      phone: '+91 98200 11223',
      company: 'Singhania Realty Mumbai',
      industry: 'Real Estate',
      preferredDate: '2026-11-19',
      preferredTime: '03:00 PM IST',
      status: 'DEMO_SCHEDULED',
      createdAt: '2026-11-17T08:30:00Z'
    },
    {
      id: 'demo_102',
      name: 'Dr. Ananya Desai',
      email: 'ananya@apollo-care.org',
      phone: '+91 98980 44556',
      company: 'CareFirst Hospital Network',
      industry: 'Healthcare',
      preferredDate: '2026-11-20',
      preferredTime: '11:30 AM IST',
      status: 'NEW',
      createdAt: '2026-11-17T09:15:00Z'
    },
    {
      id: 'demo_103',
      name: 'Vikram Mehta',
      email: 'vikram@auto-apex.in',
      phone: '+91 97120 77889',
      company: 'Apex Automotive Dealerships',
      industry: 'Automotive',
      preferredDate: '2026-11-21',
      preferredTime: '04:30 PM IST',
      status: 'CONTACTED',
      createdAt: '2026-11-16T14:40:00Z'
    },
    {
      id: 'demo_104',
      name: 'Pooja Iyer',
      email: 'pooja@finwealth-advisors.com',
      phone: '+91 99300 22110',
      company: 'FinWealth Capital Management',
      industry: 'BFSI',
      preferredDate: '2026-11-18',
      preferredTime: '02:00 PM IST',
      status: 'WON',
      createdAt: '2026-11-15T11:00:00Z'
    }
  ]);

  const filteredDemos = useMemo(() => {
    return demos.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.company.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.industry.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [demos, search, statusFilter]);

  function handleUpdateStatus(id: string, newStatus: DemoLead['status']) {
    setDemos((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    setToast(`Lead status updated to ${newStatus}`);
    setTimeout(() => setToast(null), 3000);
  }

  function handleExportCsv() {
    const headers = 'ID,Name,Email,Phone,Company,Industry,Slot,Status,CreatedAt\n';
    const rows = filteredDemos
      .map(
        (d) =>
          `"${d.id}","${d.name}","${d.email}","${d.phone}","${d.company}","${d.industry}","${d.preferredDate} ${d.preferredTime}","${d.status}","${d.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talknex_leads_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {toast && (
        <div className="bg-[#00f59b] text-[#060b18] font-bold text-xs p-3.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Leads & Demonstration Enquiries</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              High-Intent Inbound Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage enterprise sales enquiries, live demonstration bookings, and commercial customer conversions.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-[#0a1329] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#00f59b]" />
          <span>Export Pipeline CSV</span>
        </button>
      </div>

      {/* 4 Pipeline Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Inbound Requests</span>
          <p className="text-2xl font-extrabold text-white mt-1">148 Leads</p>
          <p className="text-xs text-[#00f59b] font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +42% MoM Inflow
          </p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Demos Scheduled This Week</span>
          <p className="text-2xl font-extrabold text-white mt-1">26 Sessions</p>
          <p className="text-xs text-blue-400 font-semibold mt-2">Avg Deal Size: ₹48,000</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Lead-to-Demo Conversion</span>
          <p className="text-2xl font-extrabold text-white mt-1">68.4%</p>
          <p className="text-xs text-purple-400 font-semibold mt-2">High product affinity</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Pipeline Pipeline Value</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹42.8 Lakhs</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">Active pipeline stage</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar max-w-full">
          {['ALL', 'NEW', 'CONTACTED', 'DEMO_SCHEDULED', 'WON'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {st === 'ALL' ? 'All Leads' : st.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lead, enterprise, industry..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Contact Executive</th>
                <th className="py-3.5 px-4">Organization & Industry</th>
                <th className="py-3.5 px-4">Preferred Demonstration Slot</th>
                <th className="py-3.5 px-4">Status Stage</th>
                <th className="py-3.5 px-4 text-right">Update Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDemos.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-white text-xs">{d.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{d.email}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{d.phone}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-200">{d.company}</p>
                    <span className="text-[10px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded mt-1 inline-block">
                      {d.industry}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#00f59b]" />
                      <span>{d.preferredDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] mt-0.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{d.preferredTime}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        d.status === 'WON'
                          ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                          : d.status === 'DEMO_SCHEDULED'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                          : d.status === 'CONTACTED'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {d.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={d.status}
                      onChange={(e) => handleUpdateStatus(d.id, e.target.value as any)}
                      className="bg-[#060b18] border border-slate-700 text-slate-300 text-xs rounded-lg px-2 py-1 focus:border-[#00f59b] focus:outline-none"
                    >
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="DEMO_SCHEDULED">Demo Scheduled</option>
                      <option value="WON">Closed Won</option>
                    </select>
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

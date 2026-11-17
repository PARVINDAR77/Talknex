'use client';

import React, { useState, useMemo } from 'react';
import {
  Repeat,
  CheckCircle,
  Search,
  ShieldCheck,
  TrendingUp,
  Download,
  Filter,
  CreditCard,
  Building2,
  Calendar,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface SubscriptionRecord {
  id: string;
  org: string;
  industry: string;
  plan: 'Starter' | 'Growth' | 'Business' | 'Enterprise';
  amount: number;
  cycle: 'Monthly' | 'Yearly';
  renewsAt: string;
  status: 'ACTIVE' | 'TRIAL' | 'PAST_DUE' | 'CANCELLED';
  autoRenew: boolean;
  minutesUsed: number;
  minutesLimit: number;
  agentsActive: number;
}

export default function SubscriptionsAdminPage() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('ALL');
  const [selectedSub, setSelectedSub] = useState<SubscriptionRecord | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>([
    {
      id: 'sub_1',
      org: 'RealVista Properties Ltd',
      industry: 'Real Estate',
      plan: 'Growth',
      amount: 4999,
      cycle: 'Monthly',
      renewsAt: '2026-12-15',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 4210,
      minutesLimit: 5000,
      agentsActive: 5
    },
    {
      id: 'sub_2',
      org: 'Medicare Health Super-Specialty',
      industry: 'Healthcare',
      plan: 'Business',
      amount: 49999,
      cycle: 'Yearly',
      renewsAt: '2027-07-20',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 12400,
      minutesLimit: 25000,
      agentsActive: 12
    },
    {
      id: 'sub_3',
      org: 'EduSmart EdTech Academy',
      industry: 'Education',
      plan: 'Starter',
      amount: 1499,
      cycle: 'Monthly',
      renewsAt: '2026-12-01',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 890,
      minutesLimit: 1200,
      agentsActive: 2
    },
    {
      id: 'sub_4',
      org: 'AutoDrive Motors India',
      industry: 'Automotive',
      plan: 'Growth',
      amount: 4999,
      cycle: 'Monthly',
      renewsAt: '2026-12-15',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 3120,
      minutesLimit: 5000,
      agentsActive: 4
    },
    {
      id: 'sub_5',
      org: 'ShopKart E-Commerce Retail',
      industry: 'E-commerce',
      plan: 'Business',
      amount: 9999,
      cycle: 'Monthly',
      renewsAt: '2026-12-10',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 18450,
      minutesLimit: 25000,
      agentsActive: 14
    },
    {
      id: 'sub_6',
      org: 'Aarav Conglomerate Industries',
      industry: 'Manufacturing',
      plan: 'Enterprise',
      amount: 85000,
      cycle: 'Monthly',
      renewsAt: '2026-12-13',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 64200,
      minutesLimit: 100000,
      agentsActive: 48
    },
    {
      id: 'sub_7',
      org: 'FinWealth Financial Advisory',
      industry: 'BFSI',
      plan: 'Business',
      amount: 9999,
      cycle: 'Monthly',
      renewsAt: '2026-12-18',
      status: 'ACTIVE',
      autoRenew: true,
      minutesUsed: 9800,
      minutesLimit: 25000,
      agentsActive: 8
    }
  ]);

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchSearch =
        sub.org.toLowerCase().includes(search.toLowerCase()) ||
        sub.industry.toLowerCase().includes(search.toLowerCase()) ||
        sub.id.toLowerCase().includes(search.toLowerCase());
      const matchPlan = planFilter === 'ALL' || sub.plan.toUpperCase() === planFilter.toUpperCase();
      return matchSearch && matchPlan;
    });
  }, [subscriptions, search, planFilter]);

  function handleExportCsv() {
    const headers = 'ID,Organization,Industry,Plan,Cycle,Amount_INR,RenewsAt,Status\n';
    const rows = filteredSubscriptions
      .map(
        (s) =>
          `"${s.id}","${s.org}","${s.industry}","${s.plan}","${s.cycle}",${s.amount},"${s.renewsAt}","${s.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talknex_subscriptions_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExtendMinutes(sub: SubscriptionRecord) {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, minutesLimit: s.minutesLimit + 1000 } : s))
    );
    setToast(`Granted +1,000 promotional call minutes to ${sub.org}`);
    setTimeout(() => setToast(null), 4000);
    setSelectedSub(null);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className="bg-[#00f59b] text-[#060b18] font-bold text-xs p-3.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Active Customer Subscriptions</h2>
            <span className="text-[10px] font-bold text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30 px-2 py-0.5 rounded-full">
              {subscriptions.length} Contracted Accounts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage SaaS customer subscriptions, recurring plan tiers, minute quotas, and automated renewal cycles.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-[#0a1329] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#00f59b]" />
          <span>Export Ledger</span>
        </button>
      </div>

      {/* 4 Financial & Health KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Monthly Contracted MRR</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹14,50,000</p>
          <p className="text-xs text-[#00f59b] font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% Net New MRR
          </p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-blue-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Active Paid Workspaces</span>
          <p className="text-2xl font-extrabold text-white mt-1">214 Accounts</p>
          <p className="text-xs text-blue-400 font-semibold mt-2">100% on automated billing</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-purple-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Enterprise Contracts</span>
          <p className="text-2xl font-extrabold text-white mt-1">18 Organizations</p>
          <p className="text-xs text-purple-400 font-semibold mt-2">Avg contract: ₹85k/mo</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-amber-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Net Logo Churn Rate</span>
          <p className="text-2xl font-extrabold text-white mt-1">0.8%</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">Zero involuntary churn</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        {/* Plan Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'Starter', 'Growth', 'Business', 'Enterprise'].map((tier) => (
            <button
              key={tier}
              onClick={() => setPlanFilter(tier)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                planFilter === tier
                  ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {tier === 'ALL' ? 'All Plans' : tier}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company, industry, or ID..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Organization & Industry</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Minutes Quota</th>
                <th className="py-3.5 px-4">Value</th>
                <th className="py-3.5 px-4">Next Renewal</th>
                <th className="py-3.5 px-4">Auto-Renew</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSubscriptions.map((sub) => {
                const quotaPercent = Math.round((sub.minutesUsed / sub.minutesLimit) * 100);
                const badgeColor =
                  sub.plan === 'Enterprise'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : sub.plan === 'Business'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    : sub.plan === 'Growth'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                return (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                          {sub.org.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{sub.org}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{sub.industry} • ID: {sub.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                        {sub.plan}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-36 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>{sub.minutesUsed.toLocaleString('en-IN')}m</span>
                          <span>{sub.minutesLimit.toLocaleString('en-IN')}m ({quotaPercent}%)</span>
                        </div>
                        <div className="w-full bg-[#060b18] rounded-full h-1.5 overflow-hidden border border-slate-800">
                          <div
                            className={`h-1.5 rounded-full ${quotaPercent > 80 ? 'bg-amber-500' : 'bg-[#00f59b]'}`}
                            style={{ width: `${Math.min(100, quotaPercent)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-extrabold text-white font-mono text-xs">
                        ₹{sub.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">{sub.cycle}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                      {sub.renewsAt}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedSub(sub)}
                        className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 font-semibold px-3 py-1 rounded-lg transition-all text-xs"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subscription Detail / Manage Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white">{selectedSub.org}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Subscription Reference: {selectedSub.id}</p>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Current Plan Tier</span>
                <p className="text-white font-bold text-sm mt-0.5">{selectedSub.plan}</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Recurring Price</span>
                <p className="text-white font-bold text-sm mt-0.5">₹{selectedSub.amount.toLocaleString('en-IN')} / {selectedSub.cycle.toLowerCase()}</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Minutes Allocated</span>
                <p className="text-white font-bold text-sm mt-0.5">{selectedSub.minutesLimit.toLocaleString('en-IN')} mins</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Voice Agents Allowed</span>
                <p className="text-white font-bold text-sm mt-0.5">{selectedSub.agentsActive} Active Agents</p>
              </div>
            </div>

            <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Next Scheduled Renewal:</span>
                <span className="text-white font-mono font-bold">{selectedSub.renewsAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Automated Payment Mode:</span>
                <span className="text-emerald-400 font-bold">Razorpay Mandate Active</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => handleExtendMinutes(selectedSub)}
                className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(0,245,155,0.3)]"
              >
                Grant +1,000 Promotional Minutes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

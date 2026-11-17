'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Ban,
  Wallet,
  Phone,
  Mail,
  UserCheck,
  ArrowUpRight,
  Sparkles,
  Download
} from 'lucide-react';
import type { OrganizationModel } from '@talknex/shared';

export default function OrganizationsAdminPage() {
  const [organizations, setOrganizations] = useState<any[]>([
    {
      id: 'org_1',
      name: 'RealVista Properties Ltd',
      businessEmail: 'ops@realvista.com',
      industry: 'Real Estate',
      planName: 'Growth Tier',
      walletBalanceInr: 14200,
      usersCount: 6,
      calls30d: 14200,
      status: 'ACTIVE'
    },
    {
      id: 'org_2',
      name: 'Medicare Health Super-Specialty',
      businessEmail: 'admin@medicare.in',
      industry: 'Healthcare',
      planName: 'Business Tier',
      walletBalanceInr: 48000,
      usersCount: 14,
      calls30d: 38900,
      status: 'ACTIVE'
    },
    {
      id: 'org_3',
      name: 'EduSmart EdTech Academy',
      businessEmail: 'hello@edusmart.org',
      industry: 'Education',
      planName: 'Starter Tier',
      walletBalanceInr: 3500,
      usersCount: 3,
      calls30d: 4120,
      status: 'ACTIVE'
    },
    {
      id: 'org_4',
      name: 'AutoDrive Motors India',
      businessEmail: 'contact@autodrive.com',
      industry: 'Automotive',
      planName: 'Growth Tier',
      walletBalanceInr: 9800,
      usersCount: 5,
      calls30d: 11450,
      status: 'ACTIVE'
    },
    {
      id: 'org_5',
      name: 'ShopKart E-Commerce Retail',
      businessEmail: 'tech@shopkart.in',
      industry: 'E-commerce',
      planName: 'Business Tier',
      walletBalanceInr: 24500,
      usersCount: 18,
      calls30d: 48900,
      status: 'ACTIVE'
    },
    {
      id: 'org_6',
      name: 'Aarav Conglomerate Industries',
      businessEmail: 'corporate@aarav.co',
      industry: 'Manufacturing',
      planName: 'Enterprise SLA',
      walletBalanceInr: 125000,
      usersCount: 42,
      calls30d: 84200,
      status: 'ACTIVE'
    }
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [industryFilter, setIndustryFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [newOrgForm, setNewOrgForm] = useState({
    name: '',
    businessEmail: '',
    phone: '',
    industry: 'Real Estate',
    planId: 'growth',
    walletBalanceInr: 10000
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadOrganizations() {
    try {
      const res = await fetch(
        `${apiUrl}/admin/organizations?search=${encodeURIComponent(search)}&status=${statusFilter}&industry=${industryFilter}&page=${page}`,
        { headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' } }
      );
      if (res.ok) {
        const json = await res.json();
        if (json.data?.items && json.data.items.length > 0) {
          setOrganizations(json.data.items);
        }
      }
    } catch {
      // Keep rich fallback
    }
  }

  useEffect(() => {
    loadOrganizations();
  }, [search, statusFilter, industryFilter, page]);

  function handleToggleStatus(org: any) {
    const newStatus = org.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setOrganizations((prev) =>
      prev.map((o) => (o.id === org.id ? { ...o, status: newStatus } : o))
    );
    setToast(`${org.name} status updated to ${newStatus}`);
    setTimeout(() => setToast(null), 3000);
  }

  function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    const newOrg = {
      id: `org_${Date.now()}`,
      name: newOrgForm.name,
      businessEmail: newOrgForm.businessEmail,
      industry: newOrgForm.industry,
      planName: `${newOrgForm.planId.charAt(0).toUpperCase() + newOrgForm.planId.slice(1)} Tier`,
      walletBalanceInr: newOrgForm.walletBalanceInr,
      usersCount: 1,
      calls30d: 0,
      status: 'ACTIVE'
    };
    setOrganizations([newOrg, ...organizations]);
    setShowAddModal(false);
    setToast(`Organization ${newOrg.name} registered successfully.`);
    setTimeout(() => setToast(null), 4000);
  }

  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      const matchSearch =
        org.name.toLowerCase().includes(search.toLowerCase()) ||
        org.businessEmail.toLowerCase().includes(search.toLowerCase()) ||
        org.industry.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || org.status === statusFilter;
      const matchIndustry = industryFilter === 'ALL' || org.industry === industryFilter;
      return matchSearch && matchStatus && matchIndustry;
    });
  }, [organizations, search, statusFilter, industryFilter]);

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
            <h2 className="text-xl font-extrabold text-white tracking-tight">Organization Management</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {organizations.length} Enterprise Tenants
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage customer workspaces, subscription tiers, calling allowances, and tenant accounts.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Organization</span>
        </button>
      </div>

      {/* 4 Tenant KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Active Tenants</span>
          <p className="text-2xl font-extrabold text-white mt-1">248 Accounts</p>
          <p className="text-xs text-[#00f59b] font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% MoM Growth
          </p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Prepaid Wallets</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹4,25,000</p>
          <p className="text-xs text-blue-400 font-semibold mt-2">Zero overdraft liability</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Provisioned Users</span>
          <p className="text-2xl font-extrabold text-white mt-1">3,420 Users</p>
          <p className="text-xs text-purple-400 font-semibold mt-2">Across 6 verticals</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Monthly Call Volume</span>
          <p className="text-2xl font-extrabold text-white mt-1">1,24,560 Calls</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">99.8% Connection rate</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organizations, emails, domains..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#060b18] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:border-[#00f59b] focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
          </select>

          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-[#060b18] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:border-[#00f59b] focus:outline-none"
          >
            <option value="ALL">All Industries</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Automotive">Automotive</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Organization & Email</th>
                <th className="py-3.5 px-4">Industry</th>
                <th className="py-3.5 px-4">Plan Tier</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">Users</th>
                <th className="py-3.5 px-4">30d Calls</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold">
                        {org.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-tight">{org.name}</p>
                        <p className="text-[11px] text-slate-400 leading-none mt-0.5">{org.businessEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 font-medium">{org.industry}</td>
                  <td className="py-3.5 px-4">
                    <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full capitalize">
                      {org.planName || org.planId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-white font-mono">
                    ₹{(org.walletBalanceInr || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">{org.usersCount || 1} Users</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 font-semibold">
                    {(org.calls30d || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        org.status === 'ACTIVE'
                          ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedOrg(org)}
                        className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 font-semibold px-2.5 py-1 rounded-lg transition-all text-xs"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleToggleStatus(org)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all border ${
                          org.status === 'ACTIVE'
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {org.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                  {selectedOrg.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">{selectedOrg.name}</h3>
                  <p className="text-xs text-slate-400">{selectedOrg.businessEmail}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrg(null)} className="text-slate-400 hover:text-white text-base font-bold">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 font-medium">Industry Vertical</p>
                <p className="text-white font-bold text-sm mt-0.5">{selectedOrg.industry}</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 font-medium">Subscription Tier</p>
                <p className="text-white font-bold text-sm mt-0.5 capitalize">{selectedOrg.planName || selectedOrg.planId}</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 font-medium">Prepaid Calling Wallet</p>
                <p className="text-[#00f59b] font-bold text-sm mt-0.5">₹{(selectedOrg.walletBalanceInr || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-[#060b18] p-3 rounded-xl border border-slate-800">
                <p className="text-slate-400 font-medium">Tenant Status</p>
                <p className="text-white font-bold text-sm mt-0.5">{selectedOrg.status}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedOrg(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Org Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateOrg} className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">Register Customer Enterprise</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-base font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Company / Organization Name</label>
                <input
                  required
                  type="text"
                  value={newOrgForm.name}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, name: e.target.value })}
                  placeholder="e.g. Apex Health Logistics"
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Official Business Email</label>
                <input
                  required
                  type="email"
                  value={newOrgForm.businessEmail}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, businessEmail: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Industry</label>
                  <select
                    value={newOrgForm.industry}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, industry: e.target.value })}
                    className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                  >
                    <option value="Real Estate">Real Estate</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Automotive">Automotive</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Plan Tier</label>
                  <select
                    value={newOrgForm.planId}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, planId: e.target.value })}
                    className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                  >
                    <option value="starter">Starter</option>
                    <option value="growth">Growth</option>
                    <option value="business">Business</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Initial Calling Wallet (₹)</label>
                <input
                  type="number"
                  value={newOrgForm.walletBalanceInr}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, walletBalanceInr: Number(e.target.value) })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(0,245,155,0.3)]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

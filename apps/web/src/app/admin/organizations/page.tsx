'use client';

import React, { useState, useEffect } from 'react';
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
  UserCheck
} from 'lucide-react';
import { OrganizationModel, OrganizationStatus } from '@talknex/shared';

export default function OrganizationsAdminPage() {
  const [organizations, setOrganizations] = useState<OrganizationModel[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [industryFilter, setIndustryFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrg, setSelectedOrg] = useState<OrganizationModel | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
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
        if (json.data?.items) {
          setOrganizations(json.data.items);
          setTotalPages(json.data.totalPages || 1);
        }
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadOrganizations();
  }, [search, statusFilter, industryFilter, page]);

  async function handleToggleStatus(org: OrganizationModel) {
    const newStatus = org.status === OrganizationStatus.ACTIVE ? OrganizationStatus.SUSPENDED : OrganizationStatus.ACTIVE;
    try {
      await fetch(`${apiUrl}/admin/organizations/${org.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify({ status: newStatus })
      });
      loadOrganizations();
    } catch {
      // Optimistic update
      setOrganizations((prev) =>
        prev.map((o) => (o.id === org.id ? { ...o, status: newStatus } : o))
      );
    }
  }

  async function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/admin/organizations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify(newOrgForm)
      });
      setShowAddModal(false);
      loadOrganizations();
    } catch {
      setShowAddModal(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Organization Management</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage customer enterprises, subscription tiers, calling allowances, and account states.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Organization</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search organizations, emails, domains..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#00f59b]"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PENDING">Pending</option>
          </select>

          {/* Industry Filter */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#00f59b]"
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
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Wallet Balance</th>
                <th className="py-3 px-4">Users</th>
                <th className="py-3 px-4">30d Calls</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {organizations.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{org.name}</p>
                        <p className="text-[11px] text-slate-500 leading-none mt-0.5">{org.businessEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600">{org.industry}</td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full capitalize">
                      {org.planName || org.planId}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">
                    ₹{(org.walletBalanceInr || 0).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600">{org.usersCount || 1}</td>
                  <td className="py-3 px-4 font-medium text-slate-600">{(org.calls30d || 0).toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        org.status === OrganizationStatus.ACTIVE
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                          : 'text-amber-700 bg-amber-50 border-amber-200/60'
                      }`}
                    >
                      {org.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrg(org)}
                        className="text-xs font-semibold text-slate-700 hover:text-indigo-600 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleToggleStatus(org)}
                        title={org.status === OrganizationStatus.ACTIVE ? 'Suspend Organization' : 'Activate Organization'}
                        className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                          org.status === OrganizationStatus.ACTIVE
                            ? 'text-rose-600 hover:bg-rose-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {org.status === OrganizationStatus.ACTIVE ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
          <span>Showing page {page} of {totalPages}</span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Organization Details Drawer / Modal */}
      {selectedOrg && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedOrg.name}</h3>
                  <p className="text-xs text-slate-500">{selectedOrg.businessEmail}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrg(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-medium">Industry</p>
                <p className="text-slate-900 font-bold mt-0.5">{selectedOrg.industry}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-medium">Plan</p>
                <p className="text-slate-900 font-bold mt-0.5 capitalize">{selectedOrg.planName || selectedOrg.planId}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-medium">Calling Wallet</p>
                <p className="text-slate-900 font-bold mt-0.5">₹{(selectedOrg.walletBalanceInr || 0).toLocaleString('en-IN')}</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-slate-400 font-medium">Account Status</p>
                <p className="text-emerald-600 font-bold mt-0.5">{selectedOrg.status}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setSelectedOrg(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Organization Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={handleCreateOrg} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add Customer Organization</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company Name</label>
                <input
                  required
                  type="text"
                  value={newOrgForm.name}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, name: e.target.value })}
                  placeholder="e.g. Apex Health Logistics"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Business Email</label>
                <input
                  required
                  type="email"
                  value={newOrgForm.businessEmail}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, businessEmail: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Industry</label>
                  <select
                    value={newOrgForm.industry}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, industry: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2"
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
                  <label className="font-semibold text-slate-700 block mb-1">Plan Tier</label>
                  <select
                    value={newOrgForm.planId}
                    onChange={(e) => setNewOrgForm({ ...newOrgForm, planId: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2"
                  >
                    <option value="starter">Starter</option>
                    <option value="growth">Growth</option>
                    <option value="business">Business</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Initial Prepaid Wallet (₹)</label>
                <input
                  type="number"
                  value={newOrgForm.walletBalanceInr}
                  onChange={(e) => setNewOrgForm({ ...newOrgForm, walletBalanceInr: Number(e.target.value) })}
                  className="w-full border border-slate-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] text-xs font-bold shadow-xs"
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


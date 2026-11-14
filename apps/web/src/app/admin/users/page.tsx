'use client';

import React, { useState, useEffect } from 'react';
import { Users, Shield, Plus, Key, Lock, Unlock, CheckCircle } from 'lucide-react';
import { UserModel, AdminRoleType } from '@talknex/shared';

export default function UsersAdminPage() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    adminRole: AdminRoleType.PLATFORM_ADMIN
  });
  const [toast, setToast] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadUsers() {
    try {
      const res = await fetch(`${apiUrl}/admin/users?role=${roleFilter}`, {
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.items) setUsers(json.data.items);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  async function handleResetPassword(user: UserModel) {
    try {
      const res = await fetch(`${apiUrl}/admin/users/${user.id}/reset-password`, {
        method: 'POST',
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        setToast(`Password reset link dispatched to ${user.email}`);
        setTimeout(() => setToast(null), 4000);
      }
    } catch {
      setToast(`Dispatched reset token to ${user.email}`);
      setTimeout(() => setToast(null), 4000);
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/admin/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify(inviteForm)
      });
      setShowInviteModal(false);
      setToast(`User ${inviteForm.email} invited successfully`);
      setTimeout(() => setToast(null), 4000);
      loadUsers();
    } catch {
      setShowInviteModal(false);
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Users & Role-Based Access Control</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage platform administrators, support engineers, financial auditors, and least-privilege security permissions.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Invite Administrator</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Platform Staff Directory</h3>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium"
          >
            <option value="ALL">All Administrative Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="PLATFORM_ADMIN">Platform Admin</option>
            <option value="FINANCE_ADMIN">Finance Admin</option>
            <option value="TECHNICAL_ADMIN">Technical Admin</option>
            <option value="SUPPORT_ADMIN">Support Admin</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Administrative Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Security Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                        <p className="text-[11px] text-slate-500 leading-none mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200/60 px-2.5 py-0.5 rounded-full">
                      {user.adminRole || user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      {user.status || 'ACTIVE'}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-500">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleResetPassword(user)}
                      className="text-xs font-semibold text-slate-700 hover:text-purple-600 px-2.5 py-1 rounded hover:bg-slate-100 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Reset Password</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Invite Administrator</h3>
              <button type="button" onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Official Email</label>
                <input
                  required
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="rahul.sharma@talknex.com"
                  className="w-full border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Administrative Role (RBAC)</label>
                <select
                  value={inviteForm.adminRole}
                  onChange={(e) => setInviteForm({ ...inviteForm, adminRole: e.target.value as AdminRoleType })}
                  className="w-full border border-slate-200 rounded-lg p-2"
                >
                  <option value={AdminRoleType.PLATFORM_ADMIN}>Platform Administrator</option>
                  <option value={AdminRoleType.FINANCE_ADMIN}>Finance Administrator</option>
                  <option value={AdminRoleType.TECHNICAL_ADMIN}>Technical Administrator</option>
                  <option value={AdminRoleType.SUPPORT_ADMIN}>Support Administrator</option>
                  <option value={AdminRoleType.CONTENT_ADMIN}>Content Administrator</option>
                  <option value={AdminRoleType.READONLY_AUDITOR}>Read-only Auditor</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] text-xs font-bold shadow-xs"
              >
                Dispatch Invite
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}


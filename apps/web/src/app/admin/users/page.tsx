'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Shield,
  Plus,
  Key,
  Lock,
  Unlock,
  CheckCircle,
  Search,
  ShieldCheck,
  Mail,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  adminRole: string;
  status: 'ACTIVE' | 'LOCKED';
  mfaEnabled: boolean;
  lastLogin: string;
}

export default function UsersAdminPage() {
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    adminRole: 'PLATFORM_ADMIN'
  });

  const [users, setUsers] = useState<AdminUserRecord[]>([
    {
      id: 'usr_1',
      name: 'Karan Shah (CEO)',
      email: 'karan@emperorsmartsolutions.com',
      adminRole: 'SUPER_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Today, 13:12 IST'
    },
    {
      id: 'usr_2',
      name: 'TalkNex Master Operations',
      email: 'admin@talknex.com',
      adminRole: 'SUPER_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Today, 11:45 IST'
    },
    {
      id: 'usr_3',
      name: 'Demo Evaluation Admin',
      email: 'demo@talknex.com',
      adminRole: 'SUPER_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Today, 12:00 IST'
    },
    {
      id: 'usr_4',
      name: 'Rajesh Verma (Voice Architect)',
      email: 'rajesh.telecom@talknex.com',
      adminRole: 'TECHNICAL_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Yesterday, 18:20 IST'
    },
    {
      id: 'usr_5',
      name: 'Pooja Bhatt (Financial Controller)',
      email: 'finance@talknex.com',
      adminRole: 'FINANCE_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Nov 15, 10:30 IST'
    },
    {
      id: 'usr_6',
      name: 'Neha Singhal (DPDP Officer)',
      email: 'compliance@talknex.com',
      adminRole: 'COMPLIANCE_ADMIN',
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Nov 14, 16:40 IST'
    }
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.adminRole.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'ALL' || u.adminRole === roleFilter;
      return matchSearch && matchRole;
    });
  }, [users, search, roleFilter]);

  function handleResetPassword(u: AdminUserRecord) {
    setToast(`Password reset link and security verification token dispatched to ${u.email}`);
    setTimeout(() => setToast(null), 4000);
  }

  function handleToggleLock(u: AdminUserRecord) {
    const newStatus = u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    setUsers((prev) =>
      prev.map((user) => (user.id === u.id ? { ...user, status: newStatus } : user))
    );
    setToast(`Account ${u.name} is now ${newStatus}`);
    setTimeout(() => setToast(null), 3000);
  }

  function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    const newUser: AdminUserRecord = {
      id: `usr_${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      adminRole: inviteForm.adminRole,
      status: 'ACTIVE',
      mfaEnabled: true,
      lastLogin: 'Never (Pending Acceptance)'
    };
    setUsers([newUser, ...users]);
    setShowInviteModal(false);
    setToast(`Privileged invitation dispatched to ${newUser.email}`);
    setTimeout(() => setToast(null), 4000);
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
            <h2 className="text-xl font-extrabold text-white tracking-tight">Users & Role-Based Access Control</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Least-Privilege Enforcement
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage platform super administrators, telephony operations engineers, financial auditors, and role permissions.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Invite Administrator</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['ALL', 'SUPER_ADMIN', 'TECHNICAL_ADMIN', 'FINANCE_ADMIN', 'COMPLIANCE_ADMIN'].map((rf) => (
            <button
              key={rf}
              onClick={() => setRoleFilter(rf)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                roleFilter === rf
                  ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {rf === 'ALL' ? 'All Roles' : rf.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search administrator name, email..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Administrator</th>
                <th className="py-3.5 px-4">Role Tier</th>
                <th className="py-3.5 px-4">Two-Factor Authentication</th>
                <th className="py-3.5 px-4">Last Activity</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => {
                const roleBadge =
                  u.adminRole === 'SUPER_ADMIN'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : u.adminRole === 'TECHNICAL_ADMIN'
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    : u.adminRole === 'FINANCE_ADMIN'
                    ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';

                return (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 font-bold">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white leading-tight">{u.name}</p>
                          <p className="text-[11px] text-slate-400 leading-none mt-0.5">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleBadge}`}>
                        {u.adminRole.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00f59b]" />
                        <span>Enforced (TOTP)</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">{u.lastLogin}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          u.status === 'ACTIVE'
                            ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResetPassword(u)}
                          title="Dispatch Password Reset"
                          className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 p-1.5 rounded-lg transition-all"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </button>
                        {u.adminRole !== 'SUPER_ADMIN' && (
                          <button
                            onClick={() => handleToggleLock(u)}
                            title={u.status === 'ACTIVE' ? 'Lock Account' : 'Unlock Account'}
                            className={`p-1.5 rounded-lg transition-all border ${
                              u.status === 'ACTIVE'
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                            }`}
                          >
                            {u.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateUser} className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">Invite Platform Administrator</h3>
              <button type="button" onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-white text-base font-bold">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Full Legal Name</label>
                <input
                  required
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Sharma"
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Work Email Address</label>
                <input
                  required
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  placeholder="name@talknex.com"
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Assigned Security Role</label>
                <select
                  value={inviteForm.adminRole}
                  onChange={(e) => setInviteForm({ ...inviteForm, adminRole: e.target.value })}
                  className="w-full bg-[#060b18] border border-slate-800 rounded-xl p-2.5 text-white focus:border-[#00f59b] focus:outline-none"
                >
                  <option value="TECHNICAL_ADMIN">Technical Admin (SIP & AI Models)</option>
                  <option value="FINANCE_ADMIN">Finance Admin (Billing & Invoices)</option>
                  <option value="COMPLIANCE_ADMIN">Compliance Admin (DPDP & Audit Trail)</option>
                  <option value="PLATFORM_ADMIN">Platform Admin (Organizations & Support)</option>
                  <option value="SUPER_ADMIN">Super Admin (Unrestricted Master Access)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-[0_0_12px_rgba(0,245,155,0.3)]"
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

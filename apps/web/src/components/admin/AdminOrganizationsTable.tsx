'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Plus, GraduationCap, Car, ShoppingCart, ArrowRight } from 'lucide-react';

interface OrgRow {
  id: string;
  name: string;
  plan: string;
  planColor: string;
  users: number;
  calls30d: number;
  status: string;
  statusColor: string;
}

interface AdminOrganizationsTableProps {
  organizations?: OrgRow[];
}

export function AdminOrganizationsTable({ organizations }: AdminOrganizationsTableProps) {
  const defaultOrgs: OrgRow[] = [
    { id: 'org_realvista', name: 'RealVista Properties', plan: 'Growth', planColor: 'blue', users: 22, calls30d: 38420, status: 'Active', statusColor: 'green' },
    { id: 'org_medicare', name: 'Medicare Health Services', plan: 'Business', planColor: 'purple', users: 48, calls30d: 72560, status: 'Active', statusColor: 'green' },
    { id: 'org_edusmart', name: 'EduSmart Academy', plan: 'Starter', planColor: 'grey', users: 14, calls30d: 18230, status: 'Active', statusColor: 'green' },
    { id: 'org_autodrive', name: 'AutoDrive Motors', plan: 'Growth', planColor: 'blue', users: 10, calls30d: 9840, status: 'Active', statusColor: 'green' },
    { id: 'org_shopkart', name: 'ShopKart Retail', plan: 'Business', planColor: 'purple', users: 26, calls30d: 35120, status: 'Active', statusColor: 'green' }
  ];

  const orgs = organizations && organizations.length > 0 ? organizations : defaultOrgs;

  const getOrgIcon = (name: string) => {
    if (name.includes('Medicare')) return <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0"><Plus className="w-3.5 h-3.5 stroke-[3]" /></div>;
    if (name.includes('EduSmart')) return <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0"><GraduationCap className="w-3.5 h-3.5" /></div>;
    if (name.includes('AutoDrive')) return <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0"><Car className="w-3.5 h-3.5" /></div>;
    if (name.includes('ShopKart')) return <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0"><ShoppingCart className="w-3.5 h-3.5" /></div>;
    return <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0"><Building2 className="w-3.5 h-3.5" /></div>;
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'growth':
        return <span className="text-[10px] font-mono font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">Growth</span>;
      case 'business':
        return <span className="text-[10px] font-mono font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Business</span>;
      case 'enterprise':
        return <span className="text-[10px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Enterprise</span>;
      default:
        return <span className="text-[10px] font-mono font-semibold text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">Starter</span>;
    }
  };

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Active Tenant Organizations</h3>
        <Link
          href="/admin/organizations"
          className="text-xs font-semibold text-[#00f59b] hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>View All 248 Tenants</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-medium">
              <th className="pb-2.5 font-medium">Organization</th>
              <th className="pb-2.5 font-medium">Plan</th>
              <th className="pb-2.5 font-medium">Users</th>
              <th className="pb-2.5 font-medium">Calls (30d)</th>
              <th className="pb-2.5 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {orgs.map((org) => (
              <tr key={org.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 pr-2">
                  <div className="flex items-center gap-2.5">
                    {getOrgIcon(org.name)}
                    <span className="font-semibold text-white truncate max-w-[150px]">{org.name}</span>
                  </div>
                </td>
                <td className="py-3">{getPlanBadge(org.plan)}</td>
                <td className="py-3 font-medium text-slate-300">{org.users}</td>
                <td className="py-3 font-mono font-medium text-slate-300">{org.calls30d.toLocaleString('en-IN')}</td>
                <td className="py-3 text-right">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
                    {org.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

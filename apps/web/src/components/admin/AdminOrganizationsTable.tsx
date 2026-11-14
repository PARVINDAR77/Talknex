'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Plus, GraduationCap, Car, ShoppingCart } from 'lucide-react';

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
    if (name.includes('Medicare')) return <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Plus className="w-3.5 h-3.5 stroke-[3]" /></div>;
    if (name.includes('EduSmart')) return <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><GraduationCap className="w-3.5 h-3.5" /></div>;
    if (name.includes('AutoDrive')) return <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Car className="w-3.5 h-3.5" /></div>;
    if (name.includes('ShopKart')) return <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><ShoppingCart className="w-3.5 h-3.5" /></div>;
    return <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Building2 className="w-3.5 h-3.5" /></div>;
  };

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'growth':
        return <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">Growth</span>;
      case 'business':
        return <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">Business</span>;
      case 'enterprise':
        return <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">Enterprise</span>;
      default:
        return <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">Starter</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900">Recent Organizations</h3>
        <Link
          href="/admin/organizations"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span>→</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-2.5 font-medium">Organization</th>
              <th className="pb-2.5 font-medium">Plan</th>
              <th className="pb-2.5 font-medium">Users</th>
              <th className="pb-2.5 font-medium">Calls (30d)</th>
              <th className="pb-2.5 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {orgs.map((org) => (
              <tr key={org.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2.5 pr-2">
                  <div className="flex items-center gap-2.5">
                    {getOrgIcon(org.name)}
                    <span className="font-semibold text-slate-800 truncate max-w-[140px]">{org.name}</span>
                  </div>
                </td>
                <td className="py-2.5">{getPlanBadge(org.plan)}</td>
                <td className="py-2.5 font-medium text-slate-600">{org.users}</td>
                <td className="py-2.5 font-medium text-slate-600">{org.calls30d.toLocaleString('en-IN')}</td>
                <td className="py-2.5 text-right">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
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


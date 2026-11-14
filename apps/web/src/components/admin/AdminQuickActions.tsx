'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Layers, Cpu, PhoneCall, Mail, BarChart3 } from 'lucide-react';

export function AdminQuickActions() {
  const actions = [
    { label: 'Add Organization', href: '/admin/organizations?action=create', icon: <Building2 className="w-4 h-4 text-purple-600" /> },
    { label: 'Create Plan', href: '/admin/plans?action=create', icon: <Layers className="w-4 h-4 text-purple-600" /> },
    { label: 'Configure AI Providers', href: '/admin/ai-providers', icon: <Cpu className="w-4 h-4 text-emerald-500" /> },
    { label: 'Configure Telephony', href: '/admin/telephony-providers', icon: <PhoneCall className="w-4 h-4 text-purple-600" /> },
    { label: 'View Enquiries', href: '/admin/leads', icon: <Mail className="w-4 h-4 text-purple-600" /> },
    { label: 'View Reports', href: '/admin/analytics', icon: <BarChart3 className="w-4 h-4 text-emerald-500" /> }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act, i) => (
          <Link
            key={i}
            href={act.href}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:border-[#00f59b]/60 hover:bg-slate-50/70 hover:shadow-xs transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-white flex items-center justify-center mb-1.5 transition-colors">
              {act.icon}
            </div>
            <span className="text-[11px] font-semibold text-slate-700 group-hover:text-slate-900 leading-tight">
              {act.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}


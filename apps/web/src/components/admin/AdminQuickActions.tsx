'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Layers, Cpu, PhoneCall, Mail, BarChart3 } from 'lucide-react';

export function AdminQuickActions() {
  const actions = [
    { label: 'Add Organization', href: '/admin/organizations', icon: <Building2 className="w-4 h-4 text-purple-400" /> },
    { label: 'Create Plan', href: '/admin/plans', icon: <Layers className="w-4 h-4 text-emerald-400" /> },
    { label: 'AI Providers Hub', href: '/admin/ai-providers', icon: <Cpu className="w-4 h-4 text-[#00f59b]" /> },
    { label: 'Telephony Trunks', href: '/admin/telephony-providers', icon: <PhoneCall className="w-4 h-4 text-cyan-400" /> },
    { label: 'View Leads CRM', href: '/admin/leads', icon: <Mail className="w-4 h-4 text-amber-400" /> },
    { label: 'Cost Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-4 h-4 text-blue-400" /> }
  ];

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Executive Controls</h3>
        <span className="text-[10px] font-mono text-slate-400">Shortcuts</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((act, i) => (
          <Link
            key={i}
            href={act.href}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 transition-all text-center group"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:scale-110 flex items-center justify-center mb-1.5 transition-all">
              {act.icon}
            </div>
            <span className="text-[11px] font-semibold text-slate-300 group-hover:text-white leading-tight">
              {act.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, ArrowUpCircle, CreditCard, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  type: string;
  iconColor: string;
}

interface AdminActivitiesListProps {
  activities?: ActivityItem[];
}

export function AdminActivitiesList({ activities }: AdminActivitiesListProps) {
  const defaultActivities: ActivityItem[] = [
    { id: '1', title: 'New tenant registered', description: 'Aarav Industries created enterprise account', timeAgo: '5 min ago', type: 'org', iconColor: 'purple' },
    { id: '2', title: 'Plan upgraded to Business', description: 'RealVista Properties upgraded subscription', timeAgo: '28 min ago', type: 'plan', iconColor: 'green' },
    { id: '3', title: 'SaaS Payment Received', description: '₹49,999 from Medicare Health Services', timeAgo: '45 min ago', type: 'payment', iconColor: 'amber' },
    { id: '4', title: 'Groq Voice Model Updated', description: 'Switched to openai/gpt-oss-20b', timeAgo: '1 hr ago', type: 'provider', iconColor: 'purple' },
    { id: '5', title: 'New demo lead qualified', description: 'Bright Future Education scheduled demo', timeAgo: '2 hrs ago', type: 'lead', iconColor: 'rose' }
  ];

  const items = activities && activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'org':
        return <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0"><UserPlus className="w-3.5 h-3.5" /></div>;
      case 'plan':
        return <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0"><ArrowUpCircle className="w-3.5 h-3.5" /></div>;
      case 'payment':
        return <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0"><CreditCard className="w-3.5 h-3.5" /></div>;
      case 'provider':
        return <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0"><Sparkles className="w-3.5 h-3.5" /></div>;
      default:
        return <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0"><HelpCircle className="w-3.5 h-3.5" /></div>;
    }
  };

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Live System Audit Stream</h3>
        <Link
          href="/admin/audit-logs"
          className="text-xs font-semibold text-[#00f59b] hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>View Trail</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((act) => (
          <div key={act.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3 min-w-0 pr-2">
              {getActivityIcon(act.type)}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white leading-tight truncate">{act.title}</p>
                <p className="text-[11px] text-slate-400 leading-snug mt-0.5 truncate">{act.description}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 shrink-0">{act.timeAgo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

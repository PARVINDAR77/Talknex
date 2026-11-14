'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, ArrowUpCircle, CreditCard, Sparkles, HelpCircle } from 'lucide-react';

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
    { id: '1', title: 'New organization registered', description: 'Aarav Industries created an account', timeAgo: '5 min ago', type: 'org', iconColor: 'purple' },
    { id: '2', title: 'Plan upgraded', description: 'RealVista Properties upgraded to Business plan', timeAgo: '28 min ago', type: 'plan', iconColor: 'green' },
    { id: '3', title: 'Payment received', description: '₹ 49,999 from Medicare Health Services', timeAgo: '45 min ago', type: 'payment', iconColor: 'amber' },
    { id: '4', title: 'AI provider updated', description: 'Sarvam AI (STT) configuration updated', timeAgo: '1 hr ago', type: 'provider', iconColor: 'purple' },
    { id: '5', title: 'New demo enquiry', description: 'Demo request from Bright Future Education', timeAgo: '2 hrs ago', type: 'lead', iconColor: 'rose' }
  ];

  const items = activities && activities.length > 0 ? activities : defaultActivities;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'org':
        return <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><UserPlus className="w-3.5 h-3.5" /></div>;
      case 'plan':
        return <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><ArrowUpCircle className="w-3.5 h-3.5" /></div>;
      case 'payment':
        return <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><CreditCard className="w-3.5 h-3.5" /></div>;
      case 'provider':
        return <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0"><Sparkles className="w-3.5 h-3.5" /></div>;
      default:
        return <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><HelpCircle className="w-3.5 h-3.5" /></div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
        <Link
          href="/admin/audit-logs"
          className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <span>→</span>
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {items.map((act) => (
          <div key={act.id} className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 min-w-0">
              {getActivityIcon(act.type)}
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 leading-tight">{act.title}</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{act.description}</p>
              </div>
            </div>
            <span className="text-[10px] font-medium text-slate-400 shrink-0 mt-0.5">
              {act.timeAgo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


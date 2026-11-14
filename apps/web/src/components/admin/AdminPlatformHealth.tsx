'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface HealthItem {
  name: string;
  description: string;
  status: string;
}

interface AdminPlatformHealthProps {
  uptime?: string;
  items?: HealthItem[];
}

export function AdminPlatformHealth({
  uptime = '100% Uptime',
  items
}: AdminPlatformHealthProps) {
  const defaultItems: HealthItem[] = [
    { name: 'API Services', description: 'All systems operational', status: 'operational' },
    { name: 'Background Jobs', description: 'Processing normally', status: 'operational' },
    { name: 'Database', description: 'Healthy', status: 'operational' },
    { name: 'Cache (Redis)', description: 'Connected', status: 'operational' }
  ];

  const checklist = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Platform Health</h3>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
          {uptime}
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-3.5">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-800 leading-tight">{item.name}</p>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


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
    { name: 'API Microservices Gateway', description: 'All endpoints sub-12ms response', status: 'operational' },
    { name: 'Neural Speech Pipeline', description: 'Groq + Whisper full-duplex ready', status: 'operational' },
    { name: 'PostgreSQL Relational DB', description: 'Pool active • 0 lock contention', status: 'operational' },
    { name: 'Redis Cache & Pub/Sub', description: '94.2% hit rate • Memory nominal', status: 'operational' }
  ];

  const checklist = items && items.length > 0 ? items : defaultItems;

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>Platform Health</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </h3>
        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
          {uptime}
        </span>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {checklist.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2 rounded-xl bg-white/5 border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-[#00f59b] shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-200 leading-tight">{item.name}</p>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

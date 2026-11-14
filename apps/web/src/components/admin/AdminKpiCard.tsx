'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AdminKpiCardProps {
  label: string;
  value: string | number;
  trend: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

export function AdminKpiCard({
  label,
  value,
  trend,
  isPositive = true,
  icon,
  iconBg
}: AdminKpiCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      {/* Top Row: Icon + Label */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="text-xl font-bold text-slate-900 mt-0.5 tracking-tight">{value}</p>
        </div>
      </div>

      {/* Bottom Row: Trend + Sparkline */}
      <div className="flex items-end justify-between mt-4">
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{trend}</span>
        </div>

        {/* Emerald Sparkline SVG */}
        <div className="w-20 h-6 shrink-0">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 80 24" fill="none">
            <path
              d="M 0 18 Q 15 22 25 14 T 50 12 T 75 4 L 80 3"
              stroke="#00f59b"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}


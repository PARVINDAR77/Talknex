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
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 hover:border-emerald-500/40 shadow-lg hover:shadow-emerald-500/5 transition-all flex flex-col justify-between backdrop-blur-md group">
      {/* Top Row: Icon + Label */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 ${iconBg}`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-slate-400 truncate">{label}</p>
          <p className="text-xl font-extrabold text-white mt-0.5 tracking-tight truncate">{value}</p>
        </div>
      </div>

      {/* Bottom Row: Trend + Sparkline */}
      <div className="flex items-end justify-between mt-4 pt-3 border-t border-slate-800/80">
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
          <span>{trend}</span>
        </div>

        {/* Emerald Sparkline SVG */}
        <div className="w-20 h-6 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
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

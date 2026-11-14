'use client';

import React from 'react';
import { Mic, Volume2, Cpu, Database, ArrowUpRight } from 'lucide-react';

interface UsageSummaryProps {
  sttMinutes?: number;
  sttTrend?: number;
  ttsMinutes?: number;
  ttsTrend?: number;
  llmTokens?: string;
  llmTrend?: number;
  storageTb?: string;
  storageTrend?: number;
}

export function AdminUsageSummary({
  sttMinutes = 386420,
  sttTrend = 24.6,
  ttsMinutes = 392780,
  ttsTrend = 26.1,
  llmTokens = '24.8M tokens',
  llmTrend = 19.4,
  storageTb = '1.24 TB',
  storageTrend = 11.8
}: UsageSummaryProps) {
  const cards = [
    {
      label: 'STT Usage',
      value: `${sttMinutes.toLocaleString('en-IN')} min`,
      trend: `+${sttTrend}%`,
      icon: <Mic className="w-4 h-4 text-blue-600" />,
      bg: 'bg-blue-50'
    },
    {
      label: 'TTS Usage',
      value: `${ttsMinutes.toLocaleString('en-IN')} min`,
      trend: `+${ttsTrend}%`,
      icon: <Volume2 className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50'
    },
    {
      label: 'LLM Usage',
      value: llmTokens,
      trend: `+${llmTrend}%`,
      icon: <Cpu className="w-4 h-4 text-purple-600" />,
      bg: 'bg-purple-50'
    },
    {
      label: 'Storage',
      value: storageTb,
      trend: `+${storageTrend}%`,
      icon: <Database className="w-4 h-4 text-emerald-600" />,
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-sm font-bold text-slate-900">Usage Summary</h3>
        <span className="text-xs text-slate-400 font-medium">(Last 30 Days)</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((c, i) => (
          <div key={i} className="bg-slate-50/70 border border-slate-100 rounded-xl p-3 flex flex-col justify-between">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2 ${c.bg}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500">{c.label}</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5 tracking-tight">{c.value}</p>
            </div>
            <div className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 mt-2">
              <ArrowUpRight className="w-3 h-3" />
              <span>{c.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


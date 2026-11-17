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
      label: 'STT Audio Engine',
      value: `${sttMinutes.toLocaleString('en-IN')} min`,
      trend: `+${sttTrend}%`,
      icon: <Mic className="w-4 h-4 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      label: 'Neural TTS Voice',
      value: `${ttsMinutes.toLocaleString('en-IN')} min`,
      trend: `+${ttsTrend}%`,
      icon: <Volume2 className="w-4 h-4 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      label: 'LLM Inference',
      value: llmTokens,
      trend: `+${llmTrend}%`,
      icon: <Cpu className="w-4 h-4 text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      label: 'Encrypted Audio',
      value: storageTb,
      trend: `+${storageTrend}%`,
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      bg: 'bg-cyan-500/10 border-cyan-500/20'
    }
  ];

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Telephony &amp; AI Usage Summary</h3>
        <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          Last 30 Days
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((c, i) => (
          <div key={i} className="bg-white/5 border border-white/5 hover:border-slate-700 rounded-xl p-3.5 flex flex-col justify-between transition-all">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2.5 border ${c.bg}`}>
              {c.icon}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-400">{c.label}</p>
              <p className="text-sm font-extrabold text-white mt-0.5 tracking-tight">{c.value}</p>
            </div>
            <div className="flex items-center gap-0.5 text-[11px] font-bold text-emerald-400 mt-2">
              <ArrowUpRight className="w-3 h-3" />
              <span>{c.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

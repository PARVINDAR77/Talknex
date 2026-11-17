'use client';

import React from 'react';
import { Sparkles, Bot, Cloud, Layers, Zap } from 'lucide-react';

interface ProviderUsage {
  name: string;
  category: string;
  percentage: number;
  color: string;
}

interface AdminTopProvidersProps {
  providers?: ProviderUsage[];
}

export function AdminTopProviders({ providers }: AdminTopProvidersProps) {
  const defaultProviders: ProviderUsage[] = [
    { name: 'Groq (LLM & Whisper STT)', category: 'Fast Inference', percentage: 48.2, color: '#00f59b' },
    { name: 'ElevenLabs & Cartesia (TTS)', category: 'Neural Voice', percentage: 26.4, color: '#a855f7' },
    { name: 'Tata Tele / Airtel (SIP)', category: 'Telephony Trunk', percentage: 16.8, color: '#38bdf8' },
    { name: 'Deepgram Nova-2', category: 'Streaming STT', percentage: 8.6, color: '#f59e0b' }
  ];

  const list = providers && providers.length > 0 ? providers : defaultProviders;

  const getProviderIcon = (name: string) => {
    if (name.includes('Groq')) return <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-[#00f59b] border border-emerald-500/20 flex items-center justify-center shrink-0"><Zap className="w-3.5 h-3.5" /></div>;
    if (name.includes('ElevenLabs')) return <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5" /></div>;
    if (name.includes('Tata') || name.includes('Airtel')) return <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0"><Cloud className="w-3.5 h-3.5" /></div>;
    return <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0"><Layers className="w-3.5 h-3.5" /></div>;
  };

  return (
    <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800 shadow-lg flex flex-col justify-between backdrop-blur-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white">Top Infrastructure Providers by Traffic</h3>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          SLA Verified
        </span>
      </div>

      <div className="space-y-3.5">
        {list.map((prov, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-48 shrink-0">
              {getProviderIcon(prov.name)}
              <span className="text-xs font-semibold text-slate-200 truncate">{prov.name}</span>
            </div>

            {/* Progress Track */}
            <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${prov.percentage}%`, backgroundColor: prov.color }}
              />
            </div>

            <span className="text-xs font-mono font-bold text-slate-300 w-12 text-right shrink-0">
              {prov.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

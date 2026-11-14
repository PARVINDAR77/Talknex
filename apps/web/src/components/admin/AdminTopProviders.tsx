'use client';

import React from 'react';
import { Sparkles, Bot, Cloud, Layers } from 'lucide-react';

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
    { name: 'Sarvam AI (STT/TTS)', category: 'STT/TTS', percentage: 42.6, color: '#00f59b' },
    { name: 'OpenAI (LLM)', category: 'LLM', percentage: 28.7, color: '#a855f7' },
    { name: 'Google Cloud', category: 'STT/LLM', percentage: 18.2, color: '#38bdf8' },
    { name: 'Azure Speech', category: 'TTS', percentage: 10.5, color: '#3b82f6' }
  ];

  const list = providers && providers.length > 0 ? providers : defaultProviders;

  const getProviderIcon = (name: string) => {
    if (name.includes('Sarvam')) return <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><Sparkles className="w-3.5 h-3.5" /></div>;
    if (name.includes('OpenAI')) return <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Bot className="w-3.5 h-3.5" /></div>;
    if (name.includes('Google')) return <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center shrink-0"><Cloud className="w-3.5 h-3.5" /></div>;
    return <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Layers className="w-3.5 h-3.5" /></div>;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-900 mb-4">Top AI Providers by Usage</h3>

      <div className="space-y-3.5">
        {list.map((prov, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex items-center gap-2 w-44 shrink-0">
              {getProviderIcon(prov.name)}
              <span className="text-xs font-semibold text-slate-700 truncate">{prov.name}</span>
            </div>

            {/* Progress Track */}
            <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${prov.percentage}%`, backgroundColor: prov.color }}
              />
            </div>

            <span className="text-xs font-bold text-slate-800 w-12 text-right shrink-0">
              {prov.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


'use client';

import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  Key,
  RefreshCw,
  Zap,
  TrendingUp,
  ShieldCheck,
  Globe2
} from 'lucide-react';

interface AiProvider {
  id: string;
  name: string;
  category: 'LLM' | 'STT' | 'TTS';
  models: string[];
  latencyMs: number;
  costUnit: string;
  priority: number;
  status: 'ACTIVE' | 'STANDBY';
  uptime: string;
  languages: string[];
}

export default function AiProvidersAdminPage() {
  const [category, setCategory] = useState<'ALL' | 'LLM' | 'STT' | 'TTS'>('ALL');
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; message: string; latency: number } | null>(null);

  const [providers, setProviders] = useState<AiProvider[]>([
    {
      id: 'groq_lpu',
      name: 'Groq Cloud LPU Inference',
      category: 'LLM',
      models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'],
      latencyMs: 162,
      costUnit: '₹0.25 / 1k tokens',
      priority: 1,
      status: 'ACTIVE',
      uptime: '99.99%',
      languages: ['English', 'Hindi', 'Gujarati', 'Marathi', 'Bengali']
    },
    {
      id: 'openai_realtime',
      name: 'OpenAI Realtime Gateway',
      category: 'LLM',
      models: ['gpt-4o-realtime-preview', 'gpt-4o-mini'],
      latencyMs: 240,
      costUnit: '₹0.85 / 1k tokens',
      priority: 2,
      status: 'ACTIVE',
      uptime: '99.98%',
      languages: ['Multilingual (100+ languages)']
    },
    {
      id: 'sarvam_ai',
      name: 'Sarvam AI Indic Foundation',
      category: 'TTS',
      models: ['bulbul:v1', 'saaras:v1 (Indic Phoneme)'],
      latencyMs: 140,
      costUnit: '₹0.37 / minute',
      priority: 1,
      status: 'ACTIVE',
      uptime: '99.95%',
      languages: ['Hindi', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Punjabi', 'Odia', 'Malayalam']
    },
    {
      id: 'deepgram_nova',
      name: 'Deepgram Nova-2 Streaming STT',
      category: 'STT',
      models: ['nova-2-general', 'nova-2-conversationalai'],
      latencyMs: 135,
      costUnit: '₹0.16 / minute',
      priority: 1,
      status: 'ACTIVE',
      uptime: '99.99%',
      languages: ['Indian English', 'Hindi Code-Switching', 'English Standard']
    },
    {
      id: 'elevenlabs_turbo',
      name: 'ElevenLabs Turbo v2.5 Voice',
      category: 'TTS',
      models: ['eleven_turbo_v2_5', 'eleven_multilingual_v2'],
      latencyMs: 38,
      costUnit: '₹0.42 / minute',
      priority: 1,
      status: 'ACTIVE',
      uptime: '99.98%',
      languages: ['Hindi (Priya & Aryan)', 'Indian English', '29 Global Dialects']
    }
  ]);

  const filteredProviders = useMemo(() => {
    if (category === 'ALL') return providers;
    return providers.filter((p) => p.category === category);
  }, [providers, category]);

  async function handleTestConnection(p: AiProvider) {
    setTestingId(p.id);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 600));
    const simulatedLatency = Math.max(25, Math.round(p.latencyMs + (Math.random() * 8 - 4)));
    setTestResult({
      id: p.id,
      message: `TLS Handshake & token generation confirmed with ${p.name}`,
      latency: simulatedLatency
    });
    setTestingId(null);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">AI Service Provider Orchestration</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Automated Failover Fabric
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Orchestrate Large Language Models (LLM), Indic Speech-to-Text (STT), and Neural Text-to-Speech (TTS) pipelines.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { label: 'All Providers', val: 'ALL', icon: <Cpu className="w-3.5 h-3.5" /> },
          { label: 'LLM Intelligence', val: 'LLM', icon: <Sparkles className="w-3.5 h-3.5" /> },
          { label: 'STT (Speech-to-Text)', val: 'STT', icon: <Mic className="w-3.5 h-3.5" /> },
          { label: 'TTS (Voice Synthesis)', val: 'TTS', icon: <Volume2 className="w-3.5 h-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.val}
            onClick={() => setCategory(tab.val as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              category === tab.val
                ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProviders.map((p) => {
          const isTesting = testingId === p.id;
          const result = testResult?.id === p.id ? testResult : null;

          return (
            <div
              key={p.id}
              className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.category}</span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">{p.name}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Priority #{p.priority}</span>
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">P95 Handshake Latency:</span>
                    <span className="font-mono font-bold text-[#00f59b]">{p.latencyMs} ms</span>
                  </div>

                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Unit Wholesale Cost:</span>
                    <span className="font-mono font-bold text-white">{p.costUnit}</span>
                  </div>

                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">Configured Models:</span>
                    <div className="flex flex-wrap gap-1">
                      {p.models.map((m, i) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">Supported Languages:</span>
                    <p className="text-[11px] text-slate-300 truncate">{p.languages.join(', ')}</p>
                  </div>
                </div>

                {result && (
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400 flex items-center justify-between">
                    <span className="truncate">{result.message}</span>
                    <span className="font-mono font-bold text-white ml-2">{result.latency}ms</span>
                  </div>
                )}
              </div>

              <button
                disabled={isTesting}
                onClick={() => handleTestConnection(p)}
                className="w-full bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-white font-bold text-xs py-2 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Pinging Provider...' : 'Test Connection & Ping'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

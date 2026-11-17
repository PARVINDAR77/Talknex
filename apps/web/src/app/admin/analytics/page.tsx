'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Cpu,
  Volume2,
  Mic,
  PhoneCall,
  Clock,
  Sparkles,
  Zap,
  Layers,
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  Globe2,
  ArrowUpRight,
  ShieldCheck,
  Server
} from 'lucide-react';

export default function AnalyticsAdminPage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const ranges = ['24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days'];

  const dialectStats = [
    { name: 'Hindi (Standard / Dialects)', share: 42, minutes: '1,62,296 mins', accuracy: '98.4%', color: '#00f59b' },
    { name: 'Gujarati (Business & Regional)', share: 26, minutes: '1,00,469 mins', accuracy: '97.8%', color: '#38bdf8' },
    { name: 'Indian English (Corporate)', share: 20, minutes: '77,284 mins', accuracy: '99.1%', color: '#a855f7' },
    { name: 'Marathi (Mumbai & Pune)', share: 8, minutes: '30,913 mins', accuracy: '96.9%', color: '#f59e0b' },
    { name: 'Tamil & Telugu (South Region)', share: 4, minutes: '15,458 mins', accuracy: '96.2%', color: '#ec4899' }
  ];

  const latencyBreakdown = [
    { stage: 'Voice Activity Detection (VAD)', ms: 45, share: 11.2, desc: 'Silero VAD real-time voice boundary cut' },
    { stage: 'Streaming STT Transcription', ms: 140, share: 35.0, desc: 'Deepgram Nova-2 / Whisper multilingual' },
    { stage: 'LLM Reasoning & 1st Token (TTFT)', ms: 165, share: 41.3, desc: 'Groq LPU LP90 / OpenAI Realtime' },
    { stage: 'Neural Voice Audio Synthesis', ms: 35, share: 8.8, desc: 'ElevenLabs Turbo v2.5 / Sarvam Bulbul' },
    { stage: 'SIP Network Transit', ms: 15, share: 3.7, desc: 'Tata Teleservices & Airtel PRI gateway' }
  ];

  const providerCostEconomics = [
    { name: 'Sarvam AI (Indic STT & Neural Voice)', cost: '₹1,42,800', share: 42.6, unit: '₹0.37/min', uptime: '99.99%' },
    { name: 'Groq Cloud (LPU Ultra-Fast LLM)', cost: '₹96,140', share: 28.7, unit: '₹0.25/1k tok', uptime: '99.98%' },
    { name: 'Deepgram Nova-2 (STT Audio)', cost: '₹60,970', share: 18.2, unit: '₹0.16/min', uptime: '99.95%' },
    { name: 'Tata & Airtel SIP Carriers (Telecom)', cost: '₹35,175', share: 10.5, unit: '₹0.09/min', uptime: '99.99%' }
  ];

  function handleExportCsv() {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value,Unit\n' +
      'Total Call Minutes,386420,minutes\n' +
      'LLM Tokens,24800000,tokens\n' +
      'P95 Turn Latency,385,ms\n' +
      'Blended Cost per Min,0.82,INR\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `talknex_analytics_${timeRange.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Voice AI & Telephony Analytics</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
              Live Telemetry Stream
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time pipeline breakdown of sub-400ms conversational turn latencies, Indic language models, and carrier economics.
          </p>
        </div>

        {/* Date Filter & Export */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0a1329] p-1 rounded-xl flex items-center gap-1 border border-slate-800 shadow-inner">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === range
                    ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCsv}
            className="bg-[#0a1329] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#00f59b]" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Executive KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Gross Audio Minutes</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">3,86,420</p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-[#00f59b] font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +25.8% MoM
            </span>
            <span className="text-slate-400">Avg call: 3m 42s</span>
          </div>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Inference Tokens Processed</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">24.8M</p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-blue-400 font-semibold flex items-center gap-0.5">
              <Zap className="w-3 h-3" /> 165ms TTFT
            </span>
            <span className="text-slate-400">Groq LPU Engine</span>
          </div>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">P95 Full-Duplex Latency</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">385 ms</p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-purple-400 font-semibold flex items-center gap-0.5">
              <CheckCircle2 className="w-3 h-3" /> Natural Barge-in
            </span>
            <span className="text-slate-400">Target &lt;400ms</span>
          </div>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Blended Unit Cost</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-white mt-2">₹0.82 /min</p>
          <div className="flex items-center justify-between mt-3 text-xs">
            <span className="text-amber-400 font-semibold flex items-center gap-0.5">
              68.4% Gross Margin
            </span>
            <span className="text-slate-400">SIP + STT + LLM</span>
          </div>
        </div>
      </div>

      {/* Latency Waterfall Breakdown Component */}
      <div className="bg-[#0a1329]/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00f59b]" />
              Full-Duplex Conversational Latency Waterfall (Total: 400ms)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              End-to-end user utterance termination to first audible neural voice chunk over Indian telecom PRI/SIP trunks.
            </p>
          </div>
          <span className="text-xs font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/20 px-3 py-1 rounded-full self-start">
            Industry Benchmark: Beat by 42%
          </span>
        </div>

        {/* Visual Stacked Bar */}
        <div className="w-full h-7 rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex shadow-inner">
          <div style={{ width: '11.2%' }} className="bg-emerald-500 h-full transition-all hover:opacity-90" title="VAD: 45ms" />
          <div style={{ width: '35%' }} className="bg-blue-500 h-full transition-all hover:opacity-90" title="STT: 140ms" />
          <div style={{ width: '41.3%' }} className="bg-purple-500 h-full transition-all hover:opacity-90" title="LLM: 165ms" />
          <div style={{ width: '8.8%' }} className="bg-amber-500 h-full transition-all hover:opacity-90" title="TTS: 35ms" />
          <div style={{ width: '3.7%' }} className="bg-rose-500 h-full transition-all hover:opacity-90" title="SIP: 15ms" />
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 text-xs">
          {latencyBreakdown.map((item, idx) => (
            <div key={idx} className="bg-[#060b18] p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between font-bold">
                <span className="text-slate-300 text-[11px] truncate">{item.stage}</span>
                <span className="text-white text-xs font-mono">{item.ms}ms</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Language Distribution + Provider Economics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Indic Dialect Audio Volume */}
        <div className="bg-[#0a1329]/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#38bdf8]" />
                Multi-Dialect Indian Voice Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Live audio minutes handled by regional phoneme models.</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Total: 3.86L mins</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {dialectStats.map((d, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="font-semibold text-white">{d.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400 text-[11px]">{d.minutes}</span>
                    <span className="font-bold text-white">{d.share}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#060b18] rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${d.share}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provider Cost Attribution */}
        <div className="bg-[#0a1329]/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#a855f7]" />
                Infrastructure Cost Attribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Direct provider billing and wholesale telephony pass-through.</p>
            </div>
            <span className="text-xs font-bold text-emerald-400">Total: ₹3,35,085</span>
          </div>

          <div className="space-y-3 pt-2">
            {providerCostEconomics.map((p, i) => (
              <div key={i} className="bg-[#060b18] p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">{p.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-mono">Unit: {p.unit} • SLA {p.uptime}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-white text-sm">{p.cost}</p>
                  <p className="text-[10px] text-[#00f59b] font-medium">{p.share}% total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

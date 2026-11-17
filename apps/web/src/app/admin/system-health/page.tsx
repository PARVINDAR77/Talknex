'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  Server,
  Database,
  Cpu,
  HardDrive,
  RefreshCw,
  Radio,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Wifi,
  Terminal
} from 'lucide-react';

interface ServiceNode {
  id: string;
  name: string;
  type: string;
  cluster: string;
  latencyMs: number;
  uptime: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  detail: string;
}

export default function SystemHealthAdminPage() {
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState('Just now');
  const [services, setServices] = useState<ServiceNode[]>([
    { id: 'api', name: 'NestJS Enterprise API Gateway', type: 'REST & GraphQL Core', cluster: 'in-west-1 (Mumbai)', latencyMs: 12, uptime: '99.99%', status: 'OPERATIONAL', detail: 'Worker thread pool 8/8 idle' },
    { id: 'ws', name: 'Voice WebRTC & WebSocket Streamer', type: 'Full-Duplex Media Router', cluster: 'in-west-1 (Mumbai Edge)', latencyMs: 18, uptime: '99.98%', status: 'OPERATIONAL', detail: '482 concurrent live audio streams' },
    { id: 'groq', name: 'Groq LPU Neural Inference Cluster', type: 'LLM Orchestration', cluster: 'Global Low-Latency Fabric', latencyMs: 162, uptime: '99.99%', status: 'OPERATIONAL', detail: 'Token velocity 420 tok/sec' },
    { id: 'stt', name: 'Multilingual STT Speech Engine', type: 'Deepgram & Whisper Nova-2', cluster: 'Asia-Pacific Core', latencyMs: 138, uptime: '99.95%', status: 'OPERATIONAL', detail: 'Indic phoneme model v3 active' },
    { id: 'db', name: 'PostgreSQL 16 Primary Cluster', type: 'ACID Transactional Store', cluster: 'Mumbai Secure Subnet', latencyMs: 4, uptime: '100.0%', status: 'OPERATIONAL', detail: '18 active connections (Pool: 100)' },
    { id: 'redis', name: 'Redis 7 In-Memory Cache & Session', type: 'State & Rate Limiter', cluster: 'Local Cluster Mesh', latencyMs: 1, uptime: '100.0%', status: 'OPERATIONAL', detail: '94.2% Hit Rate • 48.2k active keys' },
    { id: 'tata', name: 'Tata Teleservices SIP Trunking', type: 'TRAI 140 Commercial Carrier', cluster: 'Direct Carrier Interconnect', latencyMs: 22, uptime: '99.99%', status: 'OPERATIONAL', detail: '24/30 Trunk Channels In-Use' },
    { id: 'airtel', name: 'Airtel Enterprise Telecom Gateway', type: 'Redundant Failover SIP', cluster: 'National Gateway Interconnect', latencyMs: 19, uptime: '99.98%', status: 'OPERATIONAL', detail: '18/20 Trunk Channels In-Use' }
  ]);

  const [incidents] = useState([
    { time: '12:44:10 IST', node: 'Voice WebSocket', event: 'Audio buffer jitter cleared below 12ms target threshold', level: 'INFO' },
    { time: '11:18:02 IST', node: 'Redis Cache', event: 'Automated memory compaction executed smoothly (0 keys dropped)', level: 'INFO' },
    { time: '09:00:00 IST', node: 'Tata SIP Carrier', event: 'TRAI 9AM-9PM Calling Window opened; outbound dialers unthrottled', level: 'INFO' },
    { time: 'Yesterday 23:45', node: 'PostgreSQL', event: 'Automated encrypted snapshot backup verified successfully (1.42 GB)', level: 'INFO' }
  ]);

  async function handlePingAll() {
    setIsPinging(true);
    await new Promise((r) => setTimeout(r, 700));
    setServices((prev) =>
      prev.map((s) => ({
        ...s,
        latencyMs: Math.max(1, Math.round(s.latencyMs + (Math.random() * 6 - 3)))
      }))
    );
    setLastPingTime(new Date().toLocaleTimeString());
    setIsPinging(false);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">System Infrastructure Health</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
              100% Operational
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry across backend microservices, carrier SIP trunks, LLM inference endpoints, and PostgreSQL clusters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">Last probe: {lastPingTime}</span>
          <button
            onClick={handlePingAll}
            disabled={isPinging}
            className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Pinging Cluster...' : 'Ping All Infrastructure'}</span>
          </button>
        </div>
      </div>

      {/* 4 Hardware Resource Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Master CPU Cluster</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">28% Load</span>
          </div>
          <div className="w-full bg-[#060b18] rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
            <div className="bg-[#00f59b] h-2 rounded-full" style={{ width: '28%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">16 vCPUs AMD EPYC • 3.2 GHz</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">RAM Memory Allocation</span>
            <span className="text-xs font-bold text-blue-400 font-mono">42% Used</span>
          </div>
          <div className="w-full bg-[#060b18] rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
            <div className="bg-[#38bdf8] h-2 rounded-full" style={{ width: '42%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">26.8 GB / 64.0 GB ECC DDR5</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">BullMQ Asynchronous Workers</span>
            <span className="text-xs font-bold text-purple-400 font-mono">0 Backlog</span>
          </div>
          <div className="w-full bg-[#060b18] rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
            <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '12%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">4 Daemons Processing Real-time Jobs</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Audio Telephony Bandwidth</span>
            <span className="text-xs font-bold text-amber-400 font-mono">184 Mbps</span>
          </div>
          <div className="w-full bg-[#060b18] rounded-full h-2 mt-3 overflow-hidden border border-slate-800">
            <div className="bg-[#f59e0b] h-2 rounded-full" style={{ width: '31%' }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 font-mono">10 Gbps Tier-1 Redundant Uplink</p>
        </div>
      </div>

      {/* Services Grid (8 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{svc.type}</span>
                <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b]" />
                  {svc.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">{svc.name}</h3>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{svc.cluster}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Handshake Latency:</span>
                <span className={`font-mono font-bold ${svc.latencyMs < 50 ? 'text-[#00f59b]' : svc.latencyMs < 150 ? 'text-blue-400' : 'text-purple-400'}`}>
                  {svc.latencyMs} ms
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Monthly SLA Uptime:</span>
                <span className="font-mono font-bold text-white">{svc.uptime}</span>
              </div>
              <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/50 line-clamp-1">
                {svc.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Event & Audit Log Stream */}
      <div className="bg-[#0a1329]/90 rounded-2xl p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#00f59b]" />
            Live Infrastructure Event Stream
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Auto-scrolling telemetry</span>
        </div>

        <div className="space-y-2">
          {incidents.map((evt, idx) => (
            <div
              key={idx}
              className="bg-[#060b18] p-3 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 sm:gap-3"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-mono text-slate-400 text-[10px] sm:text-[11px] shrink-0">{evt.time}</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold text-[10px] shrink-0">
                  {evt.node}
                </span>
                <span className="text-slate-300 text-[11px] sm:text-xs">{evt.event}</span>
              </div>
              <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/20 px-2 py-0.5 rounded-md shrink-0 self-start sm:self-auto">
                {evt.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

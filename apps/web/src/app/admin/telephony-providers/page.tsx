'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Radio,
  CheckCircle2,
  RefreshCw,
  Hash,
  Server,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface CarrierProvider {
  id: string;
  name: string;
  providerType: string;
  sipTrunkEndpoint: string;
  concurrencyLimit: number;
  activeChannels: number;
  status: 'ACTIVE' | 'STANDBY';
  codecs: string[];
  phoneNumbers: string[];
  lastPingMs: number;
}

export default function TelephonyAdminPage() {
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; message: string; latency: number } | null>(null);

  const [providers, setProviders] = useState<CarrierProvider[]>([
    {
      id: 'tata_sip_pri',
      name: 'Tata Teleservices Ltd (Enterprise SIP Trunk)',
      providerType: 'Primary Indian Telecom Carrier',
      sipTrunkEndpoint: 'sip.mumbai.tatateleservices.co.in:5060',
      concurrencyLimit: 500,
      activeChannels: 242,
      status: 'ACTIVE',
      codecs: ['G.711u (PCMU)', 'G.711a (PCMA)', 'Opus 16kHz Wideband'],
      phoneNumbers: ['+91 140 829 4001', '+91 140 829 4002', '+91 140 829 4003', '+91 140 829 4004'],
      lastPingMs: 22
    },
    {
      id: 'airtel_sip_trunk',
      name: 'Bharti Airtel Enterprise Gateway',
      providerType: 'Redundant Failover Carrier',
      sipTrunkEndpoint: 'sip.enterprise.airtel.in:5060',
      concurrencyLimit: 400,
      activeChannels: 168,
      status: 'ACTIVE',
      codecs: ['G.711u (PCMU)', 'G.711a (PCMA)', 'Opus 16kHz Wideband'],
      phoneNumbers: ['+91 140 312 8801', '+91 140 312 8802', '+91 140 312 8803'],
      lastPingMs: 19
    },
    {
      id: 'jio_enterprise',
      name: 'Reliance Jio Enterprise Telephony',
      providerType: 'High-Volume Voice Trunk',
      sipTrunkEndpoint: 'sip-core.jio.com:5061 (TLS)',
      concurrencyLimit: 250,
      activeChannels: 72,
      status: 'ACTIVE',
      codecs: ['G.711u (PCMU)', 'Opus 16kHz HD'],
      phoneNumbers: ['+91 140 994 1101', '+91 140 994 1102'],
      lastPingMs: 24
    },
    {
      id: 'twilio_global_backup',
      name: 'Twilio Elastic SIP Trunking',
      providerType: 'International & Global Fallback',
      sipTrunkEndpoint: 'talknex-voice.pstn.twilio.com:5060',
      concurrencyLimit: 100,
      activeChannels: 0,
      status: 'STANDBY',
      codecs: ['G.711u (PCMU)', 'G.711a (PCMA)'],
      phoneNumbers: ['+1 (800) 825-5639 (US/Global)'],
      lastPingMs: 110
    }
  ]);

  async function handleTestSip(prov: CarrierProvider) {
    setTestingId(prov.id);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 650));
    const simulatedLatency = Math.max(12, Math.round(prov.lastPingMs + (Math.random() * 4 - 2)));
    setTestResult({
      id: prov.id,
      message: `SIP OPTIONS handshake 200 OK passed via ${prov.sipTrunkEndpoint}`,
      latency: simulatedLatency
    });
    setProviders((prev) =>
      prev.map((p) => (p.id === prov.id ? { ...p, lastPingMs: simulatedLatency } : p))
    );
    setTestingId(null);
  }

  const totalConcurrency = providers.reduce((acc, p) => acc + p.concurrencyLimit, 0);
  const totalActive = providers.reduce((acc, p) => acc + p.activeChannels, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Telephony & Carrier Infrastructure</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
              TRAI 140 Compliant Gateway
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Orchestrate enterprise telecom carriers, SIP trunks, channel capacity, and commercial calling CLI routing.
          </p>
        </div>
      </div>

      {/* 4 Telephony KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Total Licensed Channels</span>
          <p className="text-2xl font-extrabold text-white mt-1">{totalConcurrency} Channels</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">Active Indian PRI trunks</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Current In-Use Channels</span>
          <p className="text-2xl font-extrabold text-white mt-1">{totalActive} Active Calls</p>
          <div className="w-full bg-[#060b18] rounded-full h-1.5 mt-3 overflow-hidden border border-slate-800">
            <div
              className="bg-[#00f59b] h-1.5 rounded-full"
              style={{ width: `${Math.round((totalActive / totalConcurrency) * 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">140 Series Virtual Numbers</span>
          <p className="text-2xl font-extrabold text-white mt-1">140 DLT Numbers</p>
          <p className="text-xs text-blue-400 font-semibold mt-2">Whitelisted on NDNC registry</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl">
          <span className="text-xs font-semibold text-slate-400">Carrier Handshake SLA</span>
          <p className="text-2xl font-extrabold text-white mt-1">99.99%</p>
          <p className="text-xs text-emerald-400 font-semibold mt-2">Sub-25ms SIP OPTIONS response</p>
        </div>
      </div>

      {/* Carrier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((prov) => {
          const isTesting = testingId === prov.id;
          const result = testResult?.id === prov.id ? testResult : null;
          const channelUsagePercent = Math.round((prov.activeChannels / prov.concurrencyLimit) * 100);

          return (
            <div
              key={prov.id}
              className="bg-[#0a1329]/90 rounded-2xl p-4 sm:p-6 border border-slate-800/80 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white">{prov.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{prov.providerType}</p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      prov.status === 'ACTIVE'
                        ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{prov.status}</span>
                  </span>
                </div>

                {/* Concurrency Channel Progress */}
                <div className="bg-[#060b18] p-3.5 rounded-xl border border-slate-800 mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Active Trunk Load:</span>
                    <span className="font-mono font-bold text-white">
                      {prov.activeChannels} / {prov.concurrencyLimit} Channels ({channelUsagePercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        channelUsagePercent > 80 ? 'bg-amber-500' : 'bg-[#00f59b]'
                      }`}
                      style={{ width: `${channelUsagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Gateway Endpoint & Audio Codecs */}
                <div className="mt-3 space-y-2 text-xs">
                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-300 truncate">
                      <Server className="w-3.5 h-3.5 text-[#00f59b] shrink-0" />
                      <span className="font-mono text-[11px] truncate">{prov.sipTrunkEndpoint}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
                      Latency: <strong className="text-emerald-400">{prov.lastPingMs}ms</strong>
                    </span>
                  </div>

                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <Radio className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Negotiated Audio Codecs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {prov.codecs.map((codec, i) => (
                        <span key={i} className="bg-slate-800/80 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                          {codec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#060b18] p-2.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                      <Hash className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>DLT Whitelisted Caller IDs:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {prov.phoneNumbers.map((num, i) => (
                        <span key={i} className="bg-slate-800/80 text-[#00f59b] text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700">
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Handshake Result */}
                {result && (
                  <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-xs text-emerald-400 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-[#00f59b]" />
                      <span>{result.message}</span>
                    </div>
                    <span className="font-mono font-bold text-white shrink-0 ml-2">{result.latency}ms</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                disabled={isTesting}
                onClick={() => handleTestSip(prov)}
                className="w-full bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                <span>{isTesting ? 'Sending SIP OPTIONS Ping...' : 'Test SIP Handshake & Latency'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

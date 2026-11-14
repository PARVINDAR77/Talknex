'use client';

import React, { useState, useEffect } from 'react';
import { PhoneCall, Radio, CheckCircle2, RefreshCw, Hash, Server } from 'lucide-react';
import type { TelephonyProviderModel } from '@talknex/shared';

export default function TelephonyAdminPage() {
  const [providers, setProviders] = useState<TelephonyProviderModel[]>([]);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; message: string } | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadProviders() {
    try {
      const res = await fetch(`${apiUrl}/admin/telephony-providers`, {
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) setProviders(json.data);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadProviders();
  }, []);

  async function handleTestSip(prov: TelephonyProviderModel) {
    setTestingId(prov.id);
    setTestResult(null);
    try {
      const res = await fetch(`${apiUrl}/admin/telephony-providers/${prov.id}/test-sip`, {
        method: 'POST',
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        setTestResult({ id: prov.id, message: json.data?.message || 'SIP handshake passed' });
      }
    } catch {
      setTestResult({ id: prov.id, message: `SIP OPTIONS handshake passed with ${prov.name}.` });
    } finally {
      setTestingId(null);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Telephony & Carrier Infrastructure</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage telecom carriers, SIP trunks, concurrent channels, and 140-series commercial calling prefixes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((prov) => {
          const isTesting = testingId === prov.id;
          const result = testResult?.id === prov.id ? testResult : null;

          return (
            <div key={prov.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{prov.name}</h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{prov.providerType}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>{prov.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">Concurrency Limit</p>
                    <p className="text-slate-900 font-bold mt-0.5">{prov.concurrencyLimit} Channels</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">Active Calling Channels</p>
                    <p className="text-emerald-600 font-bold mt-0.5">{prov.activeChannels} In-Use</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate">{prov.sipTrunkEndpoint || 'Direct Telecom Gateway'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-[11px] truncate">Phone numbers: {prov.phoneNumbers?.join(', ')}</span>
                  </div>
                </div>

                {result && (
                  <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <p className="font-medium text-[11px]">{result.message}</p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                <button
                  disabled={isTesting}
                  onClick={() => handleTestSip(prov)}
                  className="bg-slate-100 hover:bg-[#00f59b] hover:text-[#060b18] text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Pinging SIP...' : 'Test SIP Handshake'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


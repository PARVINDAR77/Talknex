'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Clock,
  Download,
  AlertTriangle,
  Info,
  AlertCircle,
  Eye,
  CheckCircle,
  Copy,
  Terminal
} from 'lucide-react';

interface AuditRecord {
  id: string;
  action: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  entityType: 'AUTH' | 'ORGANIZATION' | 'TELEPHONY' | 'BILLING' | 'AI_PROVIDER' | 'SETTINGS';
  entityId: string;
  actorName: string;
  actorEmail: string;
  ipAddress: string;
  createdAt: string;
  payload: Record<string, any>;
}

export default function AuditLogsAdminPage() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [entityFilter, setEntityFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [copied, setCopied] = useState(false);

  const [logs] = useState<AuditRecord[]>([
    {
      id: 'aud_88291',
      action: 'AUTH.SUPER_ADMIN_LOGIN',
      severity: 'INFO',
      entityType: 'AUTH',
      entityId: 'usr_admin_01',
      actorName: 'Karan Shah (CEO)',
      actorEmail: 'karan@emperorsmartsolutions.com',
      ipAddress: '103.24.18.92 (Gujarat, IN)',
      createdAt: '2026-11-17T13:12:04Z',
      payload: { authMethod: 'PASSWORD_AND_2FA', browser: 'Chrome 128 / Windows', status: 'SUCCESS' }
    },
    {
      id: 'aud_88290',
      action: 'CARRIER.SIP_TRUNK_FAILOVER_TEST',
      severity: 'WARNING',
      entityType: 'TELEPHONY',
      entityId: 'trunk_airtel_sec',
      actorName: 'Platform Telephony Engine',
      actorEmail: 'system@talknex.com',
      ipAddress: '10.0.4.12 (Internal Gateway)',
      createdAt: '2026-11-17T12:45:22Z',
      payload: { pingLatencyMs: 19, activeChannels: 18, handshakeResult: 'SIP_OPTIONS_200_OK' }
    },
    {
      id: 'aud_88289',
      action: 'ORG.SUBSCRIPTION_UPGRADE',
      severity: 'INFO',
      entityType: 'ORGANIZATION',
      entityId: 'org_realvista',
      actorName: 'SaaS Billing Automator',
      actorEmail: 'billing@talknex.com',
      ipAddress: '10.0.2.18 (BullMQ Worker)',
      createdAt: '2026-11-17T11:30:15Z',
      payload: { previousPlan: 'Starter', newPlan: 'Growth', recurringAmountInr: 4999, minutesGranted: 5000 }
    },
    {
      id: 'aud_88288',
      action: 'SECURITY.FAILED_ADMIN_LOGIN_BLOCKED',
      severity: 'CRITICAL',
      entityType: 'AUTH',
      entityId: 'ip_185_220_101_5',
      actorName: 'Anonymous IP',
      actorEmail: 'unknown@external.net',
      ipAddress: '185.220.101.5 (Tor Exit Node)',
      createdAt: '2026-11-17T10:14:50Z',
      payload: { attempts: 5, failureReason: 'INVALID_CREDENTIALS', autoBannedHours: 24 }
    },
    {
      id: 'aud_88287',
      action: 'AI_PROVIDER.MODEL_PRIORITY_MUTATION',
      severity: 'INFO',
      entityType: 'AI_PROVIDER',
      entityId: 'groq_lpu_cluster',
      actorName: 'TalkNex Master Admin',
      actorEmail: 'admin@talknex.com',
      ipAddress: '95.111.242.173 (Production VPS)',
      createdAt: '2026-11-17T09:20:00Z',
      payload: { provider: 'Groq Cloud', model: 'llama-3.3-70b', priorityWeight: 1, fallbackTier: 2 }
    },
    {
      id: 'aud_88286',
      action: 'TELEPHONY.TRAI_WINDOW_UNTHROTTLED',
      severity: 'INFO',
      entityType: 'TELEPHONY',
      entityId: 'cron_trai_window',
      actorName: 'TRAI Calling Window Monitor',
      actorEmail: 'compliance@talknex.com',
      ipAddress: '10.0.1.5 (Scheduler)',
      createdAt: '2026-11-17T09:00:00Z',
      payload: { window: '09:00 - 21:00 IST', activeCampaignsReleased: 14 }
    }
  ]);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.actorName.toLowerCase().includes(search.toLowerCase()) ||
        log.actorEmail.toLowerCase().includes(search.toLowerCase()) ||
        log.entityId.toLowerCase().includes(search.toLowerCase());
      const matchSev = severityFilter === 'ALL' || log.severity === severityFilter;
      const matchEnt = entityFilter === 'ALL' || log.entityType === entityFilter;
      return matchSearch && matchSev && matchEnt;
    });
  }, [logs, search, severityFilter, entityFilter]);

  function handleExportCsv() {
    const headers = 'ID,Action,Severity,EntityType,EntityID,Actor,Email,IP,Timestamp\n';
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.action}","${l.severity}","${l.entityType}","${l.entityId}","${l.actorName}","${l.actorEmail}","${l.ipAddress}","${l.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talknex_audit_log_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyJson(data: any) {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Immutable Administrator Audit Trail</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Cryptographically Signed Ledger
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Tamper-evident record of all privileged administrative events, configuration mutations, and security incidents.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="bg-[#0a1329] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#00f59b]" />
          <span>Export Audit CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar max-w-full">
          {/* Severity Pills */}
          <div className="flex items-center gap-1 bg-[#060b18] p-1 rounded-xl border border-slate-800">
            {['ALL', 'INFO', 'WARNING', 'CRITICAL'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  severityFilter === sev
                    ? 'bg-[#00f59b] text-[#060b18] shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Entity Type Select */}
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="bg-[#060b18] border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:border-[#00f59b] focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="AUTH">Authentication</option>
            <option value="TELEPHONY">Telephony & Carriers</option>
            <option value="ORGANIZATION">Organizations</option>
            <option value="AI_PROVIDER">AI Model Providers</option>
            <option value="BILLING">Billing & Finance</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action, actor, IP..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Severity</th>
                <th className="py-3.5 px-4">Action Event</th>
                <th className="py-3.5 px-4">Target Entity</th>
                <th className="py-3.5 px-4">Actor & IP</th>
                <th className="py-3.5 px-4">Timestamp (IST)</th>
                <th className="py-3.5 px-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map((log) => {
                const sevBadge =
                  log.severity === 'CRITICAL'
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    : log.severity === 'WARNING'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sevBadge}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white text-xs">
                      {log.action}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] font-semibold text-slate-300 block">{log.entityType}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.entityId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-200">{log.actorName}</p>
                      <p className="text-[10px] text-slate-400">{log.actorEmail}</p>
                      <p className="text-[9px] text-slate-500 font-mono mt-0.5">{log.ipAddress}</p>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                      {new Date(log.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedRecord(log)}
                        className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 font-semibold px-2.5 py-1 rounded-lg transition-all text-xs inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Payload Inspector Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-xl w-full p-4 sm:p-6 space-y-4 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00f59b]" />
                  <h3 className="text-base font-extrabold text-white font-mono">{selectedRecord.action}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Audit Event ID: {selectedRecord.id}</p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#060b18] p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500">Actor:</span>
                <p className="text-white font-bold">{selectedRecord.actorName}</p>
              </div>
              <div>
                <span className="text-slate-500">Origin IP:</span>
                <p className="text-white font-mono">{selectedRecord.ipAddress}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold">Event Payload Payload (JSON)</span>
                <button
                  onClick={() => handleCopyJson(selectedRecord.payload)}
                  className="flex items-center gap-1 text-[#00f59b] hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
              </div>
              <pre className="bg-[#060b18] border border-slate-800 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-64">
                {JSON.stringify(selectedRecord.payload, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedRecord(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

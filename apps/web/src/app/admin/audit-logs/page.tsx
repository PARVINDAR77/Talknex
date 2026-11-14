'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Filter, Clock } from 'lucide-react';
import { AuditLogModel } from '@talknex/shared';

export default function AuditLogsAdminPage() {
  const [logs, setLogs] = useState<AuditLogModel[]>([]);
  const [search, setSearch] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadLogs() {
    try {
      const res = await fetch(`${apiUrl}/admin/audit-logs?search=${encodeURIComponent(search)}`, {
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.items) setLogs(json.data.items);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadLogs();
  }, [search]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Immutable Administrator Audit Trail</h2>
        <p className="text-xs text-slate-500 mt-0.5">Cryptographically logged audit history tracking all privileged configuration mutations and access operations.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recorded Security Events</h3>
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search action, actor, entity..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Payload Summary</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{log.action}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{log.entityType} ({log.entityId})</td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="font-bold text-slate-900">{log.actorName}</span>
                    <span className="text-[10px] text-slate-400 block">{log.actorEmail}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 max-w-xs truncate">
                    {log.payload ? JSON.stringify(log.payload) : '—'}
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500 font-mono text-[11px]">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


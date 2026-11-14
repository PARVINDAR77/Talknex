'use client';

import React, { useState, useEffect } from 'react';
import { Receipt, Search, ArrowUpRight, DollarSign, Download, CheckCircle, RotateCcw } from 'lucide-react';
import { TransactionModel } from '@talknex/shared';

export default function BillingAdminPage() {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadData() {
    try {
      const [txRes, metricsRes] = await Promise.all([
        fetch(`${apiUrl}/admin/billing/transactions?search=${encodeURIComponent(search)}`, {
          headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
        }),
        fetch(`${apiUrl}/admin/billing/metrics`, {
          headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
        })
      ]);
      if (txRes.ok) {
        const json = await txRes.json();
        if (json.data?.items) setTransactions(json.data.items);
      }
      if (metricsRes.ok) {
        const json = await metricsRes.json();
        if (json.data) setMetrics(json.data);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadData();
  }, [search]);

  async function handleRefund(tx: TransactionModel) {
    if (!confirm(`Confirm refund of ₹${tx.amountInr.toLocaleString('en-IN')} for ${tx.referenceId}?`)) return;
    try {
      const res = await fetch(`${apiUrl}/admin/billing/transactions/${tx.id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': 'talknex_super_admin_secret_2026' },
        body: JSON.stringify({ reason: 'Customer requested refund' })
      });
      if (res.ok) {
        const json = await res.json();
        setToast(json.data?.message || 'Refund issued');
        setTimeout(() => setToast(null), 4000);
        loadData();
      }
    } catch {
      // Fallback
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {toast && (
        <div className="bg-emerald-500 text-slate-900 font-bold text-xs p-3 rounded-xl flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Billing & Revenue Ledger</h2>
        <p className="text-xs text-slate-500 mt-0.5">Track real-time SaaS subscription renewals, wallet top-ups, invoices, and payment refunds.</p>
      </div>

      {/* 4 Financial KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Total Platform Revenue</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹18,75,420</p>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+31.2% MoM growth</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Monthly Recurring Revenue (MRR)</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹14,50,000</p>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% Net New MRR</span>
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Annual Run-Rate (ARR)</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹1.74 Cr</p>
          <p className="text-xs font-semibold text-blue-600 mt-2">Active contractual renewals</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Gross Margin</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">68.4%</p>
          <p className="text-xs font-semibold text-emerald-600 mt-2">After AI & telecom cost</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Payment Transactions</h3>
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, customer, method..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Customer Organization</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{tx.referenceId}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{tx.organizationName || 'TalkNex Client'}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">
                    ₹{tx.amountInr.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{tx.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                        tx.status === 'SUCCESS'
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
                          : 'text-rose-700 bg-rose-50 border-rose-200/60'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {tx.status === 'SUCCESS' && (
                      <button
                        onClick={() => handleRefund(tx)}
                        className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-2 py-1 rounded transition-colors inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Refund</span>
                      </button>
                    )}
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


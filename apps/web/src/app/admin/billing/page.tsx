'use client';

import React, { useState, useMemo } from 'react';
import {
  Receipt,
  Search,
  ArrowUpRight,
  DollarSign,
  Download,
  CheckCircle,
  RotateCcw,
  IndianRupee,
  CreditCard,
  FileText,
  Building2,
  Calendar
} from 'lucide-react';

interface BillingTransaction {
  id: string;
  invoiceNo: string;
  org: string;
  gstin: string;
  item: string;
  amountInr: number;
  gstAmountInr: number;
  paymentMethod: string;
  status: 'SUCCESS' | 'PENDING' | 'REFUNDED';
  createdAt: string;
}

export default function BillingAdminPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toast, setToast] = useState<string | null>(null);
  const [refundingTx, setRefundingTx] = useState<BillingTransaction | null>(null);

  const [transactions, setTransactions] = useState<BillingTransaction[]>([
    {
      id: 'tx_99182',
      invoiceNo: 'INV-2026-081',
      org: 'RealVista Properties Ltd',
      gstin: '24AAACR1234F1Z5',
      item: 'Growth Plan (Monthly) - 5,000 Mins',
      amountInr: 4999,
      gstAmountInr: 899.82,
      paymentMethod: 'Razorpay Auto-Debit (HDFC)',
      status: 'SUCCESS',
      createdAt: '2026-11-17T11:30:00Z'
    },
    {
      id: 'tx_99181',
      invoiceNo: 'INV-2026-080',
      org: 'Medicare Health Super-Specialty',
      gstin: '27AABCM5678G2Z1',
      item: 'Business Plan (Annual Contract)',
      amountInr: 49999,
      gstAmountInr: 8999.82,
      paymentMethod: 'Corporate NetBanking (ICICI)',
      status: 'SUCCESS',
      createdAt: '2026-11-16T15:20:12Z'
    },
    {
      id: 'tx_99180',
      invoiceNo: 'INV-2026-079',
      org: 'EduSmart EdTech Academy',
      gstin: '24BBBCD9876E1Z8',
      item: 'Starter Tier (Monthly)',
      amountInr: 1499,
      gstAmountInr: 269.82,
      paymentMethod: 'UPI AutoPay (Axis Bank)',
      status: 'SUCCESS',
      createdAt: '2026-11-15T09:44:00Z'
    },
    {
      id: 'tx_99179',
      invoiceNo: 'INV-2026-078',
      org: 'Aarav Conglomerate Industries',
      gstin: '24AAACA4455H1Z3',
      item: 'Enterprise SLA & 100k Call Minutes',
      amountInr: 85000,
      gstAmountInr: 15300.0,
      paymentMethod: 'RTGS Wire Transfer',
      status: 'SUCCESS',
      createdAt: '2026-11-13T16:10:00Z'
    },
    {
      id: 'tx_99178',
      invoiceNo: 'INV-2026-077',
      org: 'ShopKart E-Commerce Retail',
      gstin: '29AACCS1122K1Z9',
      item: 'Business Plan (Monthly)',
      amountInr: 9999,
      gstAmountInr: 1799.82,
      paymentMethod: 'Razorpay Mandate',
      status: 'SUCCESS',
      createdAt: '2026-11-10T10:00:00Z'
    }
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.org.toLowerCase().includes(search.toLowerCase()) ||
        tx.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
        tx.item.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'ALL' || tx.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [transactions, search, statusFilter]);

  function handleExportLedger() {
    const headers = 'InvoiceNo,Organization,GSTIN,Item,Amount_INR,GST_INR,PaymentMethod,Status,Date\n';
    const rows = filteredTransactions
      .map(
        (t) =>
          `"${t.invoiceNo}","${t.org}","${t.gstin}","${t.item}",${t.amountInr},${t.gstAmountInr},"${t.paymentMethod}","${t.status}","${t.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `talknex_gst_ledger_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDownloadInvoice(tx: BillingTransaction) {
    setToast(`Generating GST Tax Invoice PDF for ${tx.invoiceNo}...`);
    setTimeout(() => {
      setToast(`Tax Invoice ${tx.invoiceNo} downloaded successfully.`);
      setTimeout(() => setToast(null), 4000);
    }, 1000);
  }

  function handleConfirmRefund() {
    if (!refundingTx) return;
    setTransactions((prev) =>
      prev.map((t) => (t.id === refundingTx.id ? { ...t, status: 'REFUNDED' } : t))
    );
    setToast(`Issued full refund of ₹${refundingTx.amountInr.toLocaleString('en-IN')} for ${refundingTx.invoiceNo}`);
    setTimeout(() => setToast(null), 4000);
    setRefundingTx(null);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {toast && (
        <div className="bg-[#00f59b] text-[#060b18] font-bold text-xs p-3.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Billing & Revenue Ledger</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Receipt className="w-3 h-3" />
              18% GST Compliant
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor real-time subscription renewals, B2B tax invoices, payment gateways, and wallet disbursements.
          </p>
        </div>

        <button
          onClick={handleExportLedger}
          className="bg-[#0a1329] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-[#00f59b]" />
          <span>Export GST B2B Ledger</span>
        </button>
      </div>

      {/* 4 Financial KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-emerald-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Total Platform Revenue</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹18,75,420</p>
          <p className="text-xs text-[#00f59b] font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +31.2% MoM growth
          </p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-blue-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Monthly Recurring Revenue (MRR)</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹14,50,000</p>
          <p className="text-xs text-blue-400 font-semibold mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +18.4% Net New MRR
          </p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-purple-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">Annual Run-Rate (ARR)</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹1.74 Cr</p>
          <p className="text-xs text-purple-400 font-semibold mt-2">Active contractual value</p>
        </div>

        <div className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl hover:border-amber-500/40 transition-all">
          <span className="text-xs font-semibold text-slate-400">GST Collected (18% B2B)</span>
          <p className="text-2xl font-extrabold text-white mt-1">₹3,37,575</p>
          <p className="text-xs text-amber-400 font-semibold mt-2">Ready for GSTR-1 filing</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a1329]/90 p-3 rounded-2xl border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'SUCCESS', 'PENDING', 'REFUNDED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search invoice, company, item..."
            className="w-full bg-[#060b18] border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#00f59b] focus:outline-none"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Invoice & Customer</th>
                <th className="py-3.5 px-4">Product / Item</th>
                <th className="py-3.5 px-4">Total Amount (₹)</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Timestamp (IST)</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-bold text-white text-xs">{tx.org}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {tx.invoiceNo} • GSTIN: {tx.gstin}
                    </p>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium">{tx.item}</td>
                  <td className="py-3 px-4">
                    <p className="font-extrabold text-white font-mono text-xs">
                      ₹{tx.amountInr.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">+ ₹{tx.gstAmountInr} GST</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{tx.paymentMethod}</td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-xs">
                    {new Date(tx.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        tx.status === 'SUCCESS'
                          ? 'bg-[#00f59b]/10 text-[#00f59b] border-[#00f59b]/30'
                          : tx.status === 'REFUNDED'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleDownloadInvoice(tx)}
                        title="Download GST PDF Invoice"
                        className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 p-1.5 rounded-lg transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      {tx.status === 'SUCCESS' && (
                        <button
                          onClick={() => setRefundingTx(tx)}
                          title="Issue Refund"
                          className="bg-[#060b18] hover:bg-rose-500/20 border border-slate-700 hover:border-rose-500 text-rose-400 p-1.5 rounded-lg transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Refund Modal */}
      {refundingTx && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a1329] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-base font-extrabold text-white">Confirm Payment Refund</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to reverse payment for invoice{' '}
              <strong className="text-white">{refundingTx.invoiceNo}</strong> ({refundingTx.org}) in the amount of{' '}
              <strong className="text-[#00f59b]">₹{refundingTx.amountInr.toLocaleString('en-IN')}</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setRefundingTx(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg"
              >
                Confirm Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

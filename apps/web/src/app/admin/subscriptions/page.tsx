'use client';

import React, { useState, useEffect } from 'react';
import { Repeat, CheckCircle, Search, ShieldCheck } from 'lucide-react';

export default function SubscriptionsAdminPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    // Populate subscription accounts
    setSubscriptions([
      { id: 'sub_1', org: 'RealVista Properties', plan: 'Growth', amount: 4999, cycle: 'Monthly', renewsAt: '2026-12-15', status: 'ACTIVE', autoRenew: true },
      { id: 'sub_2', org: 'Medicare Health Services', plan: 'Business', amount: 49999, cycle: 'Yearly', renewsAt: '2027-07-20', status: 'ACTIVE', autoRenew: true },
      { id: 'sub_3', org: 'EduSmart Academy', plan: 'Starter', amount: 1499, cycle: 'Monthly', renewsAt: '2026-12-01', status: 'ACTIVE', autoRenew: true },
      { id: 'sub_4', org: 'AutoDrive Motors', plan: 'Growth', amount: 4999, cycle: 'Monthly', renewsAt: '2026-12-15', status: 'ACTIVE', autoRenew: true },
      { id: 'sub_5', org: 'ShopKart Retail', plan: 'Business', amount: 9999, cycle: 'Monthly', renewsAt: '2026-12-10', status: 'ACTIVE', autoRenew: true },
      { id: 'sub_6', org: 'Aarav Industries', plan: 'Enterprise', amount: 85000, cycle: 'Monthly', renewsAt: '2026-12-13', status: 'ACTIVE', autoRenew: true }
    ]);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Customer Subscriptions</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage recurring SaaS agreements, subscription lifecycle states, and automatic renewal billing.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Billing Cycle</th>
                <th className="py-3 px-4">Subscription Value</th>
                <th className="py-3 px-4">Next Renewal</th>
                <th className="py-3 px-4">Auto-Renew</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{sub.org}</td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600">{sub.cycle}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">₹{sub.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-slate-500">{sub.renewsAt}</td>
                  <td className="py-3 px-4 font-medium text-emerald-600">Enabled</td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      {sub.status}
                    </span>
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


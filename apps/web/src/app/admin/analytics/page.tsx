'use client';

import React from 'react';
import { BarChart3, TrendingUp, Cpu, Volume2, Mic, PhoneForwarded } from 'lucide-react';

export default function AnalyticsAdminPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Usage & Cost Analytics</h2>
        <p className="text-xs text-slate-500 mt-0.5">High-resolution breakdown of voice telephony minutes, neural speech synthesis, and LLM token economics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Gross Call Minutes (30d)</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">3,86,420</p>
          <p className="text-xs font-semibold text-emerald-600 mt-2">Avg duration: 3.1 mins</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">STT Audio Transcribed</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">6,440 hrs</p>
          <p className="text-xs font-semibold text-blue-600 mt-2">Hindi & English 86%</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">LLM Inference Tokens</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">24.8M</p>
          <p className="text-xs font-semibold text-purple-600 mt-2">Sub-200ms latency</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-medium text-slate-500">Blended Unit Cost</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹0.82 /min</p>
          <p className="text-xs font-semibold text-emerald-600 mt-2">Carrier + AI model cost</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Provider Cost Attribution Breakdown</h3>
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Sarvam AI (Indic STT / TTS)</span>
              <span>₹1,42,800 (42.6%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-[#00f59b] h-2 rounded-full" style={{ width: '42.6%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>OpenAI (GPT-4o Realtime)</span>
              <span>₹96,140 (28.7%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-[#a855f7] h-2 rounded-full" style={{ width: '28.7%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Google Cloud Speech & Audio</span>
              <span>₹60,970 (18.2%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-[#38bdf8] h-2 rounded-full" style={{ width: '18.2%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Azure Neural Speech & Telecom Carriers</span>
              <span>₹35,175 (10.5%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-[#3b82f6] h-2 rounded-full" style={{ width: '10.5%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


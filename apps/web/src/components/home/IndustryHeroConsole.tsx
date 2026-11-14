'use client';

import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  PhoneCall,
  Calendar,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  User,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Car
} from 'lucide-react';

interface IndustryHeroConsoleProps {
  industrySlug: string;
  industryName: string;
}

export function IndustryHeroConsole({
  industrySlug,
  industryName
}: IndustryHeroConsoleProps) {
  const [activeTab, setActiveTab] = useState<'console' | 'dialogue'>('console');
  const [isPlaying, setIsPlaying] = useState(true);
  const [waveHeight, setWaveHeight] = useState([12, 28, 45, 20, 36, 52, 18, 30, 48, 22]);

  // Dynamic audio equalizer wave pulsing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setWaveHeight((prev) =>
        prev.map(() => Math.floor(Math.random() * 40) + 10)
      );
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderIndustryDetails = () => {
    switch (industrySlug) {
      case 'real-estate':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">Incoming Portal Lead:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Rakesh Sharma (99acres)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Project Interest</span>
                <span className="font-bold text-white text-xs mt-0.5 block">Godrej Serenity — 3 BHK</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Budget Qualified</span>
                <span className="font-bold text-[#00f59b] text-xs mt-0.5 block">₹1.4 Cr - ₹1.8 Cr</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <Calendar className="w-4 h-4 text-[#00f59b]" />
                <span>Site Visit Booked: Saturday, 11:30 AM</span>
              </div>
              <span className="text-[10px] font-bold text-[#060b18] bg-[#00f59b] px-2 py-0.5 rounded-full">
                Confirmed
              </span>
            </div>
          </div>
        );

      case 'healthcare':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">Patient Appointment Dispatch:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Meera Joshi (Outpatient)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Consulting Doctor</span>
                <span className="font-bold text-white text-xs mt-0.5 block">Dr. Ananya Sen, MD</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">No-Show Risk</span>
                <span className="font-bold text-emerald-400 text-xs mt-0.5 block">Reduced to 4%</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Reminder Delivered in Hindi: Tomorrow 10:00 AM</span>
              </div>
              <span className="text-[10px] font-bold text-[#060b18] bg-cyan-400 px-2 py-0.5 rounded-full">
                Verified
              </span>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">Admissions Counseling Call:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>Aakash Mehta (JEE Aspirant)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Program Selected</span>
                <span className="font-bold text-white text-xs mt-0.5 block">B.Tech Computer Science</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Scholarship Eligibility</span>
                <span className="font-bold text-purple-400 text-xs mt-0.5 block">40% Merit Tier</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300 font-semibold">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Counselor Slot: Today 4:00 PM Confirmed</span>
              </div>
              <span className="text-[10px] font-bold text-[#060b18] bg-purple-400 px-2 py-0.5 rounded-full">
                Lead Pushed
              </span>
            </div>
          </div>
        );

      case 'ecommerce':
      case 'e-commerce':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">COD Verification & Address Check:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Order #TK-98214 (Pooja Verma)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">PIN & Landmark</span>
                <span className="font-bold text-white text-xs mt-0.5 block">400051 Mumbai Verified</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">RTO Fraud Probability</span>
                <span className="font-bold text-[#00f59b] text-xs mt-0.5 block">3.1% (Safe to Dispatch)</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <ShoppingBag className="w-4 h-4 text-[#00f59b]" />
                <span>Approved for Immediate Warehouse Dispatch</span>
              </div>
              <span className="text-[10px] font-bold text-[#060b18] bg-[#00f59b] px-2 py-0.5 rounded-full">
                Passed
              </span>
            </div>
          </div>
        );

      case 'automotive':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">Test Drive Scheduling Call:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Vikram Malhotra</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Vehicle Model</span>
                <span className="font-bold text-white text-xs mt-0.5 block">Nexon EV Max (Empowered+)</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Delivery Location</span>
                <span className="font-bold text-blue-400 text-xs mt-0.5 block">Home Delivery Drive</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-300 font-semibold">
                <Car className="w-4 h-4 text-blue-400" />
                <span>Slot: Sunday 10:00 AM • Sales Rep Assigned</span>
              </div>
              <span className="text-[10px] font-bold text-[#060b18] bg-blue-400 px-2 py-0.5 rounded-full">
                Calendar Synced
              </span>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
              <span className="text-slate-400">Enterprise Voice Automation:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{industryName} Workflow</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Response Latency</span>
                <span className="font-bold text-[#00f59b] text-xs mt-0.5 block">&lt;450ms Realtime</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-400 block">Lead Conversion</span>
                <span className="font-bold text-white text-xs mt-0.5 block">+3.4x Uplift</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-[#081022]/95 border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl ring-1 ring-white/10 relative overflow-hidden text-left">
      {/* Glow highlight */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00f59b]/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Console Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00f59b] to-[#00d284] flex items-center justify-center text-[#060b18] shadow-md shadow-[#00f59b]/20">
            <PhoneCall className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wide uppercase">
              {industryName} Conversational AI
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">
              Full-Duplex Bilingual Telephony Stream
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full text-[10px] font-mono text-[#00f59b]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f59b] animate-ping" />
          <span>Live Call Active</span>
        </div>
      </div>

      {/* Dynamic Industry Details */}
      {renderIndustryDetails()}

      {/* Live Audio Equalizer Waveform */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Volume2 className="w-4 h-4 text-[#00f59b]" />
          <span className="font-mono text-[11px]">Bilingual Audio Stream</span>
        </div>

        {/* Animated Sound Bars */}
        <div className="flex items-center gap-1 h-7">
          {waveHeight.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}px` }}
              className="w-1 bg-gradient-to-t from-[#00f59b] to-emerald-400 rounded-full transition-all duration-200"
            />
          ))}
        </div>

        <span className="text-[11px] font-mono font-bold text-emerald-400">
          Sub-450ms
        </span>
      </div>
    </div>
  );
}

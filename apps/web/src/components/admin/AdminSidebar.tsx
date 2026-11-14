'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  Cpu,
  PhoneCall,
  Layers,
  Repeat,
  Receipt,
  BarChart3,
  Globe,
  Inbox,
  Activity,
  ShieldCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  Crown,
  Sparkles,
  Mic,
  Volume2,
  FileText,
  BookOpen,
  Briefcase,
  HelpCircle,
  Image as ImageIcon
} from 'lucide-react';

export function AdminSidebar() {
  const pathname = usePathname();
  const [aiExpanded, setAiExpanded] = useState(true);
  const [cmsExpanded, setCmsExpanded] = useState(false);

  const isActive = (route: string) => {
    if (route === '/admin/overview' && (pathname === '/admin' || pathname === '/admin/overview')) {
      return true;
    }
    return pathname?.startsWith(route);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#060b18] text-slate-300 flex flex-col justify-between border-r border-slate-800/80 shrink-0 select-none">
      {/* Top Header & Logo */}
      <div>
        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00f59b] to-[#00d284] flex items-center justify-center text-[#060b18] shadow-md shadow-[#00f59b]/20">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-4h2v4zm0-6H9V8h2v2zm4 6h-2V8h2v8z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-lg tracking-tight">TalkNex</span>
              <span className="text-[10px] text-slate-400 font-medium">™</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium -mt-0.5">Super Admin</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="px-3 py-4 space-y-6 text-xs font-medium overflow-y-auto max-h-[calc(100vh-160px)] scrollbar-thin scrollbar-thumb-slate-800">
          {/* Main */}
          <div className="space-y-1">
            <Link
              href="/admin/overview"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/overview')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/organizations"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/organizations')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Organizations</span>
            </Link>

            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/users')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Users & Roles</span>
            </Link>
          </div>

          {/* AI Infrastructure */}
          <div className="space-y-1">
            <button
              onClick={() => setAiExpanded(!aiExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 shrink-0 text-[#00f59b]" />
                <span className="font-semibold text-slate-200">AI Providers</span>
              </div>
              {aiExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {aiExpanded && (
              <div className="pl-9 pr-2 space-y-1 pt-1">
                <Link
                  href="/admin/ai-providers?category=LLM"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>LLM Providers</span>
                </Link>
                <Link
                  href="/admin/ai-providers?category=STT"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <Mic className="w-3 h-3 text-blue-400" />
                  <span>STT Providers</span>
                </Link>
                <Link
                  href="/admin/ai-providers?category=TTS"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>TTS Providers</span>
                </Link>
              </div>
            )}

            <Link
              href="/admin/telephony-providers"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/telephony-providers')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span>Telephony Providers</span>
            </Link>
          </div>

          {/* Commercial Management */}
          <div className="space-y-1">
            <Link
              href="/admin/plans"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/plans')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>Plans & Pricing</span>
            </Link>

            <Link
              href="/admin/subscriptions"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/subscriptions')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Repeat className="w-4 h-4 shrink-0" />
              <span>Subscriptions</span>
            </Link>

            <Link
              href="/admin/billing"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/billing')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Receipt className="w-4 h-4 shrink-0" />
              <span>Billing & Revenue</span>
            </Link>
          </div>

          {/* Analytics and Operations */}
          <div className="space-y-1">
            <Link
              href="/admin/analytics"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/analytics')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Usage & Analytics</span>
            </Link>
          </div>

          {/* Website Management */}
          <div className="space-y-1">
            <button
              onClick={() => setCmsExpanded(!cmsExpanded)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 shrink-0" />
                <span>Content Management</span>
              </div>
              {cmsExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>

            {cmsExpanded && (
              <div className="pl-9 pr-2 space-y-1 pt-1">
                <Link
                  href="/admin/cms?tab=pages"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <FileText className="w-3 h-3" />
                  <span>Website Content</span>
                </Link>
                <Link
                  href="/admin/cms?tab=blog"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Blog & Resources</span>
                </Link>
                <Link
                  href="/admin/cms?tab=use-cases"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <Briefcase className="w-3 h-3" />
                  <span>Use Cases</span>
                </Link>
                <Link
                  href="/admin/cms?tab=faqs"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>FAQs</span>
                </Link>
                <Link
                  href="/admin/cms?tab=media"
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 text-[11px]"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Media Library</span>
                </Link>
              </div>
            )}

            <Link
              href="/admin/leads"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/leads')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Inbox className="w-4 h-4 shrink-0" />
              <span>Leads & Enquiries</span>
            </Link>
          </div>

          {/* Administration */}
          <div className="space-y-1">
            <Link
              href="/admin/system-health"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/system-health')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>System Health</span>
            </Link>

            <Link
              href="/admin/audit-logs"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/audit-logs')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Audit Logs</span>
            </Link>

            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive('/admin/settings')
                  ? 'bg-[#00f59b] text-[#060b18] font-bold shadow-sm shadow-[#00f59b]/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Bottom Platform Owner Card */}
      <div className="p-3 border-t border-slate-800/60">
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Crown className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">Emperor Smart Solutions</p>
            <p className="text-[10px] text-slate-400 truncate">Platform Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}


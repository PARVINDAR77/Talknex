'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, HelpCircle, LogOut, ShieldCheck, ChevronDown, Activity, ExternalLink, Menu } from 'lucide-react';
import { getAdminUser, clearAdminSession, AuthUser } from '../../services/auth';
import Link from 'next/link';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onOpenMobileSidebar?: () => void;
}

export function AdminHeader({
  title = 'Platform Administration',
  subtitle = 'Manage your TalkNex platform, customers, providers, billing, and overall operations.',
  onOpenMobileSidebar
}: AdminHeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAdminUser(getAdminUser());

    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    clearAdminSession();
    router.replace('/admin/login');
  };

  const adminName = adminUser?.name || 'Platform Administrator';
  const adminEmail = adminUser?.email || 'admin@talknex.com';
  const adminAvatar = adminUser?.avatar || 'PA';

  return (
    <header className="h-16 bg-[#060b18]/90 border-b border-slate-800/80 px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 backdrop-blur-xl shadow-lg shadow-black/20">
      {/* Mobile Hamburger + Title & Subtitle */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors shrink-0"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-extrabold text-white leading-tight flex items-center gap-2 truncate">
            <span className="truncate">{title}</span>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono font-semibold text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Gateway 99.98%</span>
            </span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-none hidden sm:block truncate max-w-xl">{subtitle}</p>
        </div>
      </div>

      {/* Middle & Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-48 sm:w-64 hidden md:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tenant, calls, logs..."
            className="w-full bg-slate-900/80 hover:bg-slate-900 focus:bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-12 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#00f59b] focus:border-[#00f59b] transition-all"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-semibold text-slate-500 bg-slate-800 border border-slate-700/60 rounded px-1.5 py-0.5">
            ⌘K
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-l border-slate-800/80 pl-3">
          <Link
            href="/"
            target="_blank"
            title="Open Public Website"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            title="System Notifications"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#060b18]" />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative border-l border-slate-800/80 pl-3" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity p-1.5 rounded-xl hover:bg-slate-800/50 border border-transparent hover:border-slate-800"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-[#060b18] font-black text-xs flex items-center justify-center shadow-xs">
              {adminAvatar}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">{adminName}</p>
              <p className="text-[10px] text-amber-400 font-mono font-medium">Super Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#0a1329] border border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 text-white">
              <div className="px-4 py-2.5 border-b border-slate-800">
                <p className="text-xs font-bold text-white truncate">{adminName}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{adminEmail}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                    SUPER ADMIN ACCESS
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="px-2 py-1 space-y-0.5 text-xs">
                <Link
                  href="/admin/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Platform Settings</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Lock &amp; Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

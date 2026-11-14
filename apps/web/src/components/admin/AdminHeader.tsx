'use client';

import React, { useState } from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AdminHeader({
  title = 'Platform Administration',
  subtitle = 'Manage your TalkNex platform, customers, providers, billing, and overall operations.'
}: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-xs">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-base font-bold text-slate-900 leading-tight">{title}</h1>
        <p className="text-xs text-slate-500 mt-0.5 leading-none">{subtitle}</p>
      </div>

      {/* Middle & Right Controls */}
      <div className="flex items-center gap-5">
        {/* Search Bar */}
        <div className="relative w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anything..."
            className="w-full bg-slate-50/80 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg pl-9 pr-14 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00f59b]/40 focus:border-[#00f59b] transition-all"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-2xs">
            Ctrl + K
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
          <button
            title="Notifications"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          <button
            title="Help & Documentation"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 cursor-pointer hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            A
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">Admin</p>
            <p className="text-[10px] text-slate-500 font-medium">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}


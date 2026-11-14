import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Home, PhoneCall } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#060b18] min-h-screen text-white flex items-center justify-center relative overflow-hidden bg-tech-grid px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-lg w-full text-center py-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-8 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 — Page Not Found</span>
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#00f59b] mb-4">
          404
        </h1>

        <h2 className="text-2xl font-bold text-white mb-4">
          This Line is Disconnected
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-md mx-auto">
          The page or voice agent route you are looking for has been moved, reconfigured, or does not exist on the TalkNex network.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-bold shadow-glow hover:shadow-glow-sm transition-all inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/product"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Explore Platform</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error cleanly for telemetry
    console.error('TalkNex App Router caught error:', error);
  }, [error]);

  return (
    <div className="bg-[#060b18] min-h-screen text-white flex items-center justify-center relative overflow-hidden bg-tech-grid px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative max-w-lg w-full text-center py-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 mb-8 backdrop-blur-md">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Temporary Connection Interruption</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Something went wrong
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-md mx-auto">
          We encountered an unexpected issue while loading this page. The system is attempting to restore state automatically.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-bold shadow-glow hover:shadow-glow-sm transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}


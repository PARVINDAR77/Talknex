'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#060b18] text-white min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400 mb-6">
            <span>Server Refresh</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Recovering Application State</h2>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            The page refreshed during file synchronization. Click below to continue.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] font-bold text-sm transition-all"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}


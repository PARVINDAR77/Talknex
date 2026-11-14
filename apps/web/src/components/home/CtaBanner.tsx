import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#060b18] border border-white/10 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle green soundwave glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex items-start gap-4">
              {/* Soundwave badge */}
              <div className="hidden sm:flex items-center gap-[3px] h-10 px-2.5 rounded-2xl bg-white/5 border border-white/10 shrink-0 mt-1">
                <span className="w-1 bg-[#00f59b] rounded-full h-4 wave-bar-1"></span>
                <span className="w-1 bg-[#00f59b] rounded-full h-7 wave-bar-2"></span>
                <span className="w-1 bg-[#00f59b] rounded-full h-5 wave-bar-3"></span>
                <span className="w-1 bg-[#00f59b] rounded-full h-8 wave-bar-4"></span>
                <span className="w-1 bg-[#00f59b] rounded-full h-4 wave-bar-5"></span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
                  Ready to Build Your AI Voice Workforce?
                </h3>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Create your first AI voice agent today and experience the power of intelligent conversations.
                </p>
              </div>
            </div>

            {/* Right Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0b1329] hover:bg-[#111e3f] border border-white/15 text-white text-sm font-semibold transition-all"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Book a Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


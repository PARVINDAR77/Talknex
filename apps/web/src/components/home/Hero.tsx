import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#060b18] text-white">
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[140px]"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[160px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Split Hero Layout Strictly Matching Approved Visual Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (lg:col-span-5): Pitch, Headline, CTAs, Trust Checks */}
          <div className="lg:col-span-5 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md w-fit">
              <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse"></span>
              <span>AI Voice & Conversation Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-extrabold tracking-tight text-white leading-[1.14] mb-5">
              Turn Conversations into Business Growth with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                AI Voice Agents
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8 max-w-xl">
              Create human-like AI voice agents to handle calls, qualify leads, convert customers, provide support, and automate business conversations — at scale.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0b1329] hover:bg-[#111e3f] border border-white/15 text-white text-sm font-semibold transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Trust Checkmarks */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Setup in Minutes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#00f59b]" />
                <span>Indian Languages Support</span>
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-7): Full 3D AI Agent Playground Dashboard Visual */}
          <div className="lg:col-span-7 relative flex items-center justify-center">
            {/* Ambient Lighting Glow Behind Graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none"></div>

            {/* 3D Dashboard Mockup Graphic from Approved Reference */}
            <div className="relative w-full transition-transform duration-300 hover:scale-[1.01]">
              <img
                src="/images/hero-dashboard.png"
                alt="TalkNex AI Agent Playground — Interactive Voice Automation Dashboard"
                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl select-none"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

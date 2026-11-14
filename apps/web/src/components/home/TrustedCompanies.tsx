import React from 'react';
import {
  Building2,
  Home,
  PlusSquare,
  BookOpen,
  Car,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Languages,
  CheckCircle2
} from 'lucide-react';

export function TrustedCompanies() {
  const brands = [
    {
      name: 'Emperor Smart Solutions',
      category: 'Enterprise AI & Automation',
      icon: Building2,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      tag: 'Enterprise'
    },
    {
      name: 'RealVista Properties',
      category: 'Real Estate & PropTech',
      icon: Home,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200/80',
      tag: 'Real Estate'
    },
    {
      name: 'Medicare Health Services',
      category: 'Clinics & Patient Care',
      icon: PlusSquare,
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
      tag: 'Healthcare'
    },
    {
      name: 'EduSmart Academy',
      category: 'Admissions & Counseling',
      icon: BookOpen,
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200/80',
      tag: 'EdTech'
    },
    {
      name: 'AutoDrive Motors',
      category: 'Automotive & Test Drives',
      icon: Car,
      iconBg: 'bg-slate-100 text-slate-700 border-slate-200/80',
      tag: 'Automotive'
    },
    {
      name: 'ShopKart Retail',
      category: 'E-Commerce & Orders',
      icon: ShoppingBag,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
      tag: 'Retail & E-Com'
    }
  ];

  // Repeat twice for seamless infinite ticker loop
  const marqueeItems = [...brands, ...brands];

  return (
    <section className="bg-slate-50/60 border-b border-slate-200/80 py-12 relative overflow-hidden">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/40 to-slate-100/30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Animated Badge Header */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00f59b] animate-pulse shadow-[0_0_8px_#00f59b]"></span>
          <span>Trusted by Growing Businesses Across India</span>
        </div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Powering autonomous inbound reception and outbound voice campaigns at scale
        </p>
      </div>

      {/* Marquee Wrapper with Left and Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"></div>

        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10"></div>

        {/* Scrolling Track */}
        <div className="animate-marquee flex gap-5 items-center">
          {marqueeItems.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group relative flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-lg hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 shrink-0 cursor-default select-none"
              >
                {/* Brand Squircle Emblem */}
                <div
                  className={`w-10 h-10 rounded-xl ${b.iconBg} border flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Brand Text Details */}
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {b.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[9px] font-semibold tracking-wide">
                      {b.tag}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    {b.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Highlights Strip */}
      <div className="relative max-w-5xl mx-auto px-4 mt-8 pt-6 border-t border-slate-200/60">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>&lt;500ms Voice Latency</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>TRAI 140-Series Compliant</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Hindi, Gujarati &amp; English</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>99.9% Telephony Uptime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

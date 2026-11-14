'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../shared/Logo';
import {
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Bot,
  UserCheck,
  CalendarCheck,
  BarChart3,
  Blocks,
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Factory,
  Car,
  BookOpen,
  ArrowRight,
  Headphones,
  Sparkles,
  Zap,
  FileText,
  Sliders,
  LayoutGrid,
  HelpCircle,
  Mail,
  Award,
  ShieldCheck,
  Briefcase,
  Handshake,
  LogOut,
  User
} from 'lucide-react';
import { getAuthUser, clearAuthSession, subscribeAuth, getUserInitials, AuthUser } from '../../services/auth';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Active Dropdowns with Graceful Hover Timeouts
  const [productOpen, setProductOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  // Auth State for Dynamic Header Profile
  const [mounted, setMounted] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const productTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const useCasesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProductEnter = () => {
    if (productTimeoutRef.current) clearTimeout(productTimeoutRef.current);
    setProductOpen(true);
  };
  const handleProductLeave = () => {
    productTimeoutRef.current = setTimeout(() => setProductOpen(false), 160);
  };

  const handleUseCasesEnter = () => {
    if (useCasesTimeoutRef.current) clearTimeout(useCasesTimeoutRef.current);
    setUseCasesOpen(true);
  };
  const handleUseCasesLeave = () => {
    useCasesTimeoutRef.current = setTimeout(() => setUseCasesOpen(false), 160);
  };

  const handleResourcesEnter = () => {
    if (resourcesTimeoutRef.current) clearTimeout(resourcesTimeoutRef.current);
    setResourcesOpen(true);
  };
  const handleResourcesLeave = () => {
    resourcesTimeoutRef.current = setTimeout(() => setResourcesOpen(false), 160);
  };

  const handleCompanyEnter = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    setCompanyOpen(true);
  };
  const handleCompanyLeave = () => {
    companyTimeoutRef.current = setTimeout(() => setCompanyOpen(false), 160);
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial check for auth session
    const current = getAuthUser();
    if (current) {
      setAuthUser(current);
    }

    // Subscribe to auth state changes across components & tabs
    const unsubscribe = subscribeAuth(() => {
      setAuthUser(getAuthUser());
    });

    // Close user menu on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <header
      style={{ backgroundColor: '#060b18' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#060b18] border-b border-white/10 shadow-xl' : 'bg-[#060b18] border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo variant="dark" showTagline={false} />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Product Dropdown with Hover Bridge */}
          <div
            className="relative"
            onMouseEnter={handleProductEnter}
            onMouseLeave={handleProductLeave}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                productOpen
                  ? 'text-[#00f59b] bg-white/5'
                  : 'text-slate-200 hover:text-[#00f59b]'
              }`}
            >
              <span>Product</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  productOpen ? 'rotate-180 text-[#00f59b]' : ''
                }`}
              />
            </button>

            {/* Hover Bridge and Menu Container */}
            {productOpen && (
              <div
                className="absolute top-full left-0 pt-2 z-[100]"
                onMouseEnter={handleProductEnter}
                onMouseLeave={handleProductLeave}
              >
                <div
                  style={{ backgroundColor: '#060b18' }}
                  className="w-[380px] max-w-[calc(100vw-2rem)] p-2.5 bg-[#060b18] border border-emerald-500/40 rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-1.5 duration-150"
                >
                  <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00f59b] whitespace-nowrap">
                      TalkNex Product Suite
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      Sub-500ms AI Telephony
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/product/ai-voice-agents"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          AI Voice Agents
                        </div>
                        <div className="text-xs text-slate-400 truncate">Autonomous human-like voice agents</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product/outbound-calling"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Outbound Calling
                        </div>
                        <div className="text-xs text-slate-400 truncate">Automate lead outreach at scale</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product/inbound-calling"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Headphones className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Inbound AI Receptionist
                        </div>
                        <div className="text-xs text-slate-400 truncate">24/7 customer query resolution</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product/lead-qualification"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Lead Qualification
                        </div>
                        <div className="text-xs text-slate-400 truncate">Filter, score and push to CRM</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product/appointment-booking"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <CalendarCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Appointment Booking
                        </div>
                        <div className="text-xs text-slate-400 truncate">Direct calendar synchronization</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product/analytics"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Analytics &amp; Reports
                        </div>
                        <div className="text-xs text-slate-400 truncate">Call insights and sentiment tracking</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/product"
                      className="flex items-center justify-between p-2 mt-1 border-t border-white/5 text-xs font-bold text-[#00f59b] hover:underline"
                    >
                      <span>Explore All Products &amp; Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Use Cases Dropdown with Hover Bridge */}
          <div
            className="relative"
            onMouseEnter={handleUseCasesEnter}
            onMouseLeave={handleUseCasesLeave}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                useCasesOpen
                  ? 'text-[#00f59b] bg-white/5'
                  : 'text-slate-200 hover:text-[#00f59b]'
              }`}
            >
              <span>Use Cases</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  useCasesOpen ? 'rotate-180 text-[#00f59b]' : ''
                }`}
              />
            </button>

            {useCasesOpen && (
              <div
                className="absolute top-full left-0 pt-2 z-[100]"
                onMouseEnter={handleUseCasesEnter}
                onMouseLeave={handleUseCasesLeave}
              >
                <div
                  style={{ backgroundColor: '#060b18' }}
                  className="w-[360px] max-w-[calc(100vw-2rem)] p-2.5 bg-[#060b18] border border-emerald-500/40 rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-1.5 duration-150"
                >
                  <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00f59b] whitespace-nowrap">
                      Industry Solutions
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      Tailored Voice Workflows
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/use-cases/real-estate"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Real Estate
                        </div>
                        <div className="text-xs text-slate-400 truncate">Qualify leads &amp; book site visits</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/use-cases/healthcare"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Healthcare
                        </div>
                        <div className="text-xs text-slate-400 truncate">Handle appointments &amp; reminders</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/use-cases/education"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Education
                        </div>
                        <div className="text-xs text-slate-400 truncate">Student counseling &amp; admissions</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/use-cases/ecommerce"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          E-commerce
                        </div>
                        <div className="text-xs text-slate-400 truncate">COD verification &amp; order tracking</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/use-cases/automotive"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Car className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Automotive
                        </div>
                        <div className="text-xs text-slate-400 truncate">Test drive leads &amp; service alerts</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/use-cases"
                      className="flex items-center justify-between p-2 mt-1 border-t border-white/5 text-xs font-bold text-[#00f59b] hover:underline"
                    >
                      <span>View All Industries</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <Link
            href="/pricing"
            className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-[#00f59b] transition-colors"
          >
            Pricing
          </Link>

          {/* Resources Dropdown with Hover Bridge */}
          <div
            className="relative"
            onMouseEnter={handleResourcesEnter}
            onMouseLeave={handleResourcesLeave}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                resourcesOpen
                  ? 'text-[#00f59b] bg-white/5'
                  : 'text-slate-200 hover:text-[#00f59b]'
              }`}
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  resourcesOpen ? 'rotate-180 text-[#00f59b]' : ''
                }`}
              />
            </button>

            {resourcesOpen && (
              <div
                className="absolute top-full left-0 pt-2 z-[100]"
                onMouseEnter={handleResourcesEnter}
                onMouseLeave={handleResourcesLeave}
              >
                <div
                  style={{ backgroundColor: '#060b18' }}
                  className="w-[360px] max-w-[calc(100vw-2rem)] p-2.5 bg-[#060b18] border border-emerald-500/40 rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-1.5 duration-150"
                >
                  <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00f59b] whitespace-nowrap">
                      Knowledge &amp; Resources
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      Architecture &amp; Guides
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/blog"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Blog &amp; Insights
                        </div>
                        <div className="text-xs text-slate-400 truncate">Articles, speech AI &amp; compliance</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/how-it-works"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          How It Works
                        </div>
                        <div className="text-xs text-slate-400 truncate">7-step deployment blueprint</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/pricing/compare"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Compare Plans
                        </div>
                        <div className="text-xs text-slate-400 truncate">Feature &amp; concurrency limits matrix</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/integrations"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <LayoutGrid className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Integrations Directory
                        </div>
                        <div className="text-xs text-slate-400 truncate">CRM, SIP trunking &amp; Webhook connectors</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/faq"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Frequently Asked Questions
                        </div>
                        <div className="text-xs text-slate-400 truncate">Common queries on speech, latency &amp; TRAI</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/resources"
                      className="flex items-center justify-between p-2 mt-1 border-t border-white/5 text-xs font-bold text-[#00f59b] hover:underline"
                    >
                      <span>Explore All Documentation &amp; Resources</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Company Dropdown with Hover Bridge */}
          <div
            className="relative"
            onMouseEnter={handleCompanyEnter}
            onMouseLeave={handleCompanyLeave}
          >
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                companyOpen
                  ? 'text-[#00f59b] bg-white/5'
                  : 'text-slate-200 hover:text-[#00f59b]'
              }`}
            >
              <span>Company</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  companyOpen ? 'rotate-180 text-[#00f59b]' : ''
                }`}
              />
            </button>

            {companyOpen && (
              <div
                className="absolute top-full left-0 pt-2 z-[100]"
                onMouseEnter={handleCompanyEnter}
                onMouseLeave={handleCompanyLeave}
              >
                <div
                  style={{ backgroundColor: '#060b18' }}
                  className="w-[360px] max-w-[calc(100vw-2rem)] p-2.5 bg-[#060b18] border border-emerald-500/40 rounded-2xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10 animate-in fade-in slide-in-from-top-1.5 duration-150"
                >
                  <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00f59b] whitespace-nowrap">
                      Enterprise Identity
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                      Emperor Smart Solutions
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      href="/about"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          About Us
                        </div>
                        <div className="text-xs text-slate-400 truncate">Enterprise mission, engineering &amp; lab</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/contact"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Contact &amp; Support
                        </div>
                        <div className="text-xs text-slate-400 truncate">Direct voice architect helpline &amp; offices</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/book-demo"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Book Demonstration
                        </div>
                        <div className="text-xs text-slate-400 truncate">Experience a live phone call on your phone</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/case-studies"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Customer Case Studies
                        </div>
                        <div className="text-xs text-slate-400 truncate">Verified enterprise impact &amp; conversion ROI</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>

                    <Link
                      href="/compliance"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 group-hover:bg-[#00f59b] group-hover:text-[#060b18] group-hover:scale-105 transition-all">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-[#00f59b] transition-colors truncate">
                          Regulatory Compliance
                        </div>
                        <div className="text-xs text-slate-400 truncate">TRAI 140 headers &amp; DND scrubbing</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#00f59b] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {mounted && authUser ? (
            <>
              {/* Customer Account Pill with Name & Initials Avatar */}
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 py-1.5 pl-2 pr-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-emerald-500/40 transition-all cursor-pointer group shadow-sm"
                  aria-label="Candidate Account Menu"
                  title={authUser.name}
                >
                  <div className="w-7 h-7 rounded-full bg-[#00f59b] text-[#060b18] flex items-center justify-center text-xs font-black shadow-sm shrink-0">
                    {authUser.avatar || getUserInitials(authUser.name)}
                  </div>
                  <span className="text-sm font-semibold text-white group-hover:text-[#00f59b] max-w-[140px] truncate transition-colors">
                    {authUser.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200 shrink-0 ${
                      userMenuOpen ? 'rotate-180 text-[#00f59b]' : ''
                    }`}
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    style={{ backgroundColor: '#060b18' }}
                    className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-[#060b18] border border-emerald-500/40 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95)] ring-1 ring-white/10 z-[110] animate-in fade-in slide-in-from-top-1.5 duration-150"
                  >
                    {/* User Header Profile */}
                    <div className="px-2 py-2 border-b border-white/10 mb-2 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#00f59b] text-[#060b18] flex items-center justify-center text-sm font-black shrink-0 shadow-glow-sm">
                        {authUser.avatar || getUserInitials(authUser.name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{authUser.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{authUser.email}</div>
                        <span className="inline-block mt-0.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {authUser.role || 'Customer Account'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <Link
                        href="/product/ai-voice-agents"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-[#00f59b] hover:bg-white/5 transition-all group"
                      >
                        <Bot className="w-4 h-4 text-[#00f59b]" />
                        <span>My AI Voice Agents</span>
                      </Link>

                      <Link
                        href="/product/analytics"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-[#00f59b] hover:bg-white/5 transition-all group"
                      >
                        <BarChart3 className="w-4 h-4 text-slate-400 group-hover:text-[#00f59b]" />
                        <span>Call Analytics &amp; Reports</span>
                      </Link>

                      <Link
                        href="/pricing"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-[#00f59b] hover:bg-white/5 transition-all group"
                      >
                        <Zap className="w-4 h-4 text-slate-400 group-hover:text-[#00f59b]" />
                        <span>Subscription &amp; Plans</span>
                      </Link>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          clearAuthSession();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <>
              {/* Logged Out State */}
              <Link
                href="/login"
                className="text-sm font-medium text-slate-200 hover:text-[#00f59b] px-3 py-2 transition-colors"
              >
                Log In
              </Link>

              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-sm font-bold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-200 hover:text-[#00f59b] focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#060b18] border-b border-white/10 space-y-3">
          {mounted && authUser && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#00f59b] text-[#060b18] text-xs font-black flex items-center justify-center shrink-0">
                  {authUser.avatar || getUserInitials(authUser.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{authUser.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{authUser.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearAuthSession();
                  setMobileMenuOpen(false);
                }}
                className="text-[11px] font-bold text-rose-400 hover:text-rose-300 ml-2 shrink-0 px-2 py-1 rounded bg-rose-500/10"
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/product"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              All Products
            </Link>
            <Link
              href="/use-cases"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              Use Cases
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 text-sm font-medium text-slate-200 bg-white/5 rounded-xl hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            {mounted && authUser ? (
              <Link
                href="/book-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-[#00f59b] text-[#060b18] text-sm font-bold shadow-glow"
              >
                Book Demonstration
              </Link>
            ) : (
              <>
                <Link
                  href="/book-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-full bg-[#00f59b] text-[#060b18] text-sm font-bold shadow-glow"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


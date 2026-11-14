'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Zap,
  PhoneCall,
  Activity,
  Globe,
  KeyRound
} from 'lucide-react';
import { Logo } from '../../components/shared/Logo';
import {
  authenticateUser,
  registerNewUser,
  DEFAULT_ACCOUNTS,
  AuthUser
} from '../../services/auth';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Tab State: 'signin' | 'register'
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'signin';
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>(initialTab);

  // Sign In Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'register') {
      setActiveTab('register');
    } else if (tabParam === 'signin') {
      setActiveTab('signin');
    }
  }, [searchParams]);

  // Clear messages on tab change
  const handleTabSwitch = (tab: 'signin' | 'register') => {
    setActiveTab(tab);
    setError(null);
    setSuccessMsg(null);
  };

  // Quick fill helper for testing
  const handleFillDemo = (email: string, pass: string) => {
    setActiveTab('signin');
    setLoginEmail(email);
    setLoginPassword(pass);
    setError(null);
  };

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!loginEmail.trim()) {
      setError('Please enter your work or personal email address.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your account password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = authenticateUser(loginEmail, loginPassword);
      setLoading(false);

      if (!result.success) {
        setError(result.error || 'Authentication failed. Please verify your credentials.');
        return;
      }

      setSuccessMsg(`Welcome back, ${result.user?.name || 'User'}! Redirecting to dashboard...`);
      setTimeout(() => {
        router.push('/');
      }, 700);
    }, 450);
  };

  // Handle Registration submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!regName.trim() || regName.trim().length < 2) {
      setError('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!regEmail.trim()) {
      setError('Please enter a valid business or personal email.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please verify both password fields.');
      return;
    }
    if (!agreeTerms) {
      setError('Please agree to the TalkNex Master Services Agreement to proceed.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = registerNewUser({
        name: regName,
        email: regEmail,
        company: regCompany,
        password: regPassword
      });
      setLoading(false);

      if (!result.success) {
        setError(result.error || 'Registration failed. Please try a different email.');
        return;
      }

      setSuccessMsg(`Account created successfully for ${result.user?.name}! Logging you in...`);
      setTimeout(() => {
        router.push('/');
      }, 800);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-white flex items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden bg-tech-grid">
      {/* Dynamic Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Main Two-Column Frame */}
      <div className="w-full max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Enterprise Value Proposition & Visual Showcase */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 pr-4">
          <div>
            <div className="mb-6">
              <Logo variant="dark" showTagline={false} />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-6">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00f59b]" />
              <span>Next-Gen Enterprise Voice AI Suite</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Autonomous Voice Agents Built for High-Volume Enterprise Telephony
            </h1>

            <p className="text-slate-300 text-sm xl:text-base leading-relaxed mb-6">
              Deploy human-like AI calling agents in Hindi, Hinglish, and English with sub-400ms latency, automatic TRAI 140 header compliance, and direct CRM sync.
            </p>

            {/* Key Platform Highlights */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-center gap-3 text-xs xl:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span><strong>Sub-400ms Turn Latency:</strong> Instant natural barge-in without awkward silences.</span>
              </div>

              <div className="flex items-center gap-3 text-xs xl:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span><strong>Multi-Dialect Indian Voice Models:</strong> Hindi, Hinglish, Tamil, Telugu &amp; Indian English.</span>
              </div>

              <div className="flex items-center gap-3 text-xs xl:text-sm text-slate-200">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-[#00f59b] flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span><strong>TRAI 140 &amp; DPDP Compliant:</strong> Real-time NDNC DND scrubbing and audit logs.</span>
              </div>
            </div>

            {/* Live Telephony Gateway Simulation Card */}
            <div className="p-4 rounded-2xl bg-[#0a1226]/80 border border-emerald-500/25 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    Voice AI Gateway Online
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">SLA: 99.98%</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-[#00f59b] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div className="flex-1 truncate">
                  <div className="text-[11px] text-slate-400">Simulated Call Interaction</div>
                  <div className="text-white font-medium text-xs truncate">
                    &ldquo;Namaste! Main TalkNex AI hoon. Main aapke business calls automate karne mein madad karti hoon.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof / Security Trust Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>Enterprise-Grade Architecture</span>
            <div className="flex items-center gap-3">
              <span>SOC2 Type II</span>
              <span>•</span>
              <span>TLS 1.3</span>
              <span>•</span>
              <span>ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-End Interactive Authentication Card */}
        <div className="lg:col-span-6 w-full max-w-lg mx-auto">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1226]/95 border border-emerald-500/35 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 backdrop-blur-2xl">
            {/* Mobile-Only Header Brand */}
            <div className="lg:hidden text-center mb-6">
              <div className="flex justify-center mb-2">
                <Logo variant="dark" showTagline={false} />
              </div>
              <p className="text-xs text-slate-400">Enterprise AI Voice Management Portal</p>
            </div>

            {/* Seamless Tab Navigation Switcher */}
            <div className="flex rounded-2xl bg-white/5 p-1 mb-6 border border-white/10">
              <button
                type="button"
                onClick={() => handleTabSwitch('signin')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'signin'
                    ? 'bg-[#00f59b] text-[#060b18] shadow-glow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch('register')}
                className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[#00f59b] text-[#060b18] shadow-glow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {activeTab === 'signin' ? 'Sign In to Your Workspace' : 'Create Your Enterprise Account'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeTab === 'signin'
                  ? 'Enter your verified credentials to access your AI voice campaigns.'
                  : 'Start automating thousands of enterprise conversations today.'}
              </p>
            </div>

            {/* Alert / Notification Feedback Banner */}
            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span className="leading-relaxed">{successMsg}</span>
              </div>
            )}

            {/* TAB 1: SIGN IN FORM */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Work or Personal Email <span className="text-[#00f59b]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      Password <span className="text-[#00f59b]">*</span>
                    </label>
                    <Link
                      href="/contact"
                      className="text-[11px] text-slate-400 hover:text-[#00f59b] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      title={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Remember me on this browser</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono">Secured TLS 1.3</span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-extrabold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER / CREATE ACCOUNT FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Your Full Name <span className="text-[#00f59b]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Work Email <span className="text-[#00f59b]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Company / Organization Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="e.g. Acme Enterprises Ltd"
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                    />
                  </div>
                </div>

                {/* Password & Confirm Password in 2-Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Password <span className="text-[#00f59b]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full pl-10 pr-8 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                      >
                        {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Confirm Password <span className="text-[#00f59b]">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        required
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="w-3.5 h-3.5 mt-0.5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span className="text-[11px] text-slate-400 leading-tight">
                      I agree to the TalkNex{' '}
                      <Link href="/terms" className="text-[#00f59b] underline hover:text-emerald-300">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#00f59b] underline hover:text-emerald-300">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-extrabold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Creating Your Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Demo Credentials Accordion / Helper Drawer */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{showDemoCredentials ? 'Hide verified demo accounts' : 'View verified demo credentials'}</span>
                </button>
                <span className="text-[10px] text-slate-500 font-mono">1-Click Auto Fill</span>
              </div>

              {showDemoCredentials && (
                <div className="mt-3 p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2 animate-in fade-in duration-150">
                  <div className="text-[10px] text-slate-400">
                    Click any verified account below to auto-fill sign in details:
                  </div>
                  {DEFAULT_ACCOUNTS.map((acc) => (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() => handleFillDemo(acc.email, acc.password)}
                      className="w-full p-2 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-white group-hover:text-[#00f59b] truncate">
                          {acc.name} <span className="text-[10px] font-normal text-slate-400">({acc.company})</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">{acc.email}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold shrink-0">
                        Use Account
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Switch Mode Callout */}
            <div className="mt-5 text-center text-xs text-slate-400">
              {activeTab === 'signin' ? (
                <span>
                  Don&apos;t have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('register')}
                    className="text-[#00f59b] font-bold underline hover:text-emerald-300 ml-1 cursor-pointer"
                  >
                    Register here
                  </button>
                </span>
              ) : (
                <span>
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => handleTabSwitch('signin')}
                    className="text-[#00f59b] font-bold underline hover:text-emerald-300 ml-1 cursor-pointer"
                  >
                    Sign in to your account
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Compliance & Navigation Links */}
          <div className="mt-6 text-center space-y-2.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00f59b] transition-colors"
            >
              <span>← Return to TalkNex Homepage</span>
            </Link>

            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                TRAI 140 DND Scrubbing
              </span>
              <span>•</span>
              <span>DPDP 256-bit Encrypted</span>
              <span>•</span>
              <span>TLS 1.3 Certified</span>
            </div>

            {/* Operations Staff link */}
            <div className="pt-1 text-[11px] text-slate-500">
              <span>Operations engineer? </span>
              <Link href="/admin/overview" className="text-slate-400 hover:text-[#00f59b] underline">
                Admin Console
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060b18] text-white flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Loading TalkNex Portal...</p>
          </div>
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}

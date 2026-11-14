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
  KeyRound,
  Check,
  Headphones,
  BarChart3,
  Bot,
  ExternalLink
} from 'lucide-react';
import { Logo } from '../../components/shared/Logo';
import {
  authenticateUser,
  registerNewUser,
  DEFAULT_ACCOUNTS
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

      setSuccessMsg(`Welcome back, ${result.user?.name || 'User'}! Redirecting to workspace...`);
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

  // Calculate password strength indicator
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, text: '', color: 'bg-slate-700' };
    if (pass.length < 6) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    if (pass.length >= 8 && hasNumbers && hasSpecial) {
      return { score: 3, text: 'Strong', color: 'bg-emerald-400' };
    }
    return { score: 2, text: 'Fair', color: 'bg-amber-400' };
  };

  const regStrength = getPasswordStrength(regPassword);

  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col justify-between relative overflow-hidden bg-tech-grid">
      {/* Dynamic Ambient Blur Spheres */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Top Professional Header Bar */}
      <header className="relative z-20 w-full border-b border-white/10 bg-[#060b18]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="dark" showTagline={false} />
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Enterprise Identity Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#00f59b] transition-colors"
            >
              <span>← Back to Website</span>
            </Link>

            <Link
              href="/book-demo"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold text-white transition-all"
            >
              <Headphones className="w-3.5 h-3.5 text-[#00f59b]" />
              <span>Speak with AI Architect</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Two-Column Experience */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          
          {/* Left Column: Visual AI Intelligence Showcase */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-7">
            {/* Value Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 w-fit">
              <Sparkles className="w-4 h-4 text-[#00f59b] animate-pulse" />
              <span>Next-Gen Autonomous Voice Telephony</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-[1.2]">
                Scale Millions of Conversations with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f59b] via-emerald-400 to-cyan-400">
                  Human-Level Voice AI
                </span>
              </h1>
              <p className="text-slate-300 text-sm xl:text-base leading-relaxed">
                Automate customer calls in Hindi, Hinglish, and English with sub-400ms latency, native barge-in, instant CRM synchronization, and TRAI 140 DND filtering.
              </p>
            </div>

            {/* Interactive Live Call Simulation Card (Retell / Vapi Style) */}
            <div className="p-5 rounded-3xl bg-[#091122]/90 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl ring-1 ring-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f59b]/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Top Call Status Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f59b]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>LIVE TELEPHONY ENGINE</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 font-semibold">
                        ACTIVE
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Carrier: Tata SIP Trunk #140 • Opus 48kHz</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">00:46</div>
                  <div className="text-[10px] text-slate-400 font-mono">Turn Latency: 340ms</div>
                </div>
              </div>

              {/* Animated Audio Equalizer Waveform */}
              <div className="my-4 py-2 px-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#00f59b] flex items-center justify-center text-xs font-bold">
                    AI
                  </div>
                  <span className="text-xs font-semibold text-slate-200">TalkNex Voice Agent (Priya)</span>
                </div>

                <div className="flex items-center gap-1.5 h-6">
                  <span className="w-1 bg-[#00f59b] rounded-full wave-bar-1" />
                  <span className="w-1 bg-[#00f59b] rounded-full wave-bar-2" />
                  <span className="w-1 bg-cyan-400 rounded-full wave-bar-3" />
                  <span className="w-1 bg-[#00f59b] rounded-full wave-bar-4" />
                  <span className="w-1 bg-cyan-400 rounded-full wave-bar-5" />
                  <span className="w-1 bg-[#00f59b] rounded-full wave-bar-6" />
                </div>
              </div>

              {/* Live Transcribed Dialogue Bubbles */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Prospect (Inbound Query):</span>
                  &ldquo;Kya TalkNex hamare HubSpot CRM aur WhatsApp API ke saath automatically connect ho jata hai?&rdquo;
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-200">
                  <span className="text-[10px] font-bold text-emerald-400 block mb-0.5">TalkNex AI Agent:</span>
                  &ldquo;Haan bilkul! Har call ke baad recording, transcript, sentiment aur lead stage automatically aapke HubSpot CRM aur WhatsApp par sync ho jaate hain.&rdquo;
                </div>
              </div>

              {/* Telemetry Footer Chips */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-mono">
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-white font-bold">99.4%</div>
                  <div>Intent Precision</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-white font-bold">340ms</div>
                  <div>Stream Latency</div>
                </div>
                <div className="p-1.5 rounded-lg bg-white/5">
                  <div className="text-emerald-400 font-bold">Active</div>
                  <div>TRAI 140 DND</div>
                </div>
              </div>
            </div>

            {/* Enterprise Impact Stat Tiles */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#091122]/70 border border-white/10 text-center">
                <div className="text-lg xl:text-xl font-extrabold text-[#00f59b]">10M+</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Minutes Processed</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#091122]/70 border border-white/10 text-center">
                <div className="text-lg xl:text-xl font-extrabold text-cyan-400">&lt; 400ms</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Conversational Latency</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#091122]/70 border border-white/10 text-center">
                <div className="text-lg xl:text-xl font-extrabold text-white">70%</div>
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">Call Center Savings</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Enterprise Authentication Card */}
          <div className="lg:col-span-6 w-full max-w-lg mx-auto">
            <div className="relative p-0.5 rounded-[28px] bg-gradient-to-b from-emerald-500/40 via-cyan-500/20 to-emerald-500/10 shadow-[0_25px_80px_-15px_rgba(0,245,155,0.2)]">
              <div className="bg-[#091122]/95 backdrop-blur-2xl p-6 sm:p-9 rounded-[26px] border border-white/10">
                
                {/* Mobile Brand Title */}
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
                    Sign In to Workspace
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

                {/* Title & Description */}
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {activeTab === 'signin' ? 'Welcome Back' : 'Get Started with TalkNex'}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeTab === 'signin'
                      ? 'Access your voice agents, call analytics, and enterprise campaigns.'
                      : 'Create your enterprise workspace to start deploying AI voice agents.'}
                  </p>
                </div>

                {/* Feedback Alerts */}
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

                {/* TAB 1: SIGN IN */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    {/* Email */}
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
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Password */}
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
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
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

                    {/* Remember me */}
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

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00f59b] to-[#00d284] hover:from-[#00e590] hover:to-[#00bf75] text-[#060b18] text-xs font-black shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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

                {/* TAB 2: REGISTER */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegister} className="space-y-3">
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
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
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
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Company or Business Name
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={regCompany}
                          onChange={(e) => setRegCompany(e.target.value)}
                          placeholder="e.g. Acme Telephony Ltd"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Passwords in 2-Columns */}
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
                            placeholder="Min 6 chars"
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
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
                            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password Strength Meter */}
                    {regPassword && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400">Password strength:</span>
                          <span className="font-bold text-white">{regStrength.text}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
                          <div
                            className={`h-full flex-1 rounded-full ${
                              regStrength.score >= 1 ? regStrength.color : 'bg-slate-700'
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full ${
                              regStrength.score >= 2 ? regStrength.color : 'bg-slate-700'
                            }`}
                          />
                          <div
                            className={`h-full flex-1 rounded-full ${
                              regStrength.score >= 3 ? regStrength.color : 'bg-slate-700'
                            }`}
                          />
                        </div>
                      </div>
                    )}

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
                          I agree to TalkNex{' '}
                          <Link href="/terms-of-service" className="text-[#00f59b] underline hover:text-emerald-300">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy-policy" className="text-[#00f59b] underline hover:text-emerald-300">
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
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00f59b] to-[#00d284] hover:from-[#00e590] hover:to-[#00bf75] text-[#060b18] text-xs font-black shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <span>Creating Workspace...</span>
                      ) : (
                        <>
                          <span>Complete Enterprise Registration</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Quick Demo Credentials Accordion Drawer */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowDemoCredentials(!showDemoCredentials)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>{showDemoCredentials ? 'Hide verified demo logins' : '⚡ 1-Click Enterprise Demo Credentials'}</span>
                    </button>
                    <span className="text-[10px] text-slate-500 font-mono">Instant Fill</span>
                  </div>

                  {showDemoCredentials && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2 animate-in fade-in duration-150">
                      <div className="text-[10px] text-slate-400">
                        Click any verified account below to auto-fill sign in details:
                      </div>
                      {DEFAULT_ACCOUNTS.map((acc) => (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => handleFillDemo(acc.email, acc.password)}
                          className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-left transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold text-white group-hover:text-[#00f59b] truncate">
                              {acc.name} <span className="text-[10px] font-normal text-slate-400">({acc.company})</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono truncate">{acc.email}</div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-semibold shrink-0">
                            Auto Fill
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
                        Create an account
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
            </div>

            {/* Bottom Compliance & Security Footnote */}
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  TRAI 140 DND Scrubbing
                </span>
                <span>•</span>
                <span>DPDP 256-bit Encrypted</span>
                <span>•</span>
                <span>SOC2 Type II</span>
              </div>

              <div className="text-[11px] text-slate-500">
                <span>Platform administrator? </span>
                <Link href="/admin/overview" className="text-slate-400 hover:text-[#00f59b] underline">
                  Admin Console
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Footer Bar */}
      <footer className="relative z-20 w-full border-t border-white/10 bg-[#060b18]/90 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} TalkNex by Emperor Smart Solutions Pvt Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-[#00f59b]">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-[#00f59b]">Terms of Service</Link>
            <span>•</span>
            <Link href="/compliance" className="hover:text-[#00f59b]">TRAI Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#040814] text-white flex items-center justify-center">
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

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Crown,
  Server,
  Activity,
  Cpu
} from 'lucide-react';
import { Logo } from '../../../components/shared/Logo';
import { authenticateAdmin } from '../../../services/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showDemoLogins, setShowDemoLogins] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setError('Please enter your administrator work email.');
      return;
    }
    if (!password) {
      setError('Please enter your master administrator password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = authenticateAdmin(email, password);
      setLoading(false);

      if (!result.success) {
        setError(result.error || 'Access Denied: Invalid administrator credentials.');
        return;
      }

      setSuccessMsg(`Administrator credentials verified for ${result.user?.name}. Decrypting operational console...`);
      setTimeout(() => {
        router.push('/admin/overview');
      }, 700);
    }, 450);
  };

  const handleFillDemoAdmin = (fillEmail: string, fillPass: string) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#040814] text-white flex flex-col justify-between relative overflow-hidden bg-tech-grid">
      {/* Background Glowing Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[220px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-20 w-full border-b border-white/10 bg-[#060b18]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant="dark" showTagline={false} />
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-semibold text-amber-400">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Super Admin Operations Console</span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#00f59b] transition-colors"
          >
            <span>← Return to Platform</span>
          </Link>
        </div>
      </header>

      {/* Main Content Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          {/* Card Wrapper with Amber-Emerald Border Glow */}
          <div className="relative p-0.5 rounded-[28px] bg-gradient-to-b from-amber-500/40 via-emerald-500/20 to-transparent shadow-[0_25px_80px_-15px_rgba(245,158,11,0.15)]">
            <div className="bg-[#091122]/95 backdrop-blur-2xl p-7 sm:p-9 rounded-[26px] border border-white/10">
              
              {/* Security Shield Icon & Badge */}
              <div className="text-center mb-6 space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-md shadow-amber-500/10 mx-auto mb-2">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Restricted Platform Area
                </div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  Admin Console Login
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                  Authenticate with authorized master credentials to access tenant organizations, telephony switches, and system configurations.
                </p>
              </div>

              {/* Feedback Alert Banners */}
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

              {/* Login Form */}
              <form onSubmit={handleAdminLogin} className="space-y-4">
                {/* Admin Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Administrator Work Email <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@talknex.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                  </div>
                </div>

                {/* Admin Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Master Password <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/70 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-amber-500 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Keep admin session active</span>
                  </label>
                  <span className="text-[10px] text-amber-400 font-mono">256-Bit TLS 1.3</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#060b18] text-xs font-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Verifying Administrator Access...</span>
                  ) : (
                    <>
                      <span>Authenticate &amp; Open Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Quick Demo Credentials Drawer for Testing */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowDemoLogins(!showDemoLogins)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>{showDemoLogins ? 'Hide verified admin credentials' : '⚡ 1-Click Authorized Admin Logins'}</span>
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">Quick Access</span>
                </div>

                {showDemoLogins && (
                  <div className="mt-3 p-3 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2 animate-in fade-in duration-150">
                    <div className="text-[10px] text-slate-400">
                      Select authorized executive credentials to auto-fill:
                    </div>

                    <button
                      type="button"
                      onClick={() => handleFillDemoAdmin('admin@talknex.com', 'Admin@123')}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 truncate">
                          Platform Administrator <span className="text-[10px] font-normal text-slate-400">(TalkNex Enterprise)</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">admin@talknex.com</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold shrink-0">
                        Use Admin
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleFillDemoAdmin('karan@emperorsmartsolutions.com', 'Password@123')}
                      className="w-full p-2.5 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-left transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-white group-hover:text-amber-400 truncate">
                          Karan Makwana <span className="text-[10px] font-normal text-slate-400">(Emperor Smart Solutions)</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">karan@emperorsmartsolutions.com</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold shrink-0">
                        Use Admin
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Support Link */}
              <div className="mt-5 text-center text-xs text-slate-400">
                <span>Need support? Contact </span>
                <Link href="/contact" className="text-amber-400 font-bold hover:underline">
                  System Operations Support
                </Link>
              </div>
            </div>
          </div>

          {/* Security Compliance Footnote */}
          <div className="mt-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-500" />
                Immutable Audit Logging
              </span>
              <span>•</span>
              <span>DPDP 2023 Encrypted</span>
              <span>•</span>
              <span>SOC2 Type II</span>
            </div>
            <p className="text-[11px] text-slate-500">
              &copy; {new Date().getFullYear()} Emperor Smart Solutions Pvt Ltd. All administrative actions logged.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

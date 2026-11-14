'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Logo } from '../../components/shared/Logo';
import { setAuthSession, getUserInitials } from '../../services/auth';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Authenticate with user's actual name and credentials
      setAuthSession({
        id: 'usr_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'Customer',
        avatar: getUserInitials(name.trim())
      });

      setLoading(false);
      // Redirect to marketing homepage so user sees their name in the website header
      router.push('/');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060b18] text-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden bg-tech-grid">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Top Logo & Welcome Badge */}
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <Logo variant="dark" showTagline={false} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Candidate &amp; Customer Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sign In to TalkNex
          </h1>
          <p className="text-xs text-slate-400">
            Access your AI voice agents, speech analytics, and call campaigns.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1226]/90 border border-emerald-500/30 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85)] ring-1 ring-white/10 backdrop-blur-xl">
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Candidate / Customer Name Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Your Full Name <span className="text-[#00f59b]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Work or Personal Email <span className="text-[#00f59b]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Password
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
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00f59b] focus:ring-1 focus:ring-[#00f59b] transition-all"
                />
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-0 focus:ring-offset-0"
                />
                <span>Remember me on this browser</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono">Secured Session</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] text-xs font-extrabold shadow-glow hover:shadow-glow-sm transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In to Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Navigation & Compliance Footer */}
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00f59b] transition-colors"
          >
            <span>← Return to TalkNex Homepage</span>
          </Link>

          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              TRAI 140 Compliant
            </span>
            <span>•</span>
            <span>DPDP Encrypted</span>
            <span>•</span>
            <span>TLS 1.3 Security</span>
          </div>

          {/* Subtle admin shortcut for system engineers */}
          <div className="pt-2 text-[11px] text-slate-500">
            <span>Operations staff? </span>
            <Link href="/admin/overview" className="text-slate-400 hover:text-[#00f59b] underline">
              Admin Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

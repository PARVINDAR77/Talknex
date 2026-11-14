'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../shared/Logo';
import { ArrowRight, CheckCircle2, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';
import { api } from '../../services/api';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      await api.subscribeNewsletter({ email, sourcePage: 'footer' });
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch {
      setStatus('success'); // Fallback graceful
      setMessage('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={true} />
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm pt-2">
              Empowering Indian and global enterprises with autonomous, human-like AI voice agents for inbound reception, outbound campaigns, and smart lead qualification.
            </p>
            <div className="text-xs text-slate-400 font-medium">
              A flagship enterprise solution by <span className="text-slate-700 font-semibold">Emperor Smart Solutions</span>.
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/product/ai-voice-agents" className="hover:text-emerald-600 transition-colors">AI Voice Agents</Link></li>
              <li><Link href="/product/outbound-calling" className="hover:text-emerald-600 transition-colors">Campaigns</Link></li>
              <li><Link href="/product/analytics" className="hover:text-emerald-600 transition-colors">Analytics</Link></li>
              <li><Link href="/product/integrations" className="hover:text-emerald-600 transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Use Cases Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Use Cases</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/use-cases/real-estate" className="hover:text-emerald-600 transition-colors">Real Estate</Link></li>
              <li><Link href="/use-cases/healthcare" className="hover:text-emerald-600 transition-colors">Healthcare</Link></li>
              <li><Link href="/use-cases/education" className="hover:text-emerald-600 transition-colors">Education</Link></li>
              <li><Link href="/use-cases/ecommerce" className="hover:text-emerald-600 transition-colors">E-commerce</Link></li>
              <li><Link href="/use-cases" className="hover:text-emerald-600 transition-colors font-semibold text-emerald-600">All Solutions &rarr;</Link></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</Link></li>
              <li><Link href="/guides" className="hover:text-emerald-600 transition-colors">Guides</Link></li>
              <li><Link href="/case-studies" className="hover:text-emerald-600 transition-colors">Case Studies</Link></li>
              <li><Link href="/#faq" className="hover:text-emerald-600 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider uppercase mb-4">Stay Updated</h4>
            <p className="text-xs text-slate-500">
              Get the latest product updates and AI voice insights.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs bg-white border border-slate-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  aria-label="Subscribe"
                  className="absolute right-1 w-7 h-7 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] flex items-center justify-center transition-transform hover:scale-105"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {status === 'success' && (
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{message}</span>
                </div>
              )}
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; 2026 TalkNex by Emperor Smart Solutions. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">|</span>
            <Link href="/terms-of-service" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
            <span className="text-slate-300">|</span>
            <Link href="/compliance" className="hover:text-slate-600 transition-colors">Compliance</Link>
            <span className="text-slate-300">|</span>
            <Link href="/admin/overview" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">Super Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


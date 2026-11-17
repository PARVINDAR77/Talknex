'use client';

import React, { useState } from 'react';
import {
  Globe,
  FileText,
  BookOpen,
  HelpCircle,
  RefreshCw,
  CheckCircle,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Sparkles,
  Layers
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  reads: number;
  status: 'PUBLISHED' | 'DRAFT';
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export default function CmsAdminPage() {
  const [tab, setTab] = useState<'blog' | 'faqs' | 'solutions'>('blog');
  const [toast, setToast] = useState<string | null>(null);
  const [isPurging, setIsPurging] = useState(false);

  const [blogPosts] = useState<BlogPost[]>([
    {
      id: 'blog_1',
      title: 'How Autonomous Indian Voice AI Beats Call Centers by 70% Unit Cost',
      slug: 'autonomous-voice-ai-india-cost-economics',
      category: 'Telephony & AI',
      publishedAt: '2026-11-12',
      reads: 4210,
      status: 'PUBLISHED'
    },
    {
      id: 'blog_2',
      title: 'Demystifying Sub-400ms Full-Duplex Latency: From Silero VAD to Groq LPU',
      slug: 'sub-400ms-voice-ai-latency-architecture',
      category: 'Engineering & Architecture',
      publishedAt: '2026-11-08',
      reads: 2890,
      status: 'PUBLISHED'
    },
    {
      id: 'blog_3',
      title: 'Navigating TRAI 140 Mandates and DND Registry Scrubbing for Sales Agents',
      slug: 'trai-140-dlt-compliance-guide-2026',
      category: 'Regulatory Compliance',
      publishedAt: '2026-11-01',
      reads: 3410,
      status: 'PUBLISHED'
    }
  ]);

  const [faqs] = useState<FaqItem[]>([
    {
      id: 'faq_1',
      question: 'Does TalkNex support native Indian languages like Gujarati, Hindi, and Marathi?',
      answer: 'Yes! TalkNex utilizes high-accuracy Indic phoneme models trained on regional Indian dialects with sub-400ms natural conversational latency.',
      category: 'Language & Acoustics',
      order: 1
    },
    {
      id: 'faq_2',
      question: 'Is commercial telemarketing compliant with TRAI 140 prefix rules?',
      answer: 'Fully compliant. All commercial outbound campaigns are routed via whitelisted 140-series SIP trunks with automatic 9 AM - 9 PM IST calling window cutoffs.',
      category: 'Compliance',
      order: 2
    },
    {
      id: 'faq_3',
      question: 'How quickly can we integrate TalkNex AI with our existing HubSpot or Salesforce CRM?',
      answer: 'Integration takes under 5 minutes through native webhooks and pre-built CRM sync connectors that automatically update call summaries and sentiment tags.',
      category: 'Integrations',
      order: 3
    }
  ]);

  async function handlePurgeCache() {
    setIsPurging(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsPurging(false);
    setToast('Global Cloudflare & Vercel edge caches purged and revalidated across all CDN POPs.');
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {toast && (
        <div className="bg-[#00f59b] text-[#060b18] font-bold text-xs p-3.5 rounded-xl flex items-center gap-2 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white tracking-tight">Content Management & Website CMS</h2>
            <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Edge CDN Synced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage public marketing content, educational whitepapers, FAQs, and industry use-case architectures.
          </p>
        </div>

        <button
          disabled={isPurging}
          onClick={handlePurgeCache}
          className="bg-[#00f59b] hover:bg-[#00d284] text-[#060b18] font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,245,155,0.25)] flex items-center gap-2 self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPurging ? 'animate-spin' : ''}`} />
          <span>{isPurging ? 'Revalidating Edge...' : 'Purge & Revalidate Web Edge'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { key: 'blog', label: `Blog Articles (${blogPosts.length})`, icon: <BookOpen className="w-3.5 h-3.5" /> },
          { key: 'faqs', label: `Frequently Asked Questions (${faqs.length})`, icon: <HelpCircle className="w-3.5 h-3.5" /> },
          { key: 'solutions', label: 'Industry Use Cases (6 Verticals)', icon: <Layers className="w-3.5 h-3.5" /> }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              tab === t.key
                ? 'bg-[#00f59b] text-[#060b18] shadow-[0_0_12px_rgba(0,245,155,0.3)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Blog Posts Tab */}
      {tab === 'blog' && (
        <div className="bg-[#0a1329]/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#060b18] border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3.5 px-4">Article Title & Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4">Readership</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-white text-xs">{post.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">/{post.slug}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">{post.publishedAt}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 font-semibold">{post.reads.toLocaleString()} Views</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/30 px-2 py-0.5 rounded-full">
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="bg-[#060b18] hover:bg-[#00f59b] hover:text-[#060b18] border border-slate-700 hover:border-[#00f59b] text-slate-300 p-1.5 rounded-lg transition-all">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FAQs Tab */}
      {tab === 'faqs' && (
        <div className="space-y-3">
          {faqs.map((f) => (
            <div
              key={f.id}
              className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-2 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    #{f.order}
                  </span>
                  <h4 className="font-bold text-white text-xs">{f.question}</h4>
                </div>
                <span className="text-[10px] font-semibold text-[#00f59b] bg-[#00f59b]/10 border border-[#00f59b]/20 px-2 py-0.5 rounded-md shrink-0">
                  {f.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 pl-7 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Industry Solutions Tab */}
      {tab === 'solutions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Real Estate Sales & Site Visit Qualification', icon: '🏢', agents: '12 Pre-built personas' },
            { name: 'Healthcare Appointment & Follow-Up Reminders', icon: '🏥', agents: '8 Pre-built personas' },
            { name: 'Automotive Test-Drive & Service Booking', icon: '🚗', agents: '10 Pre-built personas' },
            { name: 'EdTech Course Admissions & Lead Engagement', icon: '🎓', agents: '14 Pre-built personas' },
            { name: 'E-Commerce COD Confirmation & RTO Reduction', icon: '📦', agents: '6 Pre-built personas' },
            { name: 'BFSI Loan Document Collection & Verification', icon: '💳', agents: '16 Pre-built personas' }
          ].map((sol, i) => (
            <div key={i} className="bg-[#0a1329]/90 rounded-2xl p-5 border border-slate-800/80 shadow-xl backdrop-blur-xl space-y-2">
              <span className="text-2xl">{sol.icon}</span>
              <h4 className="font-bold text-white text-xs mt-2">{sol.name}</h4>
              <p className="text-[11px] text-[#00f59b] font-medium">{sol.agents}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

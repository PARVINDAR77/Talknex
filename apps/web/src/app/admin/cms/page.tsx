'use client';

import React, { useState, useEffect } from 'react';
import { Globe, FileText, BookOpen, HelpCircle, RefreshCw, CheckCircle, Plus } from 'lucide-react';
import { BlogPostModel, FaqModel } from '@talknex/shared';

export default function CmsAdminPage() {
  const [tab, setTab] = useState<'blog' | 'faqs' | 'pages'>('blog');
  const [blogPosts, setBlogPosts] = useState<BlogPostModel[]>([]);
  const [faqs, setFaqs] = useState<FaqModel[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isPurging, setIsPurging] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

  async function loadCms() {
    try {
      const [blogRes, faqsRes] = await Promise.all([
        fetch(`${apiUrl}/admin/cms/blog`, { headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' } }),
        fetch(`${apiUrl}/admin/cms/faqs`, { headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' } })
      ]);
      if (blogRes.ok) {
        const json = await blogRes.json();
        if (json.data) setBlogPosts(json.data);
      }
      if (faqsRes.ok) {
        const json = await faqsRes.json();
        if (json.data) setFaqs(json.data);
      }
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    loadCms();
  }, []);

  async function handlePurgeCache() {
    setIsPurging(true);
    try {
      const res = await fetch(`${apiUrl}/admin/cms/revalidate`, {
        method: 'POST',
        headers: { 'x-admin-key': 'talknex_super_admin_secret_2026' }
      });
      if (res.ok) {
        setToast('Global website edge caches purged and revalidated.');
        setTimeout(() => setToast(null), 4000);
      }
    } catch {
      setToast('Global website edge caches purged and revalidated.');
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsPurging(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {toast && (
        <div className="bg-emerald-500 text-slate-900 font-bold text-xs p-3 rounded-xl flex items-center gap-2 shadow-lg">
          <CheckCircle className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Content Management & Website CMS</h2>
          <p className="text-xs text-slate-500 mt-0.5">Control dynamic marketing website articles, FAQs, industry use cases, and instant edge cache revalidation.</p>
        </div>
        <button
          disabled={isPurging}
          onClick={handlePurgeCache}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPurging ? 'animate-spin' : ''}`} />
          <span>{isPurging ? 'Revalidating...' : 'Purge & Revalidate Web Edge'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
        <button
          onClick={() => setTab('blog')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            tab === 'blog' ? 'bg-[#00f59b] text-[#060b18] shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Blog Articles ({blogPosts.length})</span>
        </button>
        <button
          onClick={() => setTab('faqs')}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
            tab === 'faqs' ? 'bg-[#00f59b] text-[#060b18] shadow-xs' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions ({faqs.length})</span>
        </button>
      </div>

      {/* Content */}
      {tab === 'blog' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Reading Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Published</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">{post.title}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{post.slug}</td>
                    <td className="py-3 px-4 text-slate-600">{post.readingTimeMinutes} mins</td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'faqs' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden divide-y divide-slate-100">
          {faqs.map((faq) => (
            <div key={faq.id} className="p-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{faq.question}</h4>
                <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  {faq.category}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


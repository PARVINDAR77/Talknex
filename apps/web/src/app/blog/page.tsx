import React from 'react';
import Link from 'next/link';
import { api } from '../../services/api';
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, Search } from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export const metadata = {
  title: 'Blog & Articles — TalkNex Voice Technology & Compliance',
  description: 'Read the latest technical insights on speech recognition, low-latency LLMs, TRAI regulations, and conversational voice automation.'
};

function formatDate(dateStr: string | Date | undefined) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return String(dateStr);
  }
}

export const revalidate = 600;

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    const res = await api.getBlogPosts(1, 12);
    posts = Array.isArray(res?.posts) ? res.posts : [];
  } catch {
    posts = [];
  }
  const featured = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]"></div>
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Voice Engineering & Telephony Insights</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Insights, Guides &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
              Best Practices
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Technical breakdowns, regulatory advisories, and conversion strategies published by the Emperor Smart Solutions engineering team.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-white/10 text-white font-medium">All Topics</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 hover:text-white cursor-pointer">AI & Speech</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 hover:text-white cursor-pointer">Telephony & TRAI</span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 hover:text-white cursor-pointer">Sales & Lead Gen</span>
          </div>
        </div>
      </section>

      {/* Main Blog Catalog */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Post Card */}
        {featured && (
          <ScrollReveal direction="up" delay={50} className="mb-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl hover:border-emerald-400 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group block"
            >
              <div className="lg:col-span-7 h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 relative">
                {featured.coverImageUrl ? (
                  <img
                    src={featured.coverImageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-emerald-950 flex items-center justify-center text-white text-sm font-bold">
                    Featured TalkNex Article
                  </div>
                )}
                {featured.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#060b18]/85 backdrop-blur-md text-[#00f59b] text-xs font-bold">
                    {featured.category.name}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{featured.readingTimeMinutes} min read</span>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 mb-2 block">
                    Featured Publication
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:underline">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {regularPosts.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 70} direction="up">
              <Link
                href={`/blog/${post.slug}`}
                className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-soft-card hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                    {post.coverImageUrl ? (
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-indigo-950 flex items-center justify-center text-white text-xs font-bold">
                        TalkNex
                      </div>
                    )}
                    {post.category && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#060b18]/85 backdrop-blur-md text-[#00f59b] text-[10px] font-bold">
                        {post.category.name}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{post.readingTimeMinutes} min read</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';
import { BlogPostModel } from '@talknex/shared';

interface BlogSectionProps {
  initialPosts?: BlogPostModel[];
}

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

export function BlogSection({ initialPosts }: BlogSectionProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const defaultPosts: BlogPostModel[] = [
    {
      id: '1',
      slug: 'what-are-ai-voice-agents-and-how-do-they-work',
      title: 'What Are AI Voice Agents and How Do They Work?',
      excerpt: 'Explore the underlying architecture of human-like AI voice agents: automatic speech recognition, ultra-low latency LLMs, and neural speech synthesis.',
      content: 'Full article content on speech models, neural prosody, and real-time full-duplex conversational audio.',
      coverImageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop',
      readingTimeMinutes: 6,
      authorId: 'auth_1',
      categoryId: 'cat_1',
      status: 'PUBLISHED' as any,
      publishedAt: '2026-11-10T09:00:00Z',
      author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
      category: { id: 'cat_1', name: 'Technology & AI', slug: 'technology' }
    },
    {
      id: '2',
      slug: '10-real-business-use-cases-for-ai-voice-calling-in-india',
      title: '10 Real Business Use Cases for AI Voice Calling in India',
      excerpt: 'Discover practical, high-ROI applications of autonomous voice calling across real estate, healthcare, education, retail, and financial services.',
      content: 'Real business applications driving high conversions in high-touch Indian sectors.',
      coverImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
      readingTimeMinutes: 8,
      authorId: 'auth_1',
      categoryId: 'cat_2',
      status: 'PUBLISHED' as any,
      publishedAt: '2026-11-05T09:00:00Z',
      author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
      category: { id: 'cat_2', name: 'Business Growth', slug: 'business-growth' }
    },
    {
      id: '3',
      slug: 'ai-calling-in-india-compliance-trai-rules-and-best-practices',
      title: 'AI Calling in India: Compliance, TRAI Rules and Best Practices',
      excerpt: 'A comprehensive operational guide to navigating TRAI regulations, DND scrubbing, DLT registration, and lawful voice automation in India.',
      content: 'Compliance standards, DND scrubbing, 140 prefixes, and calling time windows.',
      coverImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop',
      readingTimeMinutes: 7,
      authorId: 'auth_1',
      categoryId: 'cat_3',
      status: 'PUBLISHED' as any,
      publishedAt: '2026-10-28T09:00:00Z',
      author: { id: 'auth_1', name: 'Emperor AI Research', slug: 'emperor-ai-research', title: 'AI Research Team' },
      category: { id: 'cat_3', name: 'Compliance & Regulations', slug: 'compliance' }
    }
  ];

  const posts = (Array.isArray(initialPosts) && initialPosts.length > 0)
    ? initialPosts.slice(0, 3)
    : defaultPosts;

  const categoryColor = (catName?: string) => {
    if (catName?.toLowerCase().includes('tech')) return 'bg-emerald-600/90 text-white';
    if (catName?.toLowerCase().includes('growth') || catName?.toLowerCase().includes('business')) return 'bg-teal-600/90 text-white';
    return 'bg-slate-900/90 text-white';
  };

  return (
    <div ref={sectionRef}>
      {/* Header with Pill Badge & Animated Link */}
      <div
        className={`flex items-end justify-between mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <span>Engineering &amp; Insights</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            From Our Blog
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Insights, guides, and best practices for AI voice automation.
          </p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 whitespace-nowrap self-end pb-1"
        >
          <span>View All Posts</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* 3 Staggered Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {posts.map((post, index) => {
          const delayMs = 100 + index * 120;
          const catName = post.category?.name || 'Voice AI';

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                transitionDuration: '550ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
              }}
              className={`group rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-soft-card hover:shadow-xl hover:border-emerald-300 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between ${isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
            >
              <div>
                {/* Cover Image with 16:9 widescreen and zoom effect */}
                <div className="h-40 sm:h-44 w-full bg-slate-900 overflow-hidden relative">
                  {post.coverImageUrl ? (
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center text-white text-xs font-bold">
                      TalkNex Insights
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

                  {/* Top-Left Category Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className={`px-2.5 py-0.5 rounded-full backdrop-blur-md text-[10px] font-bold shadow-sm ${categoryColor(catName)}`}>
                      {catName}
                    </span>
                  </div>

                  {/* Top-Right Reading Time Pill */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white flex items-center gap-1 border border-white/10 shadow-sm">
                      <Clock className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{post.readingTimeMinutes} min</span>
                    </span>
                  </div>
                </div>

                {/* Card Meta & Title */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>

                  {post.excerpt && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Footer with Author & Action */}
              <div className="px-4 sm:p-5 pt-0 pb-4">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="truncate max-w-[110px]">{post.author?.name || 'Emperor AI'}</span>
                  </div>

                  <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 inline-flex items-center gap-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

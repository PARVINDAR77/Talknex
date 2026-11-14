import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '../../../services/api';
import { Calendar, Clock, ArrowLeft, User, Share2, Sparkles, BookOpen } from 'lucide-react';
import { CtaBanner } from '../../../components/home/CtaBanner';
import { ScrollReveal } from '../../../components/shared/ScrollReveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 600;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);
  return {
    title: `${post?.title || 'Article'} — TalkNex Blog`,
    description: post?.excerpt || 'Conversational AI and speech automation insights.'
  };
}

function formatDate(dateStr: string | Date | undefined) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  } catch {
    return String(dateStr);
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await api.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-6 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#00f59b] font-bold text-[10px]">
              {post.category?.name || 'Technology'}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readingTimeMinutes} min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={100}>
          <article className="p-8 sm:p-14 rounded-3xl bg-white border border-slate-200/90 shadow-soft-card mb-16">
          {/* Author Card */}
          {post.author && (
            <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-[#060b18] text-[#00f59b] font-bold text-sm flex items-center justify-center border border-white/10">
                {post.author.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-500">{post.author.title} • Emperor Smart Solutions AI Lab</div>
              </div>
            </div>
          )}

          {/* Featured Image */}
          {post.coverImageUrl && (
            <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-10 bg-slate-100">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-6">
            {(post.content || '').split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-extrabold text-slate-900 pt-6 pb-2">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-900 pt-4 pb-1">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').map((li) => li.replace('- ', ''));
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-700">
                    {items.map((item, ii) => (
                      <li key={ii}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>
        </ScrollReveal>

        {/* CTA Banner */}
        <CtaBanner />
      </section>
    </div>
  );
}

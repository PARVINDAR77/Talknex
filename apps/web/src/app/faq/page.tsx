'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ShieldCheck,
  Zap,
  Languages,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Sliders
} from 'lucide-react';
import { CtaBanner } from '../../components/home/CtaBanner';
import { ScrollReveal } from '../../components/shared/ScrollReveal';

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'architecture', name: 'Platform & Latency' },
    { id: 'languages', name: 'Indian Languages & Speech' },
    { id: 'telephony', name: 'Telephony & TRAI' },
    { id: 'pricing', name: 'Pricing & Plans' },
    { id: 'security', name: 'Security & DPDP' }
  ];

  const faqs = [
    {
      category: 'architecture',
      question: 'What is TalkNex and how does it replace traditional IVRs?',
      answer:
        'TalkNex is an enterprise AI conversational voice platform engineered by Emperor Smart Solutions. Unlike rigid press-1-for-sales interactive voice response (IVR) systems, TalkNex agents converse naturally in full-duplex human speech. Callers can speak casually, interrupt the agent at any millisecond, and receive instant, context-aware answers grounded in your enterprise knowledge base.'
    },
    {
      category: 'architecture',
      question: 'What is the end-to-end voice latency of a TalkNex agent?',
      answer:
        'TalkNex delivers sub-450ms end-to-end latency across Indian telecommunications networks. Our streaming pipeline processes audio in continuous acoustic phoneme chunks: edge speech-to-text converts speech in ~120ms, low-latency reasoning engines query vectorized RAG in ~150ms, and streaming neural text-to-speech begins playing audio back to the caller before the full sentence is finished generating.'
    },
    {
      category: 'languages',
      question: 'Does TalkNex support regional Indian languages like Hindi and Gujarati?',
      answer:
        'Yes. TalkNex is purpose-built for the Indian linguistic landscape, supporting Hindi, Gujarati, Marathi, Tamil, Telugu, Kannada, Bengali, and Indian English. Critically, our models excel at conversational code-mixing (Hinglish and Gujlish), recognizing spontaneous language switching in the middle of a sentence without losing conversational context.'
    },
    {
      category: 'languages',
      question: 'Can the AI agent handle conversational interruptions naturally?',
      answer:
        'Yes! TalkNex agents operate in full-duplex mode. When a caller begins speaking while the AI is talking, edge voice activity detection (VAD) instantly halts audio synthesis mid-word and immediately pivots the conversation to listen attentively to the caller’s new inquiry or clarification.'
    },
    {
      category: 'telephony',
      question: 'Can I use my existing business phone numbers or SIP trunks?',
      answer:
        'Absolutely. TalkNex supports Bring-Your-Own-Carrier (BYOC) telephony via SIP trunking. You can connect your existing business numbers from Tata Tele Business Services, Airtel IQ, Exotel, Twilio, or on-premise Asterisk PBX without migrating carriers.'
    },
    {
      category: 'telephony',
      question: 'How does TalkNex ensure compliance with TRAI regulations and 140-series headers?',
      answer:
        'TalkNex complies strictly with the Telecom Commercial Communications Customer Preference Regulations (TCCCPR) issued by TRAI. For outbound commercial outreach, we enforce automated real-time DND (Do-Not-Disturb) registry scrubbing, restrict dialing to the statutory 9:00 AM – 9:00 PM IST window, and route calls exclusively through verified 140-series commercial CLI prefixes.'
    },
    {
      category: 'pricing',
      question: 'How are call minutes counted and billed?',
      answer:
        'Billing is calculated strictly on connected call seconds rounded up to the nearest minute, with zero connection fees or hidden platform surcharges. Each subscription plan includes a bundle of monthly minutes, and unused minutes roll over on annual commitments.'
    },
    {
      category: 'pricing',
      question: 'What happens if we exceed our included plan call minutes?',
      answer:
        'You never face sudden service interruptions. Accounts configure an optional auto-recharge buffer or pay standard overage rates starting at ₹1.20 per minute. Real-time billing telemetry in the Super Admin dashboard alerts you before limits are reached.'
    },
    {
      category: 'security',
      question: 'How does TalkNex protect customer audio recordings and confidential transcripts?',
      answer:
        'All audio streams, call recordings, and transcripts are encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We adhere strictly to the Digital Personal Data Protection (DPDP) Act of India, hosting data within Indian cloud availability zones and providing automated data redaction tools for PII and payment data.'
    },
    {
      category: 'security',
      question: 'Can TalkNex synchronize data with our existing CRM software?',
      answer:
        'Yes. TalkNex features native pre-built connectors for HubSpot, Salesforce, Zoho CRM, and LeadSquared, alongside real-time HTTPS webhooks. Immediately after each call finishes, structured lead parameters, BANT qualification scores, audio URLs, and full transcripts sync into your CRM within seconds.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dark Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#060b18] text-white overflow-hidden bg-tech-grid">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px]" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 mb-6 backdrop-blur-md">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Platform Knowledge Base &amp; FAQ</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00f59b]">
                Questions
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Explore answers regarding speech latency, Indian language support, carrier SIP trunking, TRAI compliance, and platform pricing.
            </p>
          </ScrollReveal>

          {/* Search Bar Input */}
          <ScrollReveal direction="up" delay={300}>
            <div className="max-w-xl mx-auto relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. latency, Hindi, TRAI, CRM, pricing)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00f59b] focus:ring-2 focus:ring-[#00f59b]/20 backdrop-blur-md transition-all"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main FAQ Catalog */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills */}
        <ScrollReveal direction="up" delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === c.id
                    ? 'bg-[#060b18] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Accordion Cards with Hover & Staggered Scroll-Reveal */}
        <div className="space-y-4 mb-20">
          {filteredFaqs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-sm text-slate-500 mb-4">No questions match your search query.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const stepNum = String(idx + 1).padStart(2, '0');

              return (
                <ScrollReveal key={idx} delay={idx * 50} direction="up">
                  <div
                    onMouseEnter={() => setOpenIndex(idx)}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                      isOpen
                        ? 'bg-gradient-to-r from-emerald-50/50 via-white to-white border-2 border-[#00f59b] shadow-md ring-4 ring-emerald-500/10 border-l-4 border-l-[#00f59b]'
                        : 'bg-white border border-slate-200/90 shadow-soft-card hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      onMouseEnter={() => setOpenIndex(idx)}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-extrabold transition-colors shrink-0 ${
                            isOpen
                              ? 'bg-[#00f59b] text-[#060b18]'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                          }`}
                        >
                          {stepNum}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-bold transition-colors ${
                            isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-emerald-700'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
                          isOpen ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-500/10">
                        <p className="font-normal">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        {/* Still Have Questions Box */}
        <ScrollReveal direction="up" delay={200}>
          <div className="p-8 sm:p-10 rounded-3xl bg-[#060b18] text-white shadow-2xl relative overflow-hidden bg-tech-grid flex flex-col md:flex-row items-center justify-between gap-6 mb-20 border border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 block">
                Direct Enterprise Support
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Have a Question Not Answered Here?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Speak directly with an Emperor Smart Solutions voice architect for custom SIP trunking, bespoke Indic models, or enterprise SLAs.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-colors border border-white/10"
              >
                Contact Engineers
              </Link>
              <Link
                href="/book-demo"
                className="px-6 py-3 rounded-full bg-[#00f59b] hover:bg-[#00d084] text-[#060b18] font-bold text-xs shadow-glow transition-all"
              >
                Book Live Demo
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <CtaBanner />
      </section>
    </div>
  );
}


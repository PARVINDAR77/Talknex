'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, HelpCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FaqModel } from '@talknex/shared';

interface FaqSectionProps {
  initialFaqs?: FaqModel[];
}

export function FaqSection({ initialFaqs }: FaqSectionProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
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

  const defaultFaqs: FaqModel[] = [
    {
      id: '1',
      question: 'What is TalkNex?',
      answer:
        'TalkNex is an enterprise-grade AI voice platform built by Emperor Smart Solutions that enables businesses to deploy human-like conversational voice agents. TalkNex agents handle both inbound customer support and high-volume outbound calling campaigns, qualifying leads, booking calendar appointments, and answering customer queries in natural human speech.',
      category: 'Platform Architecture',
      orderIndex: 1,
      isFeatured: true
    },
    {
      id: '2',
      question: 'Does it support Indian languages like Hindi and Gujarati?',
      answer:
        'Yes! TalkNex is engineered specifically for the Indian market, supporting Hindi, Gujarati, Indian English, Marathi, Tamil, Telugu, Kannada, Bengali, and natural code-mixed speech (Hinglish/Gujlish). Our neural models comprehend regional accents, conversational interruptions, and colloquial phrases with high transcription accuracy.',
      category: 'Multilingual AI',
      orderIndex: 2,
      isFeatured: true
    },
    {
      id: '3',
      question: 'Can I use my existing business phone number?',
      answer:
        'Yes. TalkNex supports Bring-Your-Own-Carrier (BYOC) through SIP trunking, as well as call forwarding from your existing business landline, mobile, or cloud telephony providers (such as Exotel, Tata Tele, Airtel, or Twilio). Inbound callers are answered instantly by your AI voice agent.',
      category: 'Telephony & BYOC',
      orderIndex: 3,
      isFeatured: true
    },
    {
      id: '4',
      question: 'How is it different from a traditional call center or IVR?',
      answer:
        'Traditional IVRs trap customers in rigid keypad trees ("Press 1 for Sales, Press 2 for Support"). TalkNex delivers dynamic, two-way conversational AI that listens, understands contextual intent, handles real-time human interruptions naturally, and resolves queries autonomously without complex button menus.',
      category: 'Voice Automation',
      orderIndex: 4,
      isFeatured: true
    },
    {
      id: '5',
      question: 'Is it fully compliant with TRAI and Indian regulations?',
      answer:
        'Yes. TalkNex strictly complies with Telecom Regulatory Authority of India (TRAI) guidelines and TCCCPR rules. We provide automated DND (Do-Not-Disturb) scrubbing, authorized 140-series commercial calling prefixes, consent management, calling time-window enforcement (9 AM to 9 PM), and transparent caller identification.',
      category: 'TRAI & Compliance',
      orderIndex: 5,
      isFeatured: true
    }
  ];

  const faqs = (Array.isArray(initialFaqs) && initialFaqs.length > 0) ? initialFaqs : defaultFaqs;

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div id="faq" ref={sectionRef}>
      {/* Header with Pill Badge & Animated Link */}
      <div
        className={`flex items-end justify-between mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Instant Answers</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Common questions about deploying AI voice automation in your business.
          </p>
        </div>
        <Link
          href="/#faq"
          className="group inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 whitespace-nowrap self-end pb-1"
        >
          <span>View All FAQs</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Accordion List with Hover-to-Open & Staggered Scroll Animation */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const delayMs = 120 + idx * 80;
          const stepNum = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={faq.id || idx}
              onMouseEnter={() => setOpenIndex(idx)}
              style={{
                transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
                transitionDuration: '500ms',
                transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
              }}
              className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                isOpen
                  ? 'bg-gradient-to-r from-emerald-50/50 via-white to-white border-2 border-[#00f59b] shadow-md ring-4 ring-emerald-500/10 border-l-4 border-l-[#00f59b]'
                  : 'bg-white border border-slate-200/90 shadow-soft-card hover:border-slate-300 hover:shadow-md'
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-6 scale-98 pointer-events-none'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                onMouseEnter={() => setOpenIndex(idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  {/* Step Number Tag */}
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-extrabold transition-colors shrink-0 ${
                      isOpen
                        ? 'bg-[#00f59b] text-[#060b18]'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                    }`}
                  >
                    {stepNum}
                  </span>

                  <span
                    className={`text-sm font-bold transition-colors ${
                      isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-emerald-700'
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>

                {/* Chevron Pill */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen
                      ? 'bg-emerald-600 text-white rotate-180 shadow-sm'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Answer Content with Smooth Expand Transition */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80">
                    <p className="font-normal text-slate-600">{faq.answer}</p>

                    {/* Verification Pill */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{faq.category || 'Platform Standard'}</span>
                      </span>
                      <span className="text-[10px] text-slate-400">TalkNex Voice Architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

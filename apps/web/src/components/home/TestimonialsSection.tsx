'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2, Award } from 'lucide-react';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Rakesh Patel',
      title: 'Founder, RealVista Properties',
      metric: '+300% Site Visits',
      quote:
        'TalkNex has completely transformed our lead follow-up process. Our team now focuses on serious leads, and we have seen a 3x improvement in site visit conversions.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop',
      company: 'RealVista Properties'
    },
    {
      name: 'Dr. Anita Roy',
      title: 'Operations Director, Medicare Health Services',
      metric: '40% Less No-Shows',
      quote:
        'The bilingual Hindi and English conversational capability solved our clinic front-desk bottlenecks. Patient no-shows dropped by 40% in our first two months.',
      imageUrl: 'https://images.unsplash.com/photo-1594824813637-88981442f4fd?q=80&w=160&auto=format&fit=crop',
      company: 'Medicare Health'
    },
    {
      name: 'Vikram Joshi',
      title: 'VP Growth, EduSmart Academy',
      metric: '10,000+ Calls Handled',
      quote:
        'During admission peak season, TalkNex handled over 10,000 counselor calls smoothly without missing a single student application.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=160&auto=format&fit=crop',
      company: 'EduSmart Academy'
    }
  ];

  const current = testimonials[activeIndex];

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: '100ms',
        transitionDuration: '650ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.45, 0.64, 1)'
      }}
      className={`rounded-3xl bg-white border border-slate-200/90 shadow-soft-card hover:shadow-xl p-6 sm:p-7 relative flex flex-col justify-between overflow-hidden transition-all duration-500 ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}
    >
      {/* Background Subtle Watermark */}
      <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-500/5 pointer-events-none" />

      <div>
        {/* Header: Title + Stars + Metric Pill */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
              Loved by Businesses
            </h3>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
            {current.metric}
          </span>
        </div>

        {/* Quote */}
        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed mb-6 italic relative z-10">
          &ldquo;{current.quote}&rdquo;
        </p>
      </div>

      {/* Customer Attribution & Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-sm shrink-0">
            <img
              src={current.imageUrl}
              alt={current.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <span>{current.name}</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            </div>
            <div className="text-[11px] text-slate-500">{current.title}</div>
          </div>
        </div>

        {/* Carousel Arrows & Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-1">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  activeIndex === idx ? 'w-4 bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
            }
            className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() =>
              setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
            }
            className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-100 hover:border-slate-300 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

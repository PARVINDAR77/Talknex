'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
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
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8 scale-[0.98]';
      case 'down':
        return '-translate-y-8 scale-[0.98]';
      case 'left':
        return 'translate-x-8 scale-[0.98]';
      case 'right':
        return '-translate-x-8 scale-[0.98]';
      case 'fade':
      default:
        return 'scale-[0.98]';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.34, 1.35, 0.64, 1)'
      }}
      className={`transition-all ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100'
          : `opacity-0 ${getInitialTransform()} pointer-events-none`
      } ${className}`}
    >
      {children}
    </div>
  );
}


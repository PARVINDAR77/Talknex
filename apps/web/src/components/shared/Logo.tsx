import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export function Logo({ variant = 'dark', showTagline = false, className = '' }: LogoProps) {
  const isDark = variant === 'dark';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Soundwave Emblem */}
      <div className="flex items-center gap-[3px] h-7 px-1">
        <span className="w-1 bg-[#00f59b] rounded-full h-3 group-hover:h-5 transition-all duration-300"></span>
        <span className="w-1 bg-[#00f59b] rounded-full h-6 group-hover:h-3 transition-all duration-300"></span>
        <span className="w-1 bg-[#00f59b] rounded-full h-4 group-hover:h-6 transition-all duration-300"></span>
        <span className="w-1 bg-[#00f59b] rounded-full h-7 group-hover:h-4 transition-all duration-300"></span>
        <span className="w-1 bg-[#00f59b] rounded-full h-3 group-hover:h-5 transition-all duration-300"></span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Talk<span className="text-[#00f59b]">Nex</span>
          </span>
          <span className="text-[10px] text-[#00f59b] font-bold ml-0.5 -mt-2">TM</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-wide font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            AI Voice & Conversation Platform
          </span>
        )}
      </div>
    </Link>
  );
}


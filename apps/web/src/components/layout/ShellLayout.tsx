'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { VoiceCallWidget } from '../voice/VoiceCallWidget';

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-[#f8fafc] text-slate-900">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Global Floating AI Voice Call Popup Triggered From Any Page */}
      <VoiceCallWidget />
    </>
  );
}


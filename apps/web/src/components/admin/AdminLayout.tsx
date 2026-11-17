'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { getAdminUser, subscribeAdminAuth, AuthUser } from '../../services/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<AuthUser | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If already on login page, skip verification
    if (isLoginPage) {
      setIsChecking(false);
      return;
    }

    const checkAuth = () => {
      const currentAdmin = getAdminUser();
      if (!currentAdmin) {
        setAdminUser(null);
        setIsChecking(false);
        router.replace('/admin/login');
      } else {
        setAdminUser(currentAdmin);
        setIsChecking(false);
      }
    };

    checkAuth();
    const unsubscribe = subscribeAdminAuth(checkAuth);

    return () => {
      unsubscribe();
    };
  }, [pathname, isLoginPage, router]);

  // If on admin login page, render clean login view without sidebar or header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show secure verification screen while checking authentication status
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#040814] text-white flex items-center justify-center bg-tech-grid">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto shadow-lg shadow-amber-400/20" />
          <p className="text-xs text-slate-400 font-mono tracking-wider">
            Verifying Administrator Access...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated and not on login page, prevent flash of admin content
  if (!adminUser) {
    return null;
  }

  // Render full authenticated executive command center layout
  return (
    <div className="flex h-screen bg-[#050a17] text-white font-sans antialiased relative overflow-hidden bg-tech-grid">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[220px] pointer-events-none" />

      {/* Permanently Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

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
      <div className="min-h-screen bg-[#040814] text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-9 h-9 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto shadow-md shadow-amber-400/20" />
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

  // Render full authenticated admin layout
  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <AdminHeader title={title} subtitle={subtitle} />
        <main className="flex-1 p-8 bg-[#f8fafc] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

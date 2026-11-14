import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

export default function SuperAdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}


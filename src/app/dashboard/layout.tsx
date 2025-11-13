
'use client'

import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import SidebarNav from '@/components/layout/sidebar-nav';
import { ReportsProvider } from '@/context/reports-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ReportsProvider>
      <SidebarProvider>
          <SidebarNav />
          <SidebarInset>
              <Header />
              <div className="p-4 sm:p-6 lg:p-8">
                  {children}
              </div>
          </SidebarInset>
      </SidebarProvider>
    </ReportsProvider>
  );
}

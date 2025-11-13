
'use client'

import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import SidebarNav from '@/components/layout/sidebar-nav';
import { ReportsProvider } from '@/context/reports-context';
import { DataPrepProvider } from '@/context/data-prep-context';
import { DataProvider } from '@/context/data-context';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ReportsProvider>
      <DataPrepProvider>
        <DataProvider>
            <SidebarProvider>
                <div className="print-hidden">
                    <SidebarNav />
                </div>
                <SidebarInset>
                    <div className="print-hidden">
                        <Header />
                    </div>
                    <div className="p-4 sm:p-6 lg:p-8 print:p-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </DataProvider>
      </DataPrepProvider>
    </ReportsProvider>
  );
}

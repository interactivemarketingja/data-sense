
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a report
export interface Report {
  id: string;
  name: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  // In a real app, you would also store the full analysis result
  // analysis: AnalysisResult; 
}

// Define the shape of the context
interface ReportsContextType {
  reports: Report[];
  addReport: (newReportData: Omit<Report, 'id' | 'createdAt'>) => void;
  deleteReport: (reportId: string) => void;
}

// Initial mock data for reports
const initialReports: Report[] = [
  {
    id: 'REP-001',
    name: 'Q2 2024 Sales Analysis',
    status: 'Published',
    createdAt: '2024-07-15T10:30:00Z',
  },
  {
    id: 'REP-002',
    name: 'Website Traffic Deep-Dive',
    status: 'Published',
    createdAt: '2024-07-10T14:00:00Z',
  },
  {
    id: 'REP-003',
    name: 'Q3 Marketing Campaign Forecast',
    status: 'Draft',
    createdAt: '2024-07-20T09:00:00Z',
  },
];


// Create the context
const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

// Create a custom hook to use the reports context
export function useReports() {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}

// Create the provider component
export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const addReport = (newReportData: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport: Report = {
      ...newReportData,
      id: `REP-${String(reports.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setReports(prevReports => [...prevReports, newReport]);
  };

  const deleteReport = (reportId: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== reportId));
  };

  const value = {
    reports,
    addReport,
    deleteReport,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
}

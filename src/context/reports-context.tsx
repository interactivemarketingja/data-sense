
'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow';

// Define the shape of a report
export interface Report {
  id: string;
  name: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  analysis: AnalyzeDataOutput; 
}

// Define the shape of the context
interface ReportsContextType {
  reports: Report[];
  getReport: (id: string) => Report | undefined;
  addReport: (newReportData: Omit<Report, 'id' | 'createdAt'>) => void;
  deleteReport: (reportId: string) => void;
}

// Initial mock data for reports with dummy analysis
const initialReportsData: Report[] = [
  {
    id: 'REP-001',
    name: 'Q2 2024 Sales Analysis',
    status: 'Published',
    createdAt: '2024-07-15T10:30:00Z',
    analysis: {
      summary: "This is a mock summary for the Q2 2024 Sales Analysis report. It highlights key trends and provides actionable insights based on the sales data provided.",
      keyMetrics: [
        { title: "Total Revenue", value: "$1,250,000", change: "+15% vs Q1", changeType: 'increase' },
        { title: "New Customers", value: "1,200", change: "+5% vs Q1", changeType: 'increase' },
      ],
      charts: []
    }
  },
  {
    id: 'REP-002',
    name: 'Website Traffic Deep-Dive',
    status: 'Published',
    createdAt: '2024-07-10T14:00:00Z',
    analysis: {
      summary: "This mock summary for the Website Traffic report shows an increase in organic search traffic but a decrease in social media referrals.",
      keyMetrics: [
        { title: "Unique Visitors", value: "78,430", change: "+8% vs prior period", changeType: 'increase' },
        { title: "Bounce Rate", value: "45%", change: "-2% vs prior period", changeType: 'decrease' },
      ],
      charts: []
    }
  },
  {
    id: 'REP-003',
    name: 'Q3 Marketing Campaign Forecast',
    status: 'Draft',
    createdAt: '2024-07-20T09:00:00Z',
    analysis: {
      summary: "This draft forecast for Q3 marketing campaigns projects a 20% increase in lead generation based on the planned initiatives.",
      keyMetrics: [],
      charts: []
    }
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
  const [reports, setReports] = useState<Report[]>(() => {
    if (typeof window === 'undefined') {
      return initialReportsData;
    }
    try {
      const item = window.localStorage.getItem('reports');
      return item ? JSON.parse(item) : initialReportsData;
    } catch (error) {
      console.error(error);
      return initialReportsData;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('reports', JSON.stringify(reports));
    } catch (error) {
      console.error(error);
    }
  }, [reports]);

  const getReport = (id: string) => {
    return reports.find(report => report.id === id);
  }

  const addReport = (newReportData: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport: Report = {
      ...newReportData,
      id: `REP-${String(reports.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setReports(prevReports => [newReport, ...prevReports]);
  };

  const deleteReport = (reportId: string) => {
    setReports(prevReports => prevReports.filter(report => report.id !== reportId));
  };

  const value = {
    reports,
    getReport,
    addReport,
    deleteReport,
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
}

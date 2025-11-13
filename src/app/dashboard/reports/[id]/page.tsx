
'use client'

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useReports } from '@/context/reports-context';
import AnalysisDisplay from '@/components/dashboard/analysis-display';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { Report } from '@/context/reports-context';

export default function ReportDetailPage() {
  const params = useParams();
  const { getReport } = useReports();
  const [report, setReport] = useState<Report | null | undefined>(undefined);

  const id = typeof params.id === 'string' ? params.id : '';

  useEffect(() => {
    if (id) {
      const foundReport = getReport(id);
      setReport(foundReport);
    }
  }, [id, getReport]);

  if (report === undefined) {
    // Still loading
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-6 w-1/4" />
        <div className="pt-8">
            <AnalysisDisplay isLoading={true} result={null} onReset={()=>{}} onSave={()=>{}} isSaved={true} />
        </div>
      </div>
    );
  }

  if (report === null) {
    // Use Next.js notFound function to render the 404 page
    notFound();
    return null;
  }
  
  return (
     <AnalysisDisplay 
        result={report.analysis} 
        isLoading={false}
        onReset={()=>{}} // Not applicable on detail page
        onSave={()=>{}} // Not applicable on detail page
        isSaved={true}
        title={report.name}
        generatedDate={report.createdAt}
      />
  );
}


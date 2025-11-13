'use client'

import { useState } from 'react'
import DataUpload from '@/components/dashboard/data-upload'
import AnalysisDisplay from '@/components/dashboard/analysis-display'
import { useReports } from '@/context/reports-context'
import { useRouter } from 'next/navigation'

export type AnalysisResult = {
  summary: string;
  keyMetrics: { title: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }[];
  charts: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    description: string;
    data: any[];
    config: any;
  }[];
};

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addReport } = useReports();
  const router = useRouter();


  const handleAnalysis = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setAnalysisResult(null)

    // Simulate AI analysis and web search
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock response. In a real app, this would come from an AI flow.
    const mockSuccess = Math.random() > 0.1 // 90% success rate
    
    if (mockSuccess) {
      const mockResult: AnalysisResult = {
        summary: "This quarter shows a strong 15% growth in sales, primarily driven by the new 'Starlight' product line. Web traffic from organic search is up 25%, indicating successful SEO strategies. However, customer churn has slightly increased by 2%. It is recommended to focus on customer retention initiatives in the next quarter.",
        keyMetrics: [
          { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", changeType: 'increase' },
          { title: "Subscriptions", value: "+2350", change: "+180.1% from last month", changeType: 'increase' },
          { title: "Sales", value: "+12,234", change: "+19% from last month", changeType: 'increase' },
          { title: "Active Users", value: "+573", change: "+201 since last hour", changeType: 'increase' },
        ],
        charts: [
          {
            type: 'bar',
            title: 'Monthly Revenue',
            description: 'Revenue comparison over the last 6 months.',
            data: [
              { month: "January", desktop: 186 },
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
            ],
            config: { desktop: { label: "Revenue (in thousands)", color: "hsl(var(--primary))" } },
          },
          {
            type: 'line',
            title: 'Website Visitors',
            description: 'Daily unique visitors over the last week.',
            data: [
              { date: "2024-07-18", visitors: 222 },
              { date: "2024-07-19", visitors: 184 },
              { date: "2024-07-20", visitors: 240 },
              { date: "2024-07-21", visitors: 148 },
              { date: "2024-07-22", visitors: 273 },
              { date: "2024-07-23", visitors: 195 },
              { date: "2024-07-24", visitors: 280 },
            ],
            config: { visitors: { label: "Unique Visitors", color: "hsl(var(--accent))" } },
          }
        ],
      }
      setAnalysisResult(mockResult)
    } else {
      setError("Failed to analyze data. The file format might be unsupported or corrupted.")
    }

    setIsLoading(false)
  }
  
  const handleSaveReport = (title: string) => {
    if (analysisResult) {
      addReport({
        name: title,
        status: 'Published',
        // In a real app, the full analysisResult would be stored
      });
      router.push('/dashboard/reports');
    }
  };

  return (
    <div className="space-y-8">
      {!analysisResult && !isLoading && (
        <DataUpload onAnalyze={handleAnalysis} isLoading={isLoading} error={error} />
      )}
      <AnalysisDisplay 
        result={analysisResult} 
        isLoading={isLoading} 
        onReset={() => {
          setAnalysisResult(null);
          setError(null);
        }}
        onSave={handleSaveReport}
      />
    </div>
  )
}

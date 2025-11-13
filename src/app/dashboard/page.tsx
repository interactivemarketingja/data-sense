'use client'

import { useState } from 'react'
import DataUpload from '@/components/dashboard/data-upload'
import AnalysisDisplay from '@/components/dashboard/analysis-display'
import { useReports } from '@/context/reports-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { analyzeData, type AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow'

export type AnalysisResult = AnalyzeDataOutput;

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addReport } = useReports();
  const router = useRouter();
  const { toast } = useToast();


  const handleAnalysis = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setAnalysisResult(null)

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const fileContent = event.target?.result as string;
            const result = await analyzeData({ fileContent, fileName: file.name });
            setAnalysisResult(result);
        } catch (e: any) {
            console.error(e);
            setError(`Failed to analyze data. ${e.message || "An unexpected error occurred."}`);
        } finally {
            setIsLoading(false);
        }
    };
    reader.onerror = () => {
        setError("Failed to read the file.");
        setIsLoading(false);
    };
    reader.readAsText(file);
  }
  
  const handleSaveReport = (title: string) => {
    if (analysisResult) {
      addReport({
        name: title,
        status: 'Published',
        analysis: analysisResult
      });
      toast({
        title: "Report Saved",
        description: `"${title}" has been saved.`
      })
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
        isSaved={false}
      />
    </div>
  )
}

'use client'

import { useState } from 'react'
import DataUpload from '@/components/dashboard/data-upload'
import AnalysisDisplay from '@/components/dashboard/analysis-display'
import { useReports } from '@/context/reports-context'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { analyzeData, type AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow'
import { useDataPrep } from '@/context/data-prep-context'
import { processData } from '@/lib/data-processor'
import { useData } from '@/context/data-context'

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeDataOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { addReport } = useReports();
  const router = useRouter();
  const { toast } = useToast();
  const { settings: dataPrepSettings } = useDataPrep();
  const { setData } = useData();


  const handleAnalysis = async (file: File) => {
    setIsLoading(true)
    setError(null)
    setAnalysisResult(null)

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const fileContent = event.target?.result as string;
            
            // Set the data in the context
            setData({ fileContent, fileName: file.name, file });
            
            // Process the data using the settings from the context
            const processedContent = processData(fileContent, file.name, dataPrepSettings);
            
            const result = await analyzeData({ 
                fileContent: processedContent, 
                fileName: file.name, 
                analysisType: 'descriptive', // Default to descriptive for the main page
                question: '' 
            });
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

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
    setData({ fileContent: null, fileName: null, file: null });
  }

  return (
    <div className="space-y-8">
      {!analysisResult && !isLoading && (
        <DataUpload onAnalyze={handleAnalysis} isLoading={isLoading} error={error} />
      )}
      <AnalysisDisplay 
        result={analysisResult} 
        isLoading={isLoading} 
        onReset={handleReset}
        onSave={handleSaveReport}
        isSaved={false}
      />
    </div>
  )
}

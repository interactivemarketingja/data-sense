'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Sparkles, AlertCircle, FileQuestion, Cpu, LineChart, Lightbulb, FileUp } from 'lucide-react'
import { analyzeData, type AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow'
import { processData } from '@/lib/data-processor'
import { useDataPrep } from '@/context/data-prep-context'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import AnalysisDisplay from '@/components/dashboard/analysis-display'
import { useData } from '@/context/data-context'

export default function AdvancedAnalyticsPage() {
    const [analysisType, setAnalysisType] = useState('descriptive')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<AnalyzeDataOutput | null>(null)
    const [question, setQuestion] = useState('')
    const { settings: dataPrepSettings } = useDataPrep();
    const { data: appData, setData } = useData();

    const handleAnalyze = async () => {
        if (!appData.fileContent || !appData.fileName) {
            setError("No data available. Please upload a file on the dashboard first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const processedContent = processData(appData.fileContent, appData.fileName, dataPrepSettings);
            
            const analysisResult = await analyzeData({ 
                fileContent: processedContent, 
                fileName: appData.fileName,
                analysisType: analysisType as any,
                question: question,
            });
            setResult(analysisResult);

        } catch (e: any) {
            console.error(e);
            setError(`Failed to analyze data. ${e.message || "An unexpected error occurred."}`);
        } finally {
            setIsLoading(false);
        }
    };

    const analysisTypes = [
        { value: 'descriptive', label: 'Descriptive', icon: FileQuestion, description: 'What happened in the past?' },
        { value: 'diagnostic', label: 'Diagnostic', icon: Cpu, description: 'Why did it happen?' },
        { value: 'predictive', label: 'Predictive', icon: LineChart, description: 'What might happen in the future?' },
        { value: 'prescriptive', label: 'Prescriptive', icon: Lightbulb, description: 'What should we do next?' },
    ]

    const handleReset = () => {
      setResult(null);
      setError(null);
      setQuestion('');
    }

    if (!appData.file) {
      return (
         <Card className="w-full max-w-2xl mx-auto text-center">
            <CardHeader>
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <FileUp className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>No Data Selected</CardTitle>
                <CardDescription>
                    Please upload a data file on the main dashboard page before running an advanced analysis.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </CardContent>
        </Card>
      )
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Advanced Analytics Engine</h1>
                <p className="text-muted-foreground">
                    Run descriptive, diagnostic, predictive, and prescriptive analyses on <span className="font-semibold text-primary">{appData.fileName}</span>.
                </p>
            </div>
            
            {!result && (
              <>
                 <Card>
                    <CardHeader>
                        <CardTitle>Choose Analysis Type & Ask a Question</CardTitle>
                        <CardDescription>Select the type of analysis you want to perform and optionally specify your question.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Tabs defaultValue="descriptive" onValueChange={setAnalysisType} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
                                {analysisTypes.map(type => (
                                     <TabsTrigger key={type.value} value={type.value} className="flex flex-col h-full gap-2 p-4">
                                        <type.icon className="w-6 h-6" />
                                        <div className="text-center">
                                            <p className="font-semibold">{type.label}</p>
                                            <p className="text-xs text-muted-foreground hidden md:block">{type.description}</p>
                                        </div>
                                     </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                         <div className="space-y-2 pt-4">
                            <Label htmlFor="question">Specific Question (Optional)</Label>
                            <Textarea 
                                id="question"
                                placeholder={`e.g., "Why did sales dip in Q2?" or "Forecast sales for the next 3 months."`}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAnalyze} disabled={isLoading} size="lg" className="w-full sm:w-auto">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {isLoading ? 'Analyzing...' : `Run ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis`}
                        </Button>
                    </CardContent>
                </Card>
              </>
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="mt-4 text-lg font-semibold">The AI is analyzing your data...</p>
                    <p className="mt-2 text-sm text-muted-foreground">This may take a moment. Please don't refresh the page.</p>
                </div>
            )}

            {error && !isLoading && (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {result && (
               <AnalysisDisplay 
                    result={result} 
                    isLoading={false} 
                    onReset={handleReset}
                    onSave={() => {
                        // Implement save functionality if needed, e.g., using the reports context
                    }}
                    isSaved={false} // Or manage this state if saving is implemented
                    title={`Advanced Analysis: ${appData.fileName}`}
                />
            )}
        </div>
    )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, Sparkles, AlertCircle, FileQuestion, LineChart, Cpu, Lightbulb } from 'lucide-react'
import DataUpload from '@/components/dashboard/data-upload'
import { analyzeData, type AnalyzeDataOutput } from '@/ai/flows/analyze-data-flow'
import { processData } from '@/lib/data-processor'
import { useDataPrep } from '@/context/data-prep-context'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdvancedAnalyticsPage() {
    const [analysisType, setAnalysisType] = useState('descriptive')
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<AnalyzeDataOutput | null>(null)
    const [question, setQuestion] = useState('')
    const { settings: dataPrepSettings } = useDataPrep();

    const handleFileSelected = (selectedFile: File) => {
        setFile(selectedFile);
        setResult(null);
        setError(null);
    }
    
    const handleAnalyze = async () => {
        if (!file) {
            setError("Please upload a file first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const fileContent = event.target?.result as string;
                const processedContent = processData(fileContent, file.name, dataPrepSettings);
                
                // For simplicity, we use the same flow. A real app might have different flows.
                const analysisResult = await analyzeData({ 
                    fileContent: processedContent, 
                    fileName: file.name,
                    // We can pass the analysisType and question to the prompt if the flow supports it.
                    // For now, the existing flow will generate a general analysis.
                });
                setResult(analysisResult);

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
    };

    const analysisTypes = [
        { value: 'descriptive', label: 'Descriptive', icon: FileQuestion, description: 'What happened in the past?' },
        { value: 'diagnostic', label: 'Diagnostic', icon: Cpu, description: 'Why did it happen?' },
        { value: 'predictive', label: 'Predictive', icon: LineChart, description: 'What might happen in the future?' },
        { value: 'prescriptive', label: 'Prescriptive', icon: Lightbulb, description: 'What should we do next?' },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Advanced Analytics Engine</h1>
                <p className="text-muted-foreground">
                    Run descriptive, diagnostic, predictive, and prescriptive analyses.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>1. Upload Your Data</CardTitle>
                    <CardDescription>Upload the file you want to analyze. The data will be prepared based on your <a href="/dashboard/data-prep" className="underline">Data Prep settings</a>.</CardDescription>
                </CardHeader>
                <CardContent>
                   <DataUpload onAnalyze={handleFileSelected} isLoading={false} error={error} />
                </CardContent>
            </Card>

            {file && (
                 <Card>
                    <CardHeader>
                        <CardTitle>2. Choose Analysis Type & Ask a Question</CardTitle>
                        <CardDescription>Select the type of analysis you want to perform and optionally specify your question.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Tabs defaultValue="descriptive" onValueChange={setAnalysisType}>
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
                         <div className="space-y-2">
                            <Label htmlFor="question">Specific Question (Optional)</Label>
                            <Textarea 
                                id="question"
                                placeholder={`e.g., "Why did sales dip in Q2?" or "Forecast sales for the next 3 months."`}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleAnalyze} disabled={isLoading || !file} size="lg">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {isLoading ? 'Analyzing...' : `Run ${analysisType.charAt(0).toUpperCase() + analysisType.slice(1)} Analysis`}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {isLoading && (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-4 text-muted-foreground">The AI is analyzing your data, please wait...</p>
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
                <Card className="animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle>Analysis Results</CardTitle>
                        <CardDescription>
                            Here are the insights generated by the AI based on your request.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <p>{result.summary}</p>
                        </div>
                        {/* Here you would render the specific analysis types */}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

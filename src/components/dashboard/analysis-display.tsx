'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { AnalysisResult } from '@/app/dashboard/page'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine, RefreshCcw, ArrowUp, ArrowDown, Save } from 'lucide-react'
import { ResponsiveBarChart } from './charts/responsive-bar-chart'
import { ResponsiveLineChart } from './charts/responsive-line-chart'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type AnalysisDisplayProps = {
  result: AnalysisResult | null;
  isLoading: boolean;
  onReset: () => void;
  onSave: (title: string) => void;
};

const MetricCard = ({ title, value, change, changeType }: { title: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {change && (
                <p className={`text-xs text-muted-foreground flex items-center ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                    {changeType === 'increase' ? <ArrowUp className="h-4 w-4 mr-1"/> : <ArrowDown className="h-4 w-4 mr-1"/>}
                    {change}
                </p>
            )}
        </CardContent>
    </Card>
);

const AnalysisDisplaySkeleton = () => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
            <Skeleton className="h-28 rounded-lg" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
            <Skeleton className="h-80 rounded-lg" />
            <Skeleton className="h-80 rounded-lg" />
        </div>
    </div>
);

export default function AnalysisDisplay({ result, isLoading, onReset, onSave }: AnalysisDisplayProps) {
  const [reportTitle, setReportTitle] = useState(`Report - ${new Date().toLocaleDateString()}`);

  if (isLoading) {
    return <AnalysisDisplaySkeleton />;
  }

  if (!result) {
    return null;
  }
  
  const handlePrint = () => {
    window.print();
  }
  
  const handleSave = () => {
    onSave(reportTitle);
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Analysis Report</h1>
                <p className="text-muted-foreground">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint}>
                    <ArrowDownToLine className="mr-2 h-4 w-4" />
                    Download PDF
                </Button>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Save Report
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Save Report</AlertDialogTitle>
                      <AlertDialogDescription>
                        Give your report a title to save it for later viewing.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-2">
                      <Label htmlFor="report-title">Report Title</Label>
                      <Input 
                        id="report-title"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                 <Button variant="default" onClick={onReset}>
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    New Analysis
                </Button>
            </div>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Summary</CardTitle>
          <CardDescription>Key insights from your data, powered by AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/80 leading-relaxed">{result.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {result.keyMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {result.charts.map((chart, index) => {
          let ChartComponent;
          switch (chart.type) {
            case 'bar':
              ChartComponent = ResponsiveBarChart;
              break;
            case 'line':
              ChartComponent = ResponsiveLineChart;
              break;
            default:
              return null;
          }
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
                <CardDescription>{chart.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent data={chart.data} config={chart.config} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  )
}

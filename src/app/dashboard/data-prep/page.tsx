'use client'

import { FileUp, Sparkles, Filter, ShieldCheck, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useDataPrep, type MissingStrategy, type OutlierStrategy } from '@/context/data-prep-context'

export default function DataPrepPage() {
  const { settings, setSettings } = useDataPrep();
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your data preparation settings have been updated.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Data Preparation</h1>
        <p className="text-muted-foreground">
          Clean and transform your raw data to make it ready for analysis.
        </p>
      </div>
      <Separator />

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Preparation Settings</CardTitle>
          <CardDescription>
            Choose the cleaning and formatting options to apply to your dataset. These actions will be performed before the AI analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card-background">
            <Label htmlFor="handle-missing" className="flex flex-col space-y-1">
              <span className="font-semibold flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary" />Handle Missing Values</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Automatically detect and deal with empty or null cells.
              </span>
            </Label>
            <Switch
              id="handle-missing"
              checked={settings.handleMissing}
              onCheckedChange={(checked) => setSettings({ handleMissing: checked })}
            />
          </div>

          {settings.handleMissing && (
            <div className="pl-10">
              <Label htmlFor="missing-strategy">Strategy</Label>
              <Select 
                value={settings.missingStrategy} 
                onValueChange={(value) => setSettings({ missingStrategy: value as MissingStrategy })}
              >
                <SelectTrigger id="missing-strategy" className="w-full md:w-1/2 mt-1">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remove">Remove rows with missing values</SelectItem>
                  <SelectItem value="fill_mean">Fill with column average (mean)</SelectItem>
                  <SelectItem value="fill_median">Fill with column median</SelectItem>
                  <SelectItem value="fill_mode">Fill with most frequent value (mode)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card-background">
            <Label htmlFor="remove-duplicates" className="flex flex-col space-y-1">
              <span className="font-semibold flex items-center"><Repeat className="mr-2 h-5 w-5 text-primary" />Remove Duplicates</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Delete rows that are exact copies of another row.
              </span>
            </Label>
            <Switch
              id="remove-duplicates"
              checked={settings.removeDuplicates}
              onCheckedChange={(checked) => setSettings({ removeDuplicates: checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-card-background">
            <Label htmlFor="handle-outliers" className="flex flex-col space-y-1">
              <span className="font-semibold flex items-center"><Filter className="mr-2 h-5 w-5 text-primary" />Handle Outliers</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Identify and manage unusually extreme values in your data.
              </span>
            </Label>
            <Switch
              id="handle-outliers"
              checked={settings.handleOutliers}
              onCheckedChange={(checked) => setSettings({ handleOutliers: checked })}
            />
          </div>

           {settings.handleOutliers && (
            <div className="pl-10">
              <Label htmlFor="outlier-strategy">Method</Label>
              <Select 
                value={settings.outlierStrategy} 
                onValueChange={(value) => setSettings({ outlierStrategy: value as OutlierStrategy })}
              >
                <SelectTrigger id="outlier-strategy" className="w-full md:w-1/2 mt-1">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iqr">Remove using Interquartile Range (IQR)</SelectItem>
                  <SelectItem value="zscore">Remove using Z-score (Standard Deviations)</SelectItem>
                </SelectContent>
              </Select>
               <p className="text-xs text-muted-foreground mt-2">Note: Outlier handling is best for numeric data and may not apply to all columns.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
            <Button size="lg" onClick={handleSaveSettings}>
                <Sparkles className="mr-2 h-4 w-4" />
                Save Settings
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

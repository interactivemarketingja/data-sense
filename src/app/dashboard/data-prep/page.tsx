
'use client'

import { FileUp, Sparkles, Filter, ShieldCheck, Repeat, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { useDataPrep, type MissingStrategy, type OutlierStrategy } from '@/context/data-prep-context'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const accessLogs = [
    { user: 'Demo User', action: 'Viewed Report', details: 'Q2 2024 Sales Analysis', timestamp: '5m ago'},
    { user: 'AI Analyst', action: 'Analyzed Data', details: 'monthly-sales.csv', timestamp: '15m ago'},
    { user: 'Demo User', action: 'Uploaded Data', details: 'monthly-sales.csv', timestamp: '18m ago'},
    { user: 'Jane Smith', action: 'Viewed Report', details: 'Website Traffic Deep-Dive', timestamp: '1h ago'},
]

export default function DataGovernancePage() {
  const { settings, setSettings } = useDataPrep();
  const { toast } = useToast()

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your data governance settings have been updated.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Data Governance</h1>
        <p className="text-muted-foreground">
          Manage data quality, track changes, and monitor access to ensure reliability and security.
        </p>
      </div>
      <Separator />

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
            <CardTitle>Data Quality Checks</CardTitle>
            <CardDescription>
                Configure rules to automatically clean and prepare your data, preventing poor-quality data from influencing results.
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
         <Card>
            <CardHeader>
                <CardTitle>Access Monitoring</CardTitle>
                <CardDescription>
                    Real-time visibility into how data is being accessed and used across your organization.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accessLogs.map((log, index) => (
                             <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{log.user}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={log.action.includes('Analyzed') ? 'default' : 'secondary'}>{log.action}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{log.details}</TableCell>
                                <TableCell className="text-muted-foreground">{log.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

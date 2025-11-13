
'use client'

import Link from 'next/link'
import { Database, GanttChartSquare, Bot, FileJson, Snowflake, UploadCloud, Lock, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

const integrations = [
    {
        name: 'PostgreSQL',
        description: 'Connect to your self-hosted or managed PostgreSQL database.',
        icon: <Database className="w-8 h-8 text-primary" />,
    },
    {
        name: 'MySQL',
        description: 'Sync data directly from your MySQL or MariaDB instances.',
        icon: <Database className="w-8 h-8 text-primary" />,
    },
    {
        name: 'Snowflake',
        description: 'Integrate with your Snowflake data cloud for large-scale analytics.',
        icon: <Snowflake className="w-8 h-8 text-primary" />,
    },
    {
        name: 'Google BigQuery',
        description: 'Analyze massive datasets by connecting to Google BigQuery.',
        icon: <GanttChartSquare className="w-8 h-8 text-primary" />,
    },
    {
        name: 'Amazon S3',
        description: 'Connect to an S3 bucket to process files stored in the cloud.',
        icon: <UploadCloud className="w-8 h-8 text-primary" />,
    },
    {
        name: 'Google Sheets',
        description: 'Import data directly from your spreadsheets in Google Sheets.',
        icon: <FileJson className="w-8 h-8 text-primary" />,
    },
]


export default function IntegrationsPage() {
    const { toast } = useToast()
    const isProUser = false; // In a real app, this would come from user state

    const handleConnect = (name: string) => {
        toast({
            title: `Connecting to ${name}`,
            description: "This is a demo. In a real application, this would initiate the connection process.",
        })
    }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Integrations</h1>
            <p className="text-muted-foreground">
                Connect your data sources to automatically sync and analyze data.
            </p>
        </div>
        <Separator />
        
        {!isProUser ? (
            <Card className="max-w-2xl mx-auto text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="mt-4">Unlock Data Integrations</CardTitle>
                    <CardDescription>
                        This is a Pro feature. Upgrade your plan to connect directly to databases, cloud storage, and other data sources automatically.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="text-left space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
                        <li>Connect to PostgreSQL, MySQL, and Snowflake</li>
                        <li>Sync data from Google BigQuery and Amazon S3</li>
                        <li>Import directly from Google Sheets</li>
                        <li>Automate your data analysis workflow with ETL pipelines</li>
                    </ul>
                    <Button size="lg" asChild>
                        <Link href="/dashboard/billing">Upgrade to Pro</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="flex flex-col md:col-span-2 lg:col-span-3 border-2 border-primary/50 bg-primary/5">
                     <CardHeader className="flex flex-row items-start gap-4">
                        <SlidersHorizontal className="w-8 h-8 text-primary" />
                        <div className="space-y-1">
                            <CardTitle>Automated ETL Pipelines</CardTitle>
                            <CardDescription>Extract, transform, and load data automatically to reduce manual data handling and improve accuracy.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <div className="p-6 pt-0">
                        <Button className="w-full" onClick={() => handleConnect('ETL Pipelines')}>
                            Configure Pipeline
                        </Button>
                    </div>
                </Card>
                {integrations.map((integration) => (
                    <Card key={integration.name} className="flex flex-col">
                        <CardHeader className="flex flex-row items-start gap-4">
                            {integration.icon}
                            <div className="space-y-1">
                                <CardTitle>{integration.name}</CardTitle>
                                <CardDescription>{integration.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow" />
                        <div className="p-6 pt-0">
                            <Button className="w-full" onClick={() => handleConnect(integration.name)}>
                                Connect
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        )}
    </div>
  )
}

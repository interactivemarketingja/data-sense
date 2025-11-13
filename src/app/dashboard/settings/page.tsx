
'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"

export default function SettingsPage() {
    const { setTheme, theme } = useTheme()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                This is how others will see you on the site.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Demo User" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="demo@example.com" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize the look and feel of the application.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Theme</Label>
                                <p className="text-sm text-muted-foreground">
                                    Select the theme for the dashboard.
                                </p>
                            </div>
                            <RadioGroup
                                value={theme}
                                onValueChange={setTheme}
                                className="grid max-w-md grid-cols-1 sm:grid-cols-3 gap-4"
                            >
                                <div>
                                    <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                    <Label
                                        htmlFor="light"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <div className="space-y-2 w-full">
                                            <div className="w-full h-8 rounded-lg bg-gray-200" />
                                            <div className="w-3/4 h-4 rounded-lg bg-gray-200" />
                                        </div>
                                        <span className="mt-4 font-semibold">Light</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                    <Label
                                        htmlFor="dark"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <div className="space-y-2 w-full">
                                            <div className="w-full h-8 rounded-lg bg-gray-800" />
                                            <div className="w-3/4 h-4 rounded-lg bg-gray-800" />
                                        </div>
                                        <span className="mt-4 font-semibold">Dark</span>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="system" id="system" className="peer sr-only" />
                                    <Label
                                        htmlFor="system"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                        <div className="space-y-2 w-full">
                                            <div className="w-full h-8 rounded-lg bg-gradient-to-r from-gray-200 to-gray-800" />
                                            <div className="w-3/4 h-4 rounded-lg bg-gradient-to-r from-gray-200 to-gray-800" />
                                        </div>
                                        <span className="mt-4 font-semibold">System</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Choose what you want to be notified about.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="flex items-center justify-between space-x-4">
                                <Label htmlFor="report-ready" className="flex flex-col space-y-1">
                                <span>Report Ready</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Get an email when your data analysis report is ready.
                                </span>
                                </Label>
                                <Switch id="report-ready" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-4">
                                <Label htmlFor="weekly-summary" className="flex flex-col space-y-1">
                                <span>Weekly Summary</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Receive a weekly summary of your key metrics.
                                </span>
                                </Label>
                                <Switch id="weekly-summary" />
                            </div>
                             <div className="flex items-center justify-between space-x-4">
                                <Label htmlFor="product-updates" className="flex flex-col space-y-1">
                                <span>Product Updates</span>
                                <span className="font-normal leading-snug text-muted-foreground">
                                    Hear about new features and updates from Data Insights Pro.
                                </span>
                                </Label>
                                <Switch id="product-updates" defaultChecked />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save preferences</Button>
                        </CardFooter>
                    </Card>
                 </TabsContent>
            </Tabs>
        </div>
    )
}

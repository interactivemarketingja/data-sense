
'use client'

import * as React from 'react'
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    Menu,
    Package2,
    Search,
    Users,
} from 'lucide-react'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ResponsiveLineChart } from '@/components/dashboard/charts/responsive-line-chart'
import { ResponsiveBarChart } from '@/components/dashboard/charts/responsive-bar-chart'
import { ResponsiveAreaChart } from '@/components/dashboard/charts/responsive-area-chart'
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker'

export default function AnalyticsPage() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), -30),
        to: new Date(),
    })

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 md:gap-8">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <CalendarDateRangePicker date={date} onDateChange={setDate} />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231.89</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Subscriptions
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2350</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Now
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardHeader>
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>
                                A summary of transactions in the selected date range.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveAreaChart 
                                data={[
                                  { date: "2024-07-01", transactions: 28 },
                                  { date: "2024-07-02", transactions: 35 },
                                  { date: "2024-07-03", transactions: 42 },
                                  { date: "2024-07-04", transactions: 30 },
                                  { date: "2024-07-05", transactions: 50 },
                                  { date: "2024-07-06", transactions: 48 },
                                  { date: "2024-07-07", transactions: 60 },
                                ]}
                                config={{ transactions: { label: "Transactions", color: "hsl(var(--primary))" } }}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="text-sm text-muted-foreground">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">$250.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Olivia Smith</div>
                                            <div className="text-sm text-muted-foreground">
                                                olivia@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">$150.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Noah Williams</div>
                                            <div className="text-sm text-muted-foreground">
                                                noah@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">$350.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Emma Brown</div>
                                            <div className="text-sm text-muted-foreground">
                                                emma@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">$450.00</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <div className="font-medium">Liam Johnson</div>
                                            <div className="text-sm text-muted-foreground">
                                                liam@example.com
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">$550.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

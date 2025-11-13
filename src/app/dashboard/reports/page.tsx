
'use client'

import * as React from 'react'
import {
  FileText,
  MoreHorizontal,
  PlusCircle,
  Search,
  Eye,
  Trash2,
  Download,
} from 'lucide-react'
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

const mockReports = [
  {
    id: 'REP-001',
    name: 'Q2 2024 Sales Analysis',
    status: 'Published',
    createdAt: '2024-07-15T10:30:00Z',
  },
  {
    id: 'REP-002',
    name: 'Website Traffic Deep-Dive',
    status: 'Published',
    createdAt: '2024-07-10T14:00:00Z',
  },
  {
    id: 'REP-003',
    name: 'Q3 Marketing Campaign Forecast',
    status: 'Draft',
    createdAt: '2024-07-20T09:00:00Z',
  },
  {
    id: 'REP-004',
    name: 'Customer Churn Investigation',
    status: 'Published',
    createdAt: '2024-06-28T11:45:00Z',
  },
  {
    id: 'REP-005',
    name: 'New Product Line Feasibility',
    status: 'Draft',
    createdAt: '2024-07-22T16:20:00Z',
  },
]

type Report = (typeof mockReports)[0]

export default function ReportsPage() {
    const [searchTerm, setSearchTerm] = React.useState('')
    const [activeTab, setActiveTab] = React.useState('all')

    const filteredReports = React.useMemo(() => {
        let reports = mockReports

        if (activeTab !== 'all') {
            reports = reports.filter(report => report.status.toLowerCase() === activeTab)
        }

        if (searchTerm) {
            reports = reports.filter(report =>
                report.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        
        return reports
    }, [searchTerm, activeTab]);


  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="Published">Published</TabsTrigger>
          <TabsTrigger value="Draft">Draft</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reports..."
              className="pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Report
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value={activeTab}>
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Manage and view your generated analysis reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Date Created
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        {report.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.status === 'Published' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(report.createdAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No reports found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

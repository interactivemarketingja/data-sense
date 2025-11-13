
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Rocket, LayoutDashboard, BarChart3, FileText, Settings, CreditCard, ShieldCheck, Plug } from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default function SidebarNav() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/data-prep', label: 'Data Governance', icon: ShieldCheck },
    { href: '/dashboard/reports', label: 'Reports', icon: FileText },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2 justify-center group-data-[collapsible=icon]:justify-center">
          <Rocket className="w-6 h-6 text-primary flex-shrink-0" />
          <span className="text-lg font-semibold font-headline group-data-[collapsible=icon]:hidden">Data Insights Pro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <Separator className="my-2" />
        <div className='p-2'>
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="p-3">
                    <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
                    <CardDescription className="text-xs">Unlock all features and get unlimited access to our support team.</CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/dashboard/billing">Upgrade</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

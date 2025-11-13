
'use client'

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const plansData = [
    {
        name: 'Free',
        monthlyPrice: 0,
        yearlyPrice: 0,
        description: 'For individuals and small teams getting started.',
        features: [
            { text: '5 reports per month', included: true },
            { text: 'Basic analytics', included: true },
            { text: 'Email support', included: true },
            { text: 'AI-powered summaries', included: false },
            { text: 'Advanced data visualizations', included: false },
            { text: '24/7 priority support', included: false },
        ],
        cta: 'Current Plan',
        isCurrent: true,
    },
    {
        name: 'Pro',
        monthlyPrice: 29,
        yearlyPrice: 278,
        description: 'For growing businesses that need more power.',
        features: [
            { text: 'Unlimited reports', included: true },
            { text: 'Advanced analytics', included: true },
            { text: 'AI-powered summaries', included: true },
            { text: 'Advanced data visualizations', included: true },
            { text: '24/7 priority support', included: true },
        ],
        cta: 'Upgrade to Pro',
        isCurrent: false,
    },
]

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Billing & Plans</h1>
            <p className="text-muted-foreground">
                Manage your subscription and billing details.
            </p>
        </div>
        <Separator />
        <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2">
                <Label htmlFor="billing-cycle" className={billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}>Monthly</Label>
                <Switch 
                    id="billing-cycle" 
                    checked={billingCycle === 'yearly'}
                    onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                />
                <Label htmlFor="billing-cycle" className={billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}>Yearly</Label>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">-20%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plansData.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.isCurrent ? 'border-primary' : ''}`}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div>
                                <span className="text-4xl font-bold">
                                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                </span>
                                <span className="text-muted-foreground">
                                    {plan.monthlyPrice > 0 ? (billingCycle === 'monthly' ? '/ month' : '/ year') : ''}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="space-y-3">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center">
                                        {feature.included ? (
                                            <Check className="h-5 w-5 text-green-500 mr-2" />
                                        ) : (
                                            <X className="h-5 w-5 text-red-500 mr-2" />
                                        )}
                                        <span className={!feature.included ? 'text-muted-foreground line-through' : ''}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                           {plan.isCurrent ? (
                                <Button className="w-full" disabled={plan.isCurrent}>
                                    {plan.cta}
                                </Button>
                           ) : (
                            <div className="w-full space-y-2">
                                <Button className="w-full">
                                    {plan.cta}
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <svg className="w-4 h-4 mr-2" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PayPal</title><path d="M7.333 23.528c-2.563 0-4.44-1.637-4.44-4.15 0-2.934 2.227-3.963 4.633-3.963h1.49v2.522H7.352c-.9 0-1.42.34-.961 1.25.46 1.054 1.402 1.077 2.368.608l.214-.107.56-2.895c.14-.72.76-1.125 1.5-1.125h2.868c2.937 0 4.6 1.68 4.6 3.98 0 2.05-1.173 3.61-3.237 3.61H9.423c-.722 0-1.38-.404-1.5-1.125L7.333 23.528zm10.05-10.232c-1.312 0-2.113-.78-2.528-1.724-.62-1.362-.23-3.03.938-3.03 1.33 0 2.13.792 2.545 1.736.62 1.35.233 3.018-.955 3.018zm-5.625 0c-1.312 0-2.113-.78-2.528-1.724-.62-1.362-.23-3.03.938-3.03 1.33 0 2.13.792 2.545 1.736.62 1.35.233 3.018-.955 3.018zm-5.625 0c-1.312 0-2.113-.78-2.528-1.724-.62-1.362-.23-3.03.938-3.03 1.33 0 2.13.792 2.545 1.736.62 1.35.233 3.018-.955 3.018zm-.937-6.23c-3.125 0-5.367 2.21-5.367 5.176 0 2.454 1.637 4.545 4.14 4.545h.333l.16-.832c-.127 0-.258-.002-.388-.002-1.313 0-2.113-.78-2.528-1.724-.62-1.362-.23-3.03.938-3.03 1.33 0 2.13.792 2.545 1.736.62 1.35.233 3.018-.955 3.018h.15c.31-.002.623-.01.938-.02l.213-1.103c.14-.72.76-1.125 1.5-1.125h2.868c3.125 0 5.367-2.21 5.367-5.176 0-2.454-1.637-4.545-4.14-4.545H5.197zm10.7 0h-2.868c-.74 0-1.36.405-1.5 1.125l-.333 1.724c-.03.14-.05.28-.05.43 0 1.95 1.14 3.52 3.104 3.52s3.104-1.57 3.104-3.52c0-2.03-1.173-3.68-3.237-3.68l-.21-.002z"/></svg>
                                    Pay with PayPal
                                </Button>
                            </div>
                           )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  )
}


'use client'

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import PayPalButtonsWrapper from "@/components/billing/paypal-buttons"

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
        monthlyPlanId: '',
        yearlyPlanId: '',
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
        // =================================================================
        // IMPORTANT: Replace with your actual Plan IDs from PayPal
        // To resolve the API error, you must create subscription plans
        // in your PayPal Developer Dashboard and use the generated IDs here.
        // =================================================================
        monthlyPlanId: 'P-1234567890123456', // <-- REPLACE THIS
        yearlyPlanId: 'P-9876543210987654',  // <-- AND REPLACE THIS
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
                            <div className="w-full space-y-4">
                                <p className="text-sm text-center text-muted-foreground">Upgrade via Card (coming soon) or PayPal:</p>
                                <PayPalButtonsWrapper 
                                    planId={billingCycle === 'monthly' ? plan.monthlyPlanId : plan.yearlyPlanId} 
                                />
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

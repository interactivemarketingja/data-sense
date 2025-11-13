
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

const PayPalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="mr-2">
        <path fill="#003087" d="M20.344 6.258a2.12 2.12 0 0 0-2.012-1.572H8.384c-.53 0-.99.39-1.12.903l-3.016 11.96a.65.65 0 0 0 .633.801h3.332c.52 0 .973-.382 1.11-.889l.86-3.392a.604.604 0 0 1 .59-.447h1.62c2.97 0 5.43-2.32 5.56-5.26.12-2.58-1.7-4.83-4.13-5.163z"/>
        <path fill="#009cde" d="M22.506 8.358a2.32 2.32 0 0 0-2.22-1.798H9.684c-.53 0-.99.39-1.12.903l-1.42 5.627c-.08.33.15.65.48.65h3.33c.52 0 .973-.382 1.11-.889l.54-2.13a.604.604 0 0 1 .59-.447h.84c2.89 0 5.2-2.19 5.3-4.94.01-1.42-.6-2.73-1.67-3.6z"/>
        <path fill="#002f86" d="m14.07 11.233-1.04 4.103a.81.81 0 0 1-.79.613H8.384c-.53 0-.99.39-1.12.903L6.8 18.59a.65.65 0 0 0 .63.801h3.33c.52 0 .973-.382 1.11-.889l1.04-4.103a.81.81 0 0 0-.79-.613c-.02 0-.03 0-.05.001z"/>
    </svg>
)

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
                        <CardFooter className="flex-col items-stretch space-y-2">
                            <Button className="w-full" disabled={plan.isCurrent}>
                                {plan.cta}
                            </Button>
                            {!plan.isCurrent && (
                                <>
                                    <div className="relative my-2">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-card px-2 text-muted-foreground">
                                                OR
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full" style={{backgroundColor: '#ffc439'}}>
                                        <PayPalIcon />
                                        Pay with PayPal
                                    </Button>
                                </>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  )
}

'use client'

import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const plans = [
    {
        name: 'Free',
        price: '$0',
        period: '/ month',
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
        price: '$29',
        period: '/ month',
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
                <Label htmlFor="billing-cycle">Monthly</Label>
                <Switch id="billing-cycle" />
                <Label htmlFor="billing-cycle">Yearly</Label>
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">-20%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`flex flex-col ${plan.isCurrent ? 'border-primary' : ''}`}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                            <div>
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className="text-muted-foreground">{plan.period}</span>
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
                            <Button className="w-full" disabled={plan.isCurrent}>
                                {plan.cta}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  )
}

'use client'

import React from 'react';
import { PayPalButtons as ReactPayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

interface PayPalButtonsProps {
  planId: string;
}

const PayPalSubscribeButtons: React.FC<PayPalButtonsProps> = ({ planId }) => {
  const { toast } = useToast();
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return <Skeleton className="h-[48px] w-full" />;
  }

  return (
    <ReactPayPalButtons
        style={{
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        }}
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            'plan_id': planId
          });
        }}
        onApprove={(data, actions) => {
          toast({
            title: "Subscription Successful!",
            description: `Subscription started with ID: ${data.subscriptionID}`,
          });
          // In a real application, you would save the subscription details to your backend
          // and grant the user access to the pro features.
          return Promise.resolve();
        }}
        onError={(err) => {
          console.error('PayPal Subscription Error:', err);
          toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: "Something went wrong with the PayPal transaction. Please try again.",
          });
        }}
    />
  );
};

export default PayPalSubscribeButtons;

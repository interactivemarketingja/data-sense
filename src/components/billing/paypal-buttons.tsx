'use client'

import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonsProps {
  planId: string;
}

const PayPalButtons: React.FC<PayPalButtonsProps> = ({ planId }) => {
  const { toast } = useToast();
  const [isSdkReady, setIsSdkReady] = useState(false);

  useEffect(() => {
    if (window.paypal && window.paypal.Buttons) {
      setIsSdkReady(true);
    } else {
      const interval = setInterval(() => {
        if (window.paypal && window.paypal.Buttons) {
          setIsSdkReady(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (isSdkReady) {
      window.paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
        },
        createSubscription: function(data: any, actions: any) {
          // This function is called when the user clicks the PayPal button.
          // It creates a subscription with the specified plan ID.
          return actions.subscription.create({
            'plan_id': planId
          });
        },
        onApprove: function(data: any, actions: any) {
          // This function is called after the user approves the subscription.
          toast({
            title: "Subscription Successful!",
            description: `Subscription started with ID: ${data.subscriptionID}`,
          });
          // In a real application, you would save the subscription details to your backend
          // and grant the user access to the pro features.
        },
        onError: function(err: any) {
          // This function is called if an error occurs.
          console.error('PayPal Subscription Error:', err);
          toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: "Something went wrong with the PayPal transaction. Please try again.",
          });
        }
      }).render('#paypal-button-container');
    }
  }, [isSdkReady, planId, toast]);

  if (!isSdkReady) {
    return <div className="text-center p-4">Loading Payment Options...</div>;
  }

  return <div id="paypal-button-container" className="min-h-[100px]"></div>;
};

export default PayPalButtons;

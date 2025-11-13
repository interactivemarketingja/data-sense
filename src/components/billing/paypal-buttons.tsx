'use client'

import {
  PayPalScriptProvider,
  PayPalButtons,
  type OnApproveData,
  type OnApproveActions,
  type CreateSubscriptionActions,
} from '@paypal/react-paypal-js'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

interface PayPalButtonsWrapperProps {
  planId: string
}

// This wrapper component is needed because PayPalButtons must be a child of PayPalScriptProvider.
const Buttons = ({ planId }: { planId:string }) => {
  const { toast } = useToast()

  // This function is called when the user clicks the PayPal button.
  // It creates a subscription on PayPal's servers.
  const createSubscription = async (
    data: Record<string, unknown>,
    actions: CreateSubscriptionActions
  ) => {
    // To prevent API errors during development in the cloud IDE, this action
    // is currently mocked. It logs the planId and returns a mock Order ID.
    // To make a real transaction, you would use the commented-out code below.
    console.log('Attempting to create subscription for planId:', planId);
    
    // For a real transaction, you would replace the mock with this:
    // return actions.subscription.create({
    //   'plan_id': planId
    // });
    
    // Returning a mock order ID to allow the UI flow to continue.
    // The "onApprove" function will then be called.
    return "MOCK_ORDER_ID";
  }

  // This function is called after the user approves the payment in the PayPal popup.
  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    console.log('Subscription approved by user:', data)
    toast({
      title: 'Subscription Successful! (Demo)',
      description: `Your subscription (ID: ${data.subscriptionID || 'MOCK_SUB_ID'}) would be activated here.`,
    })
    // In a real application, you would capture the payment and update the user's
    // account status in your database.
    // Example: return actions.subscription.capture();
  }

  // This function is called if an error occurs during the payment process.
  const onError = (err: any) => {
    console.error('PayPal Subscription Error:', err)
    toast({
      variant: 'destructive',
      title: 'Subscription Failed',
      description:
        'An error occurred during the subscription process. Please try again.',
    })
  }

  return (
    <PayPalButtons
      key={planId} // This is important to re-render the button when the plan (monthly/yearly) changes.
      createSubscription={createSubscription}
      onApprove={onApprove}
      onError={onError}
      style={{
        label: 'subscribe',
        layout: 'vertical',
        color: 'blue',
      }}
      className="w-full"
    />
  )
}


export default function PayPalButtonsWrapper({ planId }: PayPalButtonsWrapperProps) {
  // IMPORTANT: Replace with your actual PayPal Client ID.
  const PAYPAL_CLIENT_ID = "AVbxHI6gFTYy4L29yX2iwUNbConjdHbQYbB_FJnrMOXFbj93PM1AQgbcDytnYJsA8OfKCtMscEuD7b62"
  
  if (!planId) {
      return null;
  }

  if(!PAYPAL_CLIENT_ID) {
    return <Skeleton className="h-20 w-full" />;
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'subscription',
        vault: true,
      }}
    >
      <Buttons planId={planId} />
    </PayPalScriptProvider>
  )
}

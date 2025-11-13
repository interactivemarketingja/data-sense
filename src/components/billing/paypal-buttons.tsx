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

const ButtonWrapper = ({ planId }: { planId:string }) => {
  const { toast } = useToast()

  const createSubscription = async (
    data: Record<string, unknown>,
    actions: CreateSubscriptionActions
  ) => {
    // In a real application, this would create the subscription on the server.
    // For this demo, we'll log it and return a placeholder order ID.
    // This prevents errors from invalid plan IDs in a sandbox environment.
    console.log('Creating subscription for planId:', planId);
    
    // This is a mocked action to prevent API errors.
    // A real implementation would look like:
    // return actions.subscription.create({
    //   plan_id: planId,
    // });
    
    // We return a dummy orderID to proceed to the approval step.
    return "MOCK-ORDER-ID";
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    // This function is called when the user approves the subscription.
    // In a real application, you would handle the successful subscription here,
    // e.g., by saving the subscription ID to your database and updating the user's account.
    console.log('Subscription approved:', data)
    toast({
      title: 'Subscription Successful! (Demo)',
      description: `Your subscription (ID: ${data.subscriptionID || 'MOCK-SUB-ID'}) has been activated.`,
    })
    // You can redirect the user or update the UI here.
    // For this example, we'll just show a success message.
  }

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
      key={planId} // Force re-render when planId changes
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
      <ButtonWrapper planId={planId} />
    </PayPalScriptProvider>
  )
}

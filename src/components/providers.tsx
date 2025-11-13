'use client'

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Providers({ children }: { children: ReactNode }) {
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "AVbxHI6gFTYy4L29yX2iwUNbConjdHbQYbB_FJnrMOXFbj93PM1AQgbcDytnYJsA8OfKCtMscEuD7b62";

    const initialOptions = {
        "client-id": paypalClientId,
        currency: "USD",
        intent: "subscription",
        "data-sdk-integration-source": "developer-studio"
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
        </PayPalScriptProvider>
    )
}

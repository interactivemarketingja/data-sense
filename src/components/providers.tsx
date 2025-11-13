'use client'

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function Providers({ children }: { children: ReactNode }) {
    // Hardcoding the Client ID to ensure it's available on the client.
    const paypalClientId = "AVbxHI6gFTYy4L29yX2iwUNbConjdHbQYbB_FJnrMOXFbj93PM1AQgbcDytnYJsA8OfKCtMscEuD7b62";

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

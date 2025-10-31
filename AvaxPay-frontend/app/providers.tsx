"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { ThemeProvider } from "next-themes";
import { config } from "@/lib/wagmi-config";
import { Toaster } from "sonner";
import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={{
              lightMode: lightTheme({
                accentColor: "#3b82f6",
                accentColorForeground: "white",
                borderRadius: "large",
              }),
              darkMode: darkTheme({
                accentColor: "#3b82f6",
                accentColorForeground: "white",
                borderRadius: "large",
              }),
            }}
          >
            {children}
            <Toaster position="top-right" richColors />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AvaxPay - Decentralized Payment Processor",
  description: "Accept crypto payments with 0.5% fees on Avalanche. Built with Core Wallet support.",
  keywords: ["Avalanche", "AVAX", "payments", "crypto", "Core Wallet", "Web3"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {/* Remove pt-16, make sections handle their own spacing */}
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@/lib/hooks/useWallet';

export function CTASection() {
  const { isConnected } = useWallet();

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className="glass rounded-3xl border border-white/10 p-12 md:p-16 text-center relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 -z-10" />
          
          {/* Content */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Accept <span className="text-gradient">Crypto Payments?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the future of payments. Start accepting AVAX, USDC, and USDT with the lowest fees in the industry.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isConnected ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary-600 text-white px-8 h-14 text-lg group">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-600 text-white px-8 h-14 text-lg"
                    onClick={openConnectModal}
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
              </ConnectButton.Custom>
            )}

            <Link href="https://github.com/yourusername/avaxpay" target="_blank">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass border-white/20 hover:bg-white/10 px-8 h-14 text-lg"
              >
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

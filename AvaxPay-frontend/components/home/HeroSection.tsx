'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Coins } from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@/lib/hooks/useWallet';

export function HeroSection() {
  const { isConnected } = useWallet();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 glass border border-white/20 rounded-full px-4 py-2 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-white/90">Built on Avalanche</span>
        </div> */}

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
          <span className="text-gradient">Crypto Payments</span>
          <br />
          <span className="text-white ">Made Simple</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Send and receive crypto payments with just a link. No complex addresses, no confusion. Just click and pay.
        </p>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8">
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-gradient mb-2">0.5%</div>
            <div className="text-sm text-white/70">Transaction Fee</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-gradient mb-2">Instant</div>
            <div className="text-sm text-white/70">Settlement</div>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-gradient mb-2">3</div>
            <div className="text-sm text-white/70">Supported Tokens</div>
          </div>
        </div> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          {isConnected ? (
            <Link href="/create-payment-link">
              <Button size="lg" className="bg-primary hover:bg-primary-600 text-white px-8 h-14 text-lg group">
                Create Payment Link
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
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
            </ConnectButton.Custom>
          )}

          <Link href="/dashboard">
            <Button 
              size="lg" 
              variant="outline" 
              className="glass border-white/20 text-white hover:bg-white/10 px-8 h-14 text-lg"
            >
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        {/* <div className="flex items-center justify-center gap-6 text-sm text-white/60 pt-8">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" />
            <span>Non-Custodial</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            <span>Lightning Fast</span>
          </div>
        </div> */}
      </div>
    </section>
  );
}

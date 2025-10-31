'use client';

import { Wallet, Link as LinkIcon, CheckCircle, Repeat } from 'lucide-react';
import { Card } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Connect your Core, MetaMask, or any Avalanche-compatible wallet to get started.',
  },
  {
    number: '02',
    icon: LinkIcon,
    title: 'Create Payment Link',
    description: 'Generate payment links or subscription plans in seconds. Customize amounts and tokens.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Share & Receive',
    description: 'Share your payment link via URL, QR code, or embedded button. Get paid instantly.',
  },
  {
    number: '04',
    icon: Repeat,
    title: 'Track Everything',
    description: 'Monitor payments, subscriptions, and revenue in your dashboard with real-time analytics.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-linear-to-b from-primary/5 via-background to-background"
>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start accepting crypto payments in 4 simple steps
          </p>
        </div>

        {/* Steps Grid - All cards SAME HEIGHT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative h-full">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[60%] w-full h-0.5 bg-linear-to-r from-primary/50 to-secondary/50 z-0" />
              )}

              <Card className="glass border border-white/10 p-8 hover:border-primary/50 transition-all duration-300 relative z-10 flex flex-col h-full">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary/20 mb-4 shrink-0">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 shrink-0">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content - Takes remaining space */}
                <div className="flex flex-col grow">
                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed grow">
                    {step.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

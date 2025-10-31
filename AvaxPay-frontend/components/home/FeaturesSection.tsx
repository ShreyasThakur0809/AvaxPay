'use client';

import { Zap, Shield, DollarSign, Repeat, Link as LinkIcon, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: DollarSign,
    title: 'One-Time Payments',
    description: 'Accept AVAX, USDC, and USDT with instant settlement. Pay only 0.5% per transaction.',
    color: 'text-primary',
  },
  {
    icon: Repeat,
    title: 'Recurring Subscriptions',
    description: 'Create monthly, weekly, or yearly subscription plans. Automatic billing with zero hassle.',
    color: 'text-secondary',
  },
  {
    icon: LinkIcon,
    title: 'Payment Links',
    description: 'Generate shareable payment URLs and QR codes. Embed payment buttons anywhere.',
    color: 'text-primary',
  },
  {
    icon: CreditCard,
    title: 'Fiat On-Ramp',
    description: 'Accept credit cards via Moonpay integration. Convert fiat to crypto seamlessly.',
    color: 'text-secondary',
  },
  {
    icon: Shield,
    title: 'Non-Custodial',
    description: 'You control your funds. Payments go directly to your wallet with no intermediaries.',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'Receive payments immediately on Avalanche. No waiting periods or holding times.',
    color: 'text-secondary',
  },
];

export function FeaturesSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4 relative bg-linear-to-b from-background via-background to-primary/5"
>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/5 to-transparent -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient">Powerful Features</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to accept crypto payments and manage subscriptions on Avalanche
          </p>
        </div>

        {/* Features Grid - All cards same height */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="glass border border-white/10 p-8 hover:border-white/20 transition-all duration-300 hover:scale-105 group flex flex-col h-full"
            >
              <div className={`w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shrink-0`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed grow">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

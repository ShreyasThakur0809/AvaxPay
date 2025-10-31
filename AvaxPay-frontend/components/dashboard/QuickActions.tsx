'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Share2, BarChart3, Settings, Clock } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      label: 'Create Payment Link',
      href: '/create-payment-link',
      description: 'Generate a new payment URL',
    },
    {
      icon: Share2,
      label: 'Add Payment Button',
      href: '/button-demo',
      description: 'Embed on your website',
    },
    {
      icon: Clock,
      label: 'Manage Subscriptions',
      href: '/dashboard/subscriptions',
      description: 'Recurring payments',
    },
    {
      icon: BarChart3,
      label: 'View Analytics',
      href: '/dashboard/analytics',
      description: 'Detailed insights',
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
      description: 'Account preferences',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card className="glass border border-white/10 p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <action.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{action.label}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

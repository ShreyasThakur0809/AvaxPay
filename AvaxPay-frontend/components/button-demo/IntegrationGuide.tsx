'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ExternalLink } from 'lucide-react';

export function IntegrationGuide() {
  const guides = [
    {
      title: 'Shopify',
      description: 'Add payment button to your Shopify store',
      icon: '🛍️',
      difficulty: 'Easy',
      docs: 'https://docs.avaxpay.local/shopify',
    },
    {
      title: 'WordPress',
      description: 'WooCommerce plugin for AvaxPay',
      icon: '📝',
      difficulty: 'Easy',
      docs: 'https://docs.avaxpay.local/wordpress',
    },
    {
      title: 'Webflow',
      description: 'Custom code integration guide',
      icon: '🎨',
      difficulty: 'Medium',
      docs: 'https://docs.avaxpay.local/webflow',
    },
    {
      title: 'Next.js',
      description: 'React component integration',
      icon: '⚛️',
      difficulty: 'Medium',
      docs: 'https://docs.avaxpay.local/nextjs',
    },
    {
      title: 'Vue.js',
      description: 'Vue component integration',
      icon: '💚',
      difficulty: 'Medium',
      docs: 'https://docs.avaxpay.local/vuejs',
    },
    {
      title: 'Custom HTML',
      description: 'Vanilla JavaScript integration',
      icon: '🔧',
      difficulty: 'Hard',
      docs: 'https://docs.avaxpay.local/html',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Integration Guides</h2>
        <p className="text-muted-foreground">
          Choose your platform and follow the integration guide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide, index) => (
          <Card
            key={index}
            className="glass border border-white/10 p-6 hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">{guide.icon}</div>
              <Badge
                variant="outline"
                className={`text-xs ${
                  guide.difficulty === 'Easy'
                    ? 'bg-secondary/20 text-secondary border-secondary/30'
                    : guide.difficulty === 'Medium'
                    ? 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30'
                    : 'bg-destructive/20 text-destructive border-destructive/30'
                }`}
              >
                {guide.difficulty}
              </Badge>
            </div>

            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {guide.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 grow">
              {guide.description}
            </p>

            <a
              href={guide.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary-600 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              View Guide
              <ExternalLink className="w-3 h-3" />
            </a>
          </Card>
        ))}
      </div>

      {/* Features List */}
      <Card className="glass border border-white/10 p-6 bg-secondary/5">
        <h3 className="text-lg font-semibold mb-4">Button Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">Accept Multiple Tokens</p>
              <p className="text-sm text-muted-foreground">AVAX, USDC, USDT</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">Instant Confirmation</p>
              <p className="text-sm text-muted-foreground">
                Real-time transaction status
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">Customizable Styling</p>
              <p className="text-sm text-muted-foreground">Match your brand</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">Webhook Support</p>
              <p className="text-sm text-muted-foreground">
                Real-time payment notifications
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">Mobile Responsive</p>
              <p className="text-sm text-muted-foreground">Works everywhere</p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="font-medium">0.5% Fees</p>
              <p className="text-sm text-muted-foreground">Lowest on Avalanche</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

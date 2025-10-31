'use client';

import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

const comparisons = [
  { feature: 'Transaction Fee', avaxpay: '0.5%', stripe: '2.9% + $0.30', paypal: '2.99% + $0.49' },
  { feature: 'Settlement Time', avaxpay: 'Instant', stripe: '2-7 days', paypal: '1-3 days' },
  { feature: 'Chargeback Risk', avaxpay: 'None', stripe: 'Yes', paypal: 'Yes' },
  { feature: 'Account Freezing', avaxpay: 'Impossible', stripe: 'Possible', paypal: 'Possible' },
  { feature: 'Cryptocurrency Support', avaxpay: 'Native', stripe: 'Limited', paypal: 'Limited' },
  { feature: 'Global Access', avaxpay: 'Unrestricted', stripe: 'Restricted', paypal: 'Restricted' },
];

export function ComparisonSection() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-gradient">AvaxPay?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AvaxPay stacks up against traditional payment processors
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="glass border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Feature</th>
                  <th className="p-4 text-sm font-semibold text-primary">AvaxPay</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Stripe</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">PayPal</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold">
                        <Check className="w-4 h-4" />
                        {item.avaxpay}
                      </span>
                    </td>
                    <td className="p-4 text-center text-muted-foreground">{item.stripe}</td>
                    <td className="p-4 text-center text-muted-foreground">{item.paypal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Savings Calculator */}
        <div className="mt-12 glass rounded-2xl border border-white/10 p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Save <span className="text-gradient">$2,400/year</span> on a $100K revenue
          </h3>
          <p className="text-muted-foreground">
            With AvaxPay&apos;s 0.5% fee vs Stripe&apos;s 2.9% fee, you save $2,400 annually on $100,000 in transactions
          </p>
        </div>
      </div>
    </section>
  );
}

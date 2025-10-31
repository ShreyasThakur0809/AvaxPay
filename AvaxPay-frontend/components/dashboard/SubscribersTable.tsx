'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { shortenAddress, formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface Subscriber {
  address: string;
  amount: string;
  interval: string;
  nextPayment: number;
  totalPayments: number;
  status: 'active' | 'cancelled' | 'overdue';
}

interface SubscribersTableProps {
  subscribers: Subscriber[];
  loading?: boolean;
}

export function SubscribersTable({
  subscribers,
  loading = false,
}: SubscribersTableProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    toast.success('Address copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'overdue':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <Card className="glass border border-white/10 overflow-hidden">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Subscriber Address</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Interval</TableHead>
              <TableHead className="text-muted-foreground">Next Payment</TableHead>
              <TableHead className="text-muted-foreground">Total Payments</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No subscribers yet
                </TableCell>
              </TableRow>
            ) : (
              subscribers.map((subscriber, index) => (
                <TableRow
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <span>{shortenAddress(subscriber.address)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(subscriber.address)}
                        className="p-0 h-auto hover:bg-transparent"
                      >
                        {copied === subscriber.address ? (
                          <Check className="w-4 h-4 text-secondary" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(parseFloat(subscriber.amount), 'USD')}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{subscriber.interval}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(subscriber.nextPayment)}
                  </TableCell>
                  <TableCell className="text-center">{subscriber.totalPayments}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize border ${getStatusColor(subscriber.status)}`}
                    >
                      {subscriber.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Copy, MoreVertical, Eye, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { shortenAddress, formatCurrency, formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import { CancelSubscriptionModal } from './CancelSubscriptionModal';

interface Subscriber {
  address: string;
  amount: string;
  interval: string;
  nextPayment: number;
  totalPayments: number;
  status: 'active' | 'cancelled' | 'overdue';
}

interface SubscribersTableWithActionsProps {
  subscribers: Subscriber[];
  loading?: boolean;
  onCancelSubscription?: (address: string) => Promise<void>;
}

export function SubscribersTableWithActions({
  subscribers,
  loading = false,
  onCancelSubscription,
}: SubscribersTableWithActionsProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(
    null
  );

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    toast.success('Address copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCancelClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (selectedSubscriber && onCancelSubscription) {
      await onCancelSubscription(selectedSubscriber.address);
    }
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

  const getExplorerUrl = (address: string) => {
    return `https://testnet.snowtrace.io/address/${address}`;
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
    <>
      <Card className="glass border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Address</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Amount
                </TableHead>
                <TableHead className="text-muted-foreground">Interval</TableHead>
                <TableHead className="text-muted-foreground">
                  Next Payment
                </TableHead>
                <TableHead className="text-muted-foreground text-center">
                  Payments
                </TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No subscribers found
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
                        <span>{shortenAddress(subscriber.address, 6)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(subscriber.address)}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          {copied === subscriber.address ? (
                            <span className="text-xs text-secondary">✓</span>
                          ) : (
                            <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-right">
                      ${subscriber.amount}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {subscriber.interval}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {formatDate(subscriber.nextPayment)}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {subscriber.totalPayments}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`capitalize border ${getStatusColor(subscriber.status)}`}
                      >
                        {subscriber.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="glass border-white/10"
                        >
                          <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <a
                            href={getExplorerUrl(subscriber.address)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <DropdownMenuItem className="cursor-pointer hover:bg-white/10">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View on Snowtrace
                            </DropdownMenuItem>
                          </a>

                          <DropdownMenuSeparator className="bg-white/10" />

                          {subscriber.status === 'active' && (
                            <DropdownMenuItem
                              onClick={() => handleCancelClick(subscriber)}
                              className="cursor-pointer hover:bg-destructive/20 text-destructive focus:bg-destructive/20"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Cancel Subscription
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Cancel Modal */}
      {selectedSubscriber && (
        <CancelSubscriptionModal
          isOpen={cancelModalOpen}
          onClose={() => {
            setCancelModalOpen(false);
            setSelectedSubscriber(null);
          }}
          subscriberAddress={selectedSubscriber.address}
          amount={selectedSubscriber.amount}
          onConfirm={handleCancelConfirm}
        />
      )}
    </>
  );
}

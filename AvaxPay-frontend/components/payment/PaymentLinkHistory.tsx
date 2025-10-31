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
import { Copy, ExternalLink, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentLink {
  id: string;
  amount: string;
  token: string;
  description: string;
  link: string;
  createdAt: number;
  views: number;
  status: 'active' | 'inactive' | 'expired';
}

interface PaymentLinkHistoryProps {
  links: PaymentLink[];
  onDelete?: (id: string) => void;
  onCopy?: (link: string) => void;
}

export function PaymentLinkHistory({
  links,
  onDelete,
  onCopy,
}: PaymentLinkHistoryProps) {
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied!');
    onCopy?.(link);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'expired':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <Card className="glass border border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-lg font-semibold">Payment Link History</h3>
        <p className="text-sm text-muted-foreground mt-1">
          View all payment links you&apos;ve created
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Description</TableHead>
              <TableHead className="text-muted-foreground">Created</TableHead>
              <TableHead className="text-muted-foreground text-center">
                Views
              </TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No payment links created yet
                </TableCell>
              </TableRow>
            ) : (
              links.map((link) => (
                <TableRow
                  key={link.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-semibold">
                    {link.amount} {link.token}
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-xs truncate">
                    {link.description}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(link.createdAt)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {link.views}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`capitalize border ${getStatusColor(link.status)}`}
                    >
                      {link.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(link.link)}
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <a href={link.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </a>
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(link.id)}
                          className="h-8 w-8 p-0 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
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

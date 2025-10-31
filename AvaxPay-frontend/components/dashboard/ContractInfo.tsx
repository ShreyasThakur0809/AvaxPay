'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';
import { toast } from 'sonner';

interface ContractInfoProps {
  processorAddress: string;
  subscriptionManagerAddress: string;
  network: string;
}

export function ContractInfo({
  processorAddress,
  subscriptionManagerAddress,
  network,
}: ContractInfoProps) {
  const handleCopy = (address: string, name: string) => {
    navigator.clipboard.writeText(address);
    toast.success(`${name} copied!`);
  };

  const getExplorerUrl = (address: string) => {
    if (network === 'testnet' || network === 'fuji') {
      return `https://testnet.snowtrace.io/address/${address}`;
    }
    return `https://snowtrace.io/address/${address}`;
  };

  return (
    <Card className="glass border border-white/10 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
          <p className="text-sm text-muted-foreground">
            Deployed on {network === 'testnet' || network === 'fuji' ? 'Avalanche Fuji Testnet' : 'Avalanche Mainnet'}
          </p>
        </div>

        {/* Contracts */}
        <div className="space-y-4">
          {/* Processor Contract */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AvaxPay Processor</p>
                <p className="font-mono text-sm text-foreground mt-1">{shortenAddress(processorAddress, 8)}</p>
              </div>
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                Active
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/20 text-xs h-8"
                onClick={() => handleCopy(processorAddress, 'Processor Address')}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <a
                href={getExplorerUrl(processorAddress)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="glass border-white/20 text-xs h-8"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </a>
            </div>
          </div>

          {/* Subscription Manager Contract */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subscription Manager</p>
                <p className="font-mono text-sm text-foreground mt-1">{shortenAddress(subscriptionManagerAddress, 8)}</p>
              </div>
              <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30">
                Active
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="glass border-white/20 text-xs h-8"
                onClick={() => handleCopy(subscriptionManagerAddress, 'Subscription Manager Address')}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <a
                href={getExplorerUrl(subscriptionManagerAddress)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="glass border-white/20 text-xs h-8"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 text-sm text-muted-foreground">
          ℹ️ All transactions are verified on Snowtrace. Never share your private keys with anyone.
        </div>
      </div>
    </Card>
  );
}

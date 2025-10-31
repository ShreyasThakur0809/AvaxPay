'use client';

import { useWallet } from '@/lib/hooks/useWallet';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function NetworkBadge() {
  const { isConnected, correctNetwork, networkName, isTestnet } = useWallet();

  if (!isConnected) return null;

  return (
    <Badge
      variant={correctNetwork ? 'default' : 'destructive'}
      className="glass border border-white/20 px-3 py-1.5 flex items-center gap-2"
    >
      {correctNetwork ? (
        <CheckCircle2 className="w-3 h-3" />
      ) : (
        <AlertCircle className="w-3 h-3" />
      )}
      <span className="text-xs font-medium">
        {networkName}
        {isTestnet && ' (Testnet)'}
      </span>
    </Badge>
  );
}

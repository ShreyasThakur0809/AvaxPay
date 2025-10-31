'use client';

import { useRequireWallet } from '@/lib/hooks/useWallet';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected, requiresConnection } = useRequireWallet();

  if (requiresConnection) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Wallet Required</h2>
          <p className="text-muted-foreground mb-6">
            Please connect your wallet to access this page.
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

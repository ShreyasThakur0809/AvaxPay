'use client';

import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { isWalletConnected, isCorrectNetwork, getChainName } from '@/lib/network-utils';
import { avalancheFuji } from 'wagmi/chains';

/**
 * Custom hook for wallet information with Avalanche-specific helpers
 */
export function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address: address,
    chainId: chainId,
  });

  const connected = isWalletConnected(address);
  const correctNetwork = isCorrectNetwork(chainId);
  const networkName = chainId ? getChainName(chainId) : 'Unknown';
  const isTestnet = chainId === avalancheFuji.id;

  return {
    address,
    isConnected: connected,
    chainId,
    balance: balance?.formatted,
    balanceSymbol: balance?.symbol,
    disconnect,
    correctNetwork,
    networkName,
    isTestnet,
  };
}

/**
 * Hook to check if wallet is connected (for protected routes)
 */
export function useRequireWallet() {
  const { isConnected } = useWallet();
  return { isConnected, requiresConnection: !isConnected };
}

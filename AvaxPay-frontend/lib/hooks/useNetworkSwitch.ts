'use client';

import { useState } from 'react';
import { useSwitchChain } from 'wagmi';
import { avalancheFuji, avalanche } from 'wagmi/chains';
import { toast } from 'sonner';
import { switchToFuji, switchToMainnet } from '@/lib/network-utils';

/**
 * Hook for switching between Avalanche networks
 */
export function useNetworkSwitch() {
  const { switchChain } = useSwitchChain();
  const [switching, setSwitching] = useState(false);

  const switchToFujiNetwork = async () => {
    setSwitching(true);
    try {
      // Try wagmi first
      if (switchChain) {
        switchChain({ chainId: avalancheFuji.id });
        toast.success('Switched to Fuji Testnet');
      } else {
        // Fallback to manual switch
        const success = await switchToFuji();
        if (success) {
          toast.success('Switched to Fuji Testnet');
        } else {
          toast.error('Failed to switch network');
        }
      }
    } catch (error) {
      console.error('Network switch error:', error);
      toast.error('Failed to switch network');
    } finally {
      setSwitching(false);
    }
  };

  const switchToMainnetNetwork = async () => {
    setSwitching(true);
    try {
      if (switchChain) {
        switchChain({ chainId: avalanche.id });
        toast.success('Switched to Avalanche Mainnet');
      } else {
        const success = await switchToMainnet();
        if (success) {
          toast.success('Switched to Avalanche Mainnet');
        } else {
          toast.error('Failed to switch network');
        }
      }
    } catch (error) {
      console.error('Network switch error:', error);
      toast.error('Failed to switch network');
    } finally {
      setSwitching(false);
    }
  };

  return {
    switchToFuji: switchToFujiNetwork,
    switchToMainnet: switchToMainnetNetwork,
    switching,
  };
}

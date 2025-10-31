/**
 * Network utilities for Avalanche
 */

import { avalancheFuji } from 'wagmi/chains';

/**
 * Default chain (Fuji testnet for development)
 */
export const defaultChain = avalancheFuji;

/**
 * Get RPC URL for chain
 */
export function getRpcUrl(chainId: number): string {
  if (chainId === 43113) return 'https://api.avax-test.network/ext/bc/C/rpc';
  if (chainId === 43114) return 'https://api.avax.network/ext/bc/C/rpc';
  throw new Error(`Unsupported chain ID: ${chainId}`);
}

/**
 * Check if wallet is connected
 */
export function isWalletConnected(address: string | undefined): boolean {
  return !!address && address !== '0x0000000000000000000000000000000000000000';
}

/**
 * Get chain name from chain ID
 */
export function getChainName(chainId: number): string {
  switch (chainId) {
    case 43113: return 'Avalanche Fuji Testnet';
    case 43114: return 'Avalanche C-Chain';
    default: return 'Unknown Network';
  }
}

/**
 * Check if on correct network
 */
export function isCorrectNetwork(chainId: number | undefined): boolean {
  return chainId === 43113 || chainId === 43114;
}

/**
 * Get ethereum provider safely
 */
function getEthereumProvider() {
  if (typeof window !== 'undefined') {
    return (window as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum;
  }
  return undefined;
}

/**
 * Switch to Avalanche Fuji network
 */
export async function switchToFuji(): Promise<boolean> {
  const ethereum = getEthereumProvider();
  if (ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }], // 43113 in hex
      });
      return true;
    } catch (error) {
      // Chain not added, try to add it
      const err = error as { code?: number };
      if (err.code === 4902) {
        return await addFujiNetwork();
      }
      console.error('Failed to switch network:', error);
      return false;
    }
  }
  return false;
}

/**
 * Add Avalanche Fuji network to wallet
 */
export async function addFujiNetwork(): Promise<boolean> {
  const ethereum = getEthereumProvider();
  if (ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xa869',
          chainName: 'Avalanche Fuji Testnet',
          nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
          },
          rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://testnet.snowtrace.io/']
        }]
      });
      return true;
    } catch (error) {
      console.error('Failed to add network:', error);
      return false;
    }
  }
  return false;
}

/**
 * Switch to Avalanche mainnet
 */
export async function switchToMainnet(): Promise<boolean> {
  const ethereum = getEthereumProvider();
  if (ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }], // 43114 in hex
      });
      return true;
    } catch (error) {
      const err = error as { code?: number };
      if (err.code === 4902) {
        return await addMainnetNetwork();
      }
      console.error('Failed to switch network:', error);
      return false;
    }
  }
  return false;
}

/**
 * Add Avalanche mainnet to wallet
 */
export async function addMainnetNetwork(): Promise<boolean> {
  const ethereum = getEthereumProvider();
  if (ethereum) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xa86a',
          chainName: 'Avalanche C-Chain',
          nativeCurrency: {
            name: 'Avalanche',
            symbol: 'AVAX',
            decimals: 18
          },
          rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
          blockExplorerUrls: ['https://snowtrace.io/']
        }]
      });
      return true;
    } catch (error) {
      console.error('Failed to add network:', error);
      return false;
    }
  }
  return false;
}

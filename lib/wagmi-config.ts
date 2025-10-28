// lib/wagmi-config.ts

import { createConfig, http } from 'wagmi';
import { avalancheFuji, avalanche } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

/**
 * Wagmi configuration for AvaxPay
 * Supports Avalanche Fuji (testnet) and Avalanche C-Chain (mainnet)
 */
export const wagmiConfig = createConfig({
  chains: [avalancheFuji, avalanche],
  connectors: [
    injected(), // MetaMask, Core Wallet, etc.
  ],
  transports: {
    [avalancheFuji.id]: http('https://api.avax-test.network/ext/bc/C/rpc'),
    [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
});

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
 * Switch to Avalanche Fuji network
 */
export async function switchToFuji() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa869' }], // 43113 in hex
      });
      return true;
    } catch (error: any) {
      // Chain not added, add it
      if (error.code === 4902) {
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
export async function addFujiNetwork() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xa869', // 43113 in hex
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
export async function switchToMainnet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }], // 43114 in hex
      });
      return true;
    } catch (error: any) {
      if (error.code === 4902) {
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
export async function addMainnetNetwork() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0xa86a', // 43114 in hex
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

// Type augmentation for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// lib/contracts.ts

import { ContractAddresses, TokenInfo, NetworkConfig } from './types';

/**
 * Deployed contract addresses on Fuji testnet
 * IMPORTANT: Update these after each deployment!
 */
export const FUJI_CONTRACTS: ContractAddresses = {
  processor: '0x28a5dB9905a59376a40cA91c025B4F3A00Abd4FA',
  subscriptionManager: '0x7469CEC4eF717b2265963f663ABc049Ab15f4FeA',
  tokens: {
    USDC: '0xCAEBa7a92950c55fECCA2568DE953E172815b3a7',
    USDT: '0xECa66Dd77eD582e22C238a18d52D283460fFa8a0'
  }
};

/**
 * Mainnet contract addresses (to be deployed later)
 */
export const MAINNET_CONTRACTS: ContractAddresses = {
  processor: '0x0000000000000000000000000000000000000000', // TODO: Deploy
  subscriptionManager: '0x0000000000000000000000000000000000000000', // TODO
  tokens: {
    USDC: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // Real USDC on Avalanche
    USDT: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7'  // Real USDT on Avalanche
  }
};

/**
 * Get contracts for current network
 */
export function getContracts(chainId: number): ContractAddresses {
  if (chainId === 43113) return FUJI_CONTRACTS;      // Fuji testnet
  if (chainId === 43114) return MAINNET_CONTRACTS;    // Avalanche mainnet
  throw new Error(`Unsupported chain ID: ${chainId}`);
}

/**
 * Supported tokens with metadata
 */
export const SUPPORTED_TOKENS: Record<string, TokenInfo> = {
  AVAX: {
    address: '0x0000000000000000000000000000000000000000', // Native token
    symbol: 'AVAX',
    name: 'Avalanche',
    decimals: 18,
    icon: 'https://cryptologos.cc/logos/avalanche-avax-logo.png'
  },
  USDC: {
    address: FUJI_CONTRACTS.tokens.USDC,
    symbol: 'USDC',
    name: 'USD Coin (Mock)',
    decimals: 6,
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
  },
  USDT: {
    address: FUJI_CONTRACTS.tokens.USDT,
    symbol: 'USDT',
    name: 'Tether USD (Mock)',
    decimals: 6,
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png'
  }
};

/**
 * Network configurations
 */
export const NETWORKS: Record<number, NetworkConfig> = {
  43113: {
    chainId: 43113,
    name: 'Avalanche Fuji Testnet',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    }
  },
  43114: {
    chainId: 43114,
    name: 'Avalanche C-Chain',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    }
  }
};

/**
 * Get token info by symbol
 */
export function getTokenBySymbol(symbol: string): TokenInfo | undefined {
  return SUPPORTED_TOKENS[symbol.toUpperCase()];
}

/**
 * Get token info by address
 */
export function getTokenByAddress(address: string): TokenInfo | undefined {
  return Object.values(SUPPORTED_TOKENS).find(
    token => token.address.toLowerCase() === address.toLowerCase()
  );
}

/**
 * Check if token is native (AVAX)
 */
export function isNativeToken(address: string): boolean {
  return address === '0x0000000000000000000000000000000000000000' || 
         address === '0x0';
}

/**
 * Get network config by chain ID
 */
export function getNetwork(chainId: number): NetworkConfig | undefined {
  return NETWORKS[chainId];
}

/**
 * Get explorer URL for address
 */
export function getExplorerUrl(chainId: number, address: string): string {
  const network = getNetwork(chainId);
  if (!network) return '';
  return `${network.explorerUrl}/address/${address}`;
}

/**
 * Get explorer URL for transaction
 */
export function getExplorerTxUrl(chainId: number, txHash: string): string {
  const network = getNetwork(chainId);
  if (!network) return '';
  return `${network.explorerUrl}/tx/${txHash}`;
}

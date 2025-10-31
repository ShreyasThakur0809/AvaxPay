import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalancheFuji, avalanche } from 'wagmi/chains';
import { http } from 'wagmi';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

if (!projectId) {
  console.warn('⚠️ WalletConnect Project ID is missing. Get one at https://cloud.walletconnect.com');
}

// Simple config - Core Wallet auto-detected!
export const config = getDefaultConfig({
  appName: 'AvaxPay',
  projectId: projectId,
  chains: [avalancheFuji, avalanche],
  transports: {
    [avalancheFuji.id]: http('https://avax-fuji.g.alchemy.com/v2/5sF0mkfo834fgZ0BVRo1ubDqYLuCRcSm'),
    [avalanche.id]: http('https://api.avax.network/ext/bc/C/rpc'),
  },
  ssr: true,
});

// Legacy export for compatibility
export const wagmiConfig = config;

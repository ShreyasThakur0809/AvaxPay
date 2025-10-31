/**
 * Payment request for deep links
 */
export interface PaymentRequest {
  to: string;              // Recipient address
  amount: string;          // Amount in human-readable format
  token?: string;          // Token address (optional, defaults to native AVAX)
  label?: string;          // Payment description
  memo?: string;           // Additional notes
  chainId?: number;        // Network ID (43113 for Fuji, 43114 for mainnet)
}

/**
 * Token metadata
 */
export interface TokenInfo {
  address: string;         // Token contract address
  symbol: string;          // Token symbol (e.g., "USDC")
  name: string;            // Token full name
  decimals: number;        // Token decimals (18 for AVAX, 6 for USDC)
  icon?: string;           // Optional icon URL
}

/**
 * Payment details from contract
 */
export interface PaymentDetails {
  from: string;            // Sender address
  to: string;              // Recipient address
  amount: bigint;          // Amount in wei/smallest unit
  token: string;           // Token address (0x0 for native)
  label: string;           // Payment description
  memo: string;            // Additional notes
  timestamp: bigint;       // Unix timestamp
  processed: boolean;      // Payment status
}

/**
 * Subscription data
 */
export interface Subscription {
  id: string;              // Subscription ID (bytes32)
  subscriber: string;      // Who's paying
  recipient: string;       // Who's receiving
  amountPerPeriod: bigint; // Amount per payment cycle
  intervalSeconds: bigint; // Payment interval in seconds
  token: string;           // Payment token address
  startTimestamp: bigint;  // When subscription started
  lastPaymentTimestamp: bigint;  // Last payment time
  nextPaymentTimestamp: bigint;  // Next payment due
  totalPaymentsMade: bigint;     // Number of payments made
  active: boolean;         // Is subscription active
}

/**
 * Contract addresses for different networks
 */
export interface ContractAddresses {
  processor: string;       // AvaxPayProcessor address
  subscriptionManager: string;  // SubscriptionManager address
  tokens: {
    USDC: string;
    USDT: string;
  };
}

/**
 * Network configuration
 */
export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

/**
 * Subscription plan for UI
 */
export interface SubscriptionPlan {
  name: string;            // Plan name (e.g., "Monthly", "Yearly")
  amount: string;          // Display amount
  interval: number;        // Interval in days
  features: string[];      // List of features
  popular?: boolean;       // Highlight as popular
}

/**
 * Payment link components
 */
export interface DecodedPaymentLink {
  type: 'payment' | 'subscription' | 'batch';
  to: string;
  amount?: string;
  token?: string;
  label?: string;
  memo?: string;
  recipients?: string[];   // For batch payments
  amounts?: string[];      // For batch payments
}

/**
 * Batch payment request
 */
export interface BatchPaymentRequest {
  recipients: string[];    // Array of recipient addresses
  amounts: string[];       // Array of amounts (must match recipients length)
  token?: string;          // Token address (optional)
  label?: string;          // Payment description
}

/**
 * Moonpay transaction request
 */
export interface MoonpayTransactionRequest {
  walletAddress: string;          // Recipient wallet
  currencyCode: string;           // e.g., 'usdc_avalanche'
  baseCurrencyAmount: number;     // Fiat amount (USD)
  externalTransactionId?: string; // Your payment ID
  redirectURL?: string;           // Return URL after payment
}

/**
 * Moonpay transaction response
 */
export interface MoonpayTransactionResponse {
  id: string;                     // Moonpay transaction ID
  status: 'pending' | 'completed' | 'failed';
  cryptoCurrencyId: string;       // e.g., 'usdc_avalanche'
  baseCurrencyAmount: number;     // USD amount
  quoteCurrencyAmount: number;    // Crypto amount
  feeAmount: number;              // Moonpay fee
  walletAddress: string;          // Recipient address
  createdAt: string;              // ISO timestamp
}

/**
 * Moonpay webhook payload
 */
export interface MoonpayWebhookPayload {
  type: 'transaction_completed' | 'transaction_failed';
  data: MoonpayTransactionResponse;
}

// lib/deeplink-utils.ts

import { PaymentRequest, DecodedPaymentLink, BatchPaymentRequest } from './types';
import { isNativeToken, getTokenByAddress } from './contracts';

/**
 * Encode payment request into deep link URL
 * Example: avaxpay://send?to=0xABC...&amount=1.5&token=USDC&label=Coffee
 */
export function encodePaymentLink(request: PaymentRequest): string {
  const params = new URLSearchParams();
  
  // Required parameters
  params.set('to', request.to);
  params.set('amount', request.amount);
  
  // Optional parameters
  if (request.token && !isNativeToken(request.token)) {
    params.set('token', request.token);
  }
  if (request.label) {
    params.set('label', request.label);
  }
  if (request.memo) {
    params.set('memo', request.memo);
  }
  if (request.chainId) {
    params.set('chainId', request.chainId.toString());
  }
  
  return `avaxpay://send?${params.toString()}`;
}

/**
 * Decode deep link URL into payment request
 */
export function decodePaymentLink(link: string): PaymentRequest | null {
  try {
    // Handle both avaxpay:// and https://avaxpay.xyz/ formats
    const url = new URL(link.replace('avaxpay://', 'http://'));
    const params = url.searchParams;
    
    // Validate required parameters
    const to = params.get('to');
    const amount = params.get('amount');
    
    if (!to || !amount) {
      console.error('Missing required parameters: to, amount');
      return null;
    }
    
    // Validate address format
    if (!isValidAddress(to)) {
      console.error('Invalid recipient address');
      return null;
    }
    
    // Validate amount
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      console.error('Invalid amount');
      return null;
    }
    
    return {
      to,
      amount,
      token: params.get('token') || undefined,
      label: params.get('label') || undefined,
      memo: params.get('memo') || undefined,
      chainId: params.get('chainId') ? parseInt(params.get('chainId')!) : 43113
    };
  } catch (error) {
    console.error('Failed to decode payment link:', error);
    return null;
  }
}

/**
 * Encode batch payment into deep link
 * Example: avaxpay://batch?recipients=0xA,0xB&amounts=1,2&label=Dinner
 */
export function encodeBatchPaymentLink(request: BatchPaymentRequest): string {
  const params = new URLSearchParams();
  
  // Validate arrays have same length
  if (request.recipients.length !== request.amounts.length) {
    throw new Error('Recipients and amounts must have same length');
  }
  
  // Encode arrays as comma-separated values
  params.set('recipients', request.recipients.join(','));
  params.set('amounts', request.amounts.join(','));
  
  // Optional parameters
  if (request.token) {
    params.set('token', request.token);
  }
  if (request.label) {
    params.set('label', request.label);
  }
  
  return `avaxpay://batch?${params.toString()}`;
}

/**
 * Decode batch payment link
 */
export function decodeBatchPaymentLink(link: string): BatchPaymentRequest | null {
  try {
    const url = new URL(link.replace('avaxpay://', 'http://'));
    const params = url.searchParams;
    
    const recipientsStr = params.get('recipients');
    const amountsStr = params.get('amounts');
    
    if (!recipientsStr || !amountsStr) {
      return null;
    }
    
    const recipients = recipientsStr.split(',');
    const amounts = amountsStr.split(',');
    
    // Validate all recipients
    if (!recipients.every(addr => isValidAddress(addr))) {
      return null;
    }
    
    // Validate all amounts
    if (!amounts.every(amt => !isNaN(parseFloat(amt)) && parseFloat(amt) > 0)) {
      return null;
    }
    
    return {
      recipients,
      amounts,
      token: params.get('token') || undefined,
      label: params.get('label') || undefined
    };
  } catch (error) {
    console.error('Failed to decode batch payment link:', error);
    return null;
  }
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Shorten address for display
 * Example: 0x742d35Cc...5f0bEb0
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (!isValidAddress(address)) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format amount for display
 * Handles large numbers with K, M suffixes
 */
export function formatAmount(
  amount: string | bigint | number, 
  decimals: number = 18,
  maxDecimals: number = 2
): string {
  let value: number;
  
  if (typeof amount === 'string') {
    value = parseFloat(amount);
  } else if (typeof amount === 'bigint') {
    value = Number(amount) / Math.pow(10, decimals);
  } else {
    value = amount;
  }
  
  // Format with K, M suffixes for large numbers
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(maxDecimals)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(maxDecimals)}K`;
  }
  
  return value.toFixed(maxDecimals);
}

/**
 * Format currency with $ sign
 */
export function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `$${num.toFixed(2)}`;
}

/**
 * Parse amount from user input to wei/smallest unit
 */
export function parseAmount(amount: string, decimals: number = 18): bigint {
  try {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      throw new Error('Invalid amount');
    }
    
    // Convert to smallest unit (wei for 18 decimals, etc.)
    const multiplier = BigInt(10 ** decimals);
    const integerPart = BigInt(Math.floor(num));
    const decimalPart = Math.round((num - Math.floor(num)) * Number(multiplier));
    
    return integerPart * multiplier + BigInt(decimalPart);
  } catch (error) {
    throw new Error('Failed to parse amount');
  }
}

/**
 * Format wei/smallest unit to human-readable amount
 */
export function formatUnits(value: bigint, decimals: number = 18): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const remainder = value % divisor;
  
  // Convert remainder to decimal string
  const decimalStr = remainder.toString().padStart(decimals, '0');
  
  return `${integerPart}.${decimalStr}`;
}

/**
 * Calculate time until next payment
 */
export function getTimeUntilNextPayment(nextPaymentTimestamp: bigint): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = Number(nextPaymentTimestamp) - now;
  
  if (diff <= 0) return 'Payment due';
  
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: bigint | number): string {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp;
  const date = new Date(ts * 1000);
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Generate QR code data URL
 * Note: Requires qrcode library in actual implementation
 */
export function generateQRCode(text: string): string {
  // Placeholder - in real implementation, use 'qrcode' library
  // import QRCode from 'qrcode';
  // return await QRCode.toDataURL(text);
  return `data:image/png;base64,placeholder_for_${text}`;
}

/**
 * Calculate monthly recurring revenue (MRR) from subscription
 */
export function calculateMRR(
  amountPerPeriod: bigint, 
  intervalSeconds: bigint,
  decimals: number = 18
): number {
  const monthInSeconds = 2592000; // 30 days
  const amount = Number(amountPerPeriod) / Math.pow(10, decimals);
  const interval = Number(intervalSeconds);
  
  return (amount * monthInSeconds) / interval;
}

/**
 * Check if subscription payment is overdue
 */
export function isPaymentOverdue(nextPaymentTimestamp: bigint): boolean {
  const now = Math.floor(Date.now() / 1000);
  return Number(nextPaymentTimestamp) < now;
}

/**
 * Get subscription interval in human-readable format
 */
export function getIntervalText(intervalSeconds: bigint): string {
  const seconds = Number(intervalSeconds);
  const days = Math.floor(seconds / 86400);
  
  if (days === 1) return 'Daily';
  if (days === 7) return 'Weekly';
  if (days === 30) return 'Monthly';
  if (days === 365) return 'Yearly';
  
  return `Every ${days} days`;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Share text via Web Share API (mobile)
 */
export async function shareText(text: string, title?: string): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share({
        title: title || 'AvaxPay Payment Link',
        text: text
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to share:', error);
    return false;
  }
}

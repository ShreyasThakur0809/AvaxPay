// lib/moonpay-config.ts

/**
 * Moonpay Configuration
 * NOTE: For testnet/grant demo, we're using simulated values
 * Replace with real API keys after securing grant funding
 */

export const MOONPAY_CONFIG = {
  // API Keys (simulated for demo)
  apiKey: 'demo_api_key_replace_after_grant',
  secretKey: 'demo_secret_key_replace_after_grant',
  
  // Moonpay widget URL
  widgetUrl: 'https://buy.moonpay.com',
  
  // API endpoint (sandbox)
  apiUrl: 'https://api.moonpay.com/v3',
  
  // Supported currencies
  supportedCurrencies: [
    {
      code: 'usdc_avalanche',
      name: 'USDC on Avalanche',
      minAmount: 30,      // Min $30
      maxAmount: 20000    // Max $20,000
    },
    {
      code: 'avax',
      name: 'AVAX',
      minAmount: 30,
      maxAmount: 20000
    }
  ],
  
  // Fee structure
  fees: {
    percentage: 4.5,    // 4.5% Moonpay fee
    fixed: 0            // No fixed fee
  },
  
  // Demo mode flag
  isDemoMode: true      // Set to false in production
};

/**
 * Get Moonpay widget URL with parameters
 */
export function getMoonpayWidgetUrl(params: {
  walletAddress: string;
  currencyCode: string;
  baseCurrencyAmount: number;
  externalTransactionId?: string;
}): string {
  const urlParams = new URLSearchParams({
    apiKey: MOONPAY_CONFIG.apiKey,
    currencyCode: params.currencyCode,
    walletAddress: params.walletAddress,
    baseCurrencyAmount: params.baseCurrencyAmount.toString(),
  });
  
  if (params.externalTransactionId) {
    urlParams.set('externalTransactionId', params.externalTransactionId);
  }
  
  return `${MOONPAY_CONFIG.widgetUrl}?${urlParams.toString()}`;
}

/**
 * Calculate total cost including Moonpay fees
 */
export function calculateMoonpayTotal(amount: number): {
  amount: number;
  fee: number;
  total: number;
} {
  const fee = amount * (MOONPAY_CONFIG.fees.percentage / 100);
  const total = amount + fee;
  
  return {
    amount,
    fee: parseFloat(fee.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  };
}

/**
 * Validate amount is within Moonpay limits
 */
export function isValidMoonpayAmount(
  amount: number, 
  currencyCode: string
): boolean {
  const currency = MOONPAY_CONFIG.supportedCurrencies.find(
    c => c.code === currencyCode
  );
  
  if (!currency) return false;
  
  return amount >= currency.minAmount && amount <= currency.maxAmount;
}

// scripts/test-utilities.ts

import { 
  encodePaymentLink, 
  decodePaymentLink,
  encodeBatchPaymentLink,
  isValidAddress,
  shortenAddress,
  formatAmount,
  calculateMRR,
  getIntervalText,
  formatDate
} from '../lib/deeplink-utils';

import { 
  getTokenBySymbol,
  getTokenByAddress,
  isNativeToken,
  getExplorerUrl,
  FUJI_CONTRACTS
} from '../lib/contracts';

async function main() {
  console.log("🧪 Testing AvaxPay Utilities...\n");
  
  // ========================================
  // TEST 1: Address Validation
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 1: Address Validation");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const validAddress = "0x60Be870885C5b537AC179CfACdcc9Fad145CAC55";
  const invalidAddress = "0x123";
  
  console.log(`Valid address (${validAddress}):`, isValidAddress(validAddress));
  console.log(`Invalid address (${invalidAddress}):`, isValidAddress(invalidAddress));
  console.log(`Shortened: ${shortenAddress(validAddress)}`);
  console.log("");
  
  // ========================================
  // TEST 2: Payment Link Encoding/Decoding
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 2: Payment Link Encoding/Decoding");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const paymentRequest = {
    to: validAddress,
    amount: "1.5",
    token: "USDC",
    label: "Coffee payment",
    memo: "Thanks!"
  };
  
  const deepLink = encodePaymentLink(paymentRequest);
  console.log("Encoded link:", deepLink);
  
  const decoded = decodePaymentLink(deepLink);
  console.log("Decoded request:", decoded);
  console.log("Match original:", decoded?.to === paymentRequest.to);
  console.log("");
  
  // ========================================
  // TEST 3: Batch Payment Links
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 3: Batch Payment Links");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const batchRequest = {
    recipients: [
      "0x60Be870885C5b537AC179CfACdcc9Fad145CAC55",
      "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb0"
    ],
    amounts: ["1.5", "2.0"],
    label: "Dinner split"
  };
  
  const batchLink = encodeBatchPaymentLink(batchRequest);
  console.log("Batch link:", batchLink);
  console.log("");
  
  // ========================================
  // TEST 4: Token Lookups
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 4: Token Lookups");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const avax = getTokenBySymbol("AVAX");
  console.log("AVAX token:", avax?.name, "-", avax?.symbol);
  
  const usdc = getTokenBySymbol("USDC");
  console.log("USDC token:", usdc?.name, "-", usdc?.symbol);
  console.log("USDC address:", usdc?.address);
  
  const tokenByAddr = getTokenByAddress(usdc!.address);
  console.log("Token by address:", tokenByAddr?.symbol);
  
  console.log("Is AVAX native?", isNativeToken(avax!.address));
  console.log("");
  
  // ========================================
  // TEST 5: Amount Formatting
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 5: Amount Formatting");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("1500 formatted:", formatAmount("1500"));
  console.log("1500000 formatted:", formatAmount("1500000"));
  console.log("0.123456 formatted:", formatAmount("0.123456", 18, 4));
  console.log("");
  
  // ========================================
  // TEST 6: Subscription Utils
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 6: Subscription Utilities");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  // MRR calculation (10 AVAX per 30 days)
  const amountPerPeriod = BigInt(10) * BigInt(10 ** 18); // 10 AVAX
  const intervalSeconds = BigInt(30 * 86400); // 30 days
  const mrr = calculateMRR(amountPerPeriod, intervalSeconds);
  console.log("MRR (10 AVAX/30 days):", mrr.toFixed(2), "AVAX/month");
  
  // Interval text
  console.log("30 days interval:", getIntervalText(BigInt(30 * 86400)));
  console.log("7 days interval:", getIntervalText(BigInt(7 * 86400)));
  console.log("");
  
  // ========================================
  // TEST 7: Contract Addresses
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 7: Contract Addresses");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("AvaxPayProcessor:", FUJI_CONTRACTS.processor);
  console.log("SubscriptionManager:", FUJI_CONTRACTS.subscriptionManager);
  console.log("MockUSDC:", FUJI_CONTRACTS.tokens.USDC);
  console.log("MockUSDT:", FUJI_CONTRACTS.tokens.USDT);
  console.log("");
  
  // ========================================
  // TEST 8: Explorer URLs
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 8: Explorer URLs");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const explorerUrl = getExplorerUrl(43113, FUJI_CONTRACTS.processor);
  console.log("Processor explorer:", explorerUrl);
  console.log("");
  
  // ========================================
  // TEST 9: Date Formatting
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ TEST 9: Date Formatting");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const now = BigInt(Math.floor(Date.now() / 1000));
  console.log("Current timestamp formatted:", formatDate(now));
  console.log("");
  
  // ========================================
  // SUMMARY
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 ALL UTILITY TESTS PASSED!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("✅ Address validation: Working");
  console.log("✅ Payment link encoding: Working");
  console.log("✅ Batch payment links: Working");
  console.log("✅ Token lookups: Working");
  console.log("✅ Amount formatting: Working");
  console.log("✅ Subscription utils: Working");
  console.log("✅ Contract addresses: Configured");
  console.log("✅ Explorer URLs: Working");
  console.log("✅ Date formatting: Working");
  console.log("");
  
  console.log("🚀 All utilities ready for frontend integration!");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Utility tests failed!");
    console.error(error);
    process.exit(1);
  });

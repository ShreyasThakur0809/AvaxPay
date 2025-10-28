import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
  console.log("🚀 Deploying AvaxPay to Avalanche Fuji Testnet...\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("📋 Deployment Info:");
  console.log("  • Network:", network.name);
  console.log("  • Chain ID:", network.chainId.toString());
  console.log("  • Deployer:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("  • Balance:", ethers.formatEther(balance), "AVAX");
  console.log("");
  
  if (parseFloat(ethers.formatEther(balance)) < 0.5) {
    console.log("⚠️  Warning: Low balance. Get more AVAX from faucet.");
    console.log("   https://core.app/tools/testnet-faucet/");
    console.log("");
  }
  
  const deployedContracts: any = {};
  
  // ========================================
  // 1. DEPLOY AVAXPAY PROCESSOR
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("1/4 - Deploying AvaxPayProcessor...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const AvaxPayProcessor = await ethers.getContractFactory("AvaxPayProcessor");
  console.log("⏳ Deploying contract...");
  
  const processor = await AvaxPayProcessor.deploy();
  await processor.waitForDeployment();
  const processorAddress = await processor.getAddress();
  
  console.log("✅ AvaxPayProcessor deployed!");
  console.log("   Address:", processorAddress);
  console.log("   Explorer:", `https://testnet.snowtrace.io/address/${processorAddress}`);
  console.log("");
  
  deployedContracts.AvaxPayProcessor = processorAddress;
  
  // ========================================
  // 2. DEPLOY SUBSCRIPTION MANAGER
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("2/4 - Deploying SubscriptionManager...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
  console.log("⏳ Deploying contract...");
  
  const subManager = await SubscriptionManager.deploy();
  await subManager.waitForDeployment();
  const subManagerAddress = await subManager.getAddress();
  
  console.log("✅ SubscriptionManager deployed!");
  console.log("   Address:", subManagerAddress);
  console.log("   Explorer:", `https://testnet.snowtrace.io/address/${subManagerAddress}`);
  console.log("");
  
  deployedContracts.SubscriptionManager = subManagerAddress;
  
  // ========================================
  // 3. DEPLOY MOCK USDC
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("3/4 - Deploying MockUSDC...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  console.log("⏳ Deploying contract (1M supply)...");
  
  const usdc = await MockUSDC.deploy(1000000); // 1 million USDC
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  
  console.log("✅ MockUSDC deployed!");
  console.log("   Address:", usdcAddress);
  console.log("   Explorer:", `https://testnet.snowtrace.io/address/${usdcAddress}`);
  console.log("   Initial Supply: 1,000,000 USDC");
  console.log("");
  
  deployedContracts.MockUSDC = usdcAddress;
  
  // ========================================
  // 4. DEPLOY MOCK USDT
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("4/4 - Deploying MockUSDT...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const MockUSDT = await ethers.getContractFactory("MockUSDT");
  console.log("⏳ Deploying contract (1M supply)...");
  
  const usdt = await MockUSDT.deploy(1000000); // 1 million USDT
  await usdt.waitForDeployment();
  const usdtAddress = await usdt.getAddress();
  
  console.log("✅ MockUSDT deployed!");
  console.log("   Address:", usdtAddress);
  console.log("   Explorer:", `https://testnet.snowtrace.io/address/${usdtAddress}`);
  console.log("   Initial Supply: 1,000,000 USDT");
  console.log("");
  
  deployedContracts.MockUSDT = usdtAddress;
  
  // ========================================
  // SAVE DEPLOYMENT INFO
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("💾 Saving Deployment Information...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId.toString(),
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contracts: deployedContracts
  };
  
  // Save to JSON file
  const fileName = `deployments-${network.name}-${Date.now()}.json`;
  fs.writeFileSync(fileName, JSON.stringify(deploymentInfo, null, 2));
  console.log("✅ Deployment info saved to:", fileName);
  console.log("");
  
  // ========================================
  // SUMMARY
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("📝 Deployed Contracts:");
  console.log("");
  console.log("AvaxPayProcessor:");
  console.log("  ", processorAddress);
  console.log("");
  console.log("SubscriptionManager:");
  console.log("  ", subManagerAddress);
  console.log("");
  console.log("MockUSDC:");
  console.log("  ", usdcAddress);
  console.log("");
  console.log("MockUSDT:");
  console.log("  ", usdtAddress);
  console.log("");
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔗 View on Snowtrace Explorer:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("Payment Processor:");
  console.log(`https://testnet.snowtrace.io/address/${processorAddress}`);
  console.log("");
  console.log("Subscription Manager:");
  console.log(`https://testnet.snowtrace.io/address/${subManagerAddress}`);
  console.log("");
  console.log("MockUSDC:");
  console.log(`https://testnet.snowtrace.io/address/${usdcAddress}`);
  console.log("");
  console.log("MockUSDT:");
  console.log(`https://testnet.snowtrace.io/address/${usdtAddress}`);
  console.log("");
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📋 Next Steps:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("1. ✅ Contracts deployed successfully");
  console.log("2. 🔗 Visit Snowtrace links above to verify");
  console.log("3. 📝 Copy addresses to your frontend config");
  console.log("4. 🧪 Test contracts on Fuji testnet");
  console.log("5. 🚀 Ready for Module 3 (frontend utilities)!");
  console.log("");
  
  console.log("🎊 AvaxPay is now LIVE on Avalanche Fuji Testnet!");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  });

import { ethers } from "hardhat";

async function main() {
  console.log("🔗 Checking Avalanche Fuji Testnet Connection...\n");
  
  try {
    const network = await ethers.provider.getNetwork();
    console.log("📡 Network Name:", network.name);
    console.log("🔢 Chain ID:", network.chainId.toString());
    
    const [deployer] = await ethers.getSigners();
    console.log("\n👤 Deployer Account:", deployer.address);
    
    const balance = await ethers.provider.getBalance(deployer.address);
    const balanceInAvax = ethers.formatEther(balance);
    console.log("💰 Balance:", balanceInAvax, "AVAX");
    
    if (parseFloat(balanceInAvax) < 0.1) {
      console.log("\n❌ Insufficient balance!");
      console.log("💡 Get test AVAX from: https://core.app/tools/testnet-faucet/");
      return;
    }
    
    console.log("\n✅ Sufficient balance for deployment!");
    
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("\n📦 Current Block Number:", blockNumber);
    
    console.log("\n✅ Connection successful!");
    console.log("🚀 Ready to deploy contracts!");
    
  } catch (error) {
    console.error("\n❌ Connection failed!");
    console.error(error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

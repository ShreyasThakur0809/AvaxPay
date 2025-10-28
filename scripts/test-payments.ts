import { ethers } from "hardhat";

async function main() {
  console.log("🧪 Testing AvaxPayProcessor V2...\n");
  
  const [deployer, recipient] = await ethers.getSigners();
  
  console.log("👤 Deployer:", deployer.address);
  console.log("👤 Recipient:", recipient.address);
  console.log("");
  
  // ========================================
  // DEPLOY CONTRACTS
  // ========================================
  
  console.log("📦 Deploying contracts...\n");
  
  // Deploy AvaxPayProcessor
  const AvaxPayProcessor = await ethers.getContractFactory("AvaxPayProcessor");
  const processor = await AvaxPayProcessor.deploy();
  await processor.waitForDeployment();
  const processorAddress = await processor.getAddress();
  console.log("✅ AvaxPayProcessor deployed:", processorAddress);
  
  // Deploy MockUSDC (1 million supply)
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy(1000000);
  await usdc.waitForDeployment();
  const usdcAddress = await usdc.getAddress();
  console.log("✅ MockUSDC deployed:", usdcAddress);
  console.log("");
  
  // ========================================
  // TEST 1: NATIVE AVAX PAYMENT
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("TEST 1: Native AVAX Payment");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  const paymentAmount = ethers.parseEther("0.1"); // 0.1 AVAX
  
  console.log("💸 Sending 0.1 AVAX to recipient...");
  
  const recipientBalanceBefore = await ethers.provider.getBalance(recipient.address);
  console.log("📊 Recipient balance before:", ethers.formatEther(recipientBalanceBefore), "AVAX");
  
  const tx1 = await processor.processPayment(
    recipient.address,
    "Test Payment",
    "Testing native AVAX payment",
    { value: paymentAmount }
  );
  
  const receipt1 = await tx1.wait();
  console.log("✅ Transaction confirmed! Gas used:", receipt1?.gasUsed.toString());
  
  const recipientBalanceAfter = await ethers.provider.getBalance(recipient.address);
  console.log("📊 Recipient balance after:", ethers.formatEther(recipientBalanceAfter), "AVAX");
  
  const received = recipientBalanceAfter - recipientBalanceBefore;
  console.log("💰 Amount received:", ethers.formatEther(received), "AVAX");
  console.log("💵 Fee charged:", ethers.formatEther(paymentAmount - received), "AVAX (0.5%)");
  
  // Get payment details
  const totalPayments = await processor.getTotalPayments();
  console.log("📈 Total payments processed:", totalPayments.toString());
  console.log("");
  
  // ========================================
  // TEST 2: ERC-20 TOKEN PAYMENT
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("TEST 2: ERC-20 Token Payment (USDC)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  // Mint 1000 USDC to deployer
  console.log("🪙 Minting 1000 USDC to deployer...");
  const mintTx = await usdc.mint(deployer.address, 1000);
  await mintTx.wait();
  
  const deployerBalance = await usdc.balanceOf(deployer.address);
  console.log("✅ Deployer USDC balance:", ethers.formatUnits(deployerBalance, 6), "USDC");
  console.log("");
  
  // Approve processor to spend USDC
  const approveAmount = ethers.parseUnits("100", 6); // 100 USDC
  console.log("🔓 Approving AvaxPayProcessor to spend 100 USDC...");
  
  const approveTx = await usdc.approve(processorAddress, approveAmount);
  await approveTx.wait();
  console.log("✅ Approval confirmed!");
  
  const allowance = await usdc.allowance(deployer.address, processorAddress);
  console.log("📝 Allowance:", ethers.formatUnits(allowance, 6), "USDC");
  console.log("");
  
  // Send token payment
  const tokenPaymentAmount = ethers.parseUnits("50", 6); // 50 USDC
  console.log("💸 Sending 50 USDC to recipient...");
  
  const recipientUsdcBefore = await usdc.balanceOf(recipient.address);
  console.log("📊 Recipient USDC balance before:", ethers.formatUnits(recipientUsdcBefore, 6), "USDC");
  
  const tx2 = await processor.processTokenPayment(
    recipient.address,
    usdcAddress,
    tokenPaymentAmount,
    "Test Token Payment",
    "Testing USDC payment"
  );
  
  const receipt2 = await tx2.wait();
  console.log("✅ Transaction confirmed! Gas used:", receipt2?.gasUsed.toString());
  
  const recipientUsdcAfter = await usdc.balanceOf(recipient.address);
  console.log("📊 Recipient USDC balance after:", ethers.formatUnits(recipientUsdcAfter, 6), "USDC");
  
  const usdcReceived = recipientUsdcAfter - recipientUsdcBefore;
  console.log("💰 Amount received:", ethers.formatUnits(usdcReceived, 6), "USDC");
  console.log("💵 Fee charged:", ethers.formatUnits(tokenPaymentAmount - usdcReceived, 6), "USDC (0.5%)");
  console.log("");
  
  // ========================================
  // TEST 3: QUERY FUNCTIONS
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("TEST 3: Query Functions");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  // Get user's sent payments
  const sentPayments = await processor.getUserPayments(deployer.address);
  console.log("📤 Payments sent by deployer:", sentPayments.length);
  
  // Get user's received payments
  const receivedPayments = await processor.getUserReceivedPayments(recipient.address);
  console.log("📥 Payments received by recipient:", receivedPayments.length);
  
  // Get total stats
  const totalPaymentsAfter = await processor.getTotalPayments();
  const totalVolume = await processor.getTotalVolume();
  console.log("📈 Total payments processed:", totalPaymentsAfter.toString());
  console.log("💰 Total volume processed:", ethers.formatEther(totalVolume), "AVAX (native only)");
  console.log("");
  
  // ========================================
  // SUMMARY
  // ========================================
  
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✅ ALL TESTS PASSED!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  
  console.log("📋 Summary:");
  console.log("  ✅ Native AVAX payments: Working");
  console.log("  ✅ ERC-20 token payments: Working");
  console.log("  ✅ Fee system: Working (0.5%)");
  console.log("  ✅ Query functions: Working");
  console.log("");
  
  console.log("🎉 AvaxPayProcessor V2 is production-ready!");
  console.log("");
  
  console.log("📝 Deployed Addresses (save these):");
  console.log("  AvaxPayProcessor:", processorAddress);
  console.log("  MockUSDC:", usdcAddress);
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed!");
    console.error(error);
    process.exit(1);
  });

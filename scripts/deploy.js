const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalance(address) {
  const balance = await getBalance(address);
  console.log(`💰 Balance of ${address}: ${balance} ETH`);
}

async function printMemos(memos) {
  for (const memo of memos) {
    console.log(
      `📝 At ${memo.timestramp}, name: ${memo.name}, from: ${memo.from}, message: "${memo.message}"`
    );
  }
}

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const Lock = await hre.ethers.getContractFactory("Lock");
  const contract = await Lock.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log("✅ Contract deployed at:", contractAddress);

  console.log("\n💰 Balance before buying silver:");
  await printBalance(owner.address);

  const amount = { value: hre.ethers.utils.parseEther("0.01") };

  await contract.connect(owner).buysilver("Owner", "Buying from my own account", amount);

  console.log("\n💰 Balance after buying silver:");
  await printBalance(owner.address);

  const memos = await contract.getMemos();
  if (memos && memos.length > 0) {
    console.log("\n📜 Memos:");
    await printMemos(memos);
  } else {
    console.log("\n📜 No memos found.");
  }
}

main().catch((error) => {
  console.error("❌ Error during deployment:", error);
  process.exitCode = 1;
});
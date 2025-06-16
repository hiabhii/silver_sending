const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt); // for Ethers v6+
}

async function printBalances(addresses) {
  let index = 0;
  for (const address of addresses) {
    const balance = await getBalance(address);
    console.log(`Address ${index} (${address}) balance: ${balance} ETH`);
    index++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    console.log(
      `📝 At ${memo.timestramp}, name: ${memo.name}, from: ${memo.from}, message: "${memo.message}"`
    );
  }
}

async function main() {
  const signers = await hre.ethers.getSigners();

  if (signers.length < 4) {
    throw new Error("❌ Not enough signers available. Need at least 4.");
  }

  const [owner, user1, user2, user3] = signers;

  console.log("👤 Signers:");
  signers.forEach((signer, i) => console.log(`  Signer ${i}: ${signer.address}`));

  const Lock = await hre.ethers.getContractFactory("Lock");
  const contract = await Lock.deploy();
  await contract.waitForDeployment(); // ethers v6

  const contractAddress = await contract.getAddress();
  console.log("\n✅ Contract deployed at:", contractAddress);

  const addresses = [owner.address, user1.address, user2.address, user3.address];

  console.log("\n💰 Balances before buying silver:");
  await printBalances(addresses);

  const amount = { value: hre.ethers.parseEther("1") };

  await contract.connect(user1).buysilver("user1", "Great silver!", amount);
  await contract.connect(user2).buysilver("user2", "Smooth finish", amount);
  await contract.connect(user3).buysilver("user3", "Looks premium!", amount);

  console.log("\n💰 Balances after buying silver:");
  await printBalances(addresses);

  const memos = await contract.getMemos();
  console.log("\n📜 Memos:");
  await printMemos(memos);
}

main().catch((error) => {
  console.error("❌ Error during deployment:", error.message);
  process.exitCode = 1;
});
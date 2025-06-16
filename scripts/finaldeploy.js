const hre = require("hardhat");

async function main() {
  // Get contract factory
  const Lock = await hre.ethers.getContractFactory("Lock");

  // Deploy the contract and WAIT for it to complete
  const lock = await Lock.deploy();

  // Wait for it to be mined and ready
  await lock.deployed();

  console.log("✅ Contract deployed at:", lock.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
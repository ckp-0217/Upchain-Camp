// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log('network:', network.name, (await hre.ethers.provider.getNetwork()).chainId);


  const Counter = await hre.ethers.getContractFactory("counter");
  const counter = await Counter.deploy();

  await counter.deployed();
  //0x222983FE95125dc728d6f29ca81E9Db7726a3907
  console.log(counter.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

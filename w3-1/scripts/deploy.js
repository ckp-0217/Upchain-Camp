// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  console.log('network:', network.name, (await hre.ethers.provider.getNetwork()).chainId);


  const MyErc20 = await hre.ethers.getContractFactory("MyErc20");
  const myErc20 = await MyErc20.deploy("Wild","WILD");

  await myErc20.deployed();
  console.log(myErc20.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

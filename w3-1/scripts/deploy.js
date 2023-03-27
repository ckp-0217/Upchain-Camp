// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function deployERC20() {
  console.log('network:', network.name, (await hre.ethers.provider.getNetwork()).chainId);


  const MyErc20 = await hre.ethers.getContractFactory("MyErc20");
  const myErc20 = await MyErc20.deploy("Wild","WILD");

  await myErc20.deployed();
  console.log(myErc20.address);

  const Vault = await hre.ethers.getContractFactory("Vault");
  const vault = await Vault.deploy();

  await vault.deployed();
  console.log(vault.address);

}
async function deployERC721() {
  console.log('network:', network.name, (await hre.ethers.provider.getNetwork()).chainId);


  const MyErc721 = await hre.ethers.getContractFactory("MyErc721");
  const myErc721 = await MyErc721.deploy("Wild","WILD");

  await myErc721.deployed();
  console.log(myErc721.address);

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// deployERC20().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
deployERC721().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
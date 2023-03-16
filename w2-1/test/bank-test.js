// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");

describe("Bank test", function () {
  let bank;
  let owner;
  let addr;
  before(async function () {
    [owner, addr] = await ethers.getSigners();

    const Bank = await hre.ethers.getContractFactory("bank");
    bank = await Bank.connect(owner).deploy();

    await bank.deployed();

  })
  it("deposit ", async () => {
    await bank.connect(owner).deposit(addr.address, { value: 1000 });
    expect(await bank.balances(addr.address)).to.be.equal(1000);
  });
  it("transfer ", async () => {
    await owner.sendTransaction({
      value:1000,
      to:bank.address
    })
    expect(await bank.balances(owner.address)).to.be.equal(1000);
  });
  it("withdraw", async () => {
    await bank.connect(addr).withdraw(addr.address, 1000);
    expect(await bank.balances(addr.address)).to.be.equal(0);
  });
  it("withdraw Your balance is insufficient", async () => {
    await expect(bank.connect(addr).withdraw(addr.address, 1000))
    .to.be.revertedWith("Your balance is insufficient");
    
  });
});


// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");

describe("conuter", function () {
  let counter;
  before(async function () {
    [owner, countr1] = await ethers.getSigners();

    const Counter = await hre.ethers.getContractFactory("counter");
    counter = await Counter.connect(owner).deploy();

    await counter.deployed();

  })
  it("No owner permission ", async () => {
    //owner 调用
    await counter.connect(owner).count();
    expect(await counter.x()).to.be.equal(1);
    //非owner调用
    await expect(counter.connect(countr1).count())
      .to.be.revertedWith("No owner permission");
  });
});


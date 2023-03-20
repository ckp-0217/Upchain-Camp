// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, count the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { expect } = require("chai");

describe("Score test", function () {
  let score;
  let owner;
  let addr;
  let teach;
  before(async function () {
    [owner, addr] = await ethers.getSigners();
    //部署成绩合约
    const Score = await hre.ethers.getContractFactory("score");
    score = await Score.connect(owner).deploy();

    await score.deployed();

    //部署教师合约
    const Teach = await hre.ethers.getContractFactory("teacher");
    teach = await Teach.connect(owner).deploy(score.address);

    await teach.deployed();

  })
  it("没有设置老师修改", async () => {
    await expect(teach.setScore(addr.address, 80))
      .to.be.revertedWith("You are not a teacher.");

  });
  it("分数大于100 ", async () => {
    await score.setTeacher(teach.address);
    await expect(teach.setScore(addr.address, 101))
      .to.be.revertedWith("Illegal score");


  });
  it("分数正常", async () => {
    await teach.setScore(addr.address, 80);
    expect(await score.scores(addr.address)).to.be.equal(80);

  });

});


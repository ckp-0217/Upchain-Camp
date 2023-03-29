const hre = require("hardhat");
const { expect } = require("chai");

describe("ERC721 test", function () {
    let myErc721;
    let owner;
    let addr;
    let NFTMarket;
    before(async function () {
        [owner, addr] = await ethers.getSigners();
        //部署token
        const MyErc721 = await hre.ethers.getContractFactory("MyErc721");
        myErc721 = await MyErc721.deploy("Wild", "WILD");

        await myErc721.deployed();

        const NFTMarketContract = await hre.ethers.getContractFactory("NFTMarket");
        NFTMarket = await NFTMarketContract.deploy();

        await NFTMarket.deployed(myErc721.address);

    })
    it("创建订单", async () => {
        //使用领地址表示是eth支付
        await NFTMarket.createOffer(0, hre.ethers.utils.parseEther("100000"),0x0000000000000000000000000000000000000000);
        console.log(Number(hre.ethers.utils.formatEther(await myErc721.balanceOf(owner.address))));

    });

   
});


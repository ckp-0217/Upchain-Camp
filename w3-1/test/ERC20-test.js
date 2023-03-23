const hre = require("hardhat");
const { expect } = require("chai");

describe("ERC20 test", function () {
    let myErc20;
    let owner;
    let addr;
    let vault;
    before(async function () {
        [owner, addr] = await ethers.getSigners();
        //部署token
        const MyErc20 = await hre.ethers.getContractFactory("MyErc20");
        myErc20 = await MyErc20.deploy("Wild", "WILD");

        await myErc20.deployed();

        const Vault = await hre.ethers.getContractFactory("Vault");
        vault = await Vault.deploy();

        await vault.deployed();

    })
    it("发行100000", async () => {
        await myErc20.mint(owner.address, hre.ethers.utils.parseEther("100000"));
        console.log(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(owner.address))));

    });
    it("没有授权 存入1000", async () => {
        await expect(vault.deposite(myErc20.address, hre.ethers.utils.parseEther("1000")))
            .to.be.revertedWith("ERC20: insufficient allowance");

    });
    it("授权并且存入1000", async () => {
        await expect(myErc20.approve(vault.address, hre.ethers.utils.parseEther("1000"))).to.emit(myErc20, "Approval").withArgs(owner.address, vault.address, hre.ethers.utils.parseEther("1000"));
        await vault.deposite(myErc20.address, hre.ethers.utils.parseEther("1000"));
        expect(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(owner.address)))).to.be.equal(99000);
        expect(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(vault.address)))).to.be.equal(1000);



    });
    it("取出900", async () => {
        await vault.withdraw(myErc20.address, hre.ethers.utils.parseEther("900"));
        expect(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(owner.address)))).to.be.equal(99900);
        expect(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(vault.address)))).to.be.equal(100);
    });
    it("使用permit", async () => {
        //准备参数
        const nonce = await myErc20.nonces(owner.address);
        const chainId = await owner.getChainId();
        const deadline = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now

        const domain = {
            name: await myErc20.name(),
            version: "1",
            chainId: chainId,
            verifyingContract: myErc20.address,
        };
        
        const types = {
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" },
            ],
        };
        //生成签名
        const message = {
            owner: owner.address,
            spender: vault.address,
            value: hre.ethers.utils.parseEther("10000"),
            nonce: nonce,
            deadline: deadline,
        };

        const signature = await owner._signTypedData(domain, types, message);
        const { v, r, s } = ethers.utils.splitSignature(signature);

        await myErc20.permit(owner.address, vault.address, hre.ethers.utils.parseEther("10000"), deadline, v, r, s);

        expect(await myErc20.allowance(owner.address, vault.address)).to.equal(hre.ethers.utils.parseEther("10000"));
        await vault.deposite(myErc20.address, hre.ethers.utils.parseEther("10000"));
        expect(Number(hre.ethers.utils.formatEther(await myErc20.balanceOf(owner.address)))).to.be.equal(89900);

    });

});


const { BigNumber } = require("@ethersproject/bignumber");
const { expect, use} = require("chai")
const { ethers } = require("hardhat")
const { solidity } = require("ethereum-waffle")
// import chai matchers
use(solidity);

async function deploy(name, ...params) {
    const Contract = await ethers.getContractFactory(name);
    return Contract.deploy(...params).then(f=> f.deployed());
}

async function bignum(decimalAsString){
    return ethers.utils.parseUnits(
        decimalAsString,
        18)
}

describe ("MyFirstToken", function () {

    before(async function (){
        this.account = await ethers.getSigners();
        this.contract = await deploy("OOPSDAOToken");
    })

    it("Should deploy with with proper address",async function(){
        expect(this.contract.address).to.be.properAddress;
    })

    it("Should have Signer[0] as owner", async function(){
        expect(this.contract.signer.address).to.equal(this.account[0].address);
    })
    
    it("Should give the deploying account 100 tokens", async function(){
        expect(await 
            this.contract.balanceOf(this.account[0].address)).to.equal(
                await bignum("100.0")
            )
    })

    it("Should allow transfering tokens to Signer[1]", async function (){
        // await this.contract.connect(this.account[0]);
        var trxAmount = await bignum("10.0")
        await this.contract.transfer(this.account[1].address,trxAmount)
        expect(await 
            this.contract.balanceOf(this.account[0].address)).to.equal(
                await bignum("90.0")
            )
        expect(await this.contract.balanceOf(this.account[1].address)).to.equal(await bignum("10.0"))
    })
})
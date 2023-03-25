import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber, ContractFactory, Wallet } from "ethers"
import { ethers } from "hardhat"
import { bn } from "../scripts/utils"

describe("Farm", () => {
    let sender: SignerWithAddress
    let DAI: any
    let USDT: any
    let USDC: any
    let GAMMA: any
    let tauFactory: any
    let pairOne: any
    let pairTwo: any
    let tauDistributor: any
    let result: any

    const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

    async function approve(address: any, asset: any, amount: number) {
        await asset.approve(address, format(amount + 2))
    }

    beforeEach(async () => {
        ;[sender] = await ethers.getSigners()
    })

    // describe("Deployment", () => {
    //     it("Tokens", async () => {
    //         const MockERC20 = await ethers.getContractFactory("MockERC20")
    //         DAI = await MockERC20.deploy("DAI", "DAI", format(1000000))
    //         USDT = await MockERC20.deploy("USDT", "USDT", format(1000000))
    //         USDC = await MockERC20.deploy("USDC", "USDC", format(1000000))
    //         GAMMA = await MockERC20.deploy("GAMMA", "GAMMA", "0")
    //     })

    //     it("Factory", async () => {
    //         const Factory = await ethers.getContractFactory("EtaFactory")
    //         tauFactory = await Factory.deploy(sender.address)
    //     })

    //     it("EtaDistributor", async () => {
    //         const EtaDistributor = await ethers.getContractFactory("EtaDistributor")
    //         tauDistributor = await EtaDistributor.deploy(GAMMA.address, "150")
    //     })
    // })

    // describe("Setup", () => {
    //     it("Create pairs", async () => {
    //         await tauFactory.createPair(DAI.address, USDT.address)
    //         await tauFactory.createPair(USDT.address, USDC.address)
    //     })

    //     it("Pairs", async () => {
    //         const pairOneAddress = await tauFactory.getPair(DAI.address, USDT.address)
    //         const pairTwoAddress = await tauFactory.getPair(USDT.address, USDC.address)
    //         // console.debug("Pairs:", { pairOneAddress, pairTwoAddress })

    //         pairOne = await ethers.getContractAt("EtaPair", pairOneAddress)
    //         pairTwo = await ethers.getContractAt("EtaPair", pairTwoAddress)
    //     })

    //     it("Support pair", async () => {
    //         await tauDistributor.add("20", pairOne.address, "10", "7", false)
    //         await tauDistributor.add("5",  pairTwo.address, "10", "7", false)
    //     })

    //     it("Mint LP Tokens", async () => {
    //         await DAI.transfer(pairOne.address,  format(250000))
    //         await USDT.transfer(pairOne.address, format(250000))
    //         await USDC.transfer(pairTwo.address, format(250000))
    //         await USDT.transfer(pairTwo.address, format(250000))

    //         result = await pairOne.mint(sender.address)
    //         result = await pairTwo.mint(sender.address)
    //     })
    // })

    // describe("Tests", () => {
    //     it("Deposit", async () => {
    //         await pairOne.approve(tauDistributor.address, format(250000000))
    //         await tauDistributor.deposit(0, format(200000))
    //     })

    //     it("Withdraw", async () => {
    //         await tauDistributor.withdraw(0, format(20000))
    //     })
    // })
})

function format(amount: number | string, decimals: number = 18) {
    return bn(`${amount}e${decimals}`).toString()
}

function fromDecimals(amount: any) {
    return ethers.utils.formatEther(amount.toString()).toString()
}

async function wait() {
    return new Promise((resolve) => setTimeout(resolve, 4500))
}

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { expect } from "chai"
import { BigNumber, ContractFactory, Wallet } from "ethers"
import { ethers } from "hardhat"
import { bn } from "../scripts/utils"

describe("EtaVault", () => {
    let sender: any
    let daiOracle: any
    let usdtOracle: any
    let usdcOracle: any
    let DAI: any
    let USDT: any
    let USDC: any
    let ibDAI: any
    let ibUSDT: any
    let ibUSDC: any
    let rewardControl: any
    let tauVault: any
    let chainlink: any
    let rateModel: any
    let result: any

    const MAX_UINT256 = "115792089237316195423570985008687907853269984665640564039457584007913129639935"

    async function approve(asset: any, amount: number) {
        await asset.approve(tauVault.address, format(amount + 2))
    }

    beforeEach(async () => {
        ;[sender] = await ethers.getSigners()
    })

    describe("Deployment", () => {
        it("Oracles", async () => {
            const Oracle = await ethers.getContractFactory("MockAggregatorV3")
            daiOracle = await Oracle.deploy(18)
            usdtOracle = await Oracle.deploy(18)
            usdcOracle = await Oracle.deploy(18)
        })

        it("Chainlink", async () => {
            const ChainLink = await ethers.getContractFactory("ChainLink")
            chainlink = await ChainLink.deploy()
        })

        it("RTokens", async () => {
            const MockERC20 = await ethers.getContractFactory("MockERC20")
            DAI = await MockERC20.deploy("DAI", "DAI", 0)
            USDT = await MockERC20.deploy("USDT", "USDT", 0)
            USDC = await MockERC20.deploy("USDC", "USDC", 0)

            ibDAI = await MockERC20.deploy("ibDAI", "ibDAI", 0)
            ibUSDT = await MockERC20.deploy("ibUSDT", "ibUSDT", 0)
            ibUSDC = await MockERC20.deploy("ibUSDC", "ibUSDC", 0)
        })

        it("EtaVault", async () => {
            const EtaVaultFactory = await ethers.getContractFactory("EtaVault")
            tauVault = await EtaVaultFactory.deploy(
                chainlink.address, // oracle
                (0.5 * 10 ** 18).toString()
            )
        })

        it("Reward Control", async () => {
            const RewardControl = await ethers.getContractFactory("RewardControl")
            rewardControl = await RewardControl.deploy(tauVault.address)
        })

        it("Interest Rate Models", async () => {
            const RateModel = await ethers.getContractFactory("RateModel")
            rateModel = await RateModel.deploy(
                100, // MinRate
                2000, // HealthyMinUR
                100, // HealthyMinRate
                3000, // MaxRate
                8000, // HealthyMaxUR
                400 //  HealthyMaxRate
            )
        })
    })

    describe("Setup", () => {
        it("Set Reward control", async () => {
            await tauVault.setRewardControl(rewardControl.address)
        })

        it("Add Chainlink assets", async () => {
            await chainlink.addAsset(DAI.address, daiOracle.address)
            await chainlink.addAsset(USDT.address, usdtOracle.address)
            await chainlink.addAsset(USDC.address, usdcOracle.address)
        })

        it("Mint assets", async () => {
            await DAI.mint(sender.address, format(1000000))
            await USDT.mint(sender.address, format(1000000))
            await USDC.mint(sender.address, format(1000000))
        })

        it("Approve EtaVault", async () => {
            await DAI.approve(tauVault.address, MAX_UINT256)
            await USDT.approve(tauVault.address, MAX_UINT256)
            await USDC.approve(tauVault.address, MAX_UINT256)
        })
    })

    describe("Tests", () => {
        it("Support Market", async () => {
            await tauVault._supportMarket(DAI.address, rateModel.address, ibDAI.address)
            await tauVault._supportMarket(USDT.address, rateModel.address, ibUSDT.address)
            await tauVault._supportMarket(USDC.address, rateModel.address, ibUSDC.address)
        })

        it("Supply / Lend", async () => {
            // Lend DAI
            await tauVault.supply(DAI.address, format(500))
            await tauVault.supply(DAI.address, format(500))

            // result = await tauVault.getAccountLiquidity(sender.address)
            // expect(result).to.equal(format(500))

            // result = await tauVault.getSupplyBalance(sender.address, DAI.address)
            // expect(result).to.equal(format(500))

            // result = await tauVault.getBorrowBalance(sender.address, DAI.address)
            // expect(result).to.equal(format(0))

            await tauVault.supply(DAI.address, format(9000))
        })

        it("Borrow", async () => {
            const collateralRatio = +(await tauVault.collateralRatio()) / 1e18

            await new Promise((resolve) => setTimeout(resolve, 5000))

            const supplyBalance = +fromDecimals(await tauVault.getSupplyBalance(sender.address, DAI.address))
            console.debug("Supply balance:", supplyBalance)
            const supplyBalanceWithInterest = +fromDecimals(
                await tauVault.getSupplyBalanceWithInterest(sender.address, DAI.address)
            )
            console.debug("Supply balance with interest:", supplyBalanceWithInterest)

            // let supplyBalance = +fromDecimals((await tauVault.getSupplyBalance(sender.address, DAI.address))[1])
            // let borrowBalance = +fromDecimals((await tauVault.getBorrowBalance(sender.address, DAI.address))[1])
            // console.debug("Supply balance:", supplyBalance)

            await tauVault.borrow(DAI.address, format(1200))

            // const maxBorrow = supplyBalance / collateralRatio
            // console.debug("Max borrow:", maxBorrow)
            // const borrowLimit = (borrowBalance / maxBorrow) * 100
            // console.debug("Borrow limit:", borrowLimit)

            // await new Promise(resolve => setTimeout(resolve, 5000));

            const borrowBalance = +fromDecimals(await tauVault.getBorrowBalance(sender.address, DAI.address))
            console.debug("Borrow balance:", borrowBalance)
            const borrowBalanceWithInterest = +fromDecimals(
                await tauVault.getBorrowBalanceWithInterest(sender.address, DAI.address)
            )
            console.debug("Borrow balance with interest:", borrowBalanceWithInterest)

            // result = await tauVault.getBorrowBalance(sender.address, DAI.address)
            // expect(result).to.equal(format(100.1))

            // async function doSomeStuff() {
            //     while(true) {
            // await new Promise(resolve => setTimeout(resolve, 5000));
            //         // supplyBalance = +fromDecimals((await tauVault.getSupplyBalance(sender.address, DAI.address))[1])
            //         // borrowBalance = +fromDecimals((await tauVault.getBorrowBalance(sender.address, DAI.address))[1])

            //         // console.debug(">>> ", { supplyBalance, borrowBalance })
            //         // console.debug(">>> ", { supplyBalance })
            //     }
            // }
            // await doSomeStuff()

            // result = await tauVault.getBorrowBalance(sender.address, USDT.address)
            // expect(result).to.equal(format(0))
        })
    })
})

function format(amount: number | string, decimals: number = 18) {
    return bn(`${amount}e${decimals}`).toString()
}

function fromDecimals(amount: any) {
    return ethers.utils.formatEther(amount.toString()).toString()
}

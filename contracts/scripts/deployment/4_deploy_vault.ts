import fs from "fs"
import hre, { ethers } from "hardhat"
import { bn, chainIdToString, getChainId, getDeployments, saveDeployments } from "../utils"
import { BigNumber, BigNumberish } from "ethers"

async function main() {
    // ==== Read Configuration ====
    const [deployer] = await hre.ethers.getSigners()
    const chainId = chainIdToString(await getChainId(hre))

    let deployments = getDeployments()

    if (!(chainId in deployments)) {
        deployments[chainId] = {}
    }

    if (!("vault" in deployments[chainId])) {
        deployments[chainId]["vault"] = {}
    }

    if (!("tokens" in deployments[chainId]["vault"])) {
        deployments[chainId]["vault"]["tokens"] = {}
    }

    let etaVault

    const MockERC20 = await ethers.getContractFactory("MockERC20")

    // Interest-bearing tokens
    // const ibTokens = ["DCT", "MAV", "WLR", "DIB"]
    // let co = 0
    // for (const ibToken of ibTokens) {
    //     co += 1
    //     console.debug("deploying ibTokens", co)

    //     const ib = `ib${ibToken}`
    //     const token = await MockERC20.deploy(ib, ib, 0)
    //     deployments[chainId].vault.tokens[ib] = token.address
    //     saveDeployments(deployments)
    //     await wait()
    // }

    // await wait()

    // const MockAggregatorV3 = await ethers.getContractFactory("MockAggregatorV3")
    // const oracle = await MockAggregatorV3.deploy(18)
    // deployments[chainId].vault["Oracle"] = oracle.address
    // saveDeployments(deployments)
    const oracle = await ethers.getContractAt("MockAggregatorV3", deployments[chainId].vault.Oracle)

    // await wait()

    // const ChainLink = await ethers.getContractFactory("ChainLink")
    // const chainlink = await ChainLink.deploy()
    // deployments[chainId].vault["ChainLink"] = chainlink.address
    // saveDeployments(deployments)
    const chainlink = await ethers.getContractAt("ChainLink", deployments[chainId].vault.ChainLink)

    // await wait()

    const EtaVault = await ethers.getContractFactory("EtaVault")
    etaVault = await EtaVault.deploy(
        chainlink.address,
        (0.5 * 10 ** 18).toString() // 500000000000000000
    )
    deployments[chainId].vault["EtaVault"] = etaVault.address
    saveDeployments(deployments)

    await wait()

    const RewardControl = await ethers.getContractFactory("RewardControl")
    const rewardControl = await RewardControl.deploy(etaVault.address)
    deployments[chainId].vault["RewardControl"] = rewardControl.address
    saveDeployments(deployments)
    // const rewardControl = { address: deployments[chainId].vault.RewardControl }

    await wait()

    const RateModel = await ethers.getContractFactory("RateModel")
    const rateModel = await RateModel.deploy(100, 2000, 100, 3000, 8000, 400)
    deployments[chainId].vault["RateModel"] = rateModel.address
    saveDeployments(deployments)
    // const rateModel = { address: deployments[chainId].vault.RateModel }

    await wait()

    // Set Reward Control
    await etaVault.setRewardControl(rewardControl.address)

    await wait()

    const tokens = deployments[chainId].tokens
    const supportedAssets = ["DCT", "MAV", "WLR"]
    let c = 0
    for (const token in tokens) {
        if (supportedAssets.includes(token)) {
            c += 1
            console.debug("supportingAssets", c)
            await chainlink.addAsset(tokens[token], oracle.address)
            await wait()

            const ib = `ib${token}`
            await etaVault._supportMarket(tokens[token], rateModel.address, deployments[chainId].vault.tokens[ib])
            await wait()
        }
    }
}

let count = 1
async function wait() {
    console.debug(`>>> [${count}] Waiting...`)
    count += 1
    return new Promise((resolve) => setTimeout(resolve, 4500))
}

function format(x: number, decimals: number = 18) {
    return bn(`${x}e${decimals}`).toString()
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

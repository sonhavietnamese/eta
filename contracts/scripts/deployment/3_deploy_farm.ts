import fs from "fs"
import hre, { ethers } from "hardhat"
import { bn, getChainId, getDeployments, saveDeployments } from "../utils"
import { BigNumber, BigNumberish } from "ethers"

async function main() {
    // ==== Read Configuration ====
    const [deployer] = await hre.ethers.getSigners()
    const chainId = await getChainId(hre)

    let deployments = getDeployments()

    if (!(chainId in deployments)) {
        deployments[chainId] = {}
    }

    if (!("farm" in deployments[chainId])) {
        deployments[chainId]["farm"] = {}
    }

    let gammaDistributor
    let gammaDistributorv2
    let gammaVault

    const EtaDistributor = await ethers.getContractFactory("EtaDistributor")
    gammaDistributor = await EtaDistributor.deploy(deployments[chainId].tokens.GAMMA, "150")
    deployments[chainId].farms["EtaDistributor"] = gammaDistributor.address
    saveDeployments(deployments)

    await wait()

    // const EtaDistributorV2 = await ethers.getContractFactory("EtaDistributorV2")
    // let gammaDistributorv2 = await EtaDistributorV2.deploy(
    //     deployments[chainId].tokens.GAMMA,
    //     "100",
    //     deployer.address,
    //     deployer.address,
    //     deployer.address,
    //     "200",
    //     "100",
    //     "100",
    // )
    // deployments[chainId].farms["EtaDistributorV2"] = gammaDistributorv2.address
    // saveDeployments(deployments)

    // await wait()

    // const EtaVault = await ethers.getContractFactory("EtaVault")
    // let gammaVault = await EtaVault.deploy(
    //     deployments[chainId].tokens.GAMMA,
    //     "150"
    // )
    // deployments[chainId].farms["EtaVault"] = gammaVault.address
    // saveDeployments(deployments)

    //
    // Add Pairs
    //
    const allocPoints = [20, 10, 5, 1]
    // gammaDistributor = await ethers.getContractAt("EtaDistributor", deployments[chainId].farms.EtaDistributor)

    const pairs = deployments[chainId].pairs
    let pairAddresses: string[] = []
    for (const pair in pairs) {
        pairAddresses.push(pairs[pair].pairAddress)
    }

    pairAddresses = pairAddresses.filter((item, idx) => pairAddresses.indexOf(item) === idx)

    console.debug("Pair addresses:", pairAddresses, pairAddresses.length)

    for (const pairAddress of pairAddresses) {
        await gammaDistributor.add(
            allocPoints[Math.floor(Math.random() * allocPoints.length)].toString(),
            pairAddress,
            "10",
            "7",
            false
        )
        await wait()
    }

    const poolLength = await gammaDistributor.poolLength()
    console.debug("Pool length:", poolLength)
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

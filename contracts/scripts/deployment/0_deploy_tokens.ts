import fs from "fs"
import hre, { ethers } from "hardhat"
import { bn, getChainId, getDeployments, saveDeployments } from "../utils"

async function main() {
    // ==== Read Configuration ====
    const [deployer] = await hre.ethers.getSigners()
    const chainId = await getChainId(hre)

    let deployments = getDeployments()
    if (!(chainId in deployments)) {
        deployments[chainId] = {}
    }

    if (!("tokens" in deployments[chainId])) {
        deployments[chainId]["tokens"] = {}
    }

    const initialSupply = format(600000)

    const MockERC20 = await ethers.getContractFactory("MockERC20")
    const WETH9 = await ethers.getContractFactory("WETH9")

    const weth = await WETH9.deploy()
    deployments[chainId].tokens["wETH"] = weth.address
    saveDeployments(deployments)

    // await wait()

    // const dct = await MockERC20.deploy("DCT", "DCT", initialSupply)
    // deployments[chainId].tokens["DCT"] = dct.address
    // saveDeployments(deployments)

    // await wait()

    // const dib = await MockERC20.deploy("DIB", "DIB", initialSupply)
    // deployments[chainId].tokens["DIB"] = dib.address
    // saveDeployments(deployments)

    // await wait()

    // // Wallaroo
    // const wlr = await MockERC20.deploy("WLR", "WLR", initialSupply)
    // deployments[chainId].tokens["WLR"] = wlr.address
    // saveDeployments(deployments)

    // await wait()

    // const mav = await MockERC20.deploy("MAV", "MAV", initialSupply)
    // deployments[chainId].tokens["MAV"] = mav.address
    // saveDeployments(deployments)

    // await wait()

    // const eta = await MockERC20.deploy("ETA", "ETA", initialSupply)
    // deployments[chainId].tokens["ETA"] = eta.address
    // saveDeployments(deployments)
}

function format(x: number, decimals: number = 18) {
    return bn(`${x}e${decimals}`).toString()
}

let count = 1
async function wait() {
    console.debug(`>>> [${count}] Waiting...`)
    count += 1
    return new Promise((resolve) => setTimeout(resolve, 2500))
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

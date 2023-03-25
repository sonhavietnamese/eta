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

    if (!("swap" in deployments[chainId])) {
        deployments[chainId]["swap"] = {}
    }

    if (!("pairs" in deployments[chainId])) {
        deployments[chainId]["pairs"] = {}
    }

    let etaFactory
    let etaRouter02

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

    // const EtaFactory = await ethers.getContractFactory("EtaFactory")
    // etaFactory = await EtaFactory.deploy(deployer.address)
    // deployments[chainId].swap["EtaFactory"] = etaFactory.address
    // saveDeployments(deployments)
    // await wait()

    // const EtaRouter02 = await ethers.getContractFactory("EtaRouter02")
    // etaRouter02 = await EtaRouter02.deploy(
    //     deployments[chainId].swap.EtaFactory,
    //     deployments[chainId].tokens.wETH
    // )
    // deployments[chainId].swap["EtaRouter02"] = etaRouter02.address
    // saveDeployments(deployments)
    // await wait()

    // etaFactory = await ethers.getContractAt("EtaFactory", deployments[chainId].swap.EtaFactory)

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.wETH,
    //     deployments[chainId].tokens.DCT
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.wETH,
    //     deployments[chainId].tokens.MAV
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.wETH,
    //     deployments[chainId].tokens.WLR
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.MAV
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.DIB
    // )

    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.WLR
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.MAV,
    //     deployments[chainId].tokens.DIB
    // )
    // await wait()

    // await etaFactory.createPair(
    //     deployments[chainId].tokens.MAV,
    //     deployments[chainId].tokens.WLR
    // )
    // await wait()

    // const allPairsLength = await etaFactory.allPairsLength()
    // console.debug("allPairsLength:", allPairsLength.toString())
    // let _res: any = {}
    // let count = 0
    // const tokens = deployments[chainId].tokens
    // for(const i in tokens) {
    //     for(const j in tokens) {
    //         if(i === j || i === "mumbai" || j === "mumbai")
    //             continue

    //         let mixed = ""
    //         const tokenA = tokens[i]
    //         const tokenB = tokens[j]
    //         // console.debug(count, ": ", { tokenA, tokenB })
    //         const pairAddress = await etaFactory.getPair(tokenA, tokenB)
    //         if(pairAddress === ZERO_ADDRESS)
    //             continue

    //         mixed = `${tokenA}-${tokenB}`
    //         _res[mixed] = {
    //             id: count,
    //             tokenA: i,
    //             tokenB: j,
    //             pairAddress
    //         }

    //         mixed = `${tokenB}-${tokenA}`
    //         _res[mixed] = {
    //             id: count,
    //             tokenA: j,
    //             tokenB: i,
    //             pairAddress
    //         }

    //         count += 1
    //     }
    // }

    // console.debug("All pairs:", Object.keys(_res).length)
    // deployments[chainId].pairs = _res
    // saveDeployments(deployments)

    // =============
    // Add Liquidity
    // =============
    etaRouter02 = await ethers.getContractAt("EtaRouter02", deployments[chainIdToString(Number(chainId))].swap.EtaRouter02)

    // const wBIT = await ethers.getContractAt("WETH9", deployments[chainId].tokens.wETH)
    // const DCT = await ethers.getContractAt("MockERC20", deployments[chainId].tokens.DCT)
    // const DIB = await ethers.getContractAt("MockERC20", deployments[chainId].tokens.DIB)
    // const MAV = await ethers.getContractAt("MockERC20", deployments[chainId].tokens.MAV)
    // const WLR = await ethers.getContractAt("MockERC20", deployments[chainId].tokens.WLR)

    // console.debug("Approving...");
    // await DCT.approve(etaRouter02.address, format(400000)); await wait()
    // await DIB.approve(etaRouter02.address, format(400000)); await wait()
    // await MAV.approve(etaRouter02.address, format(400000)); await wait()
    // await WLR.approve(etaRouter02.address, format(400000)); await wait()
    // console.debug("Done...")

    // const pairs: any = deployments[chainId].pairs
    // for(const pair in pairs) {
    //     const tokenA = pair.split("-")[0]
    //     const tokenB = pair.split("-")[1]

    //     const val1 = pairs[pair].tokenA !== "wBIT" ? format(40000) : format(1500)
    //     const val2 = pairs[pair].tokenB !== "wBIT" ? format(80000) : format(1500)
    //     const value = [pairs[pair].tokenA, pairs[pair].tokenB].includes("wBIT") ? format(1500) : "0"

    //     console.debug("Deets:", {
    //         tokenA, tokenB, val1, val2, value
    //     })

    //     console.debug("Doing:", pair)

    //     if(value === "0") {
    //         await etaRouter02.addLiquidity(
    //             tokenA,
    //             tokenB,
    //             val1,
    //             val2,
    //             val1,
    //             val2,
    //             deployer.address,
    //             (new Date()).setMinutes((new Date()).getMinutes() + 10)
    //         )
    //     } else {
    //         await etaRouter02.addLiquidityETH(
    //             tokenA !== "wBIT" ? tokenA : tokenB,
    //             val1,
    //             val1,
    //             val2,
    //             deployer.address,
    //             (new Date()).setMinutes((new Date()).getMinutes() + 10),
    //             {
    //                 value: value
    //             }
    //         )
    //     }

    //     await wait();
    // }

    // await etaRouter02.addLiquidity(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.MAV,
    //     format(40000),
    //     format(80000),
    //     format(40000),
    //     format(80000),
    //     deployer.address,
    //     new Date().setMinutes(new Date().getMinutes() + 10)
    // )
    // await wait()

    // await etaRouter02.addLiquidity(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.DIB,
    //     format(40000),
    //     format(80000),
    //     format(40000),
    //     format(80000),
    //     deployer.address,
    //     new Date().setMinutes(new Date().getMinutes() + 10)
    // )
    // await wait()

    // await etaRouter02.addLiquidity(
    //     deployments[chainId].tokens.DCT,
    //     deployments[chainId].tokens.WLR,
    //     format(40000),
    //     format(80000),
    //     format(40000),
    //     format(80000),
    //     deployer.address,
    //     new Date().setMinutes(new Date().getMinutes() + 10)
    // )



    await etaRouter02.addLiquidityETH(
        deployments[chainIdToString(Number(chainId))].tokens.DCT,
        format(400),
        format(400),
        format(0.1),
        deployer.address,
        new Date().setMinutes(new Date().getMinutes() + 10),
        {
            value: format(0.1),
        }
    )
    // await wait()

    // await etaRouter02.addLiquidityETH(
    //     deployments[chainId].tokens.MAV,
    //     format(300),
    //     format(300),
    //     format(100),
    //     deployer.address,
    //     new Date().setMinutes(new Date().getMinutes() + 10),
    //     {
    //         value: format(100),
    //     }
    // )
}

 function chainIdToString(chainId: number) {
    switch (chainId) {
        case 10200:
            return "chiado"
        case 534353:
            return "scroll_alpha"
        case 1442:
            return "zkEVM"
        case 5001:
            return "mantle"
    }
    return "chiado"
}


let count = 1
async function wait() {
    console.debug(`>>> [${count}] Waiting...`)
    count += 1
    return new Promise((resolve) => setTimeout(resolve, 2500))
}

function format(x: number, decimals: number = 18) {
    return bn(`${x}e${decimals}`).toString()
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

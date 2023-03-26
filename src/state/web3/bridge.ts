import { BigNumber, BigNumberish } from "ethers"

import Faucet from "../../constants/artifacts/contracts/bridge/Faucet.sol/Faucet.json"
import Bridge from "../../constants/artifacts/contracts/bridge/Bridge.sol/Bridge.json"
import { chainIdToString, DEPLOYMENTS } from "../../constants"
import { setup, fromDecimals, toDecimals } from "./contracts"

import Web3 from "web3"
import { ChainId } from "../../sdk"
const ALCHEMY_MUMBAI = "https://polygon-mumbai.g.alchemy.com/v2/KMjTVyS6ewVEZrY5YcaRedxMp39q2Bh3"
const PRIVATE_KEY = "5d23c0e882df8a677395f22d14396413d6c4e45a1d94b625710d264a3e06c483"

export async function faucet(account: string, network: ChainId) {
    if (!account) return undefined

    const web3 = setup()

    const contract = new web3.eth.Contract(Faucet.abi as any, DEPLOYMENTS[chainIdToString(network)].bridge.Faucet)
    const result = await contract.methods
        .supply(
            [DEPLOYMENTS[chainIdToString(network)].tokens.DCT, DEPLOYMENTS[chainIdToString(network)].tokens.MAV, DEPLOYMENTS[chainIdToString(network)].tokens.WLR, DEPLOYMENTS[chainIdToString(network)].tokens.DIB],
            [toDecimals("10000"), toDecimals("5000"), toDecimals("15000"), toDecimals("8000")],
            account
        )
        .send({ from: account })

    console.debug("Receipt:", result)

    return result
}

export async function deposit(account: string, asset: string, amount: string, data: any, network: ChainId) {
    if (!account) return undefined

    const web3 = setup()

    const contract = new web3.eth.Contract(Bridge.abi as any, DEPLOYMENTS[chainIdToString(network)].bridge.Bridge)
    const result = await contract.methods.deposit(asset, amount, account, data).send({ from: account })

    // console.debug("Receipt:", result)

    return result
}

export async function withdraw(account: string, asset: string, amount: string, data: any, network: ChainId) {
    const web3 = new Web3(ALCHEMY_MUMBAI)

    const wallet = await web3.eth.accounts.wallet.add(PRIVATE_KEY)
    const bridgeContract = new web3.eth.Contract(Bridge.abi as any, "0x3d0440A3eA85e120864ae609d1383006A1490786") // Bridge_Mumbai

    const tx = bridgeContract.methods.withdraw(asset, amount, account, data)
    const gas = await tx.estimateGas({ from: account })
    const gasPrice = await web3.eth.getGasPrice()
    const encoded = tx.encodeABI()
    const nonce = await web3.eth.getTransactionCount(account)

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: bridgeContract.options.address,
            data: encoded,
            gas,
            gasPrice,
            nonce,
            chainId: 80001,
        },
        PRIVATE_KEY
    )

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    console.debug("Bridge Receipt:", receipt)

    return receipt
}

export async function bridge(account: string, assetFrom: string, assetTo: string, amount: string, data: any, network: ChainId) {
    const resDeposit = await deposit(account, assetFrom, amount, data, network)
    console.debug("Result deposit:", resDeposit)
    const withdrawDeposit = await withdraw(account, assetTo, amount, data, network)
    console.debug("Result withdraw:", withdrawDeposit)

    return resDeposit
}

import { ChainId } from "../sdk"

// Multichain Explorer
const builders = {
    etherscan: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = `https://${chainName ? `${chainName}.` : ""}etherscan.io`
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    matic: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://polygonscan.com"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "token":
                return `${prefix}/tokens/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    matic_testnet: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://mumbai.polygonscan.com"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "token":
                return `${prefix}/tokens/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    moonbase: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://moonbeam-explorer.netlify.app"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    moonriver: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://blockscout.moonriver.moonbeam.network/"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    fantom_testnet: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://explorer.testnet.mantle.xyz"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    mantle_testnet: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://explorer.testnet.mantle.xyz"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    chiado: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://blockscout.com/gnosis/chiado"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    scroll: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://blockscout.scroll.io"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },

    zkevm: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => {
        const prefix = "https://explorer.public.zkevm-test.net"
        switch (type) {
            case "transaction":
                return `${prefix}/tx/${data}`
            case "address":
                return `${prefix}/address/${data}`
            default:
                return `${prefix}/${type}/${data}`
        }
    },
}

interface ChainObject {
    [chainId: number]: {
        chainName: string
        builder: (chainName: string, data: string, type: "transaction" | "token" | "address" | "block") => string
    }
}

const chains: ChainObject = {
    [ChainId.MATIC_TESTNET]: {
        chainName: "mumbai_testnet",
        builder: builders.matic_testnet,
    },
    [ChainId.MANTLE_TESTNET]: {
        chainName: "mantle_testnet",
        builder: builders.mantle_testnet,
    },
    [ChainId.CHIADO]: {
        chainName: "chiado",
        builder: builders.chiado,
    },
    [ChainId.SCROLL]: {
        chainName: "scroll",
        builder: builders.scroll,
    },
    [ChainId.POLYGON_ZKEVM]: {
        chainName: "zkevm",
        builder: builders.zkevm,
    },
}

export function getExplorerLink(
    chainId: ChainId,
    data: string,
    type: "transaction" | "token" | "address" | "block"
): string {
    const chain = chains[chainId]
    return chain.builder(chain.chainName, data, type)
}

import { ChainId } from "../sdk"
import { DEPLOYMENTS } from "./addresses"

export type TokenInfo = {
    id: string
    name: string
    symbol: string
    decimals?: number
}

type PairInfo = {
    id: number
    lpToken: string
    token0: TokenInfo
    token1?: TokenInfo
    name?: string
    symbol?: string
}

type AddressMap = {
    [chainId: number]: {
        [id: string]: PairInfo
    }
}


export const VAULTS: AddressMap = {
    [ChainId.MANTLE_TESTNET]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.mantle.tokens.DCT,
                name: "DCT",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.mantle.tokens.WLR,
                name: "WLR",
                symbol: "WLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.mantle.tokens.MAV,
                name: "MAV",
                symbol: "MAV",
                decimals: 18,
            },
        },
    },
    [ChainId.SCROLL]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.tokens.DCT,
                name: "DCT",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.tokens.WLR,
                name: "WLR",
                symbol: "WLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.tokens.MAV,
                name: "MAV",
                symbol: "MAV",
                decimals: 18,
            },
        },
    },
    [ChainId.CHIADO]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.chiado.tokens.DCT,
                name: "DCT",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.chiado.tokens.WLR,
                name: "WLR",
                symbol: "WLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.chiado.tokens.MAV,
                name: "MAV",
                symbol: "MAV",
                decimals: 18,
            },
        },
    },
    [ChainId.POLYGON_ZKEVM]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.zkEVM.tokens.DCT,
                name: "DCT",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.zkEVM.tokens.WLR,
                name: "WLR",
                symbol: "WLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.zkEVM.tokens.MAV,
                name: "MAV",
                symbol: "MAV",
                decimals: 18,
            },
        },
    },
}

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

export const  STABLECOIN_MARKETS: AddressMap = {
    [ChainId.MANTLE_TESTNET]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.mantle.vault.tokens.ibDCT,
                name: "ibDCT",
                symbol: "ibDCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.mantle.vault.tokens.ibWLR,
                name: "ibWLR",
                symbol: "ibWLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.mantle.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.mantle.vault.tokens.ibMAV,
                name: "ibMAV",
                symbol: "ibMAV",
                decimals: 18,
            },
        },
    },

    [ChainId.SCROLL]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.vault.tokens.ibDCT,
                name: "ibDCT",
                symbol: "ibDCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.vault.tokens.ibWLR,
                name: "ibWLR",
                symbol: "ibWLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.scroll_alpha.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.scroll_alpha.vault.tokens.ibMAV,
                name: "ibMAV",
                symbol: "ibMAV",
                decimals: 18,
            },
        },
    },

    [ChainId.POLYGON_ZKEVM]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.zkEVM.vault.tokens.ibDCT,
                name: "ibDCT",
                symbol: "ibDCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.zkEVM.vault.tokens.ibWLR,
                name: "ibWLR",
                symbol: "ibWLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.zkEVM.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.zkEVM.vault.tokens.ibMAV,
                name: "ibMAV",
                symbol: "ibMAV",
                decimals: 18,
            },
        },
    },

    [ChainId.CHIADO]: {
        "0": {
            id: 0,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibDCT,
            token0: {
                id: DEPLOYMENTS.chiado.vault.tokens.ibDCT,
                name: "ibDCT",
                symbol: "ibDCT",
                decimals: 18,
            },
        },
        "1": {
            id: 1,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibWLR,
            token0: {
                id: DEPLOYMENTS.chiado.vault.tokens.ibWLR,
                name: "ibWLR",
                symbol: "ibWLR",
                decimals: 18,
            },
        },
        "2": {
            id: 2,
            lpToken: DEPLOYMENTS.chiado.vault.tokens.ibMAV,
            token0: {
                id: DEPLOYMENTS.chiado.vault.tokens.ibMAV,
                name: "ibMAV",
                symbol: "ibMAV",
                decimals: 18,
            },
        },
    },
}

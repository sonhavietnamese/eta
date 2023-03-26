import { ChainId } from "../sdk"

export type TokenInfo = {
    id: string
    name: string
    symbol: string
    decimals?: number
}

type PairInfo = {
    id: number
    token0: TokenInfo
    token1?: TokenInfo
    name?: string
    symbol?: string
}

type AddressMap = {
    [chainId: number]: {
        [address: string]: PairInfo
    }
}

export const POOLS: AddressMap = {
    [ChainId.MANTLE_TESTNET]: {
        "0xC66135cC3AdfeEA348AA84AB6EC4D9f0e43701a4": {
            id: 1,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:DCT",
                id: "0x1fCCbf31699C674088783D6e7BcE9781DD6988E5",
                symbol: "DCT",
                decimals: 18,
            },
            token1: {
                name: "NAME:wBIT",
                id: "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22",
                symbol: "wBIT",
                decimals: 18,
            },
        },
        "0x659ff385B344E1644e9795a81Bfcf05b9bc9fAE9": {
            id: 3,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:WLR",
                id: "0x45f4589650eA44D79d9E616ce31Efbe37AB53A58",
                symbol: "WLR",
                decimals: 18,
            },
            token1: {
                name: "NAME:wBIT",
                id: "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22",
                symbol: "wBIT",
                decimals: 18,
            },
        },
        "0xC3c5FA38A0310AA623Eb8669e12e995744Db3ee2": {
            id: 5,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:MAV",
                id: "0xfB0e0fD196ba7926bbcc9396797E6e4BD340C3cc",
                symbol: "MAV",
                decimals: 18,
            },
            token1: {
                name: "NAME:wBIT",
                id: "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22",
                symbol: "wBIT",
                decimals: 18,
            },
        },
        "0xe310ED8Da2F9446034E2438DbbB341Db4b49d712": {
            id: 7,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:DIB",
                id: "0xc09a68e734d76C9D5Da6850FD2B0163b45B89951",
                symbol: "DIB",
                decimals: 18,
            },
            token1: {
                name: "NAME:DCT",
                id: "0x1fCCbf31699C674088783D6e7BcE9781DD6988E5",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "0x4B616bc77DA73f12F64Aa278CE3DC178225A9838": {
            id: 9,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:WLR",
                id: "0x45f4589650eA44D79d9E616ce31Efbe37AB53A58",
                symbol: "WLR",
                decimals: 18,
            },
            token1: {
                name: "NAME:DCT",
                id: "0x1fCCbf31699C674088783D6e7BcE9781DD6988E5",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "0xcf5Ca29eFE3c5450483E0B71132b9BF296dE6D54": {
            id: 11,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:MAV",
                id: "0xfB0e0fD196ba7926bbcc9396797E6e4BD340C3cc",
                symbol: "MAV",
                decimals: 18,
            },
            token1: {
                name: "NAME:DCT",
                id: "0x1fCCbf31699C674088783D6e7BcE9781DD6988E5",
                symbol: "DCT",
                decimals: 18,
            },
        },
        "0x6eb22CD10B2ADeB6e0B6b2AE32BEba88a78AaBf9": {
            id: 13,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:MAV",
                id: "0xfB0e0fD196ba7926bbcc9396797E6e4BD340C3cc",
                symbol: "MAV",
                decimals: 18,
            },
            token1: {
                name: "NAME:DIB",
                id: "0xc09a68e734d76C9D5Da6850FD2B0163b45B89951",
                symbol: "DIB",
                decimals: 18,
            },
        },
        "0x5c739321b63edC0C52a6525396E2c6d5c06b8779": {
            id: 15,
            name: "Eta LP",
            symbol: "GLP",
            token0: {
                name: "NAME:MAV",
                id: "0xfB0e0fD196ba7926bbcc9396797E6e4BD340C3cc",
                symbol: "MAV",
                decimals: 18,
            },
            token1: {
                name: "NAME:WLR",
                id: "0x45f4589650eA44D79d9E616ce31Efbe37AB53A58",
                symbol: "WLR",
                decimals: 18,
            },
        },
    },
}

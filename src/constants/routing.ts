import {
    ALPHA,
    AMPL,
    AVALANCHE,
    BAB,
    BAC,
    BSC,
    CELO,
    CREAM,
    CRV,
    CVXCRV,
    DAI,
    DOUGH,
    DUCK,
    ETH2X_FLI,
    FANTOM,
    FEI,
    FRAX,
    FXS,
    HARMONY,
    HBTC,
    HECO,
    IBETH,
    LFBTC,
    LIFT,
    MATIC,
    MIR,
    MOONRIVER,
    NFTX,
    OKEX,
    PLAY,
    PONT,
    PWING,
    RENBTC,
    RUNE,
    STETH,
    TRIBE,
    UMA,
    USDC,
    USDP,
    USDT,
    UST,
    WBTC,
    XDAI,
    MANTLE_TESTNET,
    XSUSHI,
    SCROLL_TESTNET,
    CHIADO_TESTNET,
    ZKEVM_TESTNET,
} from "./tokens"
// a list of tokens by chain
import { Currency, Token, WNATIVE, ChainId } from "../sdk"
import deployments from "./deployments.json"

type ChainTokenList = {
    readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
    readonly [chainId: number]: Currency[]
}

// List of all mirror's assets addresses.
// Last pulled from : https://whitelist.mirror.finance/eth/tokenlists.json
// TODO: Generate this programmatically ?
const MIRROR_ADDITIONAL_BASES: { [tokenAddress: string]: Token[] } = {
    [UST.address]: [MIR],
    [MIR.address]: [UST],
    "0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84": [MIR, UST], // mAAPL
    "0x59A921Db27Dd6d4d974745B7FfC5c33932653442": [MIR, UST], // mGOOGL
    "0x21cA39943E91d704678F5D00b6616650F066fD63": [MIR, UST], // mTSLA
    "0xC8d674114bac90148d11D3C1d33C61835a0F9DCD": [MIR, UST], // mNFLX
    "0x13B02c8dE71680e71F0820c996E4bE43c2F57d15": [MIR, UST], // mQQQ
    "0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9": [MIR, UST], // mTWTR
    "0x41BbEDd7286dAab5910a1f15d12CBda839852BD7": [MIR, UST], // mMSFT
    "0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7": [MIR, UST], // mAMZN
    "0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72": [MIR, UST], // mBABA
    "0x1d350417d9787E000cc1b95d70E9536DcD91F373": [MIR, UST], // mIAU
    "0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676": [MIR, UST], // mSLV
    "0x31c63146a635EB7465e5853020b39713AC356991": [MIR, UST], // mUSO
    "0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86": [MIR, UST], // mVIXY
}

// TODO: SDK should have two maps, WETH map and WNATIVE map.
const WRAPPED_NATIVE_ONLY: ChainTokenList = {
    [ChainId.MANTLE_TESTNET]: [WNATIVE[ChainId.MANTLE_TESTNET]],
    [ChainId.SCROLL]: [WNATIVE[ChainId.SCROLL]],
    [ChainId.CHIADO]: [WNATIVE[ChainId.CHIADO]],
    [ChainId.POLYGON_ZKEVM]: [WNATIVE[ChainId.POLYGON_ZKEVM]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
    ...WRAPPED_NATIVE_ONLY,
    [ChainId.MANTLE_TESTNET]: [...WRAPPED_NATIVE_ONLY[ChainId.MANTLE_TESTNET]],
    [ChainId.CHIADO]: [...WRAPPED_NATIVE_ONLY[ChainId.CHIADO]],
    [ChainId.SCROLL]: [...WRAPPED_NATIVE_ONLY[ChainId.SCROLL]],
    [ChainId.POLYGON_ZKEVM]: [...WRAPPED_NATIVE_ONLY[ChainId.POLYGON_ZKEVM]],
}

export const ADDITIONAL_BASES: {
    [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
    [ChainId.MAINNET]: {
        ...MIRROR_ADDITIONAL_BASES,
        "0xF16E4d813f4DcfDe4c5b44f305c908742De84eF0": [ETH2X_FLI],
        "0xe379a60A8FC7C9DD161887fFADF3054790576c8D": [XSUSHI], // XSUSHI 25 Call [30 June 2021]
        "0xB46F57e7Ce3a284d74b70447Ef9352B5E5Df8963": [UMA], // UMA 25 Call [30 June 2021]
        [FEI.address]: [TRIBE],
        [TRIBE.address]: [FEI],
        [FRAX.address]: [FXS],
        [FXS.address]: [FRAX],
        [WBTC.address]: [RENBTC],
        [RENBTC.address]: [WBTC],
        [PONT.address]: [PWING],
        [PWING.address]: [PONT],
        [PLAY.address]: [DOUGH],
        [DOUGH.address]: [PLAY],
        [IBETH.address]: [ALPHA],
        [ALPHA.address]: [IBETH],
        [HBTC.address]: [CREAM],
        [CREAM.address]: [HBTC],
        [DUCK.address]: [USDP],
        [USDP.address]: [DUCK],
        [BAB.address]: [BAC],
        [BAC.address]: [BAB],
        [LIFT.address]: [LFBTC],
        [LFBTC.address]: [LIFT],
        [CVXCRV.address]: [CRV],
        [CRV.address]: [CVXCRV],
    },
    [ChainId.MATIC]: {
        [MATIC.FRAX.address]: [MATIC.FXS],
        [MATIC.FXS.address]: [MATIC.FRAX],
        [MATIC.DRAX.address]: [MATIC.DMAGIC],
        [MATIC.DMAGIC.address]: [MATIC.DRAX],
    },
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
    [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
    [ChainId.MATIC]: {
        [MATIC.TEL.address]: [MATIC.SUSHI, MATIC.AAVE],
    },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
    ...WRAPPED_NATIVE_ONLY,
    [ChainId.MANTLE_TESTNET]: [
        ...WRAPPED_NATIVE_ONLY[ChainId.MANTLE_TESTNET],
        MANTLE_TESTNET.DCT,
        MANTLE_TESTNET.MAV,
        MANTLE_TESTNET.WLR,
        MANTLE_TESTNET.DIB,
    ],
    [ChainId.SCROLL]: [
        ...WRAPPED_NATIVE_ONLY[ChainId.SCROLL],
        SCROLL_TESTNET.DCT,
        SCROLL_TESTNET.MAV,
        SCROLL_TESTNET.WLR,
        SCROLL_TESTNET.DIB,
    ],
    [ChainId.CHIADO]: [
        ...WRAPPED_NATIVE_ONLY[ChainId.CHIADO],
        CHIADO_TESTNET.DCT,
        CHIADO_TESTNET.MAV,
        CHIADO_TESTNET.WLR,
        CHIADO_TESTNET.DIB,
    ],
    [ChainId.POLYGON_ZKEVM]: [
        ...WRAPPED_NATIVE_ONLY[ChainId.POLYGON_ZKEVM],
        ZKEVM_TESTNET.DCT,
        ZKEVM_TESTNET.MAV,
        ZKEVM_TESTNET.WLR,
        ZKEVM_TESTNET.DIB,
    ],
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.MANTLE_TESTNET]: deployments.mantle.swap.EtaFactory,
    [ChainId.SCROLL]: deployments.scroll_alpha.swap.EtaFactory,
    [ChainId.CHIADO]: deployments.chiado.swap.EtaFactory,
    [ChainId.POLYGON_ZKEVM]: deployments.zkEVM.swap.EtaFactory,
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.MANTLE_TESTNET]: deployments.mantle.swap.EtaRouter02,
    [ChainId.SCROLL]: deployments.scroll_alpha.swap.EtaRouter02,
    [ChainId.CHIADO]: deployments.chiado.swap.EtaRouter02,
    [ChainId.POLYGON_ZKEVM]: deployments.zkEVM.swap.EtaRouter02,
}

export const INIT_CODE_HASH: string = "0xc837d0af652f2ed7c22b99d7dc00ddeaa805e21e2d6d9f4235324f1ead7d660d"

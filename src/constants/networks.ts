import { Apothem, ChainId } from "../sdk"

const Mainnet = "/images/networks/ethereum.png"
const Matic = "/images/networks/polygon-network.jpg"
const Moonbeam = "/images/networks/moonbeam-network.jpg"
const Moonriver = "/images/networks/moonriver.png"
const XDC_APOTHEM = "https://xinfin.org/assets/images/brand-assets/xdc-icon.png"

const Mantle = "/images/networks/mantle-network.jpg"

export const NETWORK_ICON = {
    [ChainId.MAINNET]: Mainnet,
    [ChainId.MATIC]: Matic,
    [ChainId.MATIC_TESTNET]: Matic,
    [ChainId.MOONBEAM_TESTNET]: Moonbeam,
    [ChainId.MOONRIVER]: Moonriver,
    [ChainId.XDC_APOTHEM]: XDC_APOTHEM,

    [ChainId.CHIADO]: "/images/networks/chiado-network.png",
    [ChainId.SCROLL]: "/images/networks/scroll-network.png",
    [ChainId.POLYGON_ZKEVM]: "/images/networks/zkevm-network.jpg",
    [ChainId.MANTLE_TESTNET]: Mantle,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
    [ChainId.MAINNET]: "Ethereum",
    [ChainId.XDC_APOTHEM]: "XDC Apothem",
    [ChainId.MATIC]: "Polygon (Matic)",
    [ChainId.MATIC_TESTNET]: "Polygon Mumbai",
    [ChainId.MOONBEAM_TESTNET]: "Moonbase",
    [ChainId.MOONRIVER]: "Moonriver",

    [ChainId.CHIADO]: "Chiado Testnet",
    [ChainId.SCROLL]: "Scroll Alpha Testnet",
    [ChainId.POLYGON_ZKEVM]: "zkEVM Testnet",
    [ChainId.MANTLE_TESTNET]: "Mantle Testnet",
}

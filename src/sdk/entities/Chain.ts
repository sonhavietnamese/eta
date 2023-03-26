import { ChainId } from ".."
import { NETWORK_ICON, NETWORK_LABEL } from "../../constants/networks"

export type Chain = {
    id: ChainId
    name?: string
    icon?: string
}

export const DEFAULT_CHAIN_FROM: Chain = {
    id: ChainId.CHIADO,
    icon: NETWORK_ICON[ChainId.CHIADO],
    name: NETWORK_LABEL[ChainId.CHIADO],
}

export const DEFAULT_CHAIN_TO: Chain = {
    id: ChainId.MATIC_TESTNET,
    icon: NETWORK_ICON[ChainId.MATIC_TESTNET],
    name: NETWORK_LABEL[ChainId.MATIC_TESTNET],
}

export const NETWORKS: {
    [chainId in ChainId]?: Chain
} = {
    [ChainId.CHIADO]: {
        id: ChainId.CHIADO,
        icon: NETWORK_ICON[ChainId.CHIADO],
        name: NETWORK_LABEL[ChainId.CHIADO],
    },
    [ChainId.SCROLL]: {
        id: ChainId.SCROLL,
        icon: NETWORK_ICON[ChainId.SCROLL],
        name: NETWORK_LABEL[ChainId.SCROLL],
    },
    [ChainId.POLYGON_ZKEVM]: {
        id: ChainId.POLYGON_ZKEVM,
        icon: NETWORK_ICON[ChainId.POLYGON_ZKEVM],
        name: NETWORK_LABEL[ChainId.POLYGON_ZKEVM],
    },
    [ChainId.MANTLE_TESTNET]: {
        id: ChainId.MANTLE_TESTNET,
        icon: NETWORK_ICON[ChainId.MANTLE_TESTNET],
        name: NETWORK_LABEL[ChainId.MANTLE_TESTNET],
    },
}

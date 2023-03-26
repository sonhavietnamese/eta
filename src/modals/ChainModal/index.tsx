import { NETWORK_ICON, NETWORK_LABEL } from "../../constants/networks"
import { bridgeInjected, injected } from "../../connectors"
import { useChainModalToggle, useModalOpen, useNetworkModalToggle } from "../../state/application/hooks"

import { ApplicationModal } from "../../state/application/actions"
import { BridgeContextName } from "../../constants"
import { Chain } from "../../sdk/entities/Chain"
import { ChainId } from "../../sdk"
import { ExternalLinkIcon } from "@heroicons/react/solid"
import Image from "next/image"
import Modal from "../../components/Modal"
import ModalHeader from "../../components/ModalHeader"
import React from "react"
import cookie from "cookie-cutter"
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React"
import { useWeb3React } from "@web3-react/core"

export const SUPPORTED_NETWORKS: {
    [chainId in ChainId]?: {
        chainId: string
        chainName: string
        nativeCurrency: {
            name: string
            symbol: string
            decimals: number
        }
        rpcUrls: string[]
        blockExplorerUrls: string[]
    }
} = {
    [ChainId.CHIADO]: {
        chainId: "0x27d8",
        chainName: "Gnosis Chiado Testnet",
        nativeCurrency: {
            name: "Chiado",
            symbol: "xDAI",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.chiadochain.net"],
        blockExplorerUrls: ["https://blockscout.com/gnosis/chiado"],
    },
    [ChainId.POLYGON_ZKEVM]: {
        chainId: "0x5a2",
        chainName: "zkEVM Testnet",
        nativeCurrency: {
            name: "zkEVM Testnet",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.public.zkevm-test.net"],
        blockExplorerUrls: ["https://explorer.public.zkevm-test.net"],
    },
    [ChainId.SCROLL]: {
        chainId: "0x82751",
        chainName: "Scroll Alpha Testnet",
        nativeCurrency: {
            name: "Scroll Alpha",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://alpha-rpc.scroll.io/l2"],
        blockExplorerUrls: ["https://blockscout.scroll.io/"],
    },
    [ChainId.MANTLE_TESTNET]: {
        chainId: "0x1389",
        chainName: "Mantle Testnet",
        nativeCurrency: {
            name: "BIT",
            symbol: "BIT",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.testnet.mantle.xyz"],
        blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
    },
}

interface ChainModalProps {
    availableChains: number[]
    title?: string
    chain?: Chain
    isOpen: boolean
    onDismiss: () => void
    onSelect: (chain: Chain) => void
    switchOnSelect: boolean
}

export default function ChainModal({
    availableChains,
    title,
    chain,
    isOpen,
    onDismiss,
    onSelect,
    switchOnSelect,
}: ChainModalProps): JSX.Element | null {
    const { chainId, library, account, activate } = useWeb3React(BridgeContextName)

    return (
        <Modal isOpen={isOpen} onDismiss={onDismiss} maxWidth={400}>
            <ModalHeader onClose={onDismiss} title={title} />
            <div className="grid grid-flow-row-dense grid-cols-1 gap-3 overflow-y-auto mt-4">
                {availableChains.map((key: ChainId, i: number) => {
                    if (chain.id === key) {
                        return (
                            <button
                                key={i}
                                className="w-full col-span-1 p-px rounded bg-gradient-to-r from-yellow to-yellow"
                            >
                                <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-dark-1000">
                                    <Image
                                        src={NETWORK_ICON[key]}
                                        alt={`Select ${NETWORK_LABEL[key]} Network`}
                                        className="rounded-md"
                                        width="32px"
                                        height="32px"
                                    />
                                    <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                                </div>
                            </button>
                        )
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => {
                                onSelect({ id: key, icon: NETWORK_ICON[key], name: NETWORK_LABEL[key] })
                                onDismiss()
                                if (switchOnSelect) {
                                    activate(bridgeInjected)
                                    const params = SUPPORTED_NETWORKS[key]
                                    cookie.set("chainId", key)
                                    if (key === ChainId.MAINNET) {
                                        console.debug("Chain modal switch")
                                        library?.send("wallet_switchEthereumChain", [{ chainId: "0x1" }, account])
                                    } else {
                                        library?.send("wallet_addEthereumChain", [params, account])
                                    }
                                }
                            }}
                            className="flex items-center w-full col-span-1 p-3 space-x-3 rounded cursor-pointer bg-dark-800 hover:bg-dark-900"
                        >
                            <Image
                                src={NETWORK_ICON[key]}
                                alt="Switch Network"
                                className="rounded-md"
                                width="32px"
                                height="32px"
                            />
                            <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                        </button>
                    )
                })}
            </div>
        </Modal>
    )
}

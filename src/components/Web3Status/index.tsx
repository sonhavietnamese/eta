import React, { useCallback, useMemo, useState } from "react"
import { injected } from "../../connectors"
import { isTransactionRecent, useAllTransactions } from "../../state/transactions/hooks"

import { AbstractConnector } from "@web3-react/abstract-connector"
import Image from "next/image"
import Loader from "../Loader"
import { BridgeContextName, NetworkContextName } from "../../constants"
import { TransactionDetails } from "../../state/transactions/reducer"
import WalletModal from "../../modals/WalletModal"
import Web3Connect from "../Web3Connect"
import { shortenAddress } from "../../functions/format"
import styled from "styled-components"

import useENSName from "../../hooks/useENSName"

import { useWalletModalToggle } from "../../state/application/hooks"
import { useWeb3React } from "@web3-react/core"
import { useRouter } from "next/router"
import ChainSelect from "../ChainSelect"
import { ChainId } from "../../sdk"
import NetworkSwitchModal, { SUPPORTED_NETWORKS } from "../../modals/NetworkSwitchModal"
import { NETWORKS } from "../../sdk/entities/Chain"
import { useAtom } from "jotai"
import { networkAtom } from "../../constants/atoms"

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
    return b.addedTime - a.addedTime
}

function Web3StatusInner() {
    const { account, connector } = useWeb3React()
    const { account: bridgeAccount } = useWeb3React(BridgeContextName)
    const { route } = useRouter()

    const { ENSName } = useENSName(account ?? undefined)

    const allTransactions = useAllTransactions()

    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions)
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
    }, [allTransactions])

    const pending = sortedRecentTransactions
        .filter((tx) => {
            if (tx.receipt) {
                return false
            } else if (tx.archer && tx.archer.deadline * 1000 - Date.now() < 0) {
                return false
            } else {
                return true
            }
        })
        .map((tx) => tx.hash)

    const hasPendingTransactions = !!pending.length

    const toggleWalletModal = useWalletModalToggle()

    if (bridgeAccount && (route == "/bridge" || route == "/bridge/history")) {
        return (
            <div
                id="web3-status-connected"
                className="flex items-center px-3 py-2 text-bold rounded-lg bg-transparent text-sm"
            >
                <div className="mr-2">{shortenAddress(bridgeAccount)}</div>
            </div>
        )
    } else {
        if (account) {
            return (
                <div
                    id="web3-status-connected"
                    className="flex items-center px-3 py-2 text-bold rounded-lg bg-transparent text-sm"
                    onClick={toggleWalletModal}
                >
                    {hasPendingTransactions ? (
                        <div className="flex items-center justify-between">
                            <div className="pr-2">
                                {pending?.length} {`Pending`}
                            </div>{" "}
                            <Loader stroke="white" />
                        </div>
                    ) : (
                        <div className="mr-2">{ENSName || shortenAddress(account)}</div>
                    )}
                    {/* {!hasPendingTransactions && connector && <StatusIcon connector={connector} />} */}
                </div>
            )
        } else {
            return <Web3Connect style={{ paddingTop: "6px", paddingBottom: "6px" }} />
        }
    }
}

export default function Web3Status() {
    const { chainId, active, account } = useWeb3React()
    const contextNetwork = useWeb3React(NetworkContextName)

    const [showChainSelect, setShowChainSelect] = useState(false)
    const [network, setNetwork] = useAtom(networkAtom)

    const { ENSName } = useENSName(account ?? undefined)

    if (chainId === 5001) {
        setNetwork(ChainId.MANTLE_TESTNET)
    } else if (chainId === 10200) {
        setNetwork(ChainId.CHIADO)
    } else if (chainId === 534353) {
        setNetwork(ChainId.SCROLL)
    } else if (chainId === 1442) {
        setNetwork(ChainId.POLYGON_ZKEVM)
    }

    const allTransactions = useAllTransactions()

    const sortedRecentTransactions = useMemo(() => {
        const txs = Object.values(allTransactions)
        return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
    }, [allTransactions])

    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt).map((tx) => tx.hash)

    if (!contextNetwork.active && !active) {
        return null
    }

    const handleDismissSearch = useCallback(() => {
        setShowChainSelect(false)
    }, [setShowChainSelect])

    return (
        <>
            <a
                className="p-2 text-base text-primary whitespace-nowrap"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setShowChainSelect(true)
                }}
            >
                {`Switch Network`}
            </a>

            {showChainSelect && (
                <NetworkSwitchModal
                    switchOnSelect={true}
                    availableChains={[ChainId.CHIADO, ChainId.POLYGON_ZKEVM, ChainId.MANTLE_TESTNET, ChainId.SCROLL]}
                    onSelect={(chain) => {
                        console.debug("Selecting chain:", chain)
                    }}
                    title={`Switch Network`}
                    chain={NETWORKS[network]}
                    isOpen={showChainSelect}
                    onDismiss={handleDismissSearch}
                />
            )}

            <Web3StatusInner />
            <WalletModal
                ENSName={ENSName ?? undefined}
                pendingTransactions={pending}
                confirmedTransactions={confirmed}
            />
        </>
    )
}

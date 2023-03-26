/* eslint-disable @next/next/link-passhref */
import { useActiveWeb3React, useFuse } from "../../hooks"

import Head from "next/head"
import React, { useContext, useEffect, useState } from "react"
import Card from "../../components/Card"

import DoubleGlowShadow from "../../components/DoubleGlowShadow"
import { AVERAGE_BLOCK_TIME, chainIdToString, DEPLOYMENTS } from "../../constants"
import TauLogo from "../../components/TauLogo"
import StablecoinList from "../../features/stablecoin/StablecoinList"
import { getStablecoinMarkets } from "../../state/web3/stablecoin"
import { useWeb3React } from "@web3-react/core"
import { STABLECOIN_MARKETS } from "../../constants/stablecoin"
import { formatNumberScale } from "../../functions"
import useTokenBalance from "../../hooks/useTokenBalance"
import { fromDecimals } from "../../state/web3/contracts"
import { useAtomValue } from "jotai"
import { networkAtom } from "../../constants/atoms"


export default function Vault(): JSX.Element {
    const { account } = useWeb3React()
    const network = useAtomValue(networkAtom)
    const { chainId } = useActiveWeb3React()
    const [markets, setMarkets] = useState([])
    const vaults = markets


    useEffect(() => {
        getStablecoinMarkets(account, network).then((res) => setMarkets(res))
    }, [account])

    const etaUSDBalance = useTokenBalance(DEPLOYMENTS[chainIdToString(network)].stablecoin.etaUSD)

    const map = (pool) => {
        pool.owner = "Eta"
        pool.balance = 0

        const pair = STABLECOIN_MARKETS[chainId][pool.id]

        const blocksPerHour = 3600 / AVERAGE_BLOCK_TIME[chainId]

        return {
            ...pool,
            pair: {
                ...pair,
                decimals: 18,
            },
            blocksPerHour,
        }
    }
    const data = vaults.map(map)

    return (
        <>
            <Head>
                <title>Stablecoin | Eta</title>
                <meta key="description" name="description" content="Eta Stablecoin" />
            </Head>

            <div className="container px-0 mx-auto pb-6">
                <div className={`mb-2 pb-4 grid grid-cols-12 gap-4`}>
                    <div className="flex justify-center items-center col-span-12 lg:justify">
                        <TauLogo />
                    </div>
                </div>

                <DoubleGlowShadow maxWidth={false} opacity={"0.4"}>
                    <div className={`grid grid-cols-12 gap-2 min-h-1/2`}>
                        <div className={`col-span-12`}>
                            <Card className="bg-dark-900 z-4">
                                <div className={`grid grid-cols-12 md:space-x-4 space-y-4 md:space-y-0 `}>
                                    <div className={`col-span-12 md:col-span-3 space-y-4`}>
                                        <div className={`hidden md:block`}>
                                            <div className={`col-span-12 md:col-span-4 bg-dark-800 px-6 py-4 rounded`}>
                                                <div className="mb-2 text-2xl text-emphesis">{`Eta Stablecoin (etaUSD)`}</div>
                                                <div className="mb-4 text-base text-secondary">
                                                    <p>
                                                        {`etaUSD is an`} <strong>overcollateralized</strong>,{" "}
                                                        <strong>auto-farming</strong>, and
                                                        <strong> decentralized</strong>{" "}
                                                        {`stablecoin reinforced with multi-layered
                                                        pegging mechanisms so that it remains stable at $1.`}
                                                    </p>
                                                    <p className="mt-2">&nbsp; &nbsp;</p>
                                                    <p className="mt-2">
                                                        {`Lenders on Eta can collateralize their deposits (ibTokens) to borrow etaUSD which they can use inside/outside Eta
                                                        to earn additional yields.`}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`flex flex-col items-center justify-between px-6 py-6 `}
                                                >
                                                    <div className="flex items-center text-center justify-between py-2 text-emphasis">
                                                        etaUSD Balance:{" "}
                                                        {formatNumberScale(
                                                            fromDecimals(etaUSDBalance?.value.toString() ?? "0"),
                                                            true,
                                                            2
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={`col-span-12 md:col-span-9 bg-dark-800 py-4 md:px-6 md:py-4 rounded`}
                                    >
                                        <StablecoinList markets={data} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </DoubleGlowShadow>
            </div>
        </>
    )
}

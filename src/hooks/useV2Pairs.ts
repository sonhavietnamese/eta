import { ChainId, Currency, CurrencyAmount, Pair, Token } from "../sdk"

import IUniswapV2PairABI from "@sushiswap/core/abi/IUniswapV2Pair.json"
import { Interface } from "@ethersproject/abi"
import { useContext, useEffect, useMemo, useState } from "react"
import { useMultipleContractSingleData, useSingleCallResult } from "../state/multicall/hooks"
import {
    SOLAR_ADDRESS,
    FACTORY_ADDRESS,
    ETA_DISTRIBUTOR_ADDRESS,
    ETA_VAULT_ADDRESS,
    tokenAddressToToken,
    DEPLOYMENTS,
    chainIdToString,
} from "../constants"
import { useActiveWeb3React } from "../hooks/useActiveWeb3React"
import { PriceContext } from "../contexts/priceContext"
import { POOLS, TokenInfo } from "../constants/farms"
import { concat } from "lodash"
import { VAULTS } from "../constants/vaults"
import { useSwapFactoryContract } from "./useContract"
import { getPair, getReserves } from "../state/web3/swap"
import { useWeb3React } from "@web3-react/core"
import { computePairAddress } from "../functions/computePairAddress"
import { useAtomValue } from "jotai"
import { networkAtom } from "../constants/atoms"

const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)

export enum PairState {
    LOADING,
    NOT_EXISTS,
    EXISTS,
    INVALID,
}

async function getMultiReserves(tokenPairs: string[][], account: string, network: ChainId) {
    let result: { tokenA: Token; tokenB: Token; reserves: string[] }[] = []

    for (const tokenPair of tokenPairs) {
        if (tokenPair[0] && tokenPair[1] && tokenPair[0] !== tokenPair[1]) {
            const tokenA = tokenAddressToToken(tokenPair[0])
            const tokenB = tokenAddressToToken(tokenPair[1])

            // console.debug("DEETS:", { tokenA, tokenB })

            const pairAddress = computePairAddress({
                network,
                tokenA,
                tokenB,
            })

            const reserves = await getReserves(account, pairAddress)
            result.push({ tokenA, tokenB, reserves })
        }
    }

    return result
}

export function useV2Pairs(
    currencies: [Currency | undefined, Currency | undefined][],
    network: ChainId,
    isPools: boolean = false
): [PairState, Pair | null][] {
    const { account } = useWeb3React()
    const { chainId } = useActiveWeb3React()
    const [reserves, setReserves] = useState<{ tokenA: Token; tokenB: Token; reserves: string[] }[]>([])
    const currNetworkString = chainIdToString(network)
    const tokens = useMemo(
        () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
        [currencies]
    )

    // const getTokenPairs = useMemo(() => {
    //     if(!tokens)
    //         return [["0", "0"]]

    //     const result = tokens.map((token: Token[]) => [token[0]?.address, token[token.length - 1]?.address])
    //     console.debug("Length of result:", JSON.stringify(result))

    //     return result
    // }, [tokens])

    if (isPools) {
        const tokenPairs = [
            [DEPLOYMENTS[currNetworkString].tokens.DCT, DEPLOYMENTS[currNetworkString].tokens.wETH], // DCT - wETH
            [DEPLOYMENTS[currNetworkString].tokens.DCT, DEPLOYMENTS[currNetworkString].tokens.MAV], // DCT - MAV
            [DEPLOYMENTS[currNetworkString].tokens.DIB, DEPLOYMENTS[currNetworkString].tokens.DCT], // DIB - DCT
        ]

        useEffect(() => {
            getMultiReserves(tokenPairs, account, network).then((reserves) => {
                // console.error("[pools] tokenPairs:", reserves)
                setReserves(reserves)
            })
        }, [])
    } else {
        const getTokenPairs = useMemo(() => {
            if (!tokens) return [["0", "0"]]

            const result = tokens.map((token: Token[]) => [token[0]?.address, token[token.length - 1]?.address])
            // console.debug("Result:", JSON.stringify(result))

            return result
        }, [tokens])

        useEffect(() => {
            getMultiReserves(getTokenPairs, account, chainId).then((reserves) => {
                // console.error("[no pools] getTokenPairs:", reserves)
                setReserves(reserves)
            })
        }, [getTokenPairs])
    }

    return useMemo(() => {
        console.debug("REserves:", reserves)

        return reserves.map((reserve) => {
            if (!tokens || (tokens && tokens.length === 0)) { console.debug("Invalid tokens"); return [PairState.INVALID, null] }

            const tokenA = reserve.tokenA
            const tokenB = reserve.tokenB

            if (!tokenA || !tokenB || tokenA.equals(tokenB)) { console.debug("One doesn't exist:", {tokenA, tokenB}); return [PairState.INVALID, null] }

            // if(!reserves || (reserves && reserves.length === 0))
            //     return [PairState.NOT_EXISTS, null]

            const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

            return [
                PairState.EXISTS,
                new Pair(
                    CurrencyAmount.fromRawAmount(token0, reserve.reserves[0].toString()),
                    CurrencyAmount.fromRawAmount(token1, reserve.reserves[1].toString()),
                    network
                ),
            ]
        })
    }, [reserves])
}

export interface TVLInfo {
    id?: string
    lpToken: string
    tvl: number
    lpPrice: number
}

export function useVaultTVL(): TVLInfo[] {
    const { chainId } = useActiveWeb3React()
    const priceData = useContext(PriceContext)
    const tauPrice = priceData?.["solar"]
    const xdcPrice = priceData?.["movr"]
    const ribPrice = priceData?.["rib"]

    const farmingPools = Object.keys(VAULTS[chainId]).map((key) => {
        return { ...VAULTS[chainId][key] }
    })

    const singlePools = farmingPools.filter((r) => !r.token1)
    const singleAddresses = singlePools.map((r) => r.lpToken)
    const lpPools = farmingPools.filter((r) => !!r.token1)
    const pairAddresses = lpPools.map((r) => r.lpToken)

    const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "getReserves")
    const totalSupply = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "totalSupply")
    const distributorBalance = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "balanceOf", [
        ETA_VAULT_ADDRESS[chainId],
    ])
    const distributorBalanceSingle = useMultipleContractSingleData(singleAddresses, PAIR_INTERFACE, "balanceOf", [
        ETA_VAULT_ADDRESS[chainId],
    ])

    return useMemo(() => {
        function isKnownToken(token: TokenInfo) {
            return (
                token.id.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase() ||
                token.symbol == "WMOVR" ||
                token.symbol == "MOVR" ||
                token.symbol == "RIB" ||
                token.symbol == "USDC" ||
                token.symbol == "BUSD"
            )
        }

        function getPrice(token: TokenInfo) {
            if (token.id.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase()) {
                return tauPrice
            }
            if (token.symbol == "WMOVR" || token.symbol == "MOVR") {
                return xdcPrice
            }
            if (token.symbol == "RIB" || token.symbol == "RIB") {
                return ribPrice
            }
            if (token.symbol == "USDC" || token.symbol == "BUSD") {
                return 1
            }
            return 0
        }

        const lpTVL = results.map((result, i) => {
            const { result: reserves, loading } = result

            let { token0, token1, lpToken } = lpPools[i]

            token0 = token0.id.toLowerCase() < token1.id.toLowerCase() ? token0 : token1
            token1 = token0.id.toLowerCase() < token1.id.toLowerCase() ? token1 : token0

            if (loading) return { lpToken, tvl: 0, lpPrice: 0, id: "0" }
            if (!reserves) return { lpToken, tvl: 0, lpPrice: 0, id: "0" }

            const { reserve0, reserve1 } = reserves

            const lpTotalSupply = totalSupply[i]?.result?.[0]

            const distributorRatio = distributorBalance[i]?.result?.[0] / lpTotalSupply

            const token0price = getPrice(token0)
            const token1price = getPrice(token1)

            const token0total = Number(Number(token0price * (Number(reserve0) / 10 ** token0?.decimals)).toString())
            const token1total = Number(Number(token1price * (Number(reserve1) / 10 ** token1?.decimals)).toString())

            let lpTotalPrice = Number(token0total + token1total)

            if (isKnownToken(token0)) {
                lpTotalPrice = token0total * 2
            } else if (isKnownToken(token1)) {
                lpTotalPrice = token1total * 2
            }

            const lpPrice = lpTotalPrice / (lpTotalSupply / 10 ** 18)
            const tvl = lpTotalPrice * distributorRatio

            return {
                lpToken,
                tvl,
                lpPrice,
                id: "0",
            }
        })

        const singleTVL = distributorBalanceSingle.map((result, i) => {
            const { result: balance, loading } = result

            const { token0, lpToken } = singlePools[i]

            if (loading) return { lpToken, tvl: 0, lpPrice: 0, id: "0" }
            if (!balance) return { lpToken, tvl: 0, lpPrice: 0, id: "0" }

            const token0price = getPrice(token0)

            const token0total = Number(Number(token0price * (Number(balance) / 10 ** token0?.decimals)).toString())

            const lpPrice = token0price
            const tvl = token0total

            return {
                lpToken,
                tvl,
                lpPrice,
                id: i.toString(),
            }
        })

        return concat(singleTVL, lpTVL)
    }, [
        results,
        distributorBalanceSingle,
        chainId,
        tauPrice,
        xdcPrice,
        ribPrice,
        totalSupply,
        distributorBalance,
        lpPools,
        singlePools,
    ])
}

export function useTVL(): TVLInfo[] {
    const { chainId } = useActiveWeb3React()
    const priceData = useContext(PriceContext)
    const tauPrice = priceData?.solar
    const xdcPrice = priceData?.movr
    const ribPrice = priceData?.rib

    const farmingPools = Object.keys(POOLS[chainId]).map((key) => {
        return { ...POOLS[chainId][key], lpToken: key }
    })

    const singlePools = farmingPools.filter((r) => !r.token1)
    const singleAddresses = singlePools.map((r) => r.lpToken)
    const lpPools = farmingPools.filter((r) => !!r.token1)
    const pairAddresses = lpPools.map((r) => r.lpToken)

    const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "getReserves")
    const totalSupply = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "totalSupply")
    const distributorBalance = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "balanceOf", [
        ETA_DISTRIBUTOR_ADDRESS[chainId],
    ])
    const distributorBalanceSingle = useMultipleContractSingleData(singleAddresses, PAIR_INTERFACE, "balanceOf", [
        ETA_DISTRIBUTOR_ADDRESS[chainId],
    ])

    return useMemo(() => {
        function isKnownToken(token: TokenInfo) {
            return (
                token.id.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase() ||
                token.symbol == "wBIT" ||
                token.symbol == "BIT" ||
                token.symbol == "RIB" ||
                token.symbol == "USDC" ||
                token.symbol == "BUSD"
            )
        }

        function getPrice(token: TokenInfo) {
            if (token.id.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase()) {
                return tauPrice
            }
            if (token.symbol == "wBIT" || token.symbol == "BIT") {
                return xdcPrice
            }
            if (token.symbol == "USDC" || token.symbol == "BUSD") {
                return 1
            }
            return 0
        }

        const lpTVL = results.map((result, i) => {
            const { result: reserves, loading } = result

            let { token0, token1, lpToken } = lpPools[i]

            token0 = token0.id.toLowerCase() < token1.id.toLowerCase() ? token0 : token1
            token1 = token0.id.toLowerCase() < token1.id.toLowerCase() ? token1 : token0

            if (loading) return { lpToken, tvl: 0, lpPrice: 0 }
            if (!reserves) return { lpToken, tvl: 0, lpPrice: 0 }

            const { reserve0, reserve1 } = reserves

            const lpTotalSupply = totalSupply[i]?.result?.[0]

            const distributorRatio = distributorBalance[i]?.result?.[0] / lpTotalSupply

            const token0price = getPrice(token0)
            const token1price = getPrice(token1)

            const token0total = Number(Number(token0price * (Number(reserve0) / 10 ** token0?.decimals)).toString())
            const token1total = Number(Number(token1price * (Number(reserve1) / 10 ** token1?.decimals)).toString())

            let lpTotalPrice = Number(token0total + token1total)

            if (isKnownToken(token0)) {
                lpTotalPrice = token0total * 2
            } else if (isKnownToken(token1)) {
                lpTotalPrice = token1total * 2
            }

            const lpPrice = lpTotalPrice / (lpTotalSupply / 10 ** 18)
            const tvl = lpTotalPrice * distributorRatio

            return {
                lpToken,
                tvl,
                lpPrice,
            }
        })

        const singleTVL = distributorBalanceSingle.map((result, i) => {
            const { result: balance, loading } = result

            const { token0, lpToken } = singlePools[i]

            if (loading) return { lpToken, tvl: 0, lpPrice: 0 }
            if (!balance) return { lpToken, tvl: 0, lpPrice: 0 }

            const token0price = getPrice(token0)

            const token0total = Number(Number(token0price * (Number(balance) / 10 ** token0?.decimals)).toString())

            const lpPrice = token0price
            const tvl = token0total

            return {
                lpToken,
                tvl,
                lpPrice,
            }
        })

        return concat(singleTVL, lpTVL)
    }, [
        results,
        distributorBalanceSingle,
        chainId,
        tauPrice,
        xdcPrice,
        ribPrice,
        totalSupply,
        distributorBalance,
        lpPools,
        singlePools,
    ])
}

export function useV2PairsWithPrice(
    currencies: [Currency | undefined, Currency | undefined][]
): [PairState, Pair | null, number][] {
    const { chainId } = useActiveWeb3React()
    const network = useAtomValue(networkAtom)

    const tokens = useMemo(
        () => currencies.map(([currencyA, currencyB]) => [currencyA?.wrapped, currencyB?.wrapped]),
        [currencies]
    )

    const pairAddresses = useMemo(
        () =>
            tokens.map(([tokenA, tokenB]) => {
                return tokenA &&
                    tokenB &&
                    tokenA.chainId === tokenB.chainId &&
                    !tokenA.equals(tokenB) &&
                    FACTORY_ADDRESS[tokenA.chainId]
                    ? computePairAddress({
                          network,
                          tokenA,
                          tokenB,
                      })
                    : undefined
            }),
        [tokens]
    )

    const results = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "getReserves")
    const totalSupply = useMultipleContractSingleData(pairAddresses, PAIR_INTERFACE, "totalSupply")

    const priceData = useContext(PriceContext)
    const tauPrice = priceData?.["solar"]
    const xdcPrice = priceData?.["movr"]
    const ribPrice = priceData?.["rib"]

    return useMemo(() => {
        function isKnownToken(token: Token) {
            return (
                token.address.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase() ||
                token.symbol == "WMOVR" ||
                token.symbol == "MOVR" ||
                token.symbol == "RIB" ||
                token.symbol == "USDC" ||
                token.symbol == "BUSD"
            )
        }

        function getPrice(token: Token) {
            if (token.address.toLowerCase() == SOLAR_ADDRESS[chainId].toLowerCase()) {
                return tauPrice
            }
            if (token.symbol == "WMOVR" || token.symbol == "MOVR") {
                return xdcPrice
            }
            if (token.symbol == "RIB" || token.symbol == "RIB") {
                return ribPrice
            }
            if (token.symbol == "USDC" || token.symbol == "BUSD") {
                return 1
            }
            return 0
        }

        return results.map((result, i) => {
            const { result: reserves, loading } = result
            const tokenA = tokens[i][0]
            const tokenB = tokens[i][1]

            if (loading) return [PairState.LOADING, null, 0]
            if (!tokenA || !tokenB || tokenA.equals(tokenB)) return [PairState.INVALID, null, 0]
            if (!reserves) return [PairState.NOT_EXISTS, null, 0]
            const { reserve0, reserve1 } = reserves
            const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]

            const lpTotalSupply = totalSupply[i]?.result?.[0]

            const token0price = getPrice(token0)
            const token1price = getPrice(token1)

            const token0total = Number(Number(token0price * (Number(reserve0) / 10 ** token0?.decimals)).toString())
            const token1total = Number(Number(token1price * (Number(reserve1) / 10 ** token1?.decimals)).toString())

            let lpTotalPrice = Number(token0total + token1total)

            if (isKnownToken(token0)) {
                lpTotalPrice = token0total * 2
            } else if (isKnownToken(token1)) {
                lpTotalPrice = token1total * 2
            }

            const lpPrice = lpTotalPrice / (lpTotalSupply / 10 ** 18)

            return [
                PairState.EXISTS,
                new Pair(
                    CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
                    CurrencyAmount.fromRawAmount(token1, reserve1.toString()),
                    network
                ),
                lpPrice,
            ]
        })
    }, [results, chainId, tauPrice, xdcPrice, ribPrice, tokens, totalSupply])
}

export function useV2Pair(network: ChainId, tokenA?: Currency, tokenB?: Currency): [PairState, Pair | null] {
    const inputs: [[Currency | undefined, Currency | undefined]] = useMemo(() => [[tokenA, tokenB]], [tokenA, tokenB])
    // console.debug("Input currencies:", inputs)
    const pairs = useV2Pairs(inputs, network)
    return pairs.length === 0 ? [undefined, undefined] : pairs[0]
}

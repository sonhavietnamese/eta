import { Currency, CurrencyAmount, Ether, JSBI, Token, ZERO_ADDRESS } from "../../sdk"
import { useMultipleContractSingleData, useSingleContractMultipleData } from "../multicall/hooks"

import ERC20_ABI from "../../constants/abis/erc20.json"
import { Interface } from "@ethersproject/abi"
import { isAddress } from "../../functions/validate"
import { useActiveWeb3React } from "../../hooks/useActiveWeb3React"
import { useAllTokens } from "../../hooks/Tokens"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useMulticall2Contract } from "../../hooks/useContract"
import Web3 from "web3"
import { RPC } from "../../connectors"
import ERC20_INTERFACE from "../../constants/abis/erc20"
import { getTokenBalance } from "../web3/misc"

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(uncheckedAddresses?: (string | undefined)[]): {
    [address: string]: CurrencyAmount<Currency> | undefined
} {
    const { chainId } = useActiveWeb3React()
    const multicallContract = useMulticall2Contract()

    const addresses: string[] = useMemo(
        () =>
            uncheckedAddresses
                ? uncheckedAddresses
                      .map(isAddress)
                      .filter((a): a is string => a !== false)
                      .sort()
                : [],
        [uncheckedAddresses]
    )

    const results = useSingleContractMultipleData(
        multicallContract,
        "getEthBalance",
        addresses.map((address) => [address])
    )

    return useMemo(
        () =>
            addresses.reduce<{ [address: string]: CurrencyAmount<Currency> }>((memo, address, i) => {
                const value = results?.[i]?.result?.[0]
                if (value && chainId)
                    memo[address] = CurrencyAmount.fromRawAmount(Ether.onChain(chainId), JSBI.BigInt(value.toString()))
                return memo
            }, {}),
        [addresses, chainId, results]
    )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
    address?: string,
    tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: CurrencyAmount<Token> | undefined }, boolean] {
    const validatedTokens: Token[] = useMemo(() => {
        return (
            tokens?.filter((t?: Token): t is Token => {
                return isAddress(t?.address) !== false && t?.address !== ZERO_ADDRESS
            }) ?? []
        )
    }, [tokens])

    const validatedTokenAddresses = useMemo(() => validatedTokens.map((vt) => vt.address), [validatedTokens])
    const ERC20Interface = new Interface(ERC20_ABI)
    const balances = useMultipleContractSingleData(
        validatedTokenAddresses,
        ERC20Interface,
        "balanceOf",
        [address],
        undefined,
        100_000
    )

    const anyLoading: boolean = useMemo(() => balances.some((callState) => callState.loading), [balances])

    return [
        useMemo(
            () =>
                address && validatedTokens.length > 0
                    ? validatedTokens.reduce<{
                          [tokenAddress: string]: CurrencyAmount<Token> | undefined
                      }>((memo, token, i) => {
                          const value = balances?.[i]?.result?.[0]
                          const amount = value ? JSBI.BigInt(value.toString()) : undefined
                          if (amount) {
                              memo[token.address] = CurrencyAmount.fromRawAmount(token, amount)
                          }
                          return memo
                      }, {})
                    : {},
            [balances]
        ),
        anyLoading,
    ]
}

export function useTokenBalances(
    address?: string,
    tokens?: (Token | undefined)[]
): { [tokenAddress: string]: CurrencyAmount<Token> | undefined } {
    return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): CurrencyAmount<Token> | undefined {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getTokenBalance(account, token?.address).then((balance) => setBalance(balance))
    }, [account, token?.address])

    return CurrencyAmount.fromRawAmount(token, balance)

    // const tokenBalances = useTokenBalances(account, [token])
    // if(!token)
    //     return undefined
    // return tokenBalances[token.address]
}

export function useCurrencyBalances(
    account?: string,
    currencies?: (Currency | undefined)[]
): (CurrencyAmount<Currency> | undefined)[] {
    const tokens = useMemo(
        () => currencies?.filter((currency): currency is Token => currency?.isToken ?? false) ?? [],
        [currencies]
    )

    const tokenBalances = useTokenBalances(account, tokens)
    const containsETH: boolean = useMemo(
        () => currencies?.some((currency) => currency?.isNative) ?? false,
        [currencies]
    )
    const ethBalance = useETHBalances(containsETH ? [account] : [])

    return useMemo(
        () =>
            currencies?.map((currency) => {
                if (!account || !currency) return undefined
                if (currency.isToken) return tokenBalances[currency.address]
                if (currency.isNative) return ethBalance[account]
                return undefined
            }) ?? [],
        [account, currencies, ethBalance, tokenBalances]
    )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount<Currency> | undefined {
    return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): {
    [tokenAddress: string]: CurrencyAmount<Token> | undefined
} {
    const { account } = useActiveWeb3React()
    const allTokens = useAllTokens()
    const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
    const balances = useTokenBalances(account ?? undefined, allTokensArray)
    return balances ?? {}
}

export function useMultichainCurrencyBalance(
    chainId?: number,
    account?: string,
    currency?: Currency
): CurrencyAmount<Currency> | undefined {
    const { chainId: activeChainId } = useActiveWeb3React()
    console.debug("CHAINID:", chainId)

    const [value, setValue] = useState(null)

    const getBalance = useCallback(() => {
        const web3 = new Web3(RPC[chainId])

        if (currency.isNative) {
            web3.eth.getBalance(account).then((response) => {
                const amount = CurrencyAmount.fromRawAmount(currency, response || 0)
                setValue(amount)
            })
        } else if (currency.isToken) {
            let contract = new web3.eth.Contract(ERC20_ABI as any, currency.address)
            contract.methods
                .balanceOf(account)
                .call()
                .then((response) => {
                    const amount = CurrencyAmount.fromRawAmount(currency, response || 0)
                    console.debug("AMOUNT:", amount)
                    setValue(amount)
                })
                .catch((ex) => {
                    console.error(ex)
                })
        }
    }, [account, chainId, currency])

    useEffect(() => {
        if (account && chainId && currency) {
            getBalance()
        } else {
            setValue(null)
        }
    }, [account, chainId, currency, getBalance, activeChainId])

    return useMemo(() => {
        return value
    }, [chainId, value])
}

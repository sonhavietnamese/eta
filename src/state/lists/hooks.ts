import { AppState } from ".."
import ETA_TOKEN_LIST from "../../constants/token-lists/eta.tokenlist.json"
import { DEPLOYMENTS } from "../../constants"
import { TokenList } from "@uniswap/token-lists"
import { UNSUPPORTED_LIST_URLS } from "../../constants/token-lists"
import { WrappedTokenInfo } from "./wrappedTokenInfo"
import { sortByListPriority } from "../../functions/list"
import { useAppSelector } from "../hooks"
import { useMemo } from "react"

export type TokenAddressMap = Readonly<{
    [chainId: number]: Readonly<{
        [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList }
    }>
}>

const listCache: WeakMap<TokenList, TokenAddressMap> | null =
    typeof WeakMap !== "undefined" ? new WeakMap<TokenList, TokenAddressMap>() : null

export function listToTokenMap(list: TokenList): TokenAddressMap {
    const result = listCache?.get(list)
    if (result) return result

    const map = list.tokens.reduce<TokenAddressMap>((tokenMap, tokenInfo) => {
        const token = new WrappedTokenInfo(tokenInfo, list)
        if (tokenMap[token.chainId]?.[token.address] !== undefined) {
            console.error(new Error(`Duplicate token! ${token.address}`))
            return tokenMap
        }
        return {
            ...tokenMap,
            [token.chainId]: {
                ...tokenMap[token.chainId],
                [token.address]: {
                    token,
                    list,
                },
            },
        }
    }, {})
    listCache?.set(list, map)
    return map
}

const TRANSFORMED_DEFAULT_TOKEN_LIST = listToTokenMap(updateAddresses(ETA_TOKEN_LIST) as any)

function updateAddresses(tokenList: any) {
    let i = 0

    // Mantle
    // tokenList.tokens[i].id = i.toString()
    // tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.wETH
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.DCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.WLR
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.MAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.DIB
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.tokens.ETA
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.vault.tokens.ibDCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.vault.tokens.ibMAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mantle.vault.tokens.ibWLR

    // MATIC
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mumbai.tokens.wETH
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mumbai.tokens.DCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mumbai.tokens.WLR
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mumbai.tokens.MAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.mumbai.tokens.DIB

    // Chiado
    // tokenList.tokens[i].id = i.toString()
    // tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.wETH
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.DCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.WLR
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.MAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.DIB
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.tokens.ETA
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.vault.tokens.ibDCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.vault.tokens.ibMAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.chiado.vault.tokens.ibWLR

    // Scroll
    // tokenList.tokens[i].id = i.toString()
    // tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.wETH
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.DCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.WLR
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.MAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.DIB
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.tokens.ETA
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.vault.tokens.ibDCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.vault.tokens.ibMAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.scroll_alpha.vault.tokens.ibWLR

    // zkEVM
    // tokenList.tokens[i].id = i.toString()
    // tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.wETH
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.DCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.WLR
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.MAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.DIB
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.tokens.ETA
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.vault.tokens.ibDCT
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.vault.tokens.ibMAV
    tokenList.tokens[i].id = i.toString()
    tokenList.tokens[i++].address = DEPLOYMENTS.zkEVM.vault.tokens.ibWLR

    return tokenList
}

export function useAllLists(): AppState["lists"]["byUrl"] {
    return useAppSelector((state) => {
        return state.lists.byUrl
    })
}

function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
    return {
        // 1: { ...map1[1], ...map2[1] }, // mainnet
        // 3: { ...map1[3], ...map2[3] }, // ropsten
        // 4: { ...map1[4], ...map2[4] }, // rinkeby
        // 5: { ...map1[5], ...map2[5] }, // goerli
        // 42: { ...map1[42], ...map2[42] }, // kovan
        // 51: { ...map1[51], ...map2[51] }, // apothem
        // 250: { ...map1[250], ...map2[250] }, // fantom
        // 4002: { ...map1[4002], ...map2[4002] }, // fantom testnet
        // 137: { ...map1[137], ...map2[137] }, // matic
        // 100: { ...map1[100], ...map2[100] }, // xdai
        // 56: { ...map1[56], ...map2[56] }, // bsc
        // 97: { ...map1[97], ...map2[97] }, // bsc testnet
        // 42161: { ...map1[42161], ...map2[42161] }, // arbitrum
        // 79377087078960: { ...map1[79377087078960], ...map2[79377087078960] }, // arbitrum testnet
        // 1287: { ...map1[1287], ...map2[1287] }, // moonbase
        // 1285: { ...map1[1285], ...map2[1285] }, // moonriver
        // 128: { ...map1[128], ...map2[128] }, // heco
        // 256: { ...map1[256], ...map2[256] }, // heco testnet
        // 43114: { ...map1[43114], ...map2[43114] }, // avax mainnet
        // 43113: { ...map1[43113], ...map2[43113] }, // avax testnet fuji
        // 1666600000: { ...map1[1666600000], ...map2[1666600000] }, // harmony
        // 1666700000: { ...map1[1666700000], ...map2[1666700000] }, // harmony testnet
        // 66: { ...map1[66], ...map2[66] }, // okex
        // 65: { ...map1[65], ...map2[65] }, // okex testnet
        // 42220: { ...map1[42220], ...map2[42220] }, // celo,

        80001: { ...map1[80001], ...map2[80001] }, // matic testnet
        5001: { ...map1[5001], ...map2[5001] }, // mantle testnet
        10200: { ...map1[10200], ...map2[10200] }, // chiado testnet
        534353: { ...map1[534353], ...map2[534353] }, // scroll alpha testnet
        1442: { ...map1[1442], ...map2[1442] }, // zkEVM testnet
    }
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls: string[] | undefined): TokenAddressMap {
    const lists = useAllLists()
    return useMemo(() => {
        if (!urls) return {}
        return (
            urls
                .slice()
                // sort by priority so top priority goes last
                .sort(sortByListPriority)
                .reduce((allTokens, currentUrl) => {
                    const current = lists[currentUrl]?.current
                    if (!current) return allTokens
                    try {
                        return combineMaps(allTokens, listToTokenMap(current))
                    } catch (error) {
                        console.error("Could not show token list due to error", error)
                        return allTokens
                    }
                }, {})
        )
    }, [lists, urls])
}

// filter out unsupported lists
export function useActiveListUrls(): string[] | undefined {
    return useAppSelector((state) => state.lists.activeListUrls)?.filter((url) => !UNSUPPORTED_LIST_URLS.includes(url))
}

export function useInactiveListUrls(): string[] {
    const lists = useAllLists()
    const allActiveListUrls = useActiveListUrls()
    return Object.keys(lists || {}).filter(
        (url) => !allActiveListUrls?.includes(url) && !UNSUPPORTED_LIST_URLS.includes(url)
    )
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
    const activeListUrls = useActiveListUrls()
    const activeTokens = useCombinedTokenMapFromUrls(activeListUrls)
    return combineMaps(activeTokens, TRANSFORMED_DEFAULT_TOKEN_LIST)
}

// list of tokens not supported on interface, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
    // get any loaded unsupported tokens
    const loadedUnsupportedListMap = useCombinedTokenMapFromUrls(UNSUPPORTED_LIST_URLS)

    // format into one token address map
    return useMemo(() => loadedUnsupportedListMap, [loadedUnsupportedListMap])
}

export function useIsListActive(url: string): boolean {
    const activeListUrls = useActiveListUrls()
    return Boolean(activeListUrls?.includes(url))
}

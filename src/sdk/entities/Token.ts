import { AbstractCurrency } from "./AbstractCurrency"
import { ChainId } from "../enums"
import { Currency } from "./Currency"
import invariant from "tiny-invariant"
import { validateAndParseAddress } from "../functions/validateAndParseAddress"
import deployments from "../../constants/deployments.json"

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends AbstractCurrency {
    public readonly chainId: ChainId
    public readonly address: string

    public readonly isNative: false = false
    public readonly isToken: true = true

    public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
        super(chainId, decimals, symbol, name)
        this.chainId = chainId
        this.address = validateAndParseAddress(address)
    }

    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    public equals(other: Currency): boolean {
        return other.isToken && this.chainId === other.chainId && this.address === other.address
    }

    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    public sortsBefore(other: Token): boolean {
        invariant(this.chainId === other.chainId, "CHAIN_IDS")
        invariant(this.address !== other.address, "ADDRESSES")
        return this.address.toLowerCase() < other.address.toLowerCase()
    }

    /**
     * Return this token, which does not need to be wrapped
     */
    public get wrapped(): Token {
        return this
    }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
    if (currencyA instanceof Token && currencyB instanceof Token) {
        return currencyA.equals(currencyB)
    } else if (currencyA instanceof Token) {
        return false
    } else if (currencyB instanceof Token) {
        return false
    } else {
        return currencyA === currencyB
    }
}

export const WETH9: { [chainId: number]: Token } = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.ROPSTEN]: new Token(
        ChainId.ROPSTEN,
        "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.RINKEBY]: new Token(
        ChainId.RINKEBY,
        "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.GÖRLI]: new Token(
        ChainId.GÖRLI,
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.KOVAN]: new Token(
        ChainId.KOVAN,
        "0xd0A1E359811322d97991E03f863a0C30C2cF029C",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.ARBITRUM]: new Token(
        ChainId.ARBITRUM,
        "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
        18,
        "WETH9",
        "Wrapped Ether"
    ),
    [ChainId.ARBITRUM_TESTNET]: new Token(
        ChainId.ARBITRUM_TESTNET,
        "0xf8456e5e6A225C2C1D74D8C9a4cB2B1d5dc1153b",
        18,
        "WETH",
        "Wrapped Ether"
    ),
    [ChainId.BSC]: new Token(ChainId.BSC, "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 18, "WETH", "Wrapped Ether"),
    [ChainId.FANTOM]: new Token(
        ChainId.FANTOM,
        "0x74b23882a30290451A17c44f4F05243b6b58C76d",
        18,
        "WETH",
        "Wrapped Ether"
    ),
    [ChainId.MATIC]: new Token(
        ChainId.MATIC,
        "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
        18,
        "WETH",
        "Wrapped Ether"
    ),
    [ChainId.OKEX]: new Token(ChainId.OKEX, "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 18, "WETH", "Wrapped Ether"),
    [ChainId.HECO]: new Token(ChainId.HECO, "0x64FF637fB478863B7468bc97D30a5bF3A428a1fD", 18, "WETH", "Wrapped Ether"),
    [ChainId.HARMONY]: new Token(
        ChainId.HARMONY,
        "0x6983D1E6DEf3690C4d616b13597A09e6193EA013",
        18,
        "WETH",
        "Wrapped Ether"
    ),
    [ChainId.XDAI]: new Token(ChainId.XDAI, "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1", 18, "WETH", "Wrapped Ether"),
    [ChainId.AVALANCHE]: new Token(
        ChainId.AVALANCHE,
        "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15",
        18,
        "WETH",
        "Wrapped Ether"
    ),
    [ChainId.MOONRIVER]: new Token(
        ChainId.MOONRIVER,
        "0x98878B06940aE243284CA214f92Bb71a2b032B8A",
        18,
        "WMOVR",
        "Wrapped MOVR"
    ),
}

export const WNATIVE: { [chainId: number]: Token } = {
    [ChainId.MAINNET]: WETH9[ChainId.MAINNET],
    [ChainId.ROPSTEN]: WETH9[ChainId.ROPSTEN],
    [ChainId.RINKEBY]: WETH9[ChainId.RINKEBY],
    [ChainId.GÖRLI]: WETH9[ChainId.GÖRLI],
    [ChainId.KOVAN]: WETH9[ChainId.KOVAN],
    [ChainId.MOONRIVER]: new Token(
        ChainId.MOONRIVER,
        "0x98878B06940aE243284CA214f92Bb71a2b032B8A",
        18,
        "WMOVR",
        "Wrapped MOVR"
    ),
    [ChainId.MANTLE_TESTNET]: new Token(
        ChainId.MANTLE_TESTNET,
        deployments.mantle.tokens.wETH,
        18,
        "wBIT",
        "Wrapped BIT"
    ),
    [ChainId.CHIADO]: new Token(ChainId.CHIADO, deployments.chiado.tokens.wETH, 18, "wxDAI", "Wrapped xDAI"),
    [ChainId.SCROLL]: new Token(ChainId.SCROLL, deployments.scroll_alpha.tokens.wETH, 18, "wETH", "Wrapped ETH"),
    [ChainId.POLYGON_ZKEVM]: new Token(ChainId.POLYGON_ZKEVM, deployments.zkEVM.tokens.wETH, 18, "wETH", "Wrapped ETH"),
}

import { Token, WNATIVE } from "../Token"

import { Currency } from "../Currency"
import { NativeCurrency } from "../NativeCurrency"
import invariant from "tiny-invariant"

export class Mantle extends NativeCurrency {
    protected constructor(chainId: number) {
        super(chainId, 18, "wBIT", "Wrapped BIT")
    }

    public get wrapped(): Token {
        const wnative = WNATIVE[this.chainId]
        invariant(!!wnative, "WRAPPED")
        return wnative
    }

    private static _cache: { [chainId: number]: Mantle } = {}

    public static onChain(chainId: number): Mantle {
        return this._cache[chainId] ?? (this._cache[chainId] = new Mantle(chainId))
    }

    public equals(other: Currency): boolean {
        return other.isNative && other.chainId === this.chainId
    }
}

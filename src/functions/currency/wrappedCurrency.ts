import { Currency, NATIVE, WNATIVE } from "../../sdk"

import { supportedChainId } from "../chain"

export function unwrappedToken(currency: Currency): Currency {
    if (currency.isNative) return currency

    const formattedChainId = supportedChainId(currency.chainId)
    // if(formattedChainId && currency.equals(WETH9_EXTENDED[formattedChainId]))
    //     return ExtendedEther.onChain(currency.chainId)

    if (formattedChainId && currency.equals(WNATIVE[formattedChainId])) return NATIVE[currency.chainId]

    return currency
}

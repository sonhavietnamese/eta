import { ChainId } from "../../sdk"
import { getDeployedAddresses } from "../addresses"
import MULTICALL_ABI from "./abi.json"

const MULTICALL_NETWORKS = {
    [ChainId.MANTLE_TESTNET]: getDeployedAddresses().mantle.misc.Multicall2,
    [ChainId.SCROLL]: getDeployedAddresses().scroll_alpha.misc.Multicall2,
    [ChainId.CHIADO]: getDeployedAddresses().chiado.misc.Multicall2,
    [ChainId.POLYGON_ZKEVM]: getDeployedAddresses().zkEVM.misc.Multicall2,
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }

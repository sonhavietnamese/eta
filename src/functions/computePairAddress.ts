import { ChainId, Token, ZERO_ADDRESS } from "../sdk"

export function getTokensFromPairAddress(network: ChainId, pairAddress: string) {
    let token = `${ZERO_ADDRESS}-${ZERO_ADDRESS}`

    switch (network) {
        case ChainId.CHIADO: {
            switch (pairAddress) {
                case "0x4384e5B259009aEa38bb7196D06367731172aF1f": {
                    token = "0x3d0440A3eA85e120864ae609d1383006A1490786-0x935B30d75F57659CF41Bd868A8032E58Fe53C369"
                    break
                }
                case "0x4384e5B259009aEa38bb7196D06367731172aF1f": {
                    token = "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0x3d0440A3eA85e120864ae609d1383006A1490786"
                    break
                }
                case "0x9a31dD51f1BcA696f7940e015929034f3243f87E": {
                    token = "0x3d0440A3eA85e120864ae609d1383006A1490786-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D"
                    break
                }
                case "0x9a31dD51f1BcA696f7940e015929034f3243f87E": {
                    token = "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0x3d0440A3eA85e120864ae609d1383006A1490786"
                    break
                }
                case "0x66135064C6e1484b0AaC0f9E4b37f4607D4c1c56": {
                    token = "0x3d0440A3eA85e120864ae609d1383006A1490786-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613"
                    break
                }
                case "0x66135064C6e1484b0AaC0f9E4b37f4607D4c1c56": {
                    token = "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x3d0440A3eA85e120864ae609d1383006A1490786"
                    break
                }
                case "0x3F2b4679a84c682a2Eacb72b2C53368A39c9bA38": {
                    token = "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc"
                    break
                }
                case "0x3F2b4679a84c682a2Eacb72b2C53368A39c9bA38": {
                    token = "0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc-0x935B30d75F57659CF41Bd868A8032E58Fe53C369"
                    break
                }
                case "0x5be928BD26CE6CF6Fa1129bf5C3929B48B3fB40D": {
                    token = "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D"
                    break
                }
                case "0x5be928BD26CE6CF6Fa1129bf5C3929B48B3fB40D": {
                    token = "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0x935B30d75F57659CF41Bd868A8032E58Fe53C369"
                    break
                }
                case "0xB903430E5eF3AFF4D911aB3E451634f2341E3751": {
                    token = "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613"
                    break
                }
                case "0xB903430E5eF3AFF4D911aB3E451634f2341E3751": {
                    token = "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x935B30d75F57659CF41Bd868A8032E58Fe53C369"
                    break
                }
                case "0x08F0F6D4602aCD9E599D8df46aFD4F4F636dBcD9": {
                    token = "0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613"
                    break
                }
                case "0x08F0F6D4602aCD9E599D8df46aFD4F4F636dBcD9": {
                    token = "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc"
                    break
                }
                case "0x02Feb8CFf9D031D6C03Aa14067C00428b057eF5c": {
                    token = "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613"
                    break
                }
                case "0x02Feb8CFf9D031D6C03Aa14067C00428b057eF5c": {
                    token = "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D"
                    break
                }
            }
        }

        case ChainId.POLYGON_ZKEVM: {
            switch (pairAddress) {
                case "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1"
                    break
                }
                case "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409": {
                    token = "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xa82E3448AA30c081e0394F646798cFB122dc944F": {
                    token = "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0xa82E3448AA30c081e0394F646798cFB122dc944F": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1"
                    break
                }
                case "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0x8700ffc8898fdB19945f23bDF0268426C9598827": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0x8700ffc8898fdB19945f23bDF0268426C9598827": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
            }
        }

        case ChainId.MANTLE_TESTNET: {
            switch (pairAddress) {
                case "0x29aE139c8199E1ce97FDd6a4E30395b79c3dD3ee": {
                    token = "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4"
                    break
                }
                case "0x29aE139c8199E1ce97FDd6a4E30395b79c3dD3ee": {
                    token = "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22"
                    break
                }
                case "0x9E41a4235586F43eFeEEAa30A2e3ebBE753C2a42": {
                    token = "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf"
                    break
                }
                case "0x9E41a4235586F43eFeEEAa30A2e3ebBE753C2a42": {
                    token = "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22"
                    break
                }
                case "0x527225d88B553352554C652DfEDE6A70aBABC653": {
                    token = "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A"
                    break
                }
                case "0x527225d88B553352554C652DfEDE6A70aBABC653": {
                    token = "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22"
                    break
                }
                case "0xa026a0B18433F100ed666F4A03a9ce595adB7Ccf": {
                    token = "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29"
                    break
                }
                case "0xa026a0B18433F100ed666F4A03a9ce595adB7Ccf": {
                    token = "0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4"
                    break
                }
                case "0x3D20F9e857DbCDDE04D6F369B967F33D21B0887d": {
                    token = "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf"
                    break
                }
                case "0x3D20F9e857DbCDDE04D6F369B967F33D21B0887d": {
                    token = "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4"
                    break
                }
                case "0xCa0cc2bAE0FF6D6D52fD5f775704AB40866211Cd": {
                    token = "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A"
                    break
                }
                case "0xCa0cc2bAE0FF6D6D52fD5f775704AB40866211Cd": {
                    token = "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4"
                    break
                }
                case "0xa812166F556E8D5bd97Ef70ffd3Ec302a47Eb5b4": {
                    token = "0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A"
                    break
                }
                case "0xa812166F556E8D5bd97Ef70ffd3Ec302a47Eb5b4": {
                    token = "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29"
                    break
                }
                case "0x9b948D8A5DF0ce6faEEa8B0EF556Ba02ACCb8cA0": {
                    token = "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A"
                    break
                }
                case "0x9b948D8A5DF0ce6faEEa8B0EF556Ba02ACCb8cA0": {
                    token = "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf"
                    break
                }
            }
        }

        case ChainId.SCROLL: {
            switch (pairAddress) {
                case "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1"
                    break
                }
                case "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409": {
                    token = "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029": {
                    token = "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281"
                    break
                }
                case "0xa82E3448AA30c081e0394F646798cFB122dc944F": {
                    token = "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0xa82E3448AA30c081e0394F646798cFB122dc944F": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1"
                    break
                }
                case "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
                case "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0x8700ffc8898fdB19945f23bDF0268426C9598827": {
                    token = "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0x8700ffc8898fdB19945f23bDF0268426C9598827": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xB3798f7b3A28FD8ac505ecF05de94B962E946089"
                    break
                }
                case "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6": {
                    token = "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe"
                    break
                }
                case "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6": {
                    token = "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0x03aa21578A3B1895277F3A8e4e2973270D650472"
                    break
                }
            }
        }
    }

    return token.split("-")
}

export const computePairAddress = ({
    network,
    tokenA,
    tokenB,
}: {
    network: ChainId
    tokenA: Token
    tokenB: Token
}): string => {
    const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA] // does safety checks

    // const pairs = DEPLOYMENTS

    const mixedAddress = `${token0.address}-${token1.address}`
    let address = ZERO_ADDRESS

    switch (network) {
        case ChainId.CHIADO: {
            switch (mixedAddress) {
                case "0x3d0440A3eA85e120864ae609d1383006A1490786-0x935B30d75F57659CF41Bd868A8032E58Fe53C369": {
                    address = "0x4384e5B259009aEa38bb7196D06367731172aF1f"
                    break
                }
                case "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0x3d0440A3eA85e120864ae609d1383006A1490786": {
                    address = "0x4384e5B259009aEa38bb7196D06367731172aF1f"
                    break
                }
                case "0x3d0440A3eA85e120864ae609d1383006A1490786-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D": {
                    address = "0x9a31dD51f1BcA696f7940e015929034f3243f87E"
                    break
                }
                case "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0x3d0440A3eA85e120864ae609d1383006A1490786": {
                    address = "0x9a31dD51f1BcA696f7940e015929034f3243f87E"
                    break
                }
                case "0x3d0440A3eA85e120864ae609d1383006A1490786-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613": {
                    address = "0x66135064C6e1484b0AaC0f9E4b37f4607D4c1c56"
                    break
                }
                case "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x3d0440A3eA85e120864ae609d1383006A1490786": {
                    address = "0x66135064C6e1484b0AaC0f9E4b37f4607D4c1c56"
                    break
                }
                case "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc": {
                    address = "0x3F2b4679a84c682a2Eacb72b2C53368A39c9bA38"
                    break
                }
                case "0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc-0x935B30d75F57659CF41Bd868A8032E58Fe53C369": {
                    address = "0x3F2b4679a84c682a2Eacb72b2C53368A39c9bA38"
                    break
                }
                case "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D": {
                    address = "0x5be928BD26CE6CF6Fa1129bf5C3929B48B3fB40D"
                    break
                }
                case "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0x935B30d75F57659CF41Bd868A8032E58Fe53C369": {
                    address = "0x5be928BD26CE6CF6Fa1129bf5C3929B48B3fB40D"
                    break
                }
                case "0x935B30d75F57659CF41Bd868A8032E58Fe53C369-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613": {
                    address = "0xB903430E5eF3AFF4D911aB3E451634f2341E3751"
                    break
                }
                case "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x935B30d75F57659CF41Bd868A8032E58Fe53C369": {
                    address = "0xB903430E5eF3AFF4D911aB3E451634f2341E3751"
                    break
                }
                case "0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613": {
                    address = "0x08F0F6D4602aCD9E599D8df46aFD4F4F636dBcD9"
                    break
                }
                case "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0x4beC7Ad5a195fc04b8eB600d975Fc70fB534d4Fc": {
                    address = "0x08F0F6D4602aCD9E599D8df46aFD4F4F636dBcD9"
                    break
                }
                case "0xBc43C5D55d936cA74dB498a123433eb9EcA0882D-0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613": {
                    address = "0x02Feb8CFf9D031D6C03Aa14067C00428b057eF5c"
                    break
                }
                case "0xf0BB8e57747b9C06b204Be6bb1Ce066F4611B613-0xBc43C5D55d936cA74dB498a123433eb9EcA0882D": {
                    address = "0x02Feb8CFf9D031D6C03Aa14067C00428b057eF5c"
                    break
                }
            }
        }

        case ChainId.POLYGON_ZKEVM: {
            switch (mixedAddress) {
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1": {
                    address = "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409"
                    break
                }
                case "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029"
                    break
                }
                case "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0xa82E3448AA30c081e0394F646798cFB122dc944F"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1": {
                    address = "0xa82E3448AA30c081e0394F646798cFB122dc944F"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0x8700ffc8898fdB19945f23bDF0268426C9598827"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0x8700ffc8898fdB19945f23bDF0268426C9598827"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6"
                    break
                }
            }
        }

        case ChainId.MANTLE_TESTNET: {
            switch (mixedAddress) {
                case "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4": {
                    address = "0x29aE139c8199E1ce97FDd6a4E30395b79c3dD3ee"
                    break
                }
                case "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22": {
                    address = "0x29aE139c8199E1ce97FDd6a4E30395b79c3dD3ee"
                    break
                }
                case "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf": {
                    address = "0x9E41a4235586F43eFeEEAa30A2e3ebBE753C2a42"
                    break
                }
                case "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22": {
                    address = "0x9E41a4235586F43eFeEEAa30A2e3ebBE753C2a42"
                    break
                }
                case "0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A": {
                    address = "0x527225d88B553352554C652DfEDE6A70aBABC653"
                    break
                }
                case "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x523d9B3B10900544CF467F4Fe95012fB8b1aeD22": {
                    address = "0x527225d88B553352554C652DfEDE6A70aBABC653"
                    break
                }
                case "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29": {
                    address = "0xa026a0B18433F100ed666F4A03a9ce595adB7Ccf"
                    break
                }
                case "0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4": {
                    address = "0xa026a0B18433F100ed666F4A03a9ce595adB7Ccf"
                    break
                }
                case "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf": {
                    address = "0x3D20F9e857DbCDDE04D6F369B967F33D21B0887d"
                    break
                }
                case "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4": {
                    address = "0x3D20F9e857DbCDDE04D6F369B967F33D21B0887d"
                    break
                }
                case "0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A": {
                    address = "0xCa0cc2bAE0FF6D6D52fD5f775704AB40866211Cd"
                    break
                }
                case "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x65DF2E3Ea63E631D9f9488e1567E2AAe5aE5BBD4": {
                    address = "0xCa0cc2bAE0FF6D6D52fD5f775704AB40866211Cd"
                    break
                }
                case "0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A": {
                    address = "0xa812166F556E8D5bd97Ef70ffd3Ec302a47Eb5b4"
                    break
                }
                case "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0xCE25152458A43a80BA99CeD2f4Da10A225FAFD29": {
                    address = "0xa812166F556E8D5bd97Ef70ffd3Ec302a47Eb5b4"
                    break
                }
                case "0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf-0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A": {
                    address = "0x9b948D8A5DF0ce6faEEa8B0EF556Ba02ACCb8cA0"
                    break
                }
                case "0xC699efe882a9cD095576bA2cff0cAd2Bb47b4a7A-0x3342Fbe7495bFd2Ce49363141DbBF38E762EEeaf": {
                    address = "0x9b948D8A5DF0ce6faEEa8B0EF556Ba02ACCb8cA0"
                    break
                }
            }
        }

        case ChainId.SCROLL: {
            switch (mixedAddress) {
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1": {
                    address = "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409"
                    break
                }
                case "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xa4aa2992725dAAA9b1014adDF76ECF23CCce8409"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xEDEd66a2E9dfCAB4C66562051b91ef1Fcd98ba9f"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0x5B4722e4e775108fcC04d3b0C057BF4B7ee18893"
                    break
                }
                case "0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xEe6ef3FA09858E6D7cd6873fcAC79FcA4aBaF281": {
                    address = "0xCe5c43d616CCF346edeCA02706802fCBd0ADe029"
                    break
                }
                case "0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0xa82E3448AA30c081e0394F646798cFB122dc944F"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xfd6B4029b0A1af7b2995Bd2be862BD643AF115F1": {
                    address = "0xa82E3448AA30c081e0394F646798cFB122dc944F"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0x858400E6d11C831c48dD1Efe51B2E0ef90b94Af3"
                    break
                }
                case "0xB3798f7b3A28FD8ac505ecF05de94B962E946089-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0x8700ffc8898fdB19945f23bDF0268426C9598827"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0xB3798f7b3A28FD8ac505ecF05de94B962E946089": {
                    address = "0x8700ffc8898fdB19945f23bDF0268426C9598827"
                    break
                }
                case "0x03aa21578A3B1895277F3A8e4e2973270D650472-0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe": {
                    address = "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6"
                    break
                }
                case "0xad95cc76Ce5F9cc715a0093261d70dF72E61afAe-0x03aa21578A3B1895277F3A8e4e2973270D650472": {
                    address = "0xf89fcb29Ef3740c835CecFeA9F91C4EB866dD4e6"
                    break
                }
            }
        }
    }

    return address
}

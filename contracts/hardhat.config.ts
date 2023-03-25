import { config as dotEnvConfig } from "dotenv"
dotEnvConfig()

import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"
import "hardhat-deploy"

const PRIVATE_KEY = ""
const ALCHEMY_MUMBAI = ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            gas: 12000000,
            blockGasLimit: 0x1fffffffffffff,
            allowUnlimitedContractSize: true,
            timeout: 1800000,
            mining: {
                auto: false,
                interval: 5000,
            },
        },
        chiado: {
            url: "https://rpc.chiadochain.net",
            gasPrice: 1000000000,
            accounts: [PRIVATE_KEY],
        },
        scroll: {
            url: "https://alpha-rpc.scroll.io/l2",
            accounts: [PRIVATE_KEY],
        },
        mantle: {
            chainId: 0x1389,
            url: "https://rpc.testnet.mantle.xyz",
            accounts: [PRIVATE_KEY],
        },
        zkevm: {
            url: "https://rpc.public.zkevm-test.net",
            accounts: [PRIVATE_KEY],
        },
        mumbai: {
            url: ALCHEMY_MUMBAI,
            accounts: [PRIVATE_KEY],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    solidity: {
        settings: {
            evmVersion: "istanbul",
            outputSelection: {
                "*": {
                    "": ["ast"],
                    "*": [
                        "evm.bytecode.object",
                        "evm.deployedBytecode.object",
                        "abi",
                        "evm.bytecode.sourceMap",
                        "evm.deployedBytecode.sourceMap",
                        "metadata",
                    ],
                },
            },
        },
        compilers: [
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.8.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.8.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.8.7",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999,
                    },
                },
            },
        ],
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "../src/constants/artifacts",
    },
    typechain: {
        outDir: "./typechain",
    },
    etherscan: {
        apiKey: "T1MWBTR2K6HFKGUZE67BMRXBZ96FIYWGEE", // FTM
    },
    mocha: {
        timeout: 50000,
    },
}

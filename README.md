# Eta

# Demo

* [Website](https://eta-scaling.vercel.app)
* [Demo Video](https://drive.google.com/file/d/1e7wZKTtdFm-d69iR_YH1E5u8rAbTU0a_/view?usp=share_link)


# Introduction

Eta presents an advanced, decentralized exchange platform that supplies liquidity, offers an automated yield-generating stablecoin, and facilitates peer-to-peer transactions. Users can engage in direct trading from their digital wallets, circumventing the need for third-party intermediaries, thereby ensuring complete token custody and unwavering ownership.

Moreover, the combination of minimal trading fees and abundant liquidity renders Eta an appealing platform for trading purposes, while concurrently extending wide-ranging support to various aspects of the community. This enables continual adaptation to dynamic market conditions and ongoing value provision to token holders and the community at large.

Eta boasts the following sophisticated features:

1. High-efficiency token swapping (an optimized Uniswap fork, designed for enhanced gas efficiency)
2. A capital-efficient lending and borrowing protocol
3. Automated yield-generating stablecoin (eetaUSD)
4. Secure cross-chain bridge for seamless asset transfers


Eta currently supports the following sponsor chains:

1. Gnosis Chain (Chiado Testnet)
2. Scroll Alpha Testnet
3. Mantle Testnet
4. Polygon zkEVM

[All contracts are deployed on each of the above chains.](https://github.com/ozeliger/eta/blob/dev/src/constants/deployments.json)


# 1. Swapping Crypto

Quickly swap crypto tokens on Filecoin. Eta's implementation is a more gas-optimized version of [Uniswap v2](https://uniswap.org/blog/uniswap-v2). You can also add liquidity to the various pools supported to further strengthen the protocol. 


# 2. Lending & Borrowing

Eta introduces an institution-grade DeFi borrowing and lending protocol featuring ***permissionless*** liquidity pools, allowing anyone to lend and borrow assets at high APYs. The source code for Eta's Lending & Borrowing protocol is [*massive* and *rigorously-tested*. Have a glance; I won't disappoint ;)](https://github.com/ozeliger/eta/blob/dev/contracts/contracts/vaults/EtaVault.sol).


### Some points

1. Lenders receive an amount of interest-bearing tokens (`ibTokens`) which continously earn interest through their exchange rate. In addition, lenders may choose to mint the `etaUSD` stablecoin by depositing `ibTokens` (more on this later).
1. Borrowers pay 0.1% of the borrowed amount as an "origination" fee, which is added to the total borrow amount in its respective RToken.
2. Liquidations carry a 10% fee paid directly to the liquidator.


# 3. Stablecoin (`etaUSD`)

`etaUSD` is an *overcollateralized*, *auto-farming* stablecoin reinforced with **multi-layered pegging mechanisms** to maintain its peg at $1. Lenders on Eta collateralize their `ibTokens` to borrow `etaUSD` (issued 1:1). Thus, lenders are able to continue earning high lending APR, while also borrowing `etaUSD` to use as they see fit. This, we believe, unlocks even higher profit potential and greatly increases the flexibility of user's capital. 

`etaUSD` is a mini-fork of the battle-tested MakerDAO, with the following improvements:

1. **Farmable Collateral**: For most lending protocols, users have to decide between staking their assets to earn yield, or staking their assets as collateral to borrow against. With Eta, users don't need to make this tradeoff -- users can deposit their assets as collateral to borrow `etaUSD`, while also continuing to earn juicy lending APY. Also, because the lending APY for most vaults are much higher than the stability fee for `etaUSD` (2.5%), these loans are effectively better than interest-free: they are yield-bearing, auto-farming loans!

2. **Efficient Pegging**: Just being overcollateralized is not enough to maintain a stable peg. The protocol takes inspiration from MakerDAO, and automatically adjusts borrowing interest up/down to decrease/increase selling pressure depending on which side of $1 the collateral value falls to.

3. **Gentle Liquidation**: `etaUSD` has gentle liquidation, meaning that when a `etaUSD` borrowing position faces liquidation, only a *small* portion of the position is liquidated until it is brought back to health. This model results in lower associated costs and liquidation risk for `etaUSD` borrowers.


# 4. Cross-Chain Bridge

Eta has a cross-chain bridge to facilitate interoperability between supported networks and other chains (such as Polygon).
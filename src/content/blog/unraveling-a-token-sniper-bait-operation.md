---
pubDatetime: 2023-05-13T18:34:52
title: Unraveling a Token Sniper Bait Operation
draft: false
tags:
  - token-sniping
  - Ethereum
  - MEV
description:
   Unraveling a complex token sniper bait operation for fun and profit
---

## Table of Contents

## Introduction
This is a story about how I unraveled and took advantage of a complex sniper bait operation.

## What is Token Sniping?
Token liquidity snipers are automated bots that buy tokens as soon as liquidity is added to a protocol in an attempt to be first to the next big meme coin. 

An excellent resource to learn about token snipers is [this presentation from the Usenix conference.](https://www.usenix.org/conference/usenixsecurity23/presentation/cernera)

Automated token snipers usually use algorithms and heuristics to choose which tokens to buy into, intending to stay away from rug pulls. My research shows 3 main heuristics:
 - Deployer Reputation: The on-chain or off-chain reputation of the token deployer.
 - Token Trading Volume: Any swap volume, often filtered by unique wallets.
 - Contract Trustworthiness: The token's smart contract shows few signs of a rug pull being possible.

Once a token sniper identifies a token that scores well in these areas, it will purchase some of the tokens on Uniswap.

A few smart individuals identified what I have laid out above and decided to take advantage of these token sniper bots, attempting to bait them into buying scam tokens.

## Token Sniping Bait
The concept of baiting token snipers is simple: create scam tokens, wait for snipers to invest, and remove liquidity at a profit. You can think of the bait operations as honeypots.

The specific instance of such a scheme that I uncovered was significantly more complex. Here is the full strategy that I gleaned from on-chain analysis:
1. Begin with an HQ wallet preloaded with ETH
2. Create a token from HQ with a generic name, and publish the source code to Etherscan.
3. Add liquidity to Uniswap.
4. Send a small amount of ETH to many new wallets.
   1. Each of these baby wallets begins to wash trade the token on Uniswap to generate volume, intending to attract token snipers. The HQ wallet may also do some wash-trading.
5. Wait for traders and sniper bots to purchase the token.
6. As soon as the token starts generating buys, remove all liquidity. Most of the baby wallets have invested all of their ETH in the token, and still have a little bit of dust.
7. Transfer all ETH to a new wallet and return to step 1.

I won't mention the specific operation that I identified here for privacy, but there are many such scam coins created every day. 
> it is simply astonishing, the amount of scam pairs created daily
> -- <cite>[2313211323 on Discord](https://discordapp.com/users/810561526880272404)</cite>

As an aside, it seems that some of the wash-trading baby wallets get sandwiched by our friend jaredfromsubway. If the owner of the bait bot is reading this, I'm curious why you let yourself get sandwiched.

Many of these scam coins end up earning the deployer about 2 ETH after gas, with dust in the baby wallets amounting to 0.5 ETH or so. 

After a long string of new tokens, earning the deployer 2 ETH each time, the bait bot has a significant amount of ETH. The bait bot then splits itself into multiple bait bots, and the cycle continues for multiple new bots. There seems to be a threshold of about 60 ETH that the bot splits at. 

For the curious, here is a TheGraph query from the [Uniswap subgraph](https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2) that I used to first identify the bait bot's tokens:
```graphql
{
  pairs(orderBy: createdAtTimestamp, orderDirection: desc) {
    id
    txCount
    volumeUSD
    token0 {
      name
      symbol
    }
    token1 {
      name
      symbol
    }
  }
}
```

Some of my favorite tokens that I discovered with this query: 
- `The Super Saiyan Nuclear Putin 2 Inu`
- `MiladySuperMilfToken`
- `BilboBagginsPutinCharmander9000Inu`

## Next Steps
As a searcher finding this operation I considered creating a bot to take advantage of this pattern.
Such a bot would work roughly like this:
1. Identify when tokens have been created by the bait bot.
2. Immediately buy the token when it gets listed on Uniswap.
3. Sell into the bait bot's wash trading, walking away with a decent profit.

Though this seems like exactly what the bait bot is trying to encourage, I think that with a small enough position size, the bot would not remove liquidity, as I have seen small investors get away with it before. I believe the bait bot waits for a certain threshold to be hit before removing liquidity, and any positions under that threshold are safe.

I decided not to create such a bot because it is too risky, gas expenses would cancel any profits, and the bait bot could easily change its strategy to avoid being taken advantage of.

## Conclusion
> never buy blindly into an token that you found due to high activity 🤷‍♂️
> -- <cite>[YannickCrypto on Discord](https://discordapp.com/users/300535608722325505)</cite>

I hope that this article has been informative and entertaining. Please don't fall for these scams, and don't try to take advantage of them either unless you know what you are doing.

See you in the mempool anon!
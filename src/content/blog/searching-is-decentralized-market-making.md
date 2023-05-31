---
pubDatetime: 2023-05-31T13:27:42
title: Searching is Decentralized Market Making
draft: false
tags:
  - MEV
description:
  My opinions on how MEV searching functions as market making in decentralized lending markets.
---

## Table of Contents

## Introduction
While searching for a way to explain MEV searchers to a TradFi quant (no pun intended,) one might compare searching to market making in TradFi. This article will explain the similarities and differences.

## Market Making
Market making has two main functions:
 - Providing liquidity
 - Price discovery

Market makers provide liquidity at the bid-ask spread and profit from the difference.

### Market Making in TradFi
Market makers in traditional finance (TradFi) provide liquidity by offering to buy and sell an asset at certain prices. They "bid" (which is like an offer,) at a lower price than what they "ask" (which is like a listing.) This means that any party that wants to buy and then immediatelly sell will lose a small percentage on their trade because of the difference. The difference between the bid price and the ask price is called the bid-ask spread. The market maker earns a profit by keeping the difference between the bid and ask for each corresponding trade. In return for offering to buy and sell at the same time, effectively providing liquidity, market makers earn a small commission because of the bid-ask spread.

Market makers also aid in price discovery, which is the process of finding an agreed upon price for an asset. When the price of an asset changes on a different exchange, market makers change their own bids and asks on the news, sometimes preventing an arbitrageur from exploiting the difference. 

See [Investopedia's Definition](https://www.investopedia.com/terms/m/marketmaker.asp) for more information.

### Automated Market Makers (AMM) in DeFi
AMMs are a novel concept used by many well known exchanges in DeFi. The AMM model was popularized by Uniswap.
> At a very high level, an AMM replaces the buy and sell orders in an order book market with a liquidity pool of two assets, both valued relative to each other. As one asset is traded for the other, the relative prices of the two assets shift, and a new market rate for both is determined. In this dynamic, a buyer or seller trades directly with the pool, rather than with specific orders left by other parties. 
> -- <cite>[Uniswap Documentation](https://docs.uniswap.org/concepts/uniswap-protocol)</cite>

AMMs are also known as Constant Function Market Makers (CFMMs) and one excellent paper is [Improved Price Oracles: Constant Function Market Makers](https://arxiv.org/abs/2003.10001) from Guillermo Angeris and Tarun Chitra.

AMMs perform the first function of market makers: providing liquidity, but do not perform price discovery. Instead, AMMs choose to allow arbitrageurs to resolve differences across exchanges. This means that AMMs defer the role of price discovery to centralized exchanges and searchers. This is how searching can act as market making.

## Searching for Inefficiencies
Just as searching resolves and corrects market ineffciencies in market making, searchers also resolve inefficiencies in other markets. Many decentralized lending platforms such as Aave and [LLAMMA from Curve](https://github.com/curvefi/curve-stablecoin/blob/master/doc/curve-stablecoin.pdf) rely on searchers to execute hard or soft liquidations. Searchers act as corollaries to decentralized lending protocols by taking part of the role as traditional lenders.

Lenders in traditional finance usually take on the responsibility to margin call, ask for more collateral, or foreclose on borrowers. In decentralized lending markets, loans are usually over-collaterlized, but may fluctuate. The task of liquidating a loan to keep the lender solvent is given to searchers.

## Conclusion
Further classification of what roles searching plays in the blockchain ecosystem has been on my mind recently. In general, I think of searching and MEV as decentralized systems for many things previously done by centralized entities. I am excited to see what kind of systems can be replaces by free market competition with searching!


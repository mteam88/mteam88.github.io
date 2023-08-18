---
pubDatetime: 2023-05-12T00:10:15
title: i'M NeW tO mEv
draft: false
tags:
  - MEV
description:
  An informative post for anyone new to MEV. Learn the lingo, the culture, and technical details of running a bot.
featured: true
---

## Table of Contents

## Introduction
Welcome! If you are reading this, you probably are new to the MEV space. This post is meant to be a guide for anyone new to the space. I will not try to cover the basics of what MEV is, but I will link to relevant resources. I will cover the terminology you need to know, and the social norms in the space, and some of the more technical details of running a bot.

There is a decent chance you are drawn to MEV seeking profit. Maybe you heard of jaredfromsubway making millions with a sandwiching bot or learned about MEV another way. Regardless, I hope this post helps you get started.

This article serves as an extension of https://docs.flashbots.net/new-to-mev/ and https://ethereum.org/en/developers/docs/mev/. I recommend reading both of those articles as well as this one. Those articles will focus on MEV itself, where this will focus more on the culture and terminology of the MEV community.

## What is MEV?
MEV stands for Maximum Extractable Value and can be defined as any value (economic or otherwise) that can be extracted from a privileged role in any system. MEV has become prominent in blockchains as the value that can be extracted from the ordering of transactions in a block which is a privilege of network validators.

For an excellent introduction to MEV, I recommend reading [the Ethereum Foundation article on the topic](https://ethereum.org/en/developers/docs/mev/) and [Ethereum is a Dark Forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest) by Paradigm.

The [MEV supply chain](https://docs.flashbots.net/flashbots-auction/overview#technical-architecture) is the process by which MEV is extracted. The supply chain consists of:
- **Searchers** who find MEV in the form of bundles. 
- **Bundles** which contain transactions that extract MEV
- **Builders** who create blocks from bundles
- **Relays** which submit blocks from builders to validators
- **Validators/Proposers** who propose blocks to the blockchain

<img src="/assets/mevboost-searcher-bundle-flow.png" width="100%" alt="Graphical representation of the MEV supply chain">

An **MEV bot** is an automated program that attempts to extract MEV. We refer to the people who run these bots as **searchers.** 

I recommend reading my other articles for more information on types of MEV.

## The "lingo"
MEV is a new field, and as such, has a lot of new terminology. Here are some of the most important terms to know:

#### Searchers
Searchers are key players in the MEV space. They are responsible for building and running MEV bots to extract MEV at a profit.

> a large portion of MEV is extracted by independent network participants referred to as "searchers." Searchers run complex algorithms on blockchain data to detect profitable MEV opportunities and have bots to automatically submit those profitable transactions to the network.
> -- <cite>[The Ethereum Foundation](https://ethereum.org/nl/developers/docs/mev/#mev-extraction)</cite>

Estimates from [the Bell Curve podcast](https://www.youtube.com/watch?v=NqM9PNPQFMs) put the number of active searchers at only 500.

#### Ops
Ops (opportunities) are any situation or event that can be exploited for MEV. An op is "hit" when a searcher successfully profits off of it.

#### Alpha
I will quote myself on this one:
> Alpha is exclusive knowledge or information that creates a competitive advantage. Alpha in this context refers to a technique or strategy that allows a searcher to discover new ops.

To understand the origin of the phrase, I recommend reading [The Quants](https://en.wikipedia.org/wiki/The_Quants) by Scott Patterson.

#### Sandwiching
Sandwiching is a common MEV strategy employed by searchers such as [jaredfromsubway.eth.](https://www.theblock.co/post/230218/jaredfromsubway-mev-bot)

> A sandwich attack involves "sandwiching" the victim's transactions between two transactions initiated by the searchers/attackers, whose reordering of the transactions inflicts an implicit loss on the victimized users and possibly benefits the attacker. 
> -- <cite>[EigenPhi Classroom](https://eigenphi-1.gitbook.io/classroom/mev-types/sandwich-mev)</cite>

#### Arbitrage
Arbitrage is another common MEV strategy employed by many searchers.

> In economics and finance, arbitrage is the practice of taking advantage of a difference in prices in two or more markets; striking a combination of matching deals to capitalize on the difference, the profit being the difference between the market prices at which the unit is traded.
> -- <cite>[Wikipedia: Arbitrage](https://en.wikipedia.org/wiki/Arbitrage)</cite>

> Decentralized exchange (DEX) arbitrage is the simplest and most well-known MEV opportunity. As a result, it is also the most competitive.
> It works like this: if two DEXes are offering a token at two different prices, someone can buy the token on the lower-priced DEX and sell it on the higher-priced DEX in a single, atomic transaction. Thanks to the mechanics of the blockchain, this is true, riskless arbitrage.
> -- <cite>[The Ethereum Foundation](https://ethereum.org/en/developers/docs/mev/#mev-examples-dex-arbitrage)</cite>

#### Liquidations
Liquidations are another common MEV strategy employed by searchers.

> As the value of a borrower's collateral [in DeFi applications] fluctuates, so too does their borrowing power. If, due to market fluctuations, the value of borrowed assets exceeds say, 30% of the value of their collateral (again, the exact percentage is determined by the protocol), the protocol typically allows anyone to liquidate the collateral, instantly paying off the lenders (this is similar to how margin calls work in traditional finance). If liquidated, the borrower usually has to pay a hefty liquidation fee, some of which goes to the liquidator — which is where the MEV opportunity comes in.
> -- <cite>[The Ethereum Foundation](https://ethereum.org/en/developers/docs/mev/#mev-examples-liquidations)</cite>

#### Long vs short tail MEV
The Ethereum Foundation provides an excellent classification of the different types of MEV:
> DEX arbitrage, liquidations, and sandwich trading are all very well-known MEV opportunities and are unlikely to be profitable for new searchers. However, there is a long tail of lesser known MEV opportunities (NFT MEV is arguably one such opportunity).
> -- <cite>[The Ethereum Foundation](https://ethereum.org/en/developers/docs/mev/#mev-examples-long-tail)</cite>

When searchers refer to long tail MEV, they are often referring to less well-known MEV strategies with more infrequent ops.

#### Flashbots
[Flashbots](https://docs.flashbots.net/) is a research and development organization that has a widespread impact on MEV on the Ethereum blockchain. 

They are the team behind:
 - [The Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview)
 - [MEV Explore](https://docs.flashbots.net/flashbots-data/mev-explore)
 - [Flashbots Protect](https://docs.flashbots.net/flashbots-protect/overview)
 - [MEV-Boost](https://docs.flashbots.net/flashbots-mev-boost/introduction)
 - [MEV-Share](https://docs.flashbots.net/flashbots-mev-share/overview)
 - The [Flashbots Discord](https://discord.gg/flashbots)
 - The [Flashbots Forum](https://collective.flashbots.net)
 - [Realized Extractable Value Dashboard](https://transparency.flashbots.net/)

#### Bundle
A bundle is a collection of transactions that are submitted to the Flashbots Auction. Bundles are submitted by searchers and are executed in the order they are received by the miner. Bundles are the primary way searchers extract MEV and hit ops.

## Social Norms
The following social rules and expected behaviors are from personal experience on the [Flashbots Discord](https://discord.gg/flashbots) which is a popular community for MEV searchers and other interested parties.

#### Don't ask for an MEV bot
This is a big one.
Please don't ask for an MEV bot. **No searcher with a profitable bot will be willing to sell you their bot**. If you want to run a bot, you will probably have to build it yourself. Any asking will likely end up with you being ignored or contacted by scammers.

#### Don't try to scam people
Seems obvious, doesn't it? Well, it happens. Don't try to scam people. Don't ask for help on a scam. Just. Don't.

#### Don't dox people
Most searchers are anonymous and would like to stay that way. Don't ask for personal information. Don't share personal information. Don't try to find personal information.

#### Don't brag about your bot
This is more of a social convention than a hard rule, but it is usually frowned upon to brag about your bot. It is fine to share your bot's performance but don't be a jerk about it. I don't recommend posting any identifiable information about your bot either.

#### Don't DM
Don't DM people unless they ask you to. If you have a question, ask it in the appropriate channel. If you have a question for a specific person, ask it in the appropriate channel and tag them. If you have a question for a specific person that you don't want to ask in public, ask them if you can DM them. If they say no, don't DM them. It's that simple.

#### Be respectful and gracious
This is a community of people who are usually extremely intelligent, and often very busy. If someone doesn't respond to you, don't take it personally. If someone is rude to you, don't be rude back. If someone helps you, thank them. If someone asks for help, help them if you can. General social policy applies here.

## I want to make an MEV bot. Where do I start?
I'll begin by saying that building and maintaining a competitive MEV bot is **exceptionally difficult**. It requires a lot of time, effort, and skill. 

⛔ Most searchers will get rekt and lose money. Be prepared for that. MEV is a best-takes-most game. If you are not the best, you will not be profitable.

If you are still interested, read on.

### Programming
To make a competitive MEV bot you need to be able to program exceptionally well. Choosing a programming language is the first step. You should be comfortable with one of the following languages:
 - [Rust](https://www.rust-lang.org/)
 - [Go](https://golang.org/)
 - [JavaScript](https://www.javascript.com/) and [TypeScript](https://www.typescriptlang.org/)

I recommend [The Go Ethereum Book](https://goethereumbook.org/en/) for Go.

I don't know of any similar resources for Rust and javascript/typescript, but I will update this section if I find any.

Some helpful open-source Rust bots include:
- [Rusty-sando](https://github.com/mouseless-eth/rusty-sando)
- [Subway-rs](https://github.com/refcell/subway-rs)
- [Opensea-sudo-arb](https://github.com/paradigmxyz/artemis/tree/main/crates/strategies/opensea-sudo-arb)

A popular open source javascript bot is [Subway.](https://github.com/libevm/subway)

Understanding [solidity](https://docs.soliditylang.org/en/v0.8.20/) is necessary for many types of MEV bots.

### Tools
A number of tools are useful for MEV searchers. I will list some of the most popular ones here.
 - [EigenPhi](https://eigenphi.io/) for MEV analysis
 - [Flashbots Transparency Dashboard](https://transparency.flashbots.net/) for MEV analysis
 - [Tenderly](https://tenderly.co/transaction-simulator) for bundle simulation
 - [Flashbots](https://docs.flashbots.net/flashbots-auction/overview) for bundle submission on Ethereum

### Bot best practices
There are a few things you should know before attempting to write a bot from scratch. I'll go over some common pitfalls and best practices here. I plan on writing a more in-depth guide in the future.

#### Bot Architecture
The architecture of an MEV bot is generally similar to the following from the [Artemis](https://github.com/paradigmxyz/artemis) docs:

> 1. Collectors: Collectors take in external events (such as pending txs, new blocks, marketplace orders, etc. ) and turn them into an internal event representation.
> 2. Strategies: Strategies contain the core logic required for each MEV opportunity. They take in events as inputs, and compute whether any opportunities are available (for example, a strategy might listen to a stream of marketplace orders to see if there are any cross-exchange arbs). Strategies produce actions.
> 3. Executors: Executors process actions, and are responsible for executing them in different domains (for example, submitting txs, posting off-chain orders, etc.).

#### Gas & Bribing
In a system known as a [MEV Auction](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788), searchers incentivize validators to include their bundles in a block by paying them a bribe. These bribes usually account for more than 99% of the MEV profit in a bundle. This means that searchers usually end up with less than 5% of the profit for each opportunity they hit.

You may have heard about gas wars or bribe wars. These are situations where multiple searchers are competing to hit the same opportunity. In these situations, searchers will increase their bribes and bribes can get very high. It is not unheard of for bots to bribe more than 100% to edge out their competition.

#### Salmonella Poisoning
A [Salmonella attack](https://github.com/Defi-Cartel/salmonella) is an attack specifically designed to reck poorly designed MEV bots. I highly recommend reading the linked article for more information.

#### Smart Contracts
Though it is technically possible to make a profitable MEV bot without using a custom smart contract, very few searchers do this. Most searchers use a custom smart contract to interact with the blockchain. This allows them to do things like:
 - Interact with multiple contracts in a single transaction
 - Fetch a batch of information from the blockchain in one transaction
 - Save gas by batching transactions
 - Revert unprofitable transactions to avoid balance sheet risk

#### Reorgs and Reorg Protection
Reorgs are Ethereum events that involve changing the blockchain. Reorgs may expose risk to MEV searchers because a reorged block will not include guarantees about bundle privacy and ordering. This means that validators may be able to "unbundle" a searcher's bundle and steal funds from their bot. This is known as a reorg attack.

MEV bots protect against reorgs by using runtime checks in their smart contracts. These checks can include things like checking the block number and checking the block hash of the previous block.

Recommend reading [this article](https://writings.flashbots.net/flashbots-reorgs) by Flashbots for more information on reorgs and reorg protection.

## Conclusion and Further Reading
I hope this guide has been helpful. Please use common sense while navigating the MEV community, and feel free to link this article to anyone who is new to MEV.

Some of my favorite MEV related articles and resources are as follows:
 - [Flash Boys: A Wall Street Revolt](https://en.wikipedia.org/wiki/Flash_Boys)
 - [Flash Boys 2.0](https://arxiv.org/abs/1904.05234)
 - [Flashbots -- Frontrunning the MEV crisis](https://writings.flashbots.net/frontrunning-mev-crisis)
 - [MEV for the next trillion](https://writings.flashbots.net/mev-for-the-next-trillion)
 - [Bell Curve Podcast](https://www.listennotes.com/podcasts/bell-curve-jason-yanowitz-and-mike-ippolito-2AfjEKakTgd/)
 - [Bell Curve: Interview with a Searcher 2.0](https://www.listennotes.com/podcasts/bell-curve/interview-with-a-searcher-20-Xt5YPJ_ZIq4/)
 - [0xResearch Podcast](https://www.listennotes.com/podcasts/0xresearch-sam-martin-and-dan-smith-Go1R5zhkFWJ/)
 - [Anish Agnihotri](https://anishagnihotri.com/)
 - [The Flashbots Forum](https://collective.flashbots.net)

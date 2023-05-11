---
pubDatetime: 2023-05-11T00:36:52
title: MEV isn't as competitive as you think
draft: false
tags:
  - MEV
  - blockchain
  - long-tail
description:
  A searcher explains why MEV isn't as competitive as everyone thinks and why that is.
---

## Table of Contents

## Introduction
Maximum Extractable Value (MEV) has become a hot topic in the blockchain space, with general opinion being that it's an intensely competitive field. However, this perception may not be entirely accurate. In this post, we'll explore why MEV isn't as competitive as it seems and discuss the factors that contribute to this reality. We will also zoom in on the differences between short tail MEV and long tail MEV and how these differences affect competition.

## What does MEV competition look like?
On Ethereum, MEV competition is primarily between searchers. Let's begin with some of the differences between different categories of MEV:

### Short tail MEV vs long tail MEV
The Ethereum Foundation provides an excellent classification of MEV:
> DEX arbitrage, liquidations, and sandwich trading are all very well-known MEV opportunities and are unlikely to be profitable for new searchers. However, there is a long tail of lesser known MEV opportunities (NFT MEV is arguably one such opportunity).
> -- <cite>[The Ethereum Foundation](https://ethereum.org/pl/developers/docs/mev/)</cite>

[Flashbots](https://github.com/flashbots/mev-job-board) maintains a limited list of long tail MEV opportunities if you are interested.

Short tail MEV is usually based on opportunites (ops) that are extremely well known in searcher communities and the bots that target these ops are often run by teams who put a lot of effort into optimizing their bots.

Long tail MEV on the other hand, is usually based on ops that are specific and more difficult to automate. These ops are often not well known tend to be targeted by individual searchers.

### Competition for ops
Short tail MEV is based on strategies that are well known and easy to automate. A vast majority of the competition between short-tail MEV bots is based on using various techniques to "hit" specific ops before other bots. This is usually done by using a combination of the following techniques:
- Efficiency (Bot computation)
- Latency (Network competition)
- Bribing (Gas price competition)

### Competition for alpha
As opposed to short tail MEV, long tail MEV is based much less on competition for ops and much more on competition for alpha. This is because long tail MEV ops are usually not well known and are often not easy to automate. This means that the competition for long tail MEV is based on finding new ops and optimizing bots to target these ops.

This usually entails a lot of manual work and research. Efficiency, Latency, Bribing are still important, but they are not the primary focus of long tail MEV searchers. Once a searcher reasearches an op, they may be able to hit that op for a long time before other searchers find out about it.

The phrase `alpha leak` is often used to describe other searchers finding out about a long tail op. This is a good way to think about the competition for long tail MEV.

## MEV competition is not as intense as you think
The competition for short tail MEV is intense. However, the competition for long tail MEV is not nearly as intense as many believe.

Competition for short tail MEV is competition to "hit" a MEV opportunity, while long tail MEV is competition to find opportunities.

### What makes long tail MEV less competitive?
Long tail MEV is less competitive because it is based on ops that are not well known and are often not easy to automate. This means that there are fewer bots that are competing to hit the same ops. Research and chain scanning are the tools of long tail searchers.

### 
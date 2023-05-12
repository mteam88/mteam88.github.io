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
Maximum Extractable Value (MEV) has garnered significant attention in the blockchain space, with general opinion being that it's an intensely competitive field. However, this perception may not be entirely accurate. In this post, I'll explore why the level of competition in MEV extraction may not be as intense as some perceive it to be and discuss the factors that contribute to this reality. I will also explain the differences between short tail MEV and long tail MEV and how these differences affect competition.

## What does MEV competition look like?
On Ethereum, MEV competition is primarily between searchers. Let's begin with some of the differences between different categories of MEV:

### Short tail MEV vs long tail MEV
The Ethereum Foundation provides an excellent classification of MEV:
> DEX arbitrage, liquidations, and sandwich trading are all very well-known MEV opportunities and are unlikely to be profitable for new searchers. However, there is a long tail of lesser known MEV opportunities (NFT MEV is arguably one such opportunity).
> -- <cite>[The Ethereum Foundation](https://ethereum.org/pl/developers/docs/mev/)</cite>

For those interested, [Flashbots](https://github.com/flashbots/mev-job-board) maintains a limited list of long tail MEV opportunities

Short tail MEV is usually based on opportunites (ops) that are extremely well known in searcher communities and the bots that target these ops are often run by teams who put a lot of effort into optimizing their bots.

Long tail MEV on the other hand, is usually based on ops that are specific, more difficult to automate, and occur less often. These ops are often not well known and tend to be targeted by individual searchers.
### Competition for ops
Short tail MEV is based on strategies that are well known and easy to automate. A vast majority of the competition between short-tail MEV bots is based on using various techniques to "hit" specific ops before other bots. This is usually done by using a combination of the following techniques:
- Efficiency (Bot computation)
- Latency (Network competition)
- Bribing (Gas price competition)

### Competition for alpha
Alpha is exclusive knowledge or information that creates a competitive advantage. Alpha in this context refersto a technique or strategy that allows a searcher to discover new ops.

As opposed to short tail MEV, long tail MEV is based much less on competition for ops and much more on competition for alpha. This is because long tail MEV ops are usually not well known and are often not easy to automate. This means that the competition for long tail MEV is based on finding new ops to target.

This often requires significant manual effort and research. Efficiency, Latency, Bribing are still important, but they are not the primary focus of long tail MEV searchers. Once a searcher researches an op, they may be able to hit that op for a long time before other searchers find out about it.

The phrase **alpha leak** is often used to describe other searchers finding out about a long tail op. This is a good way to think about the competition for long tail MEV.

In the wise words of [potato](https://discordapp.com/users/956734875568853002), 
> here's a helpful alpha, most of the alpha leaks are just norms in the chains which they belong to, any half sized brain would not leak any win worthy alpha 

## MEV competition is not as intense as you think
The competition for short tail MEV is intense. However, the competition for long tail MEV is not nearly as intense as many believe.

Competition for short tail MEV is competition to "hit" a MEV opportunity, while long tail MEV is competition to find opportunities.

### What makes long tail MEV less competitive?
Long tail MEV is less competitive because it is based on ops that are not well known and are often not easy to automate. This means that there are fewer bots that are competing to hit the same ops. Research and chain scanning are the tools of long tail searchers. They key difference is that losts of long-tail MEV is often not extracted because searchers simply have not discovered the alpha yet.

### Give me the numbers...
Unfortunately, tools like [eigenphi](https://eigenphi.io/) do a much better job of monitoring short tail MEV extraction data than long tail MEV. The reason that MEV analysis tools can't record long tail is because it much harder to identify. Because of this lack of data, it becomes dfifficult to quantify the difference in competition using volume as an indicator.

A more useful metric is **bribes**.

Bribes for short tail MEV often exceed `99.5%`. Clearly, short tail competition is intense.

> in the last months - to much alpha has been discovered and bribe percent raised above 99.99 for both sandw and arbs so good luck
> -- <cite>[Optimalus](discordapp.com/users/808804389526700062)</cite>

In contrast, bribes for long tail MEV are often much lower. Before their alpha is leaked, long tail bots can bribe significantly less, anywhere from `0-80%`.

To make things even more complicated, some long tail searchers overbribe to obfuscate their activites, throwing off any searchers running scanners to find low-bribe ops.

> Hmmm ... or if you discover some new alpha, can bribe 99% to discourage any looky-loos, but then have the builder return most of it to you ... 🧠
> -- <cite>[Riposte](discordapp.com/users/777770061816922132)</cite>

## But why?
Tying all this back to the differences in competition between long and short tail MEV, competition boils down to bot optimization and alpha research. 

Bot optimization is relatively easy for MEV teams so they focus on short tail MEV because a more optimized bot can make big money there. Some leading MEV teams pay employees upwards of a million dollars salary. The leading short tail bot at the time of writing is `jaredfromsubway.eth` and their profits are [in the millions.](https://www.theblock.co/post/230218/jaredfromsubway-mev-bot)

There is a financial incentive for sophisticated MEV teams to target short tail MEV because there is simply more value extractable. This causes any team with sufficient sophistication to target short tail MEV, leaving long tail much less competitive.

## Conclusion
Just because not all MEV is as competitive as you think, doesn't mean it isn't difficult and very risky. 

> but your're still likely to spend all your money on ec2
> -- <cite>[0x_doc_mach](https://discordapp.com/users/904963180252499988)</cite>

If you visited this page seeking encouragement, I hope you found it. Good luck anon!

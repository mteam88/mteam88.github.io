---
title: "How Base can solve their short term blob problems with based L3s using altDA"
description:
    based l3s on centralized sequencer L2s and how they are cool
draft: false
featured: false
tags:
  - Ethereum
  - based rollups
  - Spire
pubDatetime: 2025-02-25T21:34:32+00:00
---

## Table of Contents

*Many thanks to [Donnoh](https://x.com/donnoh_eth) from [L2Beat](https://l2beat.com/scaling/summary), [Mallesh Pai](https://x.com/malleshpai) from [Special Mechanisms Group (SMG)](https://www.smg.org/), [Jesse Pollak](https://x.com/jessepollak) from [Base](https://www.base.org/), [Jon Charbonneau](https://x.com/jon_charb) from [DBA](https://dba.xyz/), [Bread](https://x.com/0xBreadguy) from [MegaETH](https://www.megaeth.com/), and others for review (but strictly not endorsement).*
.
.
Spire has been thinking about [based L3s](https://x.com/Spire_Labs/status/1889470049158832594) for some time, and I recently realized that we can reframe the idea of "L3s" as separate chains into "L3s" as service providers to L2s - network extensions. A based L3 is a L3 that uses the L2 that it settles on for sequencing. In Base's case, that is the Base centralized sequencer. With Spire tech, we can enable full synchronous composability (cross chain contract calls, indistinguishable from L2) between based L3s and their L2. Because full synchronous composability can make the two execution environments indistinguishable and enable backwards compatibility with all [!] existing L2 integrations, based L3s can be considered network extensions in the purest form. Based L3s can use a different DA provider than their L2. It follows from these two things (full synchronous composability and a different DA provider) that based L3s using altDA can be used to seamlessly reduce the effective usage of native L2 DA while avoiding introduction of any additional fragmentation.

Note: This article is written in the context of Base, an Ethereum L2 with a centralized sequencer and using Ethereum blobs for DA. The design presented here should work with any op-stack L2 with a centralized sequencer. I've used Base as an example because they are the largest L2 that fits this category.

## The Blob Problem

![there aren't enough blobs](https://i.ibb.co/zW6f10qT/image.png)

I probably don't need to convince you of this if you are reading this post, but Ethereum faces a significant blob capacity issue: the current supply of blobs is insufficient to meet growing demand.

Here is a great thread from f(gautham) from Polynomial on the capacity issue: 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Ethereum L2s are about to hit a brick wall.<br><br>55% of all blob space is already consumed by just 2 chains.<br><br>And at current growth rates, we&#39;re only months away from everything breaking.<br><br>Here&#39;s what&#39;s happening 🧵 <a href="https://t.co/m9aQkwQu6r">pic.twitter.com/m9aQkwQu6r</a></p>&mdash; f(gautham)💤 (@gauthamzzz) <a href="https://twitter.com/gauthamzzz/status/1880342051721736267?ref_src=twsrc%5Etfw">January 17, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Jesse from Base explicitly identifies blob limitations as a key obstacle to L2 scaling:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">we have officially reached the point where blob fees are constraining L2 growth — you can see this in the cyclical price spikes driven by daily demand cycles<br><br>we need more blobs ASAP to help all L2s continue scaling and ensure <a href="https://twitter.com/ethereum?ref_src=twsrc%5Etfw">@ethereum</a> is center of onchain <a href="https://t.co/XrQqHPi74G">pic.twitter.com/XrQqHPi74G</a></p>&mdash; jesse.base.eth (@jessepollak) <a href="https://twitter.com/jessepollak/status/1880326469551026267?ref_src=twsrc%5Etfw">January 17, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Many people (like colludingnode from Celestia) believe that Base will not be able to beat Solana's throughput without switching to altDA:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">third, most likely of all, is that this prediction just doesn&#39;t happen 😆</p>&mdash; c-node (@colludingnode) <a href="https://twitter.com/colludingnode/status/1891859006018269354?ref_src=twsrc%5Etfw">February 18, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

And here are two amazing threads from my favorite blobfluencer: Bread from MegaETH

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Not enough DA. This will leave Ethereum rollups in 2027 handling less capacity than (FD-enabled) Solana this year.<br><br>The Numbers:<br>DA Capacity has been at it&#39;s limits since November, which equates to ~214 cumulative TPS across all rollups before median fees increase (also across… <a href="https://t.co/1udP0dIANx">https://t.co/1udP0dIANx</a> <a href="https://t.co/aLukqzZIWm">pic.twitter.com/aLukqzZIWm</a></p>&mdash; BREAD | ∑: (@0xBreadguy) <a href="https://twitter.com/0xBreadguy/status/1877074025706303952?ref_src=twsrc%5Etfw">January 8, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Interesting comment here, because Base is already (slightly) behind it&#39;s own projections for scaling.<br><br>Let&#39;s break down what this could mean, and what Base would have to do to actually compete with Solana on speed+cost by EOY.<br>---------------------------<br>First, lets just look at… <a href="https://t.co/4ZQtVDtW9j">https://t.co/4ZQtVDtW9j</a> <a href="https://t.co/MLKzSmSb8i">pic.twitter.com/MLKzSmSb8i</a></p>&mdash; BREAD | ∑: (@0xBreadguy) <a href="https://twitter.com/0xBreadguy/status/1891880846577328217?ref_src=twsrc%5Etfw">February 18, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


What this should be telling you is:
1. Ethereum doesn't have enough blob capacity today, and will not in the future unless something changes
2. Rollups are thinking about 1. and will need to find a solution or accelerate L1 DA scaling progress (or likely both).

---

I've also personally heard from multiple Superchain rollups that blobs are their single greatest scaling concern. I won't name any names here, but you can find some great data about L2s and their blob usage on [this Dune dashboard](https://dune.com/hildobby/blobs) by [Hildobby](https://x.com/hildobby_).

## ~~L3s~~ -> fully composable network extensions

![fully composable based L3 and network extensions are the same thing](https://i.ibb.co/W4TsRyVQ/image.png)

Today's L3s such as Degen use a [new, discrete centralized sequencer](https://l2beat.com/scaling/projects/degen#operator:~:text=The%20system%20has%20a%20centralized%20sequencer). This centralized sequencer has no different coordination interface with the L2 they settle on than any other user or app on the L2. This means that the discrete L3 is *not composable* with the L2, and I'll explain why:

To get composability (defined as the ability to interact seamlessly with another chain) you need 3 things:
 - atomic block proposals and shared finality
 - coordinated sequencing
 - instant withdrawals (aka realtime proving)

Atomic block proposals is pretty easy to achieve by including a block proposal of one chain as a transaction in the block proposal of another. For example, [Taiko does this on Ethereum today.](https://docs.taiko.xyz/taiko-alethia-protocol/protocol-architecture/block-states#:~:text=Proposed%3A%20The%20block%20has%20been%20submitted%20to%20the%20TaikoL1%20contract.) Shared finality also requires that validity of at least one of the chains can be verified during block proposal (which requires realtime proving). Instant withdrawals are of course also enabled by realtime proving.

Coordinated sequencing for a discrete L3 is nonexistent almost by definition, and certainly in practice. While it may be possible to colocate an L3's sequencer with the L2's sequencer, the coordination is still through basic L2 transactions sent through the L2's public mempool. Unfortunately this frequency and depth of communication is *not enough* for full synchronous composability.

[The Spire design for based L3s](https://paragraph.xyz/@spire/l3-based-stack) introduces a dedicated sidecar colocated with the L2 sequencer that effectively extends the functionality of the L2 sequencer to include the ability to sequence L3s (which means: running full nodes, accepting L3 transactions, building L3 blocks, proposing L3 blocks). This design inherently enables coordinated sequencing. For instant withdrawals, multiple models are possible (e.g. trusting the sequencer with rate limited bridges, TEE proving a la [op-enclave](https://github.com/base/op-enclave), or even an [execution engine opcode like that for native rollups](https://ethresear.ch/t/native-rollups-superpowers-from-l1-execution/21517)).
Combined, this is enough for ✨ **synchronous composability** ✨ between based L3s and the contracts, tokens, liquidity, protocols, and state of the L2.

With additional changes to the derivation pipeline for the L3s (including changing the state transition) and the L3's block proposal transaction on the L2, **full composability** can be achieved. Full composability is a special type of synchronous composability that supports seamless cross chain contract calls. Deploying an app in execution environment A that is fully composable with execution environment B is *indistinguishable* from deploying directly on execution environment B (barring lower gas fees, faster transactions, and possibly some chain constants if desired).

That's really cool. And we can take it even further with **backwards compatible** based rollups. More on that another time.

Because fully composable based L3s are incredibly seamless extension of an L2, I think the term "network extensions" is appropriate. Additionally, "L3" as a term has a negative connotation and imo fails to communicate the proposed relationship between what is functionally a L3 and their L2.

## sprinkle on a little altDA and call it a day

![keep calm and use altDA for a little bit](https://i.ibb.co/Qv0LsZHb/image.png)

L3s using the Spire L3 based stack can use any DA provider supported by the L2's sidecar. I expect many based L3s will put their [compressed] data into L2 calldata (which downstreams into Ethereum blob space). This option is the most secure and likely easiest to implement, but does not help with blob capacity issues and may be more expensive than alternative options.

Much more interesting is the use of an altDA provider. A based L3 can offer full composability with an integrated L2 while still using altDA. Note that for instant withdrawals using alt-DA you also need the alt-DA (e.g. celestia) to settle DA attestations instantly (e.g. update blobstream). Using altDA reduces the effective usage of the native L2 DA (blobs) while introducing the security/liveness tradeoffs of the chosen altDA. In terms of cost, altDA should be **dramatically** cheaper than Ethereum blob space, and capacity should be plentiful. 

While I believe altDA is a cool temporary solution, it is my explicitly expectation that many based L3s that use altDA will eventually migrate back to blobs for DA (through L2 calldata). As the L1 DA scaling roadmap progresses, L1 DA capacity will increase and DA will no longer be the bottleneck for scaling. At this point, the tradeoffs of altDA may no longer be worth it for many L3s.

But this type of optionality is exactly the point. I like to think of an L2 that supports based L3s as an L2 with support for smart contracts with different DA providers. Imagine customizing the usage of altDA only for social and gaming apps, but using only blobs for DeFi! Full composability enables a completely different way of thinking about the expressivity that L2s can offer their developers.

## Conclusion

![the gang solves blob capacity issues](https://i.ibb.co/hJtJLHnN/9kydos.gif)

The blob problem is a serious constraint on the scalability of Ethereum L2s like Base, and its only going to get worse as demand grows. Based L3s provide a compelling path forward, offering full synchronous composability with their parent L2 while using alternative DA solutions to offload blob pressure. This allows rollups to scale effectively in the short term without introducing fragmentation.

By reframing L3s as seamless network extensions rather than standalone chains, we unlock a new paradigm where execution environments can remain deeply integrated while optimizing for cost and scalability. With the Spire design for based L3s, developers can leverage altDA in a way that is backwards compatible with existing L2 infrastructure, providing optionality without sacrificing composability.

Note: At Spire, we remain focused on building based rollups on the L1. Many of the problems and solutions presented here are somewhat transferable to L2 based rollups!

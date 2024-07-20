---
title: "Builder Censorship:  ethereum's rotten core"
description:
    The problem of builder censorship in Ethereum and how to solve it with inclusion lists.
draft: false
featured: true
tags:
  - Ethereum
  - blockchain
pubDatetime: 2023-09-29T20:52:10+00:00
---

*Thanks to [Mike, ](https://twitter.com/mikeneuder)
[Justin](https://twitter.com/drakefjustin) and [Toni](https://twitter.com/nero_eth) for review and discussion*

## Table of Contents

## *tl;dr*
- *Ethereum now faces "builder censorship," where block builders censor user's transactions.*
- *Censorship harms financial protocols, oracle updates, privacy, and even user experiences.*
- *"inclusion lists:" a proposed solution to shift control to proposers to combat censorship.*
- *Interim solutions include Relay-constructed Inclusion Lists and Partial Block Relays.*
- *Impact of implementing inclusion lists on builders remains uncertain but promising.*

## Introduction

With the introduction of the [mev-boost](https://github.com/flashbots/mev-boost/#readme) [PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725) model, we shift most of the ability to censor transactions from proposers to [block builders.](https://docs.flashbots.net/flashbots-mev-boost/block-builders) 
**Builders can (and are) censoring the transactions of users...**

Here's why you should care, and the solution we already have:

## Why is censorship bad?
**Censorship is the ability to block or delay users from using the Ethereum blockchain.** In practice, this means blocking (or delaying) any transactions involving an address from being added to the blockchain.

There are two types of censorship:
 - **Strong Censorship -** completely blocking transactions from making it onchain
 - **Weak Censorship -** delaying a transaction, so it doesn't get included for longer.

In this article, **we will be dealing with weak censorship.**

According to Vitalik, many things can go wrong if censorship is prevalent on Ethereum. In [a 2015 article on the topic,](https://blog.ethereum.org/2015/06/06/the-problem-of-censorship) Vitalik dives into a few reasons why censorship is a problem:

### Financial Protocol Censorship
Numerous DeFi protocols run on Ethereum. Most of these rely on the ability of users to send transactions to keep **economic guarantees** intact.
One example is a lending protocol like Aave, which relies on MEV bots to trigger liquidations in unhealthy positions.

If all liquidation attempts were delayed by censorship, Aave could be left with bad debt.

### Oracle Update Censorship
Before we have any good alternatives to centralized oracles, we need to consider the possibility that an oracle update transaction could be censored. If an oracle update was delayed for **a few minutes,** the consequences could be catastrophic.

As an example: if a protocol relies on the median vote of 10 oracle providers who all vote on a price, an attacker could censor all votes except their own, **leading to absolute oracle price manipulation.** As we have seen with the [Mango Markets Hack,](https://blockworks.co/news/mango-markets-mangled-by-oracle-manipulation-for-112m) oracle manipulation can lead to **millions of dollars** of loss.

### [NEW] Forced Inclusion Censorship
Vitalik mentions this final reason in his landmark 
[Endgame post.](https://vitalik.eth.limo/general/2021/12/06/endgame.html)

Although not included in Vitalik's original post, the recent rise of optimistic rollups creates a new problem. If a rollup sequencer (centralized, shared, or decentralized) was censoring a user, **they would have no way to escape the rollup except by forced inclusion on Ethereum.**
> If users are being censored, they need some way to either force withdrawal from the rollup or force inclusion of their transactions into the L2.
> -- <cite>[Rollups Aren't Real - Jon Charbonneau](https://joncharbonneau.substack.com/p/rollups-arent-real)</cite>

If the force inclusion transaction was censored on Ethereum, users would be **delayed** from withdrawing their funds from a censoring rollup. This significantly increases **the risk of relying on a centralized sequencer.**

Jon Charbonneau sums it up:
> Even if the rollup operator is censoring users, they should be able to force inclusion of their transactions to preserve censorship resistance.
> -- <cite>[Rollups Aren't Real - Jon Charbonneau](https://joncharbonneau.substack.com/p/rollups-arent-real)</cite>

### Privacy
One of the main concerns around censorship that is apparent in Ethereum today are the [tornado cash sanctions.](https://blockworks.co/news/us-treasury-bans-citizens-from-using-mixing-service-tornado-cash) The explicit censorship of these transactions implies that users have reduced access to privacy services onchain. It's important to note that the precedent set by the tornado cash sanctions is that it is possible for governments to debank a group of people that were using Ethereum.

### Summary
As usual, Vitalik says it best:
> all things taken together, anti-censorship is not even about civil liberties; it is about making it harder for consensus participants to engage in large-scale market manipulation conspiracies
> -- <cite>[The Problem of Censorship - Vitalik Buterin](https://blog.ethereum.org/2015/06/06/the-problem-of-censorship)</cite>

It is also important to recognize that censorship on a small scale negatively impacts **the user experience and [credible neutrality](https://nakamoto.com/credible-neutrality/) of Ethereum.** 

> Censorship-resistance in decentralized cryptoeconomic systems is not just a matter of making sure Wikileaks donations or Silk Road 5.0 cannot be shut down; it is in fact a necessary property in order to secure the effective operation of a number of different financial protocols.
> -- <cite>[The Problem of Censorship - Vitalik Buterin](https://blog.ethereum.org/2015/06/06/the-problem-of-censorship)</cite>

**Ideally, it should be extremely expensive (as close to impossible as we can get) to even delay a transaction.**

<img src="/assets/builder-censorship/astronaut-censorship-meme.png">

## Why is *builder* censorship bad?
Since proposers are the ones who choose which block they publish in PBS (and [even in some models of enshrined PBS](https://ethresear.ch/t/why-enshrine-proposer-builder-separation-a-viable-path-to-epbs/15710/9)), why should we care if builders censor? Won't some proposers just ignore builders and build their own blocks?

Touché, but unfortunately we can't just rely on that assumption in the long term or short term. Let's see why:

### Long term
Future upgrades to the Ethereum protocol (like [stateless validators](https://ethereum.org/en/roadmap/verkle-trees/)) may reduce expenses for mev-boost enabled proposers, disincentivizing self building.

Alone, this is concerning, but it is very possible that, in the future, it will be completely impossible for a proposer to build locally (for example, with [some types of enshrined PBS.](https://ethresear.ch/t/three-dichotomies-in-epbs/16267))

### Short term
Even in the short term, the incentive structure of mev-boost PBS disincentivizes censorship resistance. Here's the problem: **all proposers are faced with a choice:**

 - **Sell all transaction inclusion power to builders -** for MEV block rewards or,
 - **Build vanilla blocks locally, sacrificing all MEV rewards -** and including censored transactions

By selling transaction inclusion power, proposers sacrifice any ability to forcibly include transactions. Therefore, **proposers must rely on builders for censorship resistance.**
Therefore, the current model of PBS relies on the following properties to be censorship-resistant:
 - **Outcompetion:** Non-censoring builders can consistently win MEV auctions (produce better blocks.) This means censorable transactions will still be included regularly.
 - Or, **Altruism:** Proposers regularly sacrifice higher block rewards to build locally.

If outcompetition doesn't happen, we could still fall back on altruism and vice versa. Unfortunately **both of these properties are not incentivized by the Ethereum protocol** today:

**We can't rely on outcompetition** because censorable transactions usually have very low MEV value. In recent months, we have seen that the edge of being a non-censoring builder is not significant. **Multiple top builders are censoring,** according to the [Ultrasound Money relay.](https://relay.ultrasound.money/#sanctions-censorship) **We can't afford the risk** that the dominant builders are censoring.

**We can't rely on altruism either.** Given that PBS blocks are worth [3.52](https://www.rated.network/relays?network=mainnet&timeWindow=all) times more than vanilla blocks, it's not surprising that approximately [93%](https://mevboost.pics/) of proposers choose to use PBS. By forcing any altruistic proposers to sacrifice 70% of potential rewards, we are disincentivizing altruistic proposers. Essentially, **we have made altruism expensive.**

One caveat is that Flashbots added [a feature](https://writings.flashbots.net/the-cost-of-resilience) for the minimum amount of ETH that a block needed to be worth for a proposer to prefer it over self building. This doesn't mean that the choice of where to source blocks is less absolute, only that proposer may be making more informed decisions about self building.

## How much are builders censoring now? 
Right after the merge, the Flashbots relay had a lot of market share, but was censoring. Researchers began to look at the problem of censorship as a relay problem. All of the problems with censorship above apply to relays as well. The relay censorship problem was mostly solved by social consensus - boycotting censoring relays and funding non-censoring relays...

Recently though, the problem of builder censorship has become more concerning. We won't be able to stop builder censorship with social consensus because builders are incentivized very differently. One goal of this article is to spread awareness about builder censorship. To effectively do this, we need to know what we are dealing with.

Thanks to the wonderful contributions of Ethereum researchers like [Toni Wahrstätter](https://twitter.com/nero_eth) and [Justin Drake,](https://twitter.com/drakefjustin) we can monitor builder censorship by simply visiting a few websites.

### Show me the data
You asked for it.

#### [Censorship.pics](https://censorship.pics) by Toni
<img src="/assets/builder-censorship/ultrasound-dominance.png">
<img src="/assets/builder-censorship/ultrasound-delay.png">

#### [Ultrasound Relay Statistics](https://relay.ultrasound.money/#sanctions-censorship) by [the Ultrasound.money team](https://twitter.com/ultrasoundmoney)
<img src="/assets/builder-censorship/censorship-pics-overview.png">
<img src="/assets/builder-censorship/censorship-pics-graph.png">

### Some numbers please...
The number we care about most (for this article) is the builder censorship dominance percentage. At the time of writing, about **40-60%.**

### The impact on transactions
According to the [Ultra Sound Relay,](https://relay.ultrasound.money/#sanctions-censorship) censored transactions (specifically OFAC-sanctioned transactions) take an average of about 67 seconds to be included--**6 times slower than normal transactions.**

In my opinion, the best measurement of censorship resistance in a network is the extra time it takes to include a censored transaction on average:
<img src="/assets/builder-censorship/censorship-eq.png" style="background-color: white;">

From an excellent [article from Metrika:](https://blog.metrika.co/ethereums-censorship-controversy-a32a02a25f2d)

<img src="/assets/builder-censorship/mektrika-delay.png">

You may be asking "So what?" If censored transactions take a few seconds longer to be included what's all the fuss about? It is important to realize that nothing is stopping the censorship ratio from increasing significantly **except for social consensus and the Ethereum culture.** As **a core value proposition of Ethereum is credible neutrality,** social consensus is not a strong enough guarantee. 

## What do builders say? 
I interviewed builders on builder censorship. All responses will be kept **anonymous** to protect the builders involved.

Non-censoring builders noted how they handled censoring relays:
> When transactions in the mempool interact with [addresses] on the OFAC list and are candidates for the next block, we construct two block versions: one containing these transactions and another without. We then submit both to censoring and non-censoring relays accordingly.

When asked why builders might censor, responses were expected: legal compliance issues.
> Builders might censor due to significant risks such as legal repercussions, which could range from **hefty fines to imprisonment.**

Builders also pointed out that there may be other reasons that builders censor:
> Vertically integrated builders, who are also searchers, might censor transactions from competitors to gain an advantage.

> To maximize profit in a future block (eg. delaying an oracle update, combining txs that may interact with each other in profit-maximizing ways).

When asked about possible solutions, and the potential of enshrining censorship resistance into Ethereum, the builders were aware of the trade-offs:
> In my opinion, censorship resistance at the protocol level is a double-edged sword. While it can offer plausible deniability for node operators and block builders in jurisdictions with strict regulations, it might also risk pushing entities to abstain from participation if regulators draw clear lines.

## The Solution: Inclusion Lists
**All hope is not lost!** Bold researchers have crafted mechanisms to solve the problem of builder censorship. We call these: **"inclusion lists."**

Inclusion lists are also known as:
 - ILs
 - crLists (CR is censorship resistance)
 - forward inclusion lists
 - awesome 😉

To summarize the design goals:
> We want to make it so proposers are able to combat censorship by forcing inclusion of some transactions, but we don’t want to do it in a way which is bandwidth-intensive [or] which disadvantages altruistic proposers by requiring them to sacrifice MEV...
> -- <cite>[PBS censorship-resistance alternatives - Francesco](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)</cite>

Put simply: our goal is to move the ability to censor (and the responsibility not to) back to proposers while **still limiting a proposer's ability to censor.**

The foundational idea of inclusion lists is simple. Inclusion lists are a list of transactions that a proposer creates that must be included in the corresponding block. **If the transactions are not included, the block will not be valid.**

That is all you need to understand how inclusion lists are censorship resistant. We will explore more details in the following sections:

### How do inclusion lists effectively prevent *builder* censorship?
As mentioned above, the root of the problem in today's PBS is that altruism is expensive. With inclusion lists, any blocks that don't align with a proposer's preferences are invalid.

Instead of preventing builder censorship, we are removing the builder's choice. If a builder wants to censor transactions, they simply can't build a valid block. If proposers generate meaningful inclusion lists, **censoring builders might be forced out of the market.** We are solving the outcompetition problem *by* making altruism inexpensive (extremely so, but [not necessarily free.](https://ethresear.ch/t/cumulative-non-expiring-inclusion-lists/16520))

### How do inclusion lists also limit proposer censorship?
Vitalik writes:
> the whole point of PBS is that it doesn’t require proposers to be sophisticated. We don’t want to create a mechanism which reintroduces a benefit for proposers to be sophisticated and hence an incentive for proposers to enter into further extra-protocol auctioning relationships or join pools.
> -- <cite>[State of Research - Vitalik Buterin](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)</cite>

One elegant property of inclusion lists is that they are extremely simple for a proposer to implement. By simply including any valid transactions that have been waiting in the mempool for longer than a few slots, proposers can significantly improve the censorship resistance of Ethereum with minimal extra cost. It is important to note that **proposers don't have to choose between some types of transactions and others.**

In practice, this means a proposer can include victim transactions without expending any resources trying to detect which transactions might be censored. Although proposers can't credibly claim they don't know what transactions they are including in their inclusion lists, **it won't be expensive to choose.**

At this point, an astute reader might wonder why a proposer would include censored transactions in their inclusion list if builders would refuse to build their block. By creating an IL, proposers effectively limit the builder market for their block. This is why researchers have invented "**forward inclusion lists**" which are applied to the proposer of the next block. Inclusion lists that refer to the current block are called "**spot inclusion lists.**"

<img src="/assets/builder-censorship/fil-meme.png">

In a recent article on inclusion lists, researchers present the following property:
> Property 1: Forward inclusion lists increase censorship resistance (CR) of the chain, whereas spot inclusion lists do not.
> 
> The argument is as follows. Spot ILs are made by honest proposers, but they do not increase censorship-resistance since honest proposers do not connect to censoring builders anyways. Greedy proposers do not make a spot IL, since this would “turn off” the censoring builders they connect to. Censoring proposers also do not make a spot IL for themselves, so the amount of censorship remains the same as without spot ILs.
> 
> On the other hand, greedy proposers do not make a spot IL for themselves, but make a forward IL for others. This list may apply to honest proposers, for whom the list is “redundant”: Honest proposers were not connecting to censoring builders anyways. The increase in CR comes from honest or greedy proposers making a list for other greedy proposers. These proposers subjected to the list, while connected to all builders, can no longer receive bids from censoring builders, and thus CR is increased.
> 
> -- <cite>[Fun and games with inclusion lists](https://ethresear.ch/t/fun-and-games-with-inclusion-lists/16557) - [Barnabé Monnot](https://twitter.com/barnabemonnot)</cite>

Now, forward inclusion lists are awesome, but we can do **even better...** I'll let [Toni Wahrstätter](https://twitter.com/nero_eth) explain:

> As a recap. Having proposers set ILs for their own blocks doesn’t make much sense and it relies purely on altruism to include censored transactions into one’s own blocks.
> 
> Having forward-ILs makes sense, allowing the current proposer to constrain the next proposer. This means that the current proposer could create an IL that either the current proposer itself or the next proposer must satisfy.
> 
> **The problem with one-slot-forward ILs is that parties with multiple validators have an economic incentive to not constrain the next proposer** in the case the next proposer is controlled by the same entity.
> -- <cite>[Cumulative, Non-Expiring Inclusion Lists - Toni Wahrstätter](https://ethresear.ch/t/cumulative-non-expiring-inclusion-lists/16520)</cite>

The solution? Allowing inclusion lists to specify a block deadline for transactions, so they can be included in the next `n` slots. With this in place, proposers would not risk the potential of limiting themselves. More research is in progress on specific implementation details.

## Interim Solutions
Before Ethereum rolls out full-blown forward cumulative non-expiring protocol enforced inclusion lists (whew) this problem [still needs to be addressed.](https://notes.ethereum.org/@mikeneuder/resistance-is-not-futile#Existing-proposals)

<img src="/assets/builder-censorship/inclusion-list-pooh-meme.png">

### Relay-constructed Inclusion Lists
Relay-constructed Inclusion Lists (abbr RCILs) are a novel Inclusion List model that works within the current mev-boost system with minimal modifications.

> We already have the relay serving as a trusted third party, so why not leverage that and ask the relay to construct the inclusion list on behalf of the proposer? The proposer can sign up for the relay-constructed inclusion list in their validator registration, which triggers the relay enforcement of the list.
> -- <cite>[Resistance is \~not\~ futile; CR in mev-boost](https://notes.ethereum.org/@mikeneuder/resistance-is-not-futile)

<img src="/assets/builder-censorship/relay-constructed-ils.png">

### Partial Block Relays
An option to increase the censorship resistance of the current mev-boost system is [mev-boost+ from EigenLayer.](https://research.eigenlayer.xyz/t/mev-boost-liveness-first-relay-design/15)

> In the partial block relay, the proposer auctions off the Top of Block (ToB) while reserving the Rest of Block (RoB) for itself.
> -- <cite>[EigenLayer Research](https://research.eigenlayer.xyz/t/mev-boost-liveness-first-relay-design/15)</cite>

The partial block relay system proposed by EigenLayer is very complex, please give [the article](https://research.eigenlayer.xyz/t/mev-boost-liveness-first-relay-design/15) a read if you want to learn more.

## Are builders that censor now going to censor with inclusion lists in place?
This is one of the open questions in inclusion list research. If builders censor now, will they feel comfortable enough with protocol enforced inclusion lists to stop censoring? What would they do instead?

> the builder sees the inclusion list ahead of time, and the builder can refuse to build blocks that contain an inclusion list that they do not want to build on. This creates an immediate incentive for proposers to have empty inclusion lists, to maximize the chance that builders will build blocks for them.
> -- <cite>[Vitalik Buterin](https://ethresear.ch/t/how-much-can-we-constrain-builders-without-bringing-back-heavy-burdens-to-proposers/13808)</cite>

Currently, researchers are assuming the following:
> For a slot where a non-empty inclusion list exists, a censoring builder does not build a block which contains transactions from the list.
-- <cite>[Fun and games with inclusion lists - barnabe](https://ethresear.ch/t/fun-and-games-with-inclusion-lists/16557)</cite>

### What do builders have to say about this?
One builder on censorship resistance:
> I believe that protocol-enforced censorship resistance is more likely to provide node operators with a justification for their lack of control over transaction inclusion, without pushing regulators to enforce outright bans.

Builders noted that:
> With correctly implemented ILs, censorship by builders should be significantly reduced. 

When asked what percentage of builder dominance would be censoring after ILs were implemented, the optimism was evident:
> It's hard to to estimate, but I would say less than 5% would continue censoring post-IL implementation.

Other builders were more skeptical:
> One future I see is that builders who censor today will not bid on blocks with IL that have txs they’d normally censor.

Builders noted that there would be negligible performance impact on their block-building algorithms. Importantly for the developers of these builders, builders claimed that:
> the required modifications to our block builder algorithms would be minimal.

One builder brought up a good point about private orderflow:
> [Forward Inclusion Lists] operates on public mempool which is drying up. Something like 10-15% of txs don’t even happen in the mempool. Mempool has flaws which has been discussed at length (I question its long term future as a public pool).

This isn't currently relevant because any sanctioned transactions would be in the mempool, but it might be a problem far in the future.

## Conclusion
**Censorship bad. Builder censorship bad. Inclusion lists good. Inclusion lists slow? Yes, but it's okay.**

> What do we get after all of this is done? We get a chain where block production is still centralized, but block validation is trustless and highly decentralized, and specialized anti-censorship magic prevents the block producers from censoring.
> -- <cite>[Endgame - Vitalik Buterin](https://vitalik.eth.limo/general/2021/12/06/endgame.html)</cite>

## Reference Material + Further Reading
| Article                                                                                                                                                                                                    | Description                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [Block builder centralization](https://ethresear.ch/t/block-builder-centralization/12135)                                                                                                                  | An [ethresear.ch](ethresear.ch) thread on builder **centralization**                       |
| [Why enshrine Proposer-Builder Separation? A viable path to ePBS](https://ethresear.ch/t/why-enshrine-proposer-builder-separation-a-viable-path-to-epbs/15710)                                             | Mike's arguments for enshrining PBS                                                        |
| [Ethereum's censorship controversy; Are We Making a Mountain out of a Molehill?](https://blog.metrika.co/ethereums-censorship-controversy-a32a02a25f2d)                                                    | Metrika's interesting article explaining how censorship currently has minimal impact on UX |
| [*State of research: increasing censorship resistance of transactions under proposer/builder separation (PBS)*](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)                            | Vitalik's originial post about censorship resistance                                       |
| [*PBS censorship-resistance alternatives*](https://notes.ethereum.org/@fradamt/H1TsYRfJc)                                                                                                                  | Francesco's notes on IL alternatives                                                       |
| [*Forward inclusion list*](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)                                                                                                                    | Francesco's "forward" idea                                                                 |
| [*How much can we constrain builders without bringing back heavy burdens to proposers?*](https://ethresear.ch/t/how-much-can-we-constrain-builders-without-bringing-back-heavy-burdens-to-proposers/13808) | Vitalik's post about different commitments                                                 |
| [*Forward inclusion list*](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)                                                                                                                    | Francesco's "forward" idea                                                                 |
| [*Censorship... wat do?*](https://joncharbonneau.substack.com/p/censorship-wat-do)                                                                                                                         | Jon's high-level piece                                                                     |
| [*Censorship resistance in on-chain auctions*](https://arxiv.org/pdf/2301.13321.pdf)                                                                                                                       | Elijah, Mallesh, and Max academic paper about auctions and censorship                      |
| [*Censorship Résistance*](https://www.youtube.com/watch?v=XZJcZ05d-Wo)                                                                                                                                     | Justin's SBC 2022 talk                                                                     |
| [*Censorship panel*](https://www.youtube.com/watch?v=Z9VCdiSPJEQ)                                                                                                                                          | CR panel SBC 2022                                                                          |
| [*Censorship Resistance: crlists in mev-boost*](https://github.com/flashbots/mev-boost/issues/215)                                                                                                         | Quintus' proposal                                                                          |
| [*Comment #12 on Vitalik's post*](https://ethresear.ch/t/how-much-can-we-constrain-builders-without-bringing-back-heavy-burdens-to-proposers/13808/12?u=mikeneuder)                                        | Bert's proposal                                                                            |
| [*The Cost of Resilience*](https://writings.flashbots.net/the-cost-of-resilience)                                                                                                                          | Min-bid post                                                                               |
| [*Preserving Block Proposer Agency with mev-boost using Eigenlayer*](https://hackmd.io/@layr/SkBRqvdC5)                                                                                                    | Sreeram's proposal                                                                         |
| [*The litList (crList) Builder*](https://mirror.xyz/apriori.eth/Ow6EeeGXQ-6R1beflaO5ez6UOHx6KeJCZFVKTxiflMg)                                                                                               | apriori's post                                                                             |
| [*MEV-boost+/++: Liveness-first relay design*](https://research.eigenlayer.xyz/t/mev-boost-liveness-first-relay-design/15)                                                                                 | Kydo's proposal                                                                            |
| [*Agency & MEV-boost++*](https://mirror.xyz/apriori.eth/U5p0ZXMUc3Eiq9Dia3a22HDGbr7PLQJZ6yw3fZ3e7BI)                                                                                                       | apriori's summary                                                                          |
| [*Censorship resistance via restaking*](https://www.youtube.com/watch?v=ywJNXIUSqOw)                                                                                                                       | Sreeram's SBC talk                                                                         |
| [*Resistance is not futile; CR in mev-boost*](https://notes.ethereum.org/@mikeneuder/resistance-is-not-futile)                                                                                             | Mike's summary of out-of-protocol CR                                                       |
| [*No free lunch – a new inclusion list design*](https://ethresear.ch/t/no-free-lunch-a-new-inclusion-list-design/16389)                                                                                    | Vitalik & Mike recent IL design to avoid free-DA problem                                   |
| [*Fun and Games with Inclusion Lists*](https://ethresear.ch/t/fun-and-games-with-inclusion-lists/16557)                                                                                                    | Barnabé's post describing some ways to game ILs                                            |
| [*Cumulative non-expiring inclusion lists*](https://ethresear.ch/t/cumulative-non-expiring-inclusion-lists/16520)                                                                                          | Toni's post expanding on the no free lunch design                                          |

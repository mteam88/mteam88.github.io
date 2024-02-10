---
title: "The Language of Value: Formally Expressing MEV Opportunities"
description:
    A unified format for communicating alpha and formally representing MEV opportunities for use in research and development.
draft: false
featured: false
tags:
  - MEV
pubDatetime: 2024-02-10T19:25:49+00:00
---


## Introduction
In this article, I design a unified format for communicating alpha and formally representing MEV opportunities for use in research and development. I also review existing frameworks and extract their best qualities. I write a guide for generating your own documents and provide examples of effective documents.

## Motivation
I have been searching for MEV (optimizing value extraction) for a few years now. One of my greatest frustrations is the lack of any good way to communicate alpha. I've had numerous conversations go something like this:

> **HAT WIF DOG:** I have alpha, gib MEV bot.
> 
> **ME:** Sure what is the alpha?
> 
> **HAT WIF DOG:** its simple. You just flashloan the Aave L2 and then swap for lkjasUSD and then stake on the L13.5 and then claim the NFT rewards based on points to earn jfsaudhfETH and then swap for Solana storage rent which you can use to pay for the gas fees on a shared sequenced rollup to repay the flashloan.
> 
> **ME:** tf?
>
> **HAT WIF DOG:** I did it myself manually.
>
> **ME:** Fine just give me a transaction link.
> 
> **HAT WIF DOG:** lol no why you try to dox me

*etc.*

On a more serious note, asking people for examples of long tail MEV will get you very few answers (e.g. NFT sniping) even though many estimate long tail accounts for a good percentage of total MEV. Perhaps defining long tail MEV (e.g. what constitutes an arbitrage?") may aid in sharing these types of opportunities. However, one of the core issues is the radio silence of these opportunities for various reasons.

Many active long tail MEV searchers avoid sharing and discussing their opportunities. According to game theory, searchers should never share ANY alpha that their competitors may be able to use (unless it is a part of a psyop). This secrecy applies to active long tail opportunities and is a core part of the searcher community, but researchers and dapp builders do not share this mentality. Researchers may require simple communication of long tail opportunities for their research. Dapp developers may learn valuable MEV minimization techniques from examining long tail strategies.

## Past Work
The best long tail MEV database I could find is this [3-year-stale Flashbots repository](https://github.com/flashbots/mev-job-board). This repository includes [a template](https://github.com/flashbots/mev-job-board/blob/main/specs/template.md) that will serve as our starting point:

```
## MEV-Opportunity Name Here

### Description

Please describe the general opportunity here giving as much detail as is needed to understand why the MEV exists and how to capture it at a high level. Please link any relevant smart contracts as well as governance votes or documentation please link them here.

If applicable please give the address of a governance contract that users should listen to for transactions they would need to backrun.

### Difficulty

Low / moderate / high

### Is this a one-off opportunity or is it reoccurring?

Sometimes MEV is created by specific governance parameter tweaks, but sometimes it is more structural or reoccurring. Please state which of the two this opportunity is, and if applicable, the timing the MEV will be available.

### Steps to capture MEV

List the steps that need to be taken to capture MEV from your protocol. As an example:

1. Flashloan ETH (e.g. from Aave)
2. Swap for sUSD
3. Use sUSD to repay outstanding loans and liquidate their ETH collateral
4. Receive ETH in return
5. Repay the flashloan
6. The remainder is your profit

### Other

This template is the minimum for inclusion. Free to add any other information you feel is valuable, including where to go for support.
```

This template includes a few key elements that will be used to influence the final design:

### Strategy Difficulty
This is an objective metric. For the rest of this article, I will refer to strategy difficulty loosely as **strategy complexity**. 

Much more information on this category is below.

### Opportunity Frequency
How often does this opportunity exist? Does it appear on a regular schedule (in blocks or units of time) or is it sporadic? Is an opportunity created by one actor? one type of transaction? one specific protocol?

This is one of the most important things to know when implementing a strategy, but it isn't necessary to represent the idea of a strategy in many cases. 

### Steps to capture
This is the most important category as it details specific steps to implement a strategy. Much more about this category will be discussed later in this article.

## Terminology
You can read a lot of my broad definitions in this article: https://mteam88.github.io/posts/im-new-to-mev/#the-lingo

A few definitions specific to this project:

#### MEV Opportunity
Any given state that exposes the opportunity for a searcher to extract value.

Put simply, any opportunity that creates MEV.

#### Strategy
A method to find and extract MEV. Is almost always repeatable.

In this article, I may refer to opportunities and strategies interchangeably. Representing an MEV opportunity often requires the representation of a strategy.

## Design Goals
In short, I want to design a template to express a MEV opportunity. A formal language to communicate alpha. 

I will refer to the documents created by my template as **"MEV Opportunity Briefs"**.

To make this practical and helpful for anyone using it, I plan to focus on a few design goals:
### Simplicity
Simplicity is key. 

#### Simplicity of creation
An MEV opportunity brief must be easy and simple to create. *Even a non-technical person must be able to create a brief.* 

This is a key design goal because it enables non-technical people (defi users, app developers) to create briefs.

#### Simplicity of interpretation
- Assumed knowledge should be referenced (for readers to research further) or explained further within the brief
- An experienced searcher/researcher/developer should be able to reasonably quickly understand and effectively implement the strategy

### Extensibility
The most simple version of a brief must be very different than a full brief, allowing for extensions to a single brief.

Additional information that extends the strategy brief should be added to the document near the end, to indicate a linear flow of importance.

The reason for this is to make it for a more technical/experienced person to add to a simple brief.

Briefs could be *very* long.

### Generalization
An MEV opportunity brief should be able to represent **any** MEV opportunity that will ever exist. The framework itself should not rely on MEV building blocks that we have today (like Flashbots bundles, flash loans, or even Ethereum architecture) even if individual strategies reference these.

Most of these examples are of long tail

## Finished Design + Commentary
The design that I have arrived at is very simple.

I have decided to create a few example briefs to demonstrate this concept, but first, here is my attempt at a formal specification:

Each brief will be composed of the following 3 sections:
 - Strategy Name
 - Strategy Description
 - Strategy Details (or "Steps to Extract")

The information contained in just these categories should be enough to represent an opportunity.

### Strategy Name
Naming strategies is, of course, incredibly difficult for some of the smartest people in the world. Searchers have some strange infatuation with literal sandwich shops ([subway mev bot](https://github.com/libevm/subway), [jared from subway](https://crypticwoods.com/blog/jaredfromsubway-interview/), the incredibly original [subway-rs](https://github.com/refcell/subway-rs), and even [rusty-sando](https://github.com/mouseless-eth/rusty-sando))

Some searchers choose to name their projects or strategies after unrelated things (sci-fi names, dev box names, auto-generated GitHub repository names). For this brief, these types of names should be avoided unless they have historical significance. Names should also not include the names of programming languages, frameworks, or tools used to implement the strategy as these are specific to a bot implementation of a strategy.

Examples of good strategy names:
 - RadBro NFT Reward Arbitrage
 - Lido Rebase Sandwich
 - Liquidity Add Backrunning

### Strategy Description
An extremely brief summary of a strategy. A skilled searcher should be able to generate the rest of a strategy representation from just a description.

The strategy description may include a strategy complexity metric to help searchers evaluate a strategy at a glance:

#### [OPTIONAL] Strategy Complexity
Complexity should be thought of as a simple estimate of the difficulty of implementing a minimal version of this strategy. It does *not* indicate the profit potential of a strategy in any way - though a correlation may exist.

Complexity is a loose aggregation of the following metrics:
 - **Steps to identify** - The number and complexity of steps required to identify opportunities that are created. This includes reactive mempool/block monitoring.
 - **Payload generation** - Rough estimate of the complexity of generating a payload (bundle, transaction, intent, etc). This includes writing any custom smart contracts.
 - **Payload optimization** - Estimate the complexity of optimizing a payload. This does not include implementation/searcher specific optimizations like backrunning or combining strategies. Only factor into this specification any optimization that is absolutely crucial to profitable MEV extraction. This does NOT include any optimization that may simply help a searcher compete.
 - **Payload deployment** - Any unusual complexity in sending payloads and getting them included. This does not include any general improvements that can apply to any strategy, but only complexity that applies directly to this strategy. One example is blind backrunning, where it is necessary to not include a bundle if a transaction reverts.

Complexity should be represented as a 5-star (⭐) scale, where 5 stars indicate a very complex strategy, and 1 star represents a very simple strategy.

A simple table to aid in the rating of opportunities is provided below:


| ⭐                                                                                                | ⭐⭐⭐                         | ⭐⭐⭐⭐⭐                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| simple NFT reward arbitrage like [this](https://twitter.com/0x_Beans/status/1506074195351916544) | NFT sniping (in many forms) | [low carb crusader](https://collective.flashbots.net/t/disclosure-mitigation-of-block-equivocation-strategy-with-early-getpayload-calls-for-proposers/1705) |

### Strategy Details
The details of a strategy include everything relevant to the strategy in a bulleted list. More details may be added to the end of the list to extend the representation.

This concept is hard to explain with just a formal specification, but I will do my best. 

Simply put: **Each element of the list shall explain some part of the opportunity.**
More than this cannot be explicitly specified because it will not satisfy the "Simplicity of Creation" design goal.

Here are some examples of strategy details that all say a similar thing:
- **Acquire tokens:** The most non-technical person might write this.
- **Acquire tokens using a flashloan:** If the strategy does not explicitly depend on a single flashloan provider, this is fine. It leaves implementation up to the searcher.
- **Acquire tokens using a flashloan on Balancer:** Perhaps the strategy depends on specific details of the Balancer flashloans.
- **Acquire tokens using a flashloan ~~with no fees~~** Details like this should not be included in this step of a strategy because they will almost always be implementation-specific (more on this later).
- **Acquire tokens by flashloan~~ing WETH and then swapping on Uniswap:~~** In some strategies, the specific detail of swapping on Uniswap or explicitly flashloaning WETH may be important, but generally this type of statement should be avoided because, again, it constrains the strategy implementations.

It is key to reduce each detail down to the core element of the strategy that it explains - absolutely no more.

#### "Opportunity Frequency" details
The attribute: "Opportunity Frequency" is important to incorporate into the Strategy Details section of your brief:
- **Opportunity is created by a [daily rebase](https://mirror.xyz/derked.eth/Vndae9dKhiVXllXf84ULO4qAaP_HurhqvQQMsxXlytU)**
- **Opportunity is created when the oracle price or ETH passes the liquidation threshold:** Mentioning the specific oracle isn't necessary but may be important.
- **~~Monitor mempool for~~ *Detect* new transactions that touch a liquidity pool:** Avoid referencing MEV infrastructure as much possible. Even something like an arb backrunner can detect transactions in different ways (mev-share, private order flow, new block, [tx gossip protocols.](https://www.ddmckinnon.com/2022/11/27/all-is-fair-in-arb-and-mev-on-avalanche-c-chain/#:~:text=The%20probability%20of%20hearing%20about%20a%20transaction%20first%20scaled%20linearly%20with%20the%20stake%20of%20that%20node.)) This kind of detail may apply to certain types of strategies like sandwiching or generalized frontrunning.
- **~~Calculate the NFT ids for which this arbitrage is profitable~~:** Avoid including any research that would have to be done to generate a profitable payload. 
- **~~Calculate the NFT ids that are eligible to claim rewards~~:** Avoid including specific calculations necessary to generate a profitable payload.

#### "Opportunity Extraction" details
The steps to extract the MEV from your opportunity should be included in the Strategy Details section of your brief. When writing examples, I've found that this type of detail is the most common. These usually begin with a verb like:
 - Acquire / Repay
 - Purchase / Sell
 - Swap
 - Claim
 - Liquidate
 - Stake / Unstake
 - Call

### "Opportunity Extraction" details
Should be used sparingly. These details are often implementation-specific and may not be necessary to represent the opportunity. If you want to include a few extraction tips at the end of your brief, that is fine.

## Writing Briefs: The Definitive Guide
This section contains a complete guide to writing your own briefs. If I have sent you this article and asked you to create a brief, I have probably linked you right to this section.

**tl;dr** so far:
***MEV Opportunity Briefs** are simple documents that describe an MEV opportunity and how to extract it (a strategy). They consist of 3 sections: a Title, Description, and Details. Details consist of relevant information about an opportunity - not its extraction. Briefs should be simple to write - even for a non-technical person.*

I'll say it again: **Title, Description, Details.** TDD. That's all you need to create a brief.

<img src="/assets/tdd.png" alt="TDD"/>


### Step 1: Understanding Your Opportunity
Step 1 is the simplest and yet most difficult step. Before attempting to create a brief, spend time thinking through your opportunity. Don't just start writing before you understand it well yourself. Even if you are a non-technical person, rational thought will help you clarify your ideas in your mind. 

Here are a few things you might think through:
 - What creates this opportunity? (If you don't know, try to figure it out).
 - How can the value that this opportunity creates be extracted?
 - What would competition for this opportunity look like?
 - Are there multiple ways to capture this opportunity?
 - Will this opportunity still exist if it is captured often?

Constructing graphs or drawings using paper or a [digital whiteboard](https://excalidraw.com/) may help you.

If you are a technical person, reading relevant smart contracts a few times usually helps. Trying to run simulations may also be useful to understand the details here.

### Step 2: Generate a brief using the template
The template for a brief looks like this:
```
# STRATEGY NAME
Strategy Description

- Detail #1
- Detail #2
- Detail #3
- Detail #4
- Detail #5

Optional: "Strategy author", "date"
```
I have converted this template to a few different formats:
 - [MarkDown](https://gist.github.com/mteam88/54e7750e03282a4d0374e549be575e42)
 - [Google Doc](https://docs.google.com/document/d/1SIJjMxtfjrh5CxTowiq4Sa2_0mSyCR4nGOhj4yXC6lk/edit?usp=sharing)

or you can juse copt-paste it yourself. Up to you (:

### Step 3: Fill out the Strategy Name & Description
Decide on a name for your strategy. General guidelines for naming can be found [above.](#strategy-name)

Decide on a description for your strategy. This should be an extremely brief description of what makes your strategy interesting and unique. Don't go into unnecessary detail.

### Step 4: Generate your Strategy Details
The rest of this brief includes your Strategy Details. *This is the most important part of the brief.*

Your preparation in Step 1 should help you generate these details. Details are organized in a bulleted list. Each bullet should be a simple statement that explains some part of the opportunity. These details should be roughly organized by importance and relevance. 

Please refer to the [Strategy Details](#strategy-details) section above for more information on generating these details.

Reading the examples below may help you as well.

A single strategy could have 20+ individual details. Don't keep your insights to yourself for concerns about conciseness.

### Step 5: Optional: Add additional information
If you have any additional information or metadata that you would like to include, you may add it to the end of the brief. This may include the author of the strategy, the date, or any other relevant metadata (thanks, links to sources, references, contact information, etc.).
___

## Examples
Here are a few examples of MEV Opportunity Briefs. These examples are my idea of what a good brief looks like. If you would like to see more examples (perhaps for a specific strategy) please contact me directly.


> ### $APE NFT Reward Arbitrage
> Flashloan and buy BAYC NFTs to claim $APE rewards, then immediately sell and repay flashloan.
> 
> 1 ⭐ difficulty
>
> - Acquire tokens using flashloan
> - Purchase [BAYC](https://opensea.io/collection/boredapeyachtclub) NFTs using tokens
> - [Claim $APE](https://apecoin.com/claim) rewards on NFTs
> - Sell NFTs for tokens
> - Repay flashloan
> - Opportunity exists when $APE rewards are greater than flashloan + NFT trade fees for available NFTs
> - May be possible to use a flashloan on [NFTX](https://nftx.io/) and then redeem tokens directly for NFTs
> - [MAYC](https://opensea.io/collection/mutant-ape-yacht-club) NFTs are also eligible for $APE rewards, but may be more difficult to acquire
>
> Source: [0x_Beans](https://twitter.com/0x_Beans/status/1506074195351916544)

Things to note about this brief:
 - The strategy name is simple and descriptive
 - The strategy description is brief and to the point
 - The strategy details are simple and include links to relevant sources
 - The strategy generalizes the flashloaned token

> ### Lido Rebase Sandwich
> Lido stETH rebases every 24 hours with a single transaction. Acquiring tokens before and returning them after the rebase could capture a tiny percentage of value.
>
> 3 ⭐ difficulty
>
> - Opportunity is created by [a daily rebase](https://etherscan.io/address/0x852ded011285fe67063a08005c71a85690503cee) that creates [this `TokenRebased` event](https://etherscan.io/advanced-filter?eladd=0xae7ab96520de3a18e5e111b5eaab095312d7fe84&eltpc=0xff08c3ef606d198e316ef5b822193c489965899eb4e3c248cea1a4626c3eda50) at around [5:22 pm UTC](https://etherscan.io/tx/0x71eb6c994ba206d35e9625c0139a94e85665fb2ac7a5ac3d2c346bc9f5a9de40) that is sent to the mempool.
> - Acquire [stETH](https://etherscan.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84) in frontrun tx
> - stETH rebase in meat tx
> - Repay stETH in backrun tx
> - A regular flashloan will not work because the tokens must be returned in a different transaction
> - Some sort of multi-transaction flashloan is necessary (maybe a [sponsored bundle](https://titanbuilder.substack.com/p/titan-tech-teatime-1)?)


Things to note about this brief:
 - The strategy difficulty is rated at 3 stars because of the complexity of finding a way to do multi-transaction flashloans
 - The strategy doesn't have to be good to create a brief. 😬😬
 - I intentionally avoided including wording like "acquire a LOT of stETH" that would make the strategy reasonable. This information is not necessary to represent the opportunity.

> ### Rebase Farming on OHM Forks
> OHM forks may offer very high rebase percentages (5%+ per rebase). Sandwiching the rebase with a buy+stake and unstake+sell could capture the APY of the rebase without holding the token.
>
> - Opportunity is created by a rebase that usually occurs every 8 hours on OHM forks
> - Acquire tokens before rebase
> - Stake tokens
> - Rebase occurs
> - Unstake tokens
> - Sell tokens
> - Some OHM forks allow anyone to initiate a rebase by calling a function on the contract which may simplify the strategy into a single transaction
> - The opportunity only exists on OHM forks that do not have a "warmup period" for staking/unstaking.
> - [This strategy is not possible on OHM forks that have a "warmup period" for staking/unstaking](https://docs.olympusdao.finance/protocol/protocol-overview#stabilization-mechanism)
>
> Source: [Derked](https://mirror.xyz/derked.eth/Vndae9dKhiVXllXf84ULO4qAaP_HurhqvQQMsxXlytU) and the third comment of [this thread](https://www.tigerdroppings.com/rant/money/a-deep-dive-into-the-eight-most-popular-ohm-forks/100107542/) which predates Derked's post by 6 months.

Things to note about this brief:
 - The strategy generalizes the opportunity to all OHM forks instead of any specific one

> ### Liquidity Add Backrunning
> Adding liquidity to a pool can create an imbalance that can be exploited by backrunning the transaction that adds liquidity. The complication of Uniswap V3 makes it more likely that users may accidentally create opportunities like this.
>
> - Opportunity is created when a user adds liquidity to a pool that creates an imbalance
> - When the opportunity is created, backrun the transaction that adds liquidity with an arbitrage transaction
> - Although this strategy competes with generic arbitrage bots, it is specific enough that it may be able to find opportunities faster than generic bots
> - Because the MEV is extracted in a backrun, the strategy may be able to [monitor mev-share transactions](https://docs.flashbots.net/flashbots-mev-share/searchers/getting-started) or transactions on L2s 

Things to note about this brief:
 - The strategy is very simple and generalizes the opportunity to all liquidity-adding transactions. The information about Uniswap V3 is not necessary to represent the opportunity, but it is included because it explains the rationale behind the opportunity.

> ### Liquity Trove Liquidation
> When Liquity troves fall below 110% collateralization, they can be liquidated for a profit.
>
> - Opportunity is created when a trove falls [below 110% collateralization. ](https://docs.liquity.org/faq/stability-pool-and-liquidations#what-are-liquidations)
> - When the opportunity is created, liquidate the trove
> - Collateralization is calculated using a [Chainlink oracle](https://docs.liquity.org/faq/stability-pool-and-liquidations#what-oracle-are-you-using-to-determine-the-price-of-eth)
> - Liquity team provides an example of a [liquidation bot](https://github.com/liquity/liqbot)
>
> Source: [Liquity Liquidation Bot Spec on Flashbots Job-board repo](https://github.com/flashbots/mev-job-board/blob/main/specs/liquity-liquidations.md)

## Conclusion
I have designed a simple format for representing MEV opportunities. This format is designed to be simple to create and interpret, extensible, and general. I have also provided a guide for composing your own briefs and a few examples of effective briefs.

Was this all a psyop to get you to leak your alpha?

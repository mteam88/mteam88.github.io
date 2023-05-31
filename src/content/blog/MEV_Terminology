---
pubDatetime: 2023-05-31T11:51:57
title: MEV Terminology
draft: false
tags:
  - MEV
description:
   Definitions of terms like MEV, searching, alpha, and arbitrage.
---


## Table of Contents

## Introduction
The MEV community often uses ambigous or unclear terms. This article will attempt to serve as a dedicated opinionated terminology guide. These definitions and choices are all my personal opinion.

### MEV
MEV used to stand for Miner Extractable Value before Ethereum removed the miner role. In the current transaction supply chain, more accurate terms would be Proposer Extractable Value or Sequencing Extractable Value. The MEV community has decided to keep the MEV acronym with **Maximal Extractable Value.**

MEV is **any value that can be extracted by any priveleged actor.** It is important to note that the actual extraction can be outsourced.

### Alpha
Alpha is any information that gives an entity a competitive advantage. This is different from a privileged role, as alpha only includes information.

Here is a table to help you understand alpha:
| Alpha (:                                                                       	| Not Alpha                          	|
|-----------------------------------------------------------------------------	|------------------------------------	|
| "Arbitrum's searchers do not cover liquidations on GMX."                    	| "Arbitrum is not competitive."     	|
| "Bellman-Ford can be optimized with GPU arrays..."                          	| "Bellman-Ford can be optimized."   	|
| "You can open multiple connections to Infura to get more mempool coverage." 	| "More mempool coverage is better." 	|

### Proposer Builder Seperation
"Proposer" and "builder" are fine, but we should stay away from using the term "miner" or "validator" at all. 

| Incorrect                                      	| Correct                                          	|
|------------------------------------------------	|--------------------------------------------------	|
| "Bribe the miner"                              	| "Bribe the builder"                              	|
| "Searchers pay a proposer fee to get included" 	| "Searchers bribe the builder to get block space" 	|
| "Searchers send bundles to validators"         	| "Builders send blocks to proposers"              	|

### Slippage
Slippage is a fee that a user pays to get a higher chance of successful execution. The traditional definition of slippage related to execution price, but I think that slippage is a corollary to gas fees.

Gas fees are for inclusion.
Slippage fees are for successful execution (not reverting).

### Searching
Searching is some of the tasks performed by searchers. Searching turn alpha into ops. I don't consider research/alpha-gathering searching even though searchers do it. Searching explicitly uses alpha to find and execute ops.

| Not Searching                            	| Searching                         	|
|------------------------------------------	|-----------------------------------	|
| Researching potential alpha              	| Validating alpha with backtesting 	|
| Writing an MEV bot                       	| Running an MEV bot                	|
| Lurking on Flashbot's Discord #Searchers 	| Simulating live ops on Tenderly   	|

### Arbitrage
The classic definition of arbitrage is simply exploiting a difference in the price of an asset for profit. This often appears in MEV in cyclic arbs, CEX-DEX arbs, and multi-DEX arbs. Searchers use the alpha that prices across different chains and exchanges are not always the same to create arbitrage ops.

I personally think arbitrage is any action that increases market efficiency. This includes liquidations. Liquidations increase market efficiency by liquidating bad positions. Liquidations effectively arbitrage between the expected value of an asset and the current value.

### Toxic MEV
Frontrunning is toxic. Everything else is non-toxic.

Sandwich attacks have become the example that everyone points to for toxic MEV. They negatively impact the user by getting a worse-than-necessary execution price. The frontrunning leg of a sandwich is what allows it to happen. All other forms of MEV are non-toxic.

One notable example is token/nft sniping in which MEV bots (sniper bots) buy tokens as soon as trading is enabled. This allows the early bots to get first access to new tokens at the best price. This is non-toxic because users are not negatively suprised by MEV. Though the snipers may result in a worse execution price if a user buys with high slippage at token launch, this would just be a case of frontrunning.

To clarify: toxic MEV is MEV that surprises the user to a negative affect. If the user is expecting it, it's fine, if they aren't its frontrunning.

## Conclusion
Hope this is helpful. Please contact me if you want me to add anything. Many topics are covered in my other articles.

---
pubDatetime: 2023-05-16T20:01:50
title: EIPs to Know in 2023
draft: false
tags:
  - Ethereum
  - EIP
description:
  A list of Ethereum Improvement Proposals (EIPs) that are important to know in 2023.
---

## Table of Contents

## Introduction
Bear markets are for building. The Ethereum core protocol developers are going full steam ahead. There are a few Ethereum Improvement Proposals that stand out as especially important to know. This is a living document that I plan to update with new information regularly. If you want something added or changed, contact me with the social links in the page footer.

## EIP-4844 - Proto-Danksharding
Currently, the most important upcoming EIP, 4844 will create a new transaction type: "a blob" that is specifically designed for rollups. It will increase available block space by 1000% (0.1 to 1.1 MB.) This is a huge deal for rollups, and will drastically increase the profit margin for L2s. 

#### Thoughts:
This upgrade makes Ethereum L2s one of the most bullish investments right now. Rollups are positioned to take over the market for most transactions, and this upgrade will make them even more profitable. I think we will see a lot of new rollups and rollup projects in the years post-4844.

#### Resources:
 - [Official EIP](https://eips.ethereum.org/EIPS/eip-4844)
 - [Optimism Twitter Thread](https://twitter.com/optimismFND/status/1499830644783915009)
 - [EIP 4844 Website](https://www.eip4844.com/)
 - [Ethereum Magicians Discussion](https://ethereum-magicians.org/t/eip-4844-shard-blob-transactions/8430)
 - [Bankless Video Overview](https://www.youtube.com/watch?v=N5p0TB77flM)
 - [Original Tweet](https://twitter.com/protolambda/status/1495538286332624898)


## EIP-4337 - Account Abstraction
This is another big one. I hope Ethereum is ready for the opportunities created by Account Abstraction.

Account Abstraction enables and standardizes many improvements to UX. Among other things, 4337 would introduce:
 - Account Recovery: Including social recovery or traditional 2FA recovery (think: password reset texts)
 - Gasless Transactions: Dapps or other entities that can pay gas fees for their users.
 - Batched Transactions: Approvals and swaps in the same transaction, bundled trades, etc.
 - Subscriptions: Automated subscription payments with caps and balances.

#### Thoughts:
From my perspective as a searcher, I am interested to see how `UserOps` will complicate MEV bots. Transaction decoding is already a key part of advanced bots, and I think we will see a trend towards bots that are generalized over `to address` or `calldata` which monitor logs and traces of transactions. This trend is already apparent, but Account Abstraction will force any bots that don't conform out of the market.

I think Account Abstraction as a standard is overrated as it is now. I don't think much of crypto Twitter recognizes that 4337 is only a standard that protocols will still need to implement for actual UX improvements to culminate. I think bundling approvals and swaps in the same transaction is an excellent UX update that most DEXs will implement.

#### Resources:
 - [Alchemy on Account Abstraction](https://docs.alchemy.com/docs/account-abstraction-overview)
 - [Alchemy: "You Could Have Invented Account Abstraction"](https://www.alchemy.com/blog/account-abstraction)
 - [Official EIP](https://eips.ethereum.org/EIPS/eip-4337)
 - [EIP 4337 Website](https://www.eip4337.com/)
 - [BeInCrypto Article on 4337](https://beincrypto.com/learn/erc-4337/)
 - [Biconomy Tweet](https://twitter.com/biconomy/status/1632678779511504896)


## EIP-6780 - `SELFDESTRUCT` No Longer Destructs
Well, not exactly. The SELFDESTRUCT opcode will no longer destroy the memory of the contract unless the contract was created in the same transaction. This has little impact on users.

From the [EIP](https://eips.ethereum.org/EIPS/eip-6780):
> The SELFDESTRUCT opcode requires large changes to the state of an account, in particular removing all code and storage. This will not be possible in the future with Verkle trees: Each account will be stored in many different account keys, which will not be obviously connected to the root account.

#### Thoughts:
Doesn't seem like something very unexpected. In hindsight, it was always probably better this way anyway. This doesn't end up affecting MEV bots that deploy and selfdestruct a contract in the same transaction (for atomic arbitrage mostly.)

#### Resources:
 - [Official EIP](https://eips.ethereum.org/EIPS/eip-6780)
 - [Ethereum Magicians Discussion](https://ethereum-magicians.org/t/eip-6780-deactivate-selfdestruct-except-where-it-occurs-in-the-same-transaction-in-which-a-contract-was-created/13539)
 - [Tim Beiko Tweet](https://twitter.com/TimBeiko/status/1651992596296900608)

## EIP-4626 - Tokenized Vaults
4626 standardizes tokenized (optionally yield-bearing) vaults. These vaults are used by almost every DeFi protocol you can name. This EIP will make it easier for protocols to integrate generic vaults and will make it easier for users to interact with vaults through different platforms.

#### Thoughts:
Absolutely amazing. Looking forward to the innovation around generic vaults. This should allow protocols like [Resonate Finance](https://www.resonate.finance/) to generalize across vaults.

#### Resources:
 - [Official EIP](https://eips.ethereum.org/EIPS/eip-4626)
 - [Ethereum Magicians Discussion](https://ethereum-magicians.org/t/eip-4626-yield-bearing-vault-standard/7900)
 - [4626 Alliance Website](https://erc4626.info/)
 - [Alchemy Article](https://www.alchemy.com/overviews/erc-4626)

## EIP-6963 - Multi Injected Provider Discovery
EIP-6963 is less well known but will provide a standardized way for Dapps to interact with multiple browser wallets through the `window.evmproviders` object. This EIP replaces the older EIP-5749 that fixes the same problem.

From the [EIP](https://eips.ethereum.org/EIPS/eip-6963): 
> Currently, wallet providers that offer browser extensions must inject their Ethereum providers (EIP-1193) into the same window object `window.ethereum` however this creates conflicts for users that may install more than one browser extension.
>
> Browser extensions are loaded in the web page and do not have a predictable pattern resulting in a race condition where the user is not in control to choose which wallet provider must be selected for exposing an Ethereum interface under the `window.ethereum` object.
>
> This results not only in a degraded user experience but also increases the barrier to entry for new browser extensions as users are forced to only install one browser extension at a time.

#### Thoughts:
I agree with [awkweb](https://twitter.com/awkweb/status/1653151851657719810) that this is a slightly overengineered solution to a problem that very few users experience. I think encouraging the adoption of 6963 for many browser wallets will be difficult. Regardless, I think of this as a step in the right direction for Ethereum's UX. The reason I included it in this list is to bring more attention to it and to encourage more discussion around it.

#### Resources:
- [Official EIP](https://eips.ethereum.org/EIPS/eip-6963)
- [Twitter Discussion from Pedro Gomes](https://twitter.com/pedrouid/status/1658428652638404608)
- [awkweb's Tweet](https://twitter.com/awkweb/status/1653151851657719810)

## Conclusion
I hope this helped some of you. *Please* contact me if you think something should be changed. I am not an expert on any of these EIPs so do your own research. I will try to keep this list updated as I learn more.
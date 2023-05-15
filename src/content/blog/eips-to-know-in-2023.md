---
pubDatetime: 2023-05-12T00:10:15
title: EIPs to know in 2023
draft: true
tags:
  - Ethereum
  - eip
description:
  A list of Ethereum Improvement Proposals (EIPs) that are important to know in 2023.
---

## Table of Contents

## Introduction
Bear markets are for building. The Ethereum core protocol developers are going full steam ahead. There are a few Ethereum Improvement Proposals that stand out as especially important to know. This is a living document that I plan to update with new information regularly. If you want something added or changed, contact me with the links below.

### EIP-4844 - Proto-Danksharding


### EIP-4337 - Account Abstraction
This is another big one. I hope Ethereum is ready for the opportunities created by Account Abstraction.

Account Abstraction enables and standardizes mamy improvements to UX. Among other things, 4337 would introduce:
 - Account Recovery: Including social recovery or traditional 2FA recovery (think: password reset texts)
 - Gasless Transactions: Dapps or other entities that can pay gas for their users.
 - Batched Transactions: Approvals and swaps in the same transaction, bundled trades, etc.
 - Subscriptions: Automated subscription payments with caps and balances.

#### Thoughts:
From my perspective as a searcher, I am interested to see how `UserOps` will complicate MEV bots. Transaction decoding is already a key part of advanced bots, and I think we will see a trend towards bots that monitor logs of transactions instead of being able to filter by `to address` or by calldata. This trend is already apparent, but Account Abstraction will force any bots that don't analyze logs to decode transactions out of the market.

I think Account Abstraction as a standard is overrated as it is now. I don't think much of crypto twitter recognizes that 4337 is only a standard that protocols still need to implement for actual UX improvements. I think bundling approvals and swaps in the same transaction is an excellent UX update that most DEXs will implement.

#### Resources:
 - [Alchemy on Account Abstraction](https://docs.alchemy.com/docs/account-abstraction-overview)
 - [Alchemy: "You Could have Invented Account Abstraction"](https://www.alchemy.com/blog/account-abstraction)
 - [Official EIP](https://eips.ethereum.org/EIPS/eip-4337)
 - [EIP 4337 Website](https://www.eip4337.com/)
 - [BeInCrypto Article on 4337](https://beincrypto.com/learn/erc-4337/)
 - [Biconomy Tweet](https://twitter.com/biconomy/status/1632678779511504896)


### EIP-6780 - `SELFDESTRUCT` No Longer Destructs

### EIP-4626 - Tokenized Vaults

### EIP-6963 - Multi Injected Provider Discovery
EIP-6963 is less well known, but will provide a standardized way for Dapps to interact with multiple browser wallets through the `window.evmproviders` object.

From the [EIP Draft](https://github.com/ethereum/EIPs/blob/0bdc6fcc7971b695bec7f4a0b1bd0d65cf64569c/EIPS/eip-6963.md): 
> Currently, wallet providers that offer browser extensions must inject their Ethereum providers (EIP-1193) into the same window object window.ethereum however this creates conflicts for users that may install more than one browser extension.
>
> Browser extensions are loaded in the web page and do not have a predictable pattern resulting in a race condition where the user is not in control to choose which wallet provider must be selected for exposing an Ethereum interface under the window.ethereum object.
>
> This results not only in a degraded user experience but also increases the barrier to entry for new browser extensions as users are forced to only install one browser extension at a time.

#### Thoughts
I agree with [awkweb](https://twitter.com/awkweb/status/1653151851657719810) that this is an overengineered solution to a problem that very few users experience. I think encouraging adoption of this new method for many browser wallets will be difficult and frankly 

### MEV Burn

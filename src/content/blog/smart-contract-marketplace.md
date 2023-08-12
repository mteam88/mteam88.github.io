---
title: An Idea for a Smart Contract Marketplace
description: >-
  In this post, I go over industry problems for token launchers and try to solve
  them with a smart contract marketplace design.
draft: false
pubDatetime: 2023-08-12T13:41:06+00:00	
tags:
  - Quarry
---

GM (:

I've recently been busy with IRL stuff, but I have been thinking about my next project. In this post, I discuss a problem in the crypto industry and how I plan to solve it.

## Table of Contents

# The Problem
Simply put:

**It’s still hard to create and deploy an ERC20 token contract.**

To be clear here, I am talking mostly about memecoins or community tokens. I hope to address the scams and rugpulls by only selling secure contracts. 

Let's dive in. Sub-problems are ordered by importance.

## Verified Contracts
When a team or individual wants to launch a token, they need a high-quality contract that won’t be **flagged** by automated rug checkers. These checkers are used by most memecoin traders. Using a contract that won't be flagged is a precursor to the success of any token launch.

Some checkers include: [Token Sniffer](https://tokensniffer.com/), [GoPlus Labs](https://gopluslabs.io/#token_detection), [Quick Intel](https://app.quickintel.io/scanner), [Hapi Labs](https://terminal.hapilabs.one/guest-address-check).

Notably, GoPlus and Hapi are used by [DexTools](dextools.io) (a popular trading tool for memecoins) to generate a [DEXT Score](https://info.dextools.io/crypto-glossary/dextscore/) that is the gold standard used by many memecoin traders to determine the legitimacy of a token.

> If you are blacklisted, you are totally screwed
> \-- <cite> Anonymous Token Launcher </cite>

## Time
Token launchers may have to wait **weeks** for a basic contract from their devs. This is an opaque process that they have no control over which may be a significant bottleneck in their launch process.

## Cost
From an [article](https://www.linkedin.com/pulse/discover-cost-creating-erc20-token-taksh-solutions-takshitsolutions) on LinkedIn:
> Considering the above stages, the total cost of creating an ERC20 token can range from $10,000 to $55,000, depending on the complexity of the project.

Purchasing a token contract from a token developer or token development firm could cost hundreds or even thousands of dollars (not including revenue share, discussed below.) Streamlining the process of creating a token contract could reduce the cost of a token contract dramatically.

## Dev Revenue Share
Some token devs include contract fees that are paid to them every time a token is traded. This extra fee is passed on to token traders. This makes a token less attractive than a token with no fees or only small fees for the token launcher.

## Redundant Contract Creation
Currently, different token devs end up creating many contracts that do very similar things. Standardizing token contracts would be a significant reduction in wasted work done by token devs.

<img src="/assets/spiderman-meme.jpeg" width=100% />

## Finding Trustworthy Token Devs
Many token launchers have been scammed by fake token devs. This is a significant problem that is hard to solve. I have seen many posts on Reddit and Discord from people who have been scammed by fake devs. Here is an example:

> i wasted too much on scammers and scams now i am looking [for] some good solid source and code
> -- <cite> Anonymous Token Launcher </cite>

## TLDR + Summary
Inefficiencies in the token contract creation process lead to:
 - Token launches being flagged by token security checkers
 - Token launchers waiting weeks for a contract
 - Token launchers paying too much for a contract
 - Token launchers paying a revenue share to a dev
 - Token devs wasting time and effort.
 - Token launchers being scammed by fake devs

# Potential Solutions
How can I solve all of these problems?

## Contract Wizard
I'm sure many readers have used or seen [Openzeppelin's Contract Wizard.](https://docs.openzeppelin.com/contracts/4.x/wizard) At the time of writing the OZ contract wizard has the following features available for ERC20 tokens:
 - Mintable
 - Burnable
 - Pausable
 - Permit (Token approvals without gas fees)
 - Votes
 - Flash Minting (Flash loans from the contract directly)
 - Snapshots

And multiple options for access control and upgradeability.

An average token launcher will need more features. Fees, reflections, and liquidity utilities are all common features that are not available in the OZ contract wizard.

Some other similar platforms are DxSale, PinkSale and CoinTool. They are clunky and hard to use. They also don't have many features. Their products are cookie cutter contracts with editable parameters. I think I could make a better product, but these will be my main competitors.

## Token Developer Firm
Token development firms and contractors serve many token launchers today. They are hard to use, shady, and unprofessional. 

Here is a top SEO ranking firm's marketing copy:

<img src="/assets/erc20-developcoins-com.png" width=100% />

An astute reader will find a lot wrong with that image.

A development firm would be hard to start and would require a lot of capital. It would also be hard to compete with the existing firms. I would need to find a way to differentiate my firm from the others.

## Smart Contract Marketplace
I could set up a minimalist marketplace for smart contracts. I could develop a few contracts and list them on the marketplace.

Token launchers could pay for these contracts with crypto and receive them immediately. I could also offer a service to deploy the contract for them for a fee. Token launchers could find contracts by searching for features they want. I could also offer a service to create custom contracts for a fee.

I can't find any existing smart contract marketplaces, so this might be a unique project.

# Comparing Solutions

I will examine how each of these solutions solves each of the problems I outlined above. I have removed any sections that a solution covers completely unless I think they are useful.

## Contract Wizard
Development would be challenging, and I think adding new features and checking compatibility would be a nightmare.

### 🟨 - Verified Contracts
Initial checking of possible combinations of features could be done by a bot. It might still be possible to create a flagged contract.

### 🟩 - Time
Instant after creation.

## Token Developer Firm
Would need to create a website and find clients. Would be hard to bootstrap.

### 🟩 - Verified Contracts
Could check before delivery.

### 🟨 - Redundant Contract Creation
Still might end up wasting dev hours.

### 🟥 - Time
Could take weeks, doesn't solve the problem.

### 🟨 - Cost
Could be cheaper than current options, but would probably just end up competing.

## Smart Contract Marketplace
Creating a seamless website will be difficult, but a good portfolio project for me. Very easy to bootstrap.

### 🟩 - Verified Contracts
All contracts would be checked before listing.

### 🟩 - Redundant Contract Creation
Only one token dev will actually source the contracts.

### 🟩 - Dev Revenue Share
Won't collect any.

### 🟩 - Time
Instant after purchase.

### 🟩 - Cost
Can be minimal.

### 🟩 - Trusted Developers
Using a smart contract marketplace would be a good way to find trustworthy devs.

## TLDR + Conclusion
Based on my limited resources and time, I think a smart contract marketplace is the best solution. The rest of this post will be about the marketplace I am designing, serving as a whitepaper.

# Quarry Marketplace
Quarry is a smart contract marketplace that I plan to create.

## Problem Statement
**Token launchers don't have fast, safe access to high-quality token contracts.**

## User Flow
Let's walk through a user flow for a token launcher.

1. A token launcher visits the Quarry website.
2. They see a list of contracts and a search bar.
   1. Some users click directly on a contract and progress directly to step 4.
3. Users search for a contract with the features they want. They are presented with a list of contracts that match their search. If there are no results, a "request a contract" button is displayed.
   1. Some users may search again with different terms.
   2. Some users may request a contract. They are presented with a form to fill out with the features they want. The form is submitted and the user is redirected to a confirmation page.
      1. The confirmation page displays a message that their request has been received and will be reviewed by a token dev.
      2. The user clicks a button to return to the home page.
4. Users select a contract and are presented with a page that displays the contract's features and a button to purchase the contract. This page also includes some marketing copy.
5. Users click the purchase button and walk through a PoS checkout service. 
6. Once their payment is confirmed, the contract page updates to display a download button, a button to open in Remix, and a copy to clipboard button.

Note: I envision adding a deploy contract button that would allow users to deploy the contract directly from the website.

## MVP Features
An [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) of Quarry would include the following features.
 - A collection of contracts stored on a server, with a description of each contract's features.
 - A home page that displays a list of contracts.
 - A details page that displays the description of a selected contract and contains the checkout process.

## Future Features
 - Search functionality, search by feature.
 - Request a contract form.
 - Deploy contract button.
 - Contracts from existing tokens. ("Deploy your own PEPE!")
 - NFT contracts & minting websites.

## Sourcing Contracts
Although I'm not much of a token dev myself, I can create a few basic contracts to start with, possibly using openzeppelin's wizard as a starting point. I can source contracts from the public source code of the thousands of existing tokens on public blockchains. I can also source contracts from other developers. 

## Scam & Rug Protection
Protecting users from rugs is high on my priority list. I will need to do some research to find the best way to do this, but some ideas I have currently are:
 - No unlimited mint functions in contracts.
 - Include liquidity locking/burning mechanisms in contracts to avoid liquidity rugs.

*Please* contact me if you have any ideas for this.

## Bonus Section: Why "Quarry"
I use the [foundry suite](https://book.getfoundry.sh/) for smart contract development. It includes contract dev tools called [Forge](https://book.getfoundry.sh/forge/), [Anvil](https://book.getfoundry.sh/anvil/), [Cast](https://book.getfoundry.sh/cast/), [Chisel.](https://book.getfoundry.sh/chisel/)

The theming of these tools is obviously based on blacksmithing. Of course, any blacksmith needs raw materials to work with which they might get from a mine or a quarry. I chose Quarry because it's a bit more unique. 

As an added bonus, it works well with the [Hardhat](https://hardhat.org/) smart contract development framework as well.

# Conclusion
Once I figure out a tech stack I'll get started with development. I am always open to feedback on my writing or Quarry itself. If you are a token launcher or dev I would love an interview. Discord is the best way to reach me, check below for my socials.

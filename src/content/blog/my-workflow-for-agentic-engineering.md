---
pubDatetime: 2026-02-13T14:00:00
title: My Workflow for Agentic Engineering in Crypto
draft: false
featured: true
tags:
  - AI
  - agentic engineering
  - crypto
description: A practical workflow for using coding agents effectively in crypto projects, with concrete tools, habits, and safety practices.
---

## I. Introduction

Agentic engineering requires a different mental model and workflow to traditional programming. Building anything in crypto requires a similar shift. Agentic engineering in crypto, therefore, is two levels more complex for the average developer. 

> \- "agentic" because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight.  
> \- "engineering" to emphasize that there is an art & science and expertise to it. It's something you can learn and become better at, with its own depth of a different kind.
> 
> \-- [karpathy](https://x.com/karpathy/status/2019137879310836075)

There are two extreme responses to this: some crypto developers choose to barely use AI for their work (often fairly citing security concerns). This group is growing smaller and smaller with the hype around Claude Code and Codex. On the other hand, some developers choose to go full slop mode and vibe everything. That simply doesn't work right now in crypto. Using these tools like you would for a hobby project is inefficient.

In this article, I'll outline how you can increase your productivity and output quality with some of the tools and tips I've been using for the past 2-3 months developing production and hobby products in crypto. 

This guide will be more focused on agentic engineering in general because there is a lot overlap with crypto, and I expect most of my audience is already familiar with the basic crypto dev workflow.

My general philosophy and approach towards agentic engineering is this: attempt to remove yourself as much as possible from the feedback loop. Instead of screenshotting a frontend and asking claude to fix a visual bug, tell claude to open the browser itself and screenshot everything to make sure it works. With that said, a skilled engineer will make far more progress per token than a novice or a non-technical person. There is a delicate balance between removing yourself from the feedback loop but still guiding the progress.

> *Agentic Engineering* means integrating AI into your existing development workflow. When quality software is the goal, there is no substitute for a skilled engineer. It is about enhancing what we can accomplish through thoughtful collaboration.
> 
>  \-- [Zed](https://zed.dev/agentic-engineering)

## II. Mindset

The #1 mistake that developers new to AI tools make is a bad mindset. Before touching any tools you must approach agentic engineering with a certain, specific mindset. 

First, you must convince yourself that **the AI can do anything** with the right tools and context. It is almost never helpful to be pessimistic about the agent's capability. Now, this does not mean you should do everything with AI - just because claude *can* do something doesn't mean it *should.* This mindset shift will help you focus on using AI as a collaborator instead of a tool. 

Second, you must consider context (the prompts, code, skills, MCPs, tools, etc. that are the input the the LLM) a precious currency. There is substantial benchmarking evidence to show that LLM output quality is [highly influenced](https://x.com/AndrewZeng17/status/2021069813293122056) by [context length](https://arxiv.org/html/2510.05381v1) and context quality. Many developers have [anecdotally reported](https://simonwillison.net/2025/Jun/18/context-rot/) feeling "[context rot](https://research.trychroma.com/context-rot)" as context length increases. Bloated MCPs and long threads are the #1 causes of context explosions and should both be avoided (more on this in the next section). Additionally, structuring and loading information for your agent (such as exporting Notion docs to markdown instead of using the Notion MCP) can be useful to increase output quality. Agents will pay much more attention to your prompt than a tool response. Compaction should, of course, be avoided.

Third, you should document your intent wherever possible. Code comments are dead, but markdown docs are valuable. Coding agents are happy to convince themselves that you wanted the system one way, even if you prompted them the opposite in the previous session. `AGENTS.md` is one way to do this, but pretty much any intentional approach (including code comments, markdown plans, dedicated docs, a well-written `README`) will work fine.

Finally (and most importantly), **think before you prompt.** Your goal is to give your agents to run (productively) for as long as possible. Always consider how you can enable the agents to get their own feedback on a new feature or bugfix instead of asking you. TDD is so back. A short prompt can work, but it's almost always best to spend the extra couple minutes making sure the agent can run for that extra half hour without your assistance. Not only will this increase your productivity and output quality, it will also feel so much less frustrating to manage.

## III. Workflow & Tools

*These will change significantly in the next few months. Focus on the essence of agentic coding, not the specific tools.*

Here are the tools I use:

- [Takopi](https://takopi.dev/) - a telegram interface for coding agents (more useful than you'd think)
- [Cursor](https://cursor.com/) - for navigating files, quick Composer queries, and editing `.env` files. I rarely use Cursor Tab.
- [Codex CLI](https://developers.openai.com/codex/cli) - my primary interface for driving agents (I only use claude for frontend design)
- [Codex App](https://developers.openai.com/codex/app) - I use the workspace management features and it's a joy to prompt with for longer prompts. Unfortunately it's a resource-hog so not my first choice for coding on the go.
- [sir](https://github.com/mteam88/sir) - a small cli tool I created for managing git worktrees for parallel coding agents and intelligently merging conflicting changes
- skills: I have multiple custom skills for crypto tooling like cast and foundry. I won't share these here because they are very tuned to the kinds of projects I work on. I encourage you to make your own (Codex has a Skill Creator skill that works for this).
- MCPs: Linear, Etherscan, and context7.  That's it.

Here is my workflow:

1. Git init/clone and open Cursor in repo root

![](/assets/agentic-workflow/git-init-cursor.gif)

2.  Create new worktrees with [sir](https://github.com/mteam88/sir) or the [Codex app.](https://developers.openai.com/codex/app) 

![](/assets/agentic-workflow/create-worktrees.gif)

I use the following command to setup worktrees (auto-run by the Codex App and by my tool):

```bash
claude -p "You need to setup this new worktree. Copy any and all files you may need from the root checkout to this one, for example .env and build directories. We are on macos, so you may use the -c flag on cp for Copy-on-Write if desired. Don't symlink, as I don't want changes from this worktree to affect the source." --dangerously-skip-permissions
```

3.  Prompt and review iteratively with codex to make progress. Occasionally resume with [takopi](https://takopi.dev/) if I'm not going to be at my desk for a long run. I will either make git commits during this process or during the 4th step.

![](/assets/agentic-workflow/prompt-review.gif)

4.  Merge back to main (or another branch to PR if I'm working with other people) with `sir settle`or the Codex App's apply tool. I almost never use manual git commands anymore.

![](/assets/agentic-workflow/settle.gif)

The highest leverage workflow for you will probably be different for me, so here are some of the things I thought about when crafting this workflow:

- Parallel coding agents: I'm usually working on a single project at a time and Codex is very (meticulously) slow. That means that without parallel coding agents I'm sitting on my hands for >50% of my time developing. Twitter is too tempting of a distraction so I avoid it completely when developing.
- Git worktrees: many of the best agentic engineers (incl [@steipete](https://x.com/steipete)) use multiple agents in the [same folder](https://steipete.me/posts/just-talk-to-it#harness--general-approach). Others use multiple checkouts for isolation. I've found that worktrees are manageable with my `sir`tool, and multiple agents working in the same folder often leads to conflicts that are obnoxious to resolve (usually requiring interrupting multiple different threads).
- `gpt-5.3-codex` vs. `opus-4.6` : I've always preferred codex models over opus because they feel more patient and more willing to research a repository before making changes. This is the only way to keep large and sophisticated projects from descending into slop. 
- Codex cli > opencode:  I've never found a reason to prefer opencode over first party CLIs for my primary work, and I don't like their tui interface. I have it installed and use it occasionally for testing out open source models. I like pi and haven't tried Amp.
- Plans: I don't use plans or planning mode for cli agents anymore. For complex tasks or new projects, I'll start with ChatGPT's Deep Research or 5.2 Pro (see steipete's [oracle](https://github.com/steipete/oracle/) too) and generate a markdown plan for a coding agent. I've found that it's difficult to get coding agents to push back on bad ideas, but 5.2 Pro will do it if you ask. 
- jj? tmux? [Conductor](https://www.conductor.build/)? I've found keeping my workflow simple and straightforward is helpful. Agentic engineering is already more mentally taxing, using high-cognitive-load tools just isn't worth it.
- slash commands: I find most people use slash commands or have extra skills for things that are basically just prompts they repeat alot (for example to create a pull request, to commit, etc.) I prefer to use [Raycast Snippets](https://manual.raycast.com/snippets) for this purpose. I have a few setup right now for Github related actions.

## IV. Tips and Tricks

Coding agents have no idea how powerful they really are. This is 90% of the reason clawdbot/openclaw was successful: the agent was willing to attempt anything. Your job as the prompter is to a**sk for more**:

- “Run this yourself iteratively until all tests pass”
- “Use the etherscan MCP to find an example Uniswap transaction on Base to analyze, then analyze it’s logs with cast and determine how to determine execution price from the events”
- “Never leave stubs, mock, do smoke tests, etc.  and always write complete implementations.”
- “Clone the Uniswap contracts repo to a tmp directory and get the interfaces from there, then use them in alloy with the `sol!` macro.”

In general, your agents will be more useful if you give them more context. I like to export files from Notion as markdown and feed them to 5.2 Pro or right to codex. While more context does degrade performance, most of the time adding to your prompts like this will take up just a few thousand tokens and can dramatically improve your output. Worth it.

Remember that agents are very jagged. The best opportunity to improve your workflow and prompting is to notice when an agent makes a dumb mistake and patiently think about how you can avoid it next time.

![](/assets/agentic-workflow/jagged-agents.jpg)

Some common footguns I've noticed:

- Hesitance to steer the agents - I frequently interrupt agents with esc or use codex's new steering feature when I notice the agents are off topic.
- Lack of ambition - you will not make progress with better models if you don't regularly run into the limitations of the current SOTA.
- Sacrificing code quality - be obnoxious about refactoring and code quality. Code smell will drive your agents down paths that *will* waste time. I've found that an overfocus on functionality (and not caring what the code looks like) will always lead to sloppy code that isn't flexible. 
- Scope aggressively. Always tell agents what level you're looking for: MVP, prototype, exploration, to production-ready. The agents will respond completely differently to a request to "prototype this next feature" vs a request to "implement this feature at a  production-ready level." 

## V. Agentic Engineering in Crypto

I saved this section for last because it *will only* work if you have the agentic mindset and generalized workflow. Crypto development has always been substantially different from traditional programming. Notably, the SOTA LLMs of today have training data cutoffs around mid-2025 and a small percent of their training data is relevant crypto-related code. This means that the highest leverage thing one can do to get higher quality output from agents for crypto-specific projects is to guide the LLM towards using more web search and exploration tools before working.

My preferred workflow for crypto projects is the same as the above, but using foundry and the latest version of alloy to start my projects. I always manually add to my prompts to encourage the agents to do more research on foundry/alloy before beginning. I also use 5.2 Pro for planning much more for crypto projects because it gives an easy way for me to stop an agent when it seems to be using outdated tools or practices.

If building on any chain other than Ethereum L1, you must explicitly tell the agents to review any/all assumptions they have about the chain they are working. For example, they commonly assume that all L2s have public mempools and I've even had 5.2 codex hallucinate that Flashbots was deployed on Celo. 

Beyond this, the most important thing for a crypto developer using AI to be thinking about is **staying safe**. I always advise a policy of isolation: keep your development machine with AI completely separate from the machine you use for deployments or running anything in prod. Here are a few specific things to watch out for:

- Supply chain attacks: Be very careful when installing new [VSCode/Cursor extensions](https://hunt.io/blog/malicious-vscode-extension-anivia-octorat-attack-chain), [npm dependencies](https://snyk.io/blog/npm-supply-chain-attack-via-open-source-maintainer-compromise/), [openclaw skills](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/) or any other tool. It's probably not worth it to install anything from github unless you can read all the code. Do NOT rely on agents to read code for you, they can be trivially prompt injected to conceal malicious payloads.
- Blast radius: If you are compromised in any way (including leaking private keys to an AI), move all funds immediately. Use a hardware wallet instead of a browser waller for any significant \$\$ amounts.
- Avoid [hardcoded private keys](https://x.com/pcaversaccio/status/1664930332175478784) in `.env` files: Use Alloy's encrypted keystores, don't be tempted by the convenience of `.env`private keys, especially when using agents (who WILL accidentally read your private keys or show them places you don't want). Tell your agents to do the same.

Always get human professional audits for production smart contracts. I strongly recommend running through an agent review with [trailofbits' skills](https://github.com/trailofbits/skills) too. Ask your agents to make your smart contracts easy to audit and review, and follow best practices for security and auditability.

## VII. Conclusion

The stack I outlined above (Codex, sir, Takopi, Cursor) will almost certainly be outdated in a few months. The models will get faster and smarter, get better context management, and I expect agentic capabilities to get less jagged. However, the we are far past the event horizon for agentic engineering. A permanent shift has occurred in the optimal workflow for developers. I expect adoption to accelerate.

In crypto, where immutability and other constraints are often at odds with a naiive approach to vibe coding, professional developers can and will take advantage of these tools to leverage their existing skills towards elegant and secure protocols. This is the beginning of the golden age of crypto building. Optimize your workflow by removing yourself from the feedback loops and asking for the right things. Do not optimize for lines of code, but rather for decision velocity and code quality.

It is most important to start using agentic engineering in your workflow today. You will learn and make mistakes and make progress only if you spend hours per day hacking away.  
Godspeed.

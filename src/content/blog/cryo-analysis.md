---
title: Analyzing Ethereum with Cryo
description:
  In this article, I install Cryo, download some Ethereum data, and analyze it with graphs and charts.
draft: false
featured: true
tags:
  - rust
  - Cryo
pubDatetime: 2021-10-10T21:39:33+00:00
---

[Cryo](https://github.com/paradigmxyz/cryo#readme) is a blockchain analysis tool built by [Paradigm.](https://www.paradigm.xyz/oss) Cryo is the easiest way to extract blockchain data for analysis. In this article, I install Cryo, download some Ethereum data, and analyze it with [polars.](https://www.pola.rs/)

## Table of Contents

## Introduction to ❄️🧊 Cryo 🧊❄️
From the [Cryo readme](https://github.com/paradigmxyz/cryo#readme)
> ❄️🧊 cryo 🧊❄️
> 
> cryo is the easiest way to extract blockchain data to parquet, csv, json, or a python dataframe.
>
> cryo is also extremely flexible, with many different options to control how data is extracted + filtered + formatted
>
> cryo is an early WIP, please report bugs + feedback to the issue tracker

[Storm Silvkoff](https://www.paradigm.xyz/team/stormslivkoff) gave an amazing guide to Cryo in his [Rust x Ethereum day](https://rusteth.paradigm.xyz/) talk:

<iframe src="https://www.youtube.com/embed/1DFxuspPE2g" title="Rust x Ethereum Day - Cryo and Data Endgame" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The [YouTube video](https://www.youtube.com/watch?v=1DFxuspPE2g) is only about 20 minutes long. Would recommend.

Cryo is built on the [Rust](https://www.rust-lang.org/) programming language. You will need to [install Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) before using Cryo.

For the second part of this article, we will explore the data we have collected with Cryo. We will use [Python](https://www.python.org/) libraries for this, so you will need Python installed.

## Installing Cryo
The first step to use Cryo is to [install it.](https://github.com/paradigmxyz/cryo#installation)

I chose to build from source because [Cryo release 0.2.0](https://github.com/paradigmxyz/cryo/releases/tag/0.2.0) currently has some [building issues](https://github.com/paradigmxyz/cryo/pull/30) when using `cargo install.`

To install:
```shell
git clone https://github.com/paradigmxyz/cryo
cd cryo
cargo install --path ./crates/cli
```

To test your installation run:
```shell
cryo -V
```

## Downloading data
Cryo can download many different [datasets:](https://github.com/paradigmxyz/cryo#datasets)
* blocks
* transactions (alias = txs)
* logs (alias = events)
* contracts
* traces (alias = call_traces)
* state_diffs (alias for storage_diffs + balance_diff + nonce_diffs + code_diffs)
* balance_diffs
* code_diffs
* storage_diffs
* nonce_diffs
* vm_traces (alias = opcode_traces)

In this article, we'll download and analyze **the blocks dataset:**

```shell
cryo blocks <OTHER OPTIONS>
```

### Data Source
[Cryo needs](https://github.com/paradigmxyz/cryo#json-rpc) an [rpc url](https://ethereum.org/en/developers/docs/apis/json-rpc/) to extract blockchain data from. [Chainlist](https://chainlist.org/) is an RPC aggregator that collects the fastest free and open endpoints. Any of the http endpoints listed should work, but I chose `https://eth.llamarpc.com/` from [LlamaNodes](https://llamanodes.com/)

Our cryo command now looks like this:

```shell
cryo blocks --rpc https://eth.llamarpc.com <OTHER OPTIONS>
```

If you get an error like the following:
```
send error, try using a rate limit with --requests-per-second or limiting max concurrency with --max-concurrent-requests
```


### Data Directory
To keep our data separate from other files for analysis, I have created a `.data` directory. You must create this directory before running `cryo`.

Adding our data directory to the command:

```shell
cryo blocks --rpc https://eth.llamarpc.com -o ./.data/ <OTHER OPTIONS>
```

### Additional Columns
The default blocks schema includes the following columns:
```
schema for blocks
─────────────────
- number: uint32
- hash: binary
- timestamp: uint32
- author: binary
- gas_used: uint32
- extra_data: binary
- base_fee_per_gas: uint64
```
but there are also other available fields: 
```
other available columns: logs_bloom, transactions_root, size, state_root, parent_hash, receipts_root, total_difficulty, chain_id
```

Find this information for your dataset by [running](https://github.com/paradigmxyz/cryo#data-schema):
```shell
cryo <DATASET> --dry --rpc https://eth.llamarpc.com
```

For this analysis, I'm interested in the `size` column. We can use the `-i` flag in our command to tell `cryo` that we want `size` data:

```shell
cryo blocks --rpc https://eth.llamarpc.com -o ./.data/ -i size <OTHER OPTIONS>
```

### Let's do it!
Before running, we should specify specific blocks that we are interested in so we avoid downloading the entire `blocks` dataset (it's massive.) Cryo downloads data in chunks of (default) 1000 blocks, so we'll use the `--align` flag to "align block chunk boundaries to regular intervals."

Our final command looks like this:
```shell
cryo blocks -b 18100000:18190000 -i size --rpc https://eth.llamarpc.com --align -o ./.data/
```

which downloads **90 thousand blocks** from our node and stores them in the [parquet format.](https://parquet.apache.org/)

Running on my laptop took just 1 minute and 38 seconds!!

## Polars Analysis
The next step in this process is to analyze the data we have. We'll use the [polars](https://www.pola.rs/) DataFrame library to read the [parquet](https://parquet.apache.org/) files that we have downloaded.

I'll use an [interactive Python notebook](https://ipython.org/notebook.html) (also known as a [Jupyter Notebook](https://docs.jupyter.org/en/latest/)) inside my [VSCode](https://code.visualstudio.com/) development environment.

Paradigm provides an [example notebook](https://github.com/paradigmxyz/paradigm-data-portal/blob/main/notebooks/explore_ethereum_contracts.ipynb) on their [data website](https://data.paradigm.xyz/) that I've used as a template for our analysis.

You can find the [full notebook](https://gist.github.com/mteam88/ca446170f136435db08a367c4782247b) on Github, in this section I will discuss some of my findings:

### Timestamps
In this section, I explore the timestamp data of blocks we downloaded:


```python
# get all timestamps in np array
timestamps = scan_df().select(pl.col('timestamp')).collect(streaming=True).to_numpy()

# calculate time difference between blocks
time_diff = np.diff(timestamps, axis=0)
```

```python
Average Block Time:  12.136534850387227
Standard Deviation of Block Time:  1.2814744196308057
```

<img src="/assets/cryo-charts/block_time_diff.png"/>

### Extra data aka Block Graffiti
Extra data is

> An optional free, but max. 32-byte long space to conserve smart things for ethernity. :)
> -- https://ethereum.stackexchange.com/a/2377

Many [block builders](https://docs.flashbots.net/flashbots-mev-boost/block-builders) use extra data to identify that they built the block.

```python
# get total gas used by unique extra_data
result_df = scan_df().groupby('extra_data').agg(pl.col('gas_used').sum().alias('tot_gas_used')).collect(streaming=True)
sorted_result_df = result_df.sort('tot_gas_used', descending=True).head(10)
extra_data = sorted_result_df['extra_data'].to_numpy()
```

<img src="/assets/cryo-charts/total_gas_used.png"/>

<img src="/assets/cryo-charts/avg_gas_used.png">

<img src="/assets/cryo-charts/avg_base_fee.png">

<img src="/assets/cryo-charts/block_size_extra_data.png">

### Gas
Next, I explored the `base_fee` of blocks over time. Gas prices, as defined in [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) include both the `base_fee` defined per block and a priority fee that is determined for every transaction by its sender. In this section, we analyze the `base_fee` to learn about gas changes over time.

```python
# get base_fee_per_gas and timestamp, sort by timestamp
scan_df().select('base_fee_per_gas', 'timestamp').collect(streaming=True).sort('timestamp').to_numpy()
```

<img src="/assets/cryo-charts/base_fee_over_time.png"/>

Another interesting gas-related data point we have is the `gas_used` in each block. Let's use a bell curve to graph the `gas_used` by each block:

```python
# get gas_used
res = scan_df().select('gas_used').collect(streaming=True).to_numpy()

# bell curve graph of gas_used
plt.figure(figsize=(20, 10))
plt.hist(res, bins=100)
plt.title('Gas Used')
plt.xlabel('Gas Used')
plt.ylabel('Count')
plt.show()
```

<img src="/assets/cryo-charts/gas_used_dist.png"/>

Beautiful.

### Block Size
As mentioned previously, we also download the `size` of each block (in bytes.)

The previous distribution was pretty, let's try that again:
```python
# get size
res = scan_df().select('size').collect(streaming=True).to_numpy()

# bell curve graph of gas_used
plt.figure(figsize=(20, 10))
plt.hist(res, bins=150)
plt.title('Block Size')
plt.xlabel('Block Size (bytes)')
plt.ylabel('Count')
plt.show()
```

<img src="/assets/cryo-charts/block_size_dist.png"/>

Less satisfying, but interesting all the same. Let's try plotting over time:

<img src="/assets/cryo-charts/block_size_over_time.png"/>

I still can't tell much from this graph, maybe a box and whiskers will be more informative?

<img src="/assets/cryo-charts/block_size_box.png"/>

Huh. Lots of outliers. Maybe we just need numbers?

```python
# Print some summary statistics
print("Min: ", np.min(res[:, 0]))
print("Average: ", np.mean(res[:, 0]))
print("Median: ", np.median(res[:, 0]))
print("Std Dev: ", np.std(res[:, 0]))
print("Max: ", np.max(res[:, 0]))
```

```python
Min:  1115                   # 1.115KB 
Average:  172033.70095555554 # 0.172MB
Median:  150470.0            # 0.15MB 
Std Dev:  125779.71706563157 # 0.126MB
Max:  2218857                # 2.2MB
```

Interesting.

## Conclusion
We only explored surface-level data here. I really enjoy this kind of messing around with data. Running [the entire notebook](https://gist.github.com/mteam88/ca446170f136435db08a367c4782247b) takes only a few seconds.

Having such easy access to analysis of complex data increases the likelihood that people will explore their data and uncover insights.
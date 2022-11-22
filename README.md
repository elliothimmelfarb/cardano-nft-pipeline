# cardano-nft-pipeline

This project uses [Deno](https://deno.land/).

## Setup

Uses [Deno.env](https://deno.land/manual@v1.28.0/basics/env_variables#built-in-denoenv) for secrets.

- create `env.ts` file in root with the following `Deno.env.set()` lines:

```typescript
Deno.env.set('BLOCKFROST_PROJECT_ID', '<your blockfrost project ID>')
Deno.env.set('SEED_PHRASE', '<minting wallet seed phrase>')
```

## Run

```
$ deno task run
```

## Test Cardano NFT metadata

Paste metadata data as JSON [here](https://pool.pm/test/metadata)

## Other projects to look at as examples

- https://github.com/armada-alliance/cardano-minter
- https://github.com/armada-alliance/cardano-minter-collection
- https://github.com/nateshmbhat/cardano-nft-minter

## Resources

- [Royalties CIP](https://cips.cardano.org/cips/cip27/#simplesummary)

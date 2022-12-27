# cardano-nft-pipeline

This project uses [Deno](https://deno.land/).

## Setup

Uses [Deno.env](https://deno.land/manual@v1.28.0/basics/env_variables#built-in-denoenv) for secrets.

- create `env.ts` file in root with the following `Deno.env.set()` lines:

```typescript
Deno.env.set('BLOCKFROST_PROJECT_ID', '<your Blockfrost Cardano project ID>')
Deno.env.set('BLOCKFROST_IPFS_PROJECT_ID', '<your blockfrost IPFS project ID>')
Deno.env.set('SEED_PHRASE', '<minting wallet seed phrase>')
```

## Tasks

Use `deno task [task]` in your terminal to run [Deno Tasks](https://deno.land/manual@v1.28.3/tools/task_runnerk).

Exmaple:

```bash
$ deno task log-metadata
Task log-metadata deno run --allow-net --allow-env src/tasks/logMetadata.task.ts
```

Tasks are declared in the `deno.json` file.

### Task List

Look `src/tasks` directory to see task files.

## Mint Your Collection

1. Put images with appropriate metadata into `inputs/images` folder
2. Configure shared metadata and royalties data in `src/config`
3. Run `deno task create-assets` to create assets. You can verify the assets look correct in the JSON file create in `outputs/metadata`
4. Verify all assets have been pinned successfully to IPFS by running `deno task verify-pinned`
5. Create policy ID and script with `deno task create-policy`
6. Create metadata with `deno task create-metadata`

## Test Cardano NFT metadata

Paste metadata data as JSON [here](https://pool.pm/test/metadata)

## Other projects to look at as examples

- [armada-alliance/cardano-minter](https://github.com/armada-alliance/cardano-minter)
- [armada-alliance/cardano-minter-collection](https://github.com/armada-alliance/cardano-minter-collection)
- [nateshmbhat/cardano-nft-minter](https://github.com/nateshmbhat/cardano-nft-minter)

## Resources

- [Royalties CIP](https://cips.cardano.org/cips/cip27/#simplesummary)

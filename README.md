# cardano-nft-pipeline

This project uses [Deno](https://deno.land/).

### Setup:

Uses [Deno.env](https://deno.land/manual@v1.28.0/basics/env_variables#built-in-denoenv) for secrets.

- create `env.ts` file in root with the following `Deno.env.set()` lines:

```typescript
Deno.env.set('BLOCKFROST_PROJECT_ID', '<your blockfrost project ID>')
```

### Run:

```
$ deno task run
```

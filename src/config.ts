import { Network } from 'https://deno.land/x/lucid@0.7.6/mod.ts'

export const config = {
  // Blockfrost
  network: 'Mainnet' as Network,
  projectId: Deno.env.get('BLOCKFROST_PROJECT_ID'),

  // Local
  inputFolder: '',

  // Collection
  collectionDescription:
    'Here is a beautiful description for this Testing Collection',
  collectionName: 'Testing Collection',
}

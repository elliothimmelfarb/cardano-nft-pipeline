import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.7.6/mod.ts'

export const blockFrost = new Blockfrost(
  'https://cardano-mainnet.blockfrost.io/api/v0',
  Deno.env.get('BLOCKFROST_PROJECT_ID'),
)

export const lucid = await Lucid.new(blockFrost, 'Mainnet')

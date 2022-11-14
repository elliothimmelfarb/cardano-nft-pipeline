import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.7.6/mod.ts'

export const lucid = await Lucid.new(
  new Blockfrost(
    'https://cardano-preview.blockfrost.io/api/v0',
    Deno.env.get('BLOCKFROST_PROJECT_ID'),
  ),
  'Preview',
)

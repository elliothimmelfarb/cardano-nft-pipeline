import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { config } from './config.ts'

export const blockFrost = new Blockfrost(
  `https://cardano-${config.network.toLowerCase()}.blockfrost.io/api/v0`,
  config.projectId,
)

export const lucid = await Lucid.new(blockFrost, config.network)

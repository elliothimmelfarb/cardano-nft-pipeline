import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.8.2/mod.ts'
import { config } from './config.ts'

export const blockFrost = new Blockfrost(
  `https://cardano-${config.network.toLowerCase()}.blockfrost.io/api/v0`,
  config.projectId,
)

const lucid = await Lucid.new(blockFrost, config.network)

const seedPhrase = Deno.env.get('SEED_PHRASE')

if (!seedPhrase) throw new Error('no seed phrase found')

lucid.selectWalletFromSeed(seedPhrase)

export { lucid }

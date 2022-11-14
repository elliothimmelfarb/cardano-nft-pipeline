import { lucid } from './lucid.ts'

export const getWallet = () => {
  const seedPhrase = Deno.env.get('SEED_PHRASE')

  if (!seedPhrase) return console.error('no seed phrase found in Deno.env')

  lucid.selectWalletFromSeed(seedPhrase)

  return lucid.wallet
}

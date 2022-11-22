import { lucid } from '../lucid.ts'

export const getWallet = () => {
  const seedPhrase = Deno.env.get('SEED_PHRASE')

  if (!seedPhrase) throw new Error('no seed phrase found')

  lucid.selectWalletFromSeed(seedPhrase)

  return lucid.wallet
}

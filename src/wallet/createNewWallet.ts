import { lucid } from '../cardano.ts'

export const createNewWallet = async () => {
  const seedPhrase = lucid.utils.generateSeedPhrase()

  lucid.selectWalletFromSeed(seedPhrase)

  const address = await lucid.wallet.address()

  console.log('seedPhrase:', seedPhrase)
  console.log(' ')
  console.log('address:', address)
}

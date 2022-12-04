import { getWallet } from './getWallet.ts'

export const getWalletUtxos = () => {
  const wallet = getWallet()

  return wallet.getUtxos()
}

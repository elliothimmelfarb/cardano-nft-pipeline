import { getWallet } from './getWallet.ts'

export const getWalletAddress = () => {
  const wallet = getWallet()

  return wallet.address()
}

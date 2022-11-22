import { getWallet } from './getWallet.ts'

export const getWalletAddress = async () => {
  const wallet = getWallet()

  const address = await wallet.address()

  console.log('address:', address)
}

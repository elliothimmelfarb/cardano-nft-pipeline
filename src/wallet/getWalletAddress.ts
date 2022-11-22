import { getWallet } from './getWallet.ts'

export const getWalletAddress = async () => {
  const wallet = getWallet()

  if (!wallet) return console.error('no wallet found')

  const address = await wallet.address()

  console.log('address:', address)
}

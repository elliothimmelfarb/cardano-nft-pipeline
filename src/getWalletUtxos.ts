import { getWallet } from './getWallet.ts'

export const getWalletUtxos = async () => {
  const wallet = getWallet()

  if (!wallet) return console.error('no wallet found')

  const utxos = await wallet.getUtxos()

  console.log('balance:', utxos)
}

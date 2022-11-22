import { getWallet } from './getWallet.ts'

export const getWalletUtxos = async () => {
  const wallet = getWallet()

  const utxos = await wallet.getUtxos()

  console.log('balance:', utxos)
}

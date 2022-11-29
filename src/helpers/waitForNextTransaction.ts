import { getWallet } from '../wallet/getWallet.ts'

export const waitForNextTransaction = async () => {
  const utxos = await getWallet().getUtxos()

  const initialUtxoCount = utxos.length

  let currentUtxoCount = initialUtxoCount

  while (currentUtxoCount === initialUtxoCount) {
    console.log('Waiting for transaction to complete...')

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const utxos = await getWallet().getUtxos()

    currentUtxoCount = utxos.length

    console.log(
      'initialUtxoCount:',
      initialUtxoCount,
      'currentUtxoCount:',
      currentUtxoCount,
    )
  }

  return
}

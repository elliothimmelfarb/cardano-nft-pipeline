import { TxHash } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { blockFrost } from '../lucid.ts'

export const waitForNextTransaction = async (label: string, txHash: TxHash) => {
  console.log(`Waiting for ${label} transaction to complete...`)
  console.log('txHash:', txHash)

  await blockFrost.awaitTx(txHash)

  console.log('Completed!')
}

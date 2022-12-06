import { getWalletUtxos } from '../wallet/getWalletUtxos.ts'

getWalletUtxos().then((utxos) => {
  console.log(utxos)
})

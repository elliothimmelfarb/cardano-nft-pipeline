import { getWalletUtxos } from './getWalletUtxos.ts'

export const getWalletAdaBalance = async () => {
  const utxos = await getWalletUtxos()

  return (
    utxos.reduce((out, utxo) => {
      return out + Number(utxo.assets.lovelace)
    }, 0) / 1000000
  )
}

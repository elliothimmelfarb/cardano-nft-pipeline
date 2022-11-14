import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.7.6/mod.ts'

export const cardano = async () => {
  const lucid = await Lucid.new(
    new Blockfrost(
      'https://cardano-mainnet.blockfrost.io/api/v0',
      Deno.env.get('BLOCKFROST_PROJECT_ID'),
    ),
    'Mainnet',
  )

  const slot = lucid.currentSlot()

  console.log({ slot })
}

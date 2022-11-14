import { Blockfrost, Lucid } from 'https://deno.land/x/lucid@0.7.6/mod.ts'

export const cardano = async () => {
  const lucid = await Lucid.new(
    new Blockfrost(
      'https://cardano-preview.blockfrost.io/api/v0',
      'mainnetBm6PwgxKgpgISoC1dr9OZSTU1orxZjCw',
    ),
    'Mainnet',
  )

  const slot = await lucid.currentSlot()

  console.log({ slot })
}

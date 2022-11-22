import { Unit, utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { lucid } from '../lucid.ts'
import { mintingPolicy } from './mintingPolicy.ts'
import { config } from '../config.ts'

export const mintNFTs = async () => {
  const policy = await mintingPolicy()

  const inputAssets = [
    {
      mediaType: 'image/png',
      image: 'QmciQW1JFjzjxvqMKuQ2M2ohuXENf3sEG3HsyGAqQTRGNZ',
      meta1: 'ooga',
      meta2: 'booga',
    },
    {
      mediaType: 'image/png',
      image: 'QmWdrHV497Twq24rSUMdDRgh5F8Ag1QQqAUjS9gr4e4vgY',
      meta1: 'tray',
      meta2: 'tro',
    },
  ]

  const metadataAssets = inputAssets
    .map((asset, index) => {
      const name = `${config.collectionName} #${index + 1}`
      return {
        ...asset,
        name,
        description: config.collectionDescription,
        files: [
          {
            mediaType: asset.mediaType,
            name,
            src: `ipfs://${asset.image}`,
          },
        ],
      }
    })
    .reduce((out, asset) => {
      return {
        ...out,
        [asset.name]: asset,
      }
    }, {})

  const metadata = {
    [policy.id]: metadataAssets,
    version: '1.0',
  }

  const assets = Object.keys(metadataAssets)
    .map((name): Unit => policy.id + utf8ToHex(name))
    .reduce(
      (out, name) => ({
        ...out,
        [name]: 1n,
      }),
      {},
    )

  console.log('metadata:', JSON.stringify({ 721: metadata }))

  const tx = await lucid
    .newTx()
    .mintAssets(assets)
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policy.script)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('txHash:', txHash)
}

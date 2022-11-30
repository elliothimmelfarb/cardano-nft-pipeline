import { PolicyId, utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { config } from '../config.ts'

const inputAssets = [
  {
    mediaType: 'image/png',
    image: 'QmciQW1JFjzjxvqMKuQ2M2ohuXENf3sEG3HsyGAqQTRGNZ',
    meta1: 'ooga',
    meta2: 'booga',
  },
  {
    mediaType: 'image/png',
    image: 'QmVyjCtqVKTJFgGA8DqFUW36f6EdfkrGJhj7XkR1cv4DnS',
    meta1: 'tray',
    meta2: 'tro',
  },
]

export const createMetadata = (policyId: PolicyId) => {
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

  const assets = Object.keys(metadataAssets).reduce(
    (out, name) => ({
      ...out,
      [policyId + utf8ToHex(name)]: 1n,
    }),
    {},
  )

  const metadata = {
    [policyId]: metadataAssets,
    version: '1.0',
  }

  // console.log('metadata:', JSON.stringify({ 721: metadata }))

  return {
    assets,
    metadata,
  }
}

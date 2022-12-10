import { PolicyId, utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { config } from '../config.ts'
import { createAssets } from './createAssets.ts'

export const createMetadata = (policyId: PolicyId) => {
  const inputAssets = createAssets()

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

  const encoder = new TextEncoder()
  const data = encoder.encode(JSON.stringify({ assets, metadata }, null, 2))

  Deno.writeFileSync(
    `${Deno.cwd()}/outputs/metadata/${config.collectionName
      .split(' ')
      .join('_')
      .toLowerCase()}_metadata.json`,
    data,
  )

  return {
    assets,
    metadata,
  }
}

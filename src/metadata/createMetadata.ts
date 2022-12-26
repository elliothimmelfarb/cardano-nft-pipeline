import { PolicyId, utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { config } from '../config.ts'
import { getCollectionFileName } from '../helpers/getCollectionFileName.ts'
import { readAssetsFile } from '../helpers/readAssetsFile.ts'

export const createMetadata = async (policyId: PolicyId) => {
  const { assets: inputAssets } = await readAssetsFile()

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
  const data = encoder.encode(
    JSON.stringify(
      { policyId, assets: Object.keys(assets), metadata },
      null,
      2,
    ),
  )

  Deno.writeFileSync(
    `${Deno.cwd()}/outputs/metadata/${getCollectionFileName()}_metadata.json`,
    data,
  )

  return {
    assets,
    metadata,
  }
}

import { utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { config } from '../config.ts'
import { readAssetsFile } from '../helpers/readAssetsFile.ts'
import { readPolicyFile } from '../helpers/readPolicyFile.ts'
import { writeCollectionDataToFile } from '../helpers/writeCollectionDataToFile.ts'

export const createMetadata = async () => {
  console.log('Creating metadata...')

  const { assets: inputAssets } = await readAssetsFile()
  const { policyId } = await readPolicyFile()

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

  await writeCollectionDataToFile('metadata.json', {
    policyId,
    assets: Object.keys(assets),
    metadata,
  })

  console.log('Metadata created!\n')
}

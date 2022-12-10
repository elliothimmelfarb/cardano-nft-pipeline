import exifr from 'npm:exifr'
import { config } from '../config.ts'

import { ipfs } from '../ipfs.ts'

const organizeMetadata = (metadata: any, ipfsHash: string) => {
  const promptParts = metadata.image.prompt[0].prompt
    .split(',')
    .reduce((out: { [key: string]: string }, part: string, index: number) => {
      return {
        ...out,
        [`prompt part ${index + 1}`]: part.trim(),
      }
    }, {})

  const out = {
    ...metadata,
    ...metadata.image,
    ...promptParts,
    'prompt parts count': Object.values(promptParts).length,
    mediaType: 'image/png',
    image: ipfsHash,
  }

  delete out.prompt
  delete out.init_image_path
  delete out.orig_hash

  return out
}

export const createAssets = async () => {
  const assets = []

  const dir = await Deno.readDirSync(Deno.cwd() + config.imagesPath)

  for (const dirEntry of dir) {
    if (dirEntry.name === '.gitkeep') continue

    const imagePath = `${Deno.cwd()}${config.imagesPath}/${dirEntry.name}`

    console.log('path:', imagePath)

    const buffer = await Deno.readFile(imagePath)

    const data = await exifr.parse(buffer)

    const metadata = JSON.parse(data['sd-metadata']) as Record<string, unknown>

    console.log(`Adding ${dirEntry.name} to IPFS...`)
    const added = await ipfs.add(imagePath)
    console.log('Added! Now pinning...')
    await ipfs.pin(added.ipfs_hash)
    console.log('Pinned!\n')

    const organizedMetadata = organizeMetadata(metadata, added.ipfs_hash)

    assets.push(organizedMetadata)
  }

  return assets as Record<string, unknown>[]
}

import exifr from 'npm:exifr'
import { config } from '../config.ts'

const organizeMetadata = (metadata: any) => {
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
    mediaType: 'image/png',
  }

  delete out.image
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

    const metadata = JSON.parse(data['sd-metadata'])

    const organizedMetadata = organizeMetadata(metadata)

    // upload to ipfs

    assets.push(organizedMetadata)
  }

  console.log(assets)
}

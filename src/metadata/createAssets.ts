import exifr from 'npm:exifr'
import { config } from '../config.ts'
import { ipfs } from '../ipfs.ts'
import { processors } from './processors/index.ts'

export const createAssets = async () => {
  const assets = []

  const dir = Deno.readDirSync(Deno.cwd() + config.imagesPath)

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

    const organizedMetadata = processors['invokeAI'](metadata, added.ipfs_hash)

    assets.push(organizedMetadata)
  }

  return assets as Record<string, unknown>[]
}

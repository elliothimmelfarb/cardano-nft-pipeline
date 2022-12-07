import exifr from 'npm:exifr'
import { config } from '../config.ts'

export const createAssets = async () => {
  const dir = await Deno.readDirSync(Deno.cwd() + config.imagesPath)

  for (const dirEntry of dir) {
    if (dirEntry.name === '.gitkeep') continue

    const path = Deno.cwd() + config.imagesPath + '/' + dirEntry.name

    console.log('path:', path)

    const buffer = await Deno.readFile(path)

    const data = await exifr.parse(buffer)

    console.log(JSON.parse(data['sd-metadata']))
  }
}

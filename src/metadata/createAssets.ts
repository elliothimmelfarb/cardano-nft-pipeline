import { config } from '../config.ts'

export const createAssets = async () => {
  const dir = await Deno.readDirSync(Deno.cwd() + config.imagesPath)

  for (const dirEntry of dir) {
    if (!dirEntry.name.includes('.png')) continue

    console.log(dirEntry.name)
  }
}

import { config } from '../config.ts'

export const createInputAssets = async () => {
  const dir = await Deno.readDirSync(Deno.cwd() + config.imagesPath)

  for await (const dirEntry of dir) {
    if (!dirEntry.name.includes('.png')) continue

    console.log(dirEntry.name)
  }
}

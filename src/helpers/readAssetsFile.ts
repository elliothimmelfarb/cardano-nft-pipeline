import { getCollectionFileName } from './getCollectionFileName.ts'

export const readAssetsFile = async () => {
  const fileContents = await Deno.readTextFile(
    `${Deno.cwd()}/outputs/metadata/${getCollectionFileName()}_assets.json`,
  )
  return JSON.parse(fileContents)
}

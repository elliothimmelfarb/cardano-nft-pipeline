import { getCollectionFileName } from './getCollectionFileName.ts'

export const readMetadataFile = async () => {
  const fileData = await Deno.readFile(
    `${Deno.cwd()}/outputs/metadata/${getCollectionFileName()}_metadata.json`,
  )
  return JSON.parse(new TextDecoder().decode(fileData))
}

import { getCollectionFileName } from './getCollectionFileName.ts'

export const writeCollectionDataToFile = async (
  folder: string,
  fileName: string,
  data: any,
) => {
  const encoder = new TextEncoder()
  const fileData = encoder.encode(JSON.stringify(data, null, 2))

  await Deno.writeFile(
    `${Deno.cwd()}/outputs/${folder}/${getCollectionFileName()}_${fileName}`,
    fileData,
  )
}

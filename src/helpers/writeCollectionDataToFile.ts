import { getCollectionFileName } from './getCollectionFileName.ts'

export const writeCollectionDataToFile = async (
  fileName: string,
  data: any,
) => {
  const encoder = new TextEncoder()
  const fileData = encoder.encode(JSON.stringify(data, null, 2))

  await Deno.writeFile(
    `${Deno.cwd()}/outputs/metadata/${getCollectionFileName()}_${fileName}`,
    fileData,
  )
}

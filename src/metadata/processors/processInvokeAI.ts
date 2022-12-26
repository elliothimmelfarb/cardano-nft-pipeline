export const processInvokeAI = (metadata: any, ipfsHash: string) => {
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

  out['traits count'] = Object.keys(out).length

  delete out.prompt
  delete out.init_image_path
  delete out.orig_hash

  const postprocessing = Object.entries(out.postprocessing[0]).reduce(
    (acc, entry) => {
      return {
        ...acc,
        [`postprocessing ${entry[0]}`]: entry[1],
      }
    },
    {},
  )

  delete out.postprocessing

  return {
    ...out,
    ...postprocessing,
  }
}

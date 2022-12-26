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

  // Handle postprocessing
  const postprocessing = Object.entries(out.postprocessing[0]).reduce(
    (acc, entry) => {
      return {
        ...acc,
        [`postprocessing ${entry[0]}`]: entry[1],
      }
    },
    {},
  )

  out['generated height'] = out.height
  out['generated width'] = out.width

  out.height = out.height * postprocessing['postprocessing scale']
  out.width = out.width * postprocessing['postprocessing scale']

  delete out.prompt
  delete out.init_image_path
  delete out.orig_hash
  delete out.variations
  delete out.postprocessing

  const finalOut = Object.entries({ ...out, ...postprocessing }).reduce(
    (acc, entry) => {
      return {
        ...acc,
        [entry[0]]: entry[1].toString(),
      }
    },
    {},
  )

  return finalOut
}

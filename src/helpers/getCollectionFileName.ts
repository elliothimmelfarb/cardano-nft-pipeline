import { config } from '../config.ts'

export const getCollectionFileName = () => {
  return config.collectionName.split(' ').join('_').toLowerCase()
}

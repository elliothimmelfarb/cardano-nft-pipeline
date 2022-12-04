import { Network } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import '../env.ts'

const projectId = Deno.env.get('BLOCKFROST_PROJECT_ID')

if (!projectId) {
  throw new Error('BLOCKFROST_PROJECT_ID not set in env.ts')
}

const idMatch = projectId.match(/(mainnet|testnet|preview|preprod)/i)

if (!idMatch) {
  console.log('projectId:', projectId)
  throw new Error('network not found in projectId')
}

const network = `${idMatch[0][0].toUpperCase()}${idMatch[0].slice(
  1,
)}` as Network

export const config = {
  // Blockfrost
  network,
  projectId,

  // Local
  inputFolder: '',

  // Collection
  collectionDescription:
    'Here is a beautiful description for this Testing Collection',
  collectionName: 'Testing Collection',
}

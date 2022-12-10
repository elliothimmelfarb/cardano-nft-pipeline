import Blockfrost from 'npm:@blockfrost/blockfrost-js'

const ipfsProjectId = Deno.env.get('BLOCKFROST_IPFS_PROJECT_ID')

if (!ipfsProjectId)
  throw new Error('Cannot find BLOCKFROST_IPFS_PROJECT_ID in `Deno.config`')

export const ipfs = new Blockfrost.BlockFrostIPFS({
  projectId: ipfsProjectId,
})

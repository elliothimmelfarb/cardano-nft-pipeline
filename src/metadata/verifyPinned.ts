import { ListResponse } from '../../../../Library/Caches/deno/npm/registry.npmjs.org/@blockfrost/blockfrost-js/5.1.0/lib/types/ipfs.d.ts'
import { config } from '../config.ts'
import { ipfs } from '../ipfs.ts'

export const verifyPinned = async () => {
  const { hashes } = JSON.parse(
    Deno.readTextFileSync(
      `${Deno.cwd()}/outputs/metadata/${config.collectionName
        .split(' ')
        .join('_')
        .toLowerCase()}_assets.json`,
    ),
  ) as { hashes: string[] }

  const pins = (await ipfs.list()) as unknown as ListResponse[]

  // create dictionary of hashes to state
  const hashState = pins.reduce((out, pin) => {
    return {
      ...out,
      [pin.ipfs_hash]: pin.state,
    }
  }, {} as Record<string, string>)

  console.log('Pinned States:', hashState)

  const unpinned = []

  for (const hash of hashes) {
    if (!hashState[hash] || hashState[hash] !== 'pinned') {
      console.log(`Hash ${hash} is not pinned!`)
      unpinned.push(hash)
    }
  }

  if (unpinned.length > 0) {
    console.log('Unpinned hashes:')
    console.log(unpinned)
  } else {
    console.log('All hashes are pinned!')
    console.log('You can now run the minting task!')
  }
}

verifyPinned()

import { ipfs } from '../ipfs.ts'

const listPinned = async () => {
  const pins = await ipfs.list()
  console.log(pins)
}

listPinned()

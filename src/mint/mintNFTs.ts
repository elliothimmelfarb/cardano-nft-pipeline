import { lucid } from '../lucid.ts'
import { mintingPolicy } from './mintingPolicy.ts'
import { createMetadata } from './createMetadata.ts'

export const mintNFTs = async () => {
  const policy = await mintingPolicy()

  const { assets, metadata } = createMetadata(policy.id)

  const tx = await lucid
    .newTx()
    .mintAssets(assets)
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policy.script)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('txHash:', txHash)
}

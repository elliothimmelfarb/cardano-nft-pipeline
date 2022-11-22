import { lucid } from '../lucid.ts'
import { mintingPolicy } from './mintingPolicy.ts'
import { createMetadata } from './createMetadata.ts'

export const mintNFTs = async () => {
  const { policyId, policyScript } = await mintingPolicy()

  const { assets, metadata } = createMetadata(policyId)

  const tx = await lucid
    .newTx()
    .mintAssets(assets)
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('txHash:', txHash)
}

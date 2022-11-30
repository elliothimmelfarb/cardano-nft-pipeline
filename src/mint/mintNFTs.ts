import { lucid } from '../lucid.ts'
import { mintingPolicy } from './mintingPolicy.ts'
import { createMetadata } from './createMetadata.ts'
import { mintRoyalties } from './mintRoyalties.ts'
import { waitForNextTransaction } from '../helpers/waitForNextTransaction.ts'

export const mintNFTs = async () => {
  const { policyId, policyScript } = await mintingPolicy()

  const { assets, metadata } = createMetadata(policyId)

  await mintRoyalties({ policyId, policyScript })

  const tx = await lucid
    .newTx()
    .mintAssets(assets)
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  await waitForNextTransaction('NFTs mint', txHash)
}

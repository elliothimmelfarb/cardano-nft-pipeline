import { lucid } from '../cadrano.ts'
import { waitForNextTransaction } from '../helpers/waitForNextTransaction.ts'
import { createMetadata } from './createMetadata.ts'
import { createMintingPolicy } from './createMintingPolicy.ts'
import { mintRoyaltiesNFT } from './mintRoyaltiesNFT.ts'

export const mintNFTs = async () => {
  const { policyId, policyScript } = await createMintingPolicy()

  const { assets, metadata } = createMetadata(policyId)

  await mintRoyaltiesNFT({ policyId, policyScript })

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

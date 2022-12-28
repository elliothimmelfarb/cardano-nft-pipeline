import { lucid } from '../cardano.ts'
import { readMetadataFile } from '../helpers/readMetadataFile.ts'
import { readPolicyFile } from '../helpers/readPolicyFile.ts'
import { waitForTransaction } from '../helpers/waitForTransaction.ts'

export const mintNFTCollection = async () => {
  const { policyScript } = await readPolicyFile()

  const { assets, metadata } = await readMetadataFile()

  const mintableAssets = assets.reduce((acc, asset) => {
    return {
      ...acc,
      [asset]: 1n,
    }
  }, {})

  console.log('Minting NFTs...')

  const tx = await lucid
    .newTx()
    .mintAssets(mintableAssets)
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  await waitForTransaction('NFTs mint', txHash)
}

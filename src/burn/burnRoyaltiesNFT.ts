import { lucid } from '../cardano.ts'
import { readPolicyFile } from '../helpers/readPolicyFile.ts'
import { waitForTransaction } from '../helpers/waitForTransaction.ts'

export async function burnRoyaltiesNFT() {
  console.log('Burning royalties NFT...')

  const { policyId, policyScript } = await readPolicyFile()

  const tx = await lucid
    .newTx()
    .mintAssets({ [policyId]: -1n })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  await waitForTransaction('royalties burn', txHash)
}

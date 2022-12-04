import { TxHash } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { lucid } from '../cardano.ts'
import { createMintingPolicy } from '../mint/createMintingPolicy.ts'

export async function burnRoyaltiesNFT(
  policy: Awaited<ReturnType<typeof createMintingPolicy>>,
): Promise<TxHash> {
  const { policyId, policyScript } = policy

  const tx = await lucid
    .newTx()
    .mintAssets({ [policyId]: -1n })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  return txHash
}

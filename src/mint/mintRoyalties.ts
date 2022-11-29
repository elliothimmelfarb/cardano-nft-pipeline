import { PolicyId, Script } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { lucid } from '../lucid.ts'
import { getWallet } from '../wallet/getWallet.ts'

export const mintRoyalties = async ({
  policyId,
  policyScript,
}: {
  policyId: PolicyId
  policyScript: Script
}) => {
  const walletAddress = await getWallet().rewardAddress()

  console.log('walletAddress:', walletAddress)

  const tx = await lucid
    .newTx()
    .mintAssets({ [policyId]: 1n })
    .attachMetadata(777, { rate: '0.03', addr: walletAddress })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('Royalties txHash:', txHash)
}

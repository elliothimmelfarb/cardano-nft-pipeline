import { PolicyId, Script } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { burnRoyaltiesNFT } from '../burn/burnRoyaltiesNFT.ts'
import { lucid } from '../cadrano.ts'
import { waitForNextTransaction } from '../helpers/waitForNextTransaction.ts'
import { getWallet } from '../wallet/getWallet.ts'

/**
 * Takes the minting policy parts and mints and burns an unnamed NFT with royalties data.
 */
export const mintRoyaltiesNFT = async ({
  policyId,
  policyScript,
}: {
  policyId: PolicyId
  policyScript: Script
}) => {
  const walletAddress = await getWallet().rewardAddress()

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

  await waitForNextTransaction('royalties mint', txHash)

  const burnTxHash = await burnRoyaltiesNFT({
    policyId,
    policyScript,
  })

  await waitForNextTransaction('royalties burn', burnTxHash)
}

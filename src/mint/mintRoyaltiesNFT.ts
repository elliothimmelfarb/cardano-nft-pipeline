import { PolicyId, Script } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { burnRoyaltiesNFT } from '../burn/burnRoyaltiesNFT.ts'
import { lucid } from '../cardano.ts'
import { config } from '../config.ts'
import { waitForTransaction } from '../helpers/waitForTransaction.ts'
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
    .attachMetadata(777, { ...config.royalties, addr: walletAddress })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policyScript)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('Royalties txHash:', txHash)

  await waitForTransaction('royalties mint', txHash)

  const burnTxHash = await burnRoyaltiesNFT({
    policyId,
    policyScript,
  })

  await waitForTransaction('royalties burn', burnTxHash)
}

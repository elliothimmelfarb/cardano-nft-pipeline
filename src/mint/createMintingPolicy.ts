import { MintingPolicy, PolicyId } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { lucid } from '../cardano.ts'
import { writeCollectionDataToFile } from '../helpers/writeCollectionDataToFile.ts'
import { getWallet } from '../wallet/getWallet.ts'

export const createMintingPolicy = async () => {
  console.log('Creating minting policy...')

  const wallet = getWallet()

  const { paymentCredential } = lucid.utils.getAddressDetails(
    await wallet.address(),
  )

  const script: MintingPolicy = lucid.utils.nativeScriptFromJson({
    type: 'all',
    scripts: [
      { type: 'sig', keyHash: paymentCredential?.hash! },
      {
        type: 'before',
        slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
      },
    ],
  })

  const policyId: PolicyId = lucid.utils.mintingPolicyToId(script)

  const data = {
    policyScript: script,
    policyId: policyId,
  }

  await writeCollectionDataToFile('metadata', 'policy.json', data)

  console.log('Minting policy created!\n')
}

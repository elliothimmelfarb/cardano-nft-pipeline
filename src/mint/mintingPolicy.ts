import { MintingPolicy, PolicyId } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { lucid } from '../lucid.ts'
import { getWallet } from '../wallet/getWallet.ts'

export const mintingPolicy = async () => {
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

  return {
    script: script,
    id: policyId,
  }
}

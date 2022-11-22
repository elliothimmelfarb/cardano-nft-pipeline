import {
  MintingPolicy,
  PolicyId,
  Unit,
  utf8ToHex,
} from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { getWallet } from './getWallet.ts'
import { lucid } from './lucid.ts'

export const mintSimpleNFT = async (name: string) => {
  const wallet = getWallet()

  if (!wallet) return console.error('no wallet found')

  const { paymentCredential } = lucid.utils.getAddressDetails(
    await wallet.address(),
  )

  const mintingPolicy: MintingPolicy = lucid.utils.nativeScriptFromJson({
    type: 'all',
    scripts: [
      { type: 'sig', keyHash: paymentCredential?.hash! },
      {
        type: 'before',
        slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
      },
    ],
  })

  const policyId: PolicyId = lucid.utils.mintingPolicyToId(mintingPolicy)

  const unit: Unit = policyId + utf8ToHex(name)

  const metadata = {
    [policyId]: {
      Howdy: {
        name: 'Howdy1',
        description: '<optional>',
        sha256: '<required>',
        type: 'svg',
        image: 'https://developers.cardano.org/img/cardano-white.svg',
        location: {
          ipfs: '<required>',
          https: '<optional>',
          arweave: '<optional>',
        },
      },
    },
  }

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: 1n })
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('txHash:', txHash)
}

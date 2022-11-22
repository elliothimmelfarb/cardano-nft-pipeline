import { Unit, utf8ToHex } from 'https://deno.land/x/lucid@0.7.6/mod.ts'
import { getWallet } from '../wallet/getWallet.ts'
import { lucid } from '../lucid.ts'
import { mintingPolicy } from './mintingPolicy.ts'

export const mintNFTs = async (name: string) => {
  const wallet = getWallet()

  if (!wallet) return console.error('no wallet found')

  const policy = await mintingPolicy()

  const metadata = {
    [policy.id]: {
      [name]: {
        name: name,
        description: 'An NFT minted by Lucid',
        mediaType: 'image/svg',
        files: [
          {
            mediaType: 'image/svg',
            name: name,
            src: 'https://developers.cardano.org/img/cardano-white.svg',
          },
        ],
        image: 'https://developers.cardano.org/img/cardano-white.svg',
      },
      [name + '2']: {
        name: name + '2',
        description: 'An NFT minted by Lucid',
        mediaType: 'image/svg',
        files: [
          {
            mediaType: 'image/svg',
            name: name + '2',
            src: 'https://developers.cardano.org/img/cardano-white.svg',
          },
        ],
        image: 'https://developers.cardano.org/img/cardano-white.svg',
      },
    },
    version: '1.0',
  }

  console.log('metadata:', JSON.stringify(metadata))

  // const unit: Unit = policyId + utf8ToHex(name)

  const tx = await lucid
    .newTx()
    .mintAssets({
      [policy.id + utf8ToHex(name)]: 1n,
      [policy.id + utf8ToHex(name + 2)]: 1n,
    })
    .attachMetadata(721, metadata)
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(policy.script)
    .complete()

  const signedTx = await tx.sign().complete()

  const txHash = await signedTx.submit()

  console.log('txHash:', txHash)
}

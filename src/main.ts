import '../env.ts'
import { getWalletAddress } from './wallet/getWalletAddress.ts'
import { mintNFTs } from './mint/mintNFTs.ts'

// createNewWallet()
getWalletAddress()
// getWalletUtxos()
mintNFTs('Howdy')

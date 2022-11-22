import '../env.ts'
import { getWalletAddress } from './wallet/getWalletAddress.ts'
import { mintNFT } from './mint/mintNFT.ts'

// createNewWallet()
getWalletAddress()
// getWalletUtxos()
mintNFT('Howdy')

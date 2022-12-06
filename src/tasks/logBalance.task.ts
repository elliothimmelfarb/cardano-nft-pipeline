import { getWalletAdaBalance } from '../wallet/getWalletBalance.ts'

getWalletAdaBalance().then((balance) => {
  console.log('Balance: ', balance)
})

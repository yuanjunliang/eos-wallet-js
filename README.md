# eos-wallet-js

Api

- connect(callback)
- getIdentity(callback)
- forgetIdentity(callback)
- transfer(from,to,count,memo,callback)


Useage

```
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'api-kylin.eosasia.one',
    port:443,
    chainId:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}
import EOSWallet from 'eos-wallet-js'

// walletType: scatter 、 tokenpacket 、 meetone
const Wallet = new EOSWallet(network,walletType)

// connect to wallet
Wallet.connect((connected)=>{
	console.log(connected)
})

// getIdentity
Wallet.getIdentity((account)=>{
	console.log(account)
})

// transfer
Wallet.transfer(from,to,count,memo,(error,response)=>{
	console.log(response)
})
```
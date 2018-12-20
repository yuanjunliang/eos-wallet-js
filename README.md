# eos-wallet-js

Api

- connect((connected)=>{})
- getIdentity((error,account)=>{})
- forgetIdentity()
- getBalance(accountName,(error,response)=>{})
- transfer(from,to,count,memo,(error,response)=>{})

Useage

```
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'api-kylin.eosasia.one',
    port:443,
    chainId:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

const config = {
    walletType:"scatter",   // required:false default:scatter values: scatter、tokenpacket、meetone   
    dappName:"dapp",        // required:true
    initTimeout:5000,       // required:false default:5000 connect to scatter timeout
}

import EOSWallet from 'eos-wallet-js'

// walletType: scatter 、 tokenpacket 、 meetone
const Wallet = new EOSWallet(network,config)

// connect to wallet
Wallet.connect((connected)=>{
	console.log(connected)
})

// getIdentity
Wallet.getIdentity((error,account)=>{
	console.log(error,account)
})

// forgetIdentity
Wallet.forgetIdentity()

// get balance
Wallet.getBalance(accountName,(error,response)=>{
    console.log(error,response)
})

// transfer
Wallet.transfer(from,to,count,memo,(error,response)=>{
	console.log(error,response)
})
```
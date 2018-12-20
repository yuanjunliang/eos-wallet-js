import EOSWallet from '../lib/index'

const network = {
    blockchain:'eos',
    protocol:'https',
    host:'api-kylin.eosasia.one',
    port:443,
    chainId:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
}

const config = {
    walletType:"scatter",
    initTimeout:5000,
    dappName:"dapp"
}

export default class Test{
    constructor(){
        this.Wallet = new EOSWallet(network,config)
    }

    getBalance(){
        this.Wallet.getBalance("luckydiceuse",(error,response)=>{
            console.log({error,response})
        })
    }
}
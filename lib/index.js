
import ScatterWallet from './scatter'
class Wallet {
    init(network,walletType = 'scatter'){
        this.network = network
        this.walletType = walletType
        
        switch(walletType){
            case 'sactter':
                this.wallet = new ScatterWallet(network)
                return
        }
    }
}


// connect
function connect(callback){
    if(callback){
        this.wallet.connect((connected)=>{
            callback(connected)
        })
    }{
        return this.wallet.connect(connected=>connected)
    }
}

// transaction
function transfer(from,to,count,memo,callback){
    if(callback){
        this.wallet.transfer(from,to,count,memo,(error,result)=>{
            callback(error,result)
        })
    }else{
        return this.wallet.transfer(from,to,count,memo)
    }
}

// get balance
function getBalance(){

}

// get account info
function getAccountInfo(){

}

// get wallet list
function getWalletList(){

}
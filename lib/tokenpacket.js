import BaseWallet from './BaseWallet'
const tp = require('tp-eosjs')
const tokens = ["","eth","Jingtum","MOAC","EOS","ENU"]

export default class TokenPacketWallet extends BaseWallet{
    constructor(network,config){
        super(network,config)
        this.accountName = ""
        this.address = ""
        this.blockchain_id = 4
    }

    connect(callback){
        if(typeof callback === 'function'){
            callback(tp.isConnected)
        }else{
            return tp.isConnected
        }
    }

    getIdentity(callback){
        let _this = this
        if(typeof callback === 'function'){
            tp.getCurrentWallet().then(response=>{
                if(response && response.result){
                    let data = response.data
                    _this.accountName = data.name
                    _this.address = data.address
                    _this.blockchain_id = data.blockchain_id
                    let accountInfo = {
                        name:data.name,
                        blockchain:chains[data.blockchain_id],
                        authority:"active"
                    }
                    callback(null,accountInfo)
                }
            }).catch(error=>{
                callback(error,null)
            })
        }else{
            return tp.getCurrentWallet().then(response=>{
                if(response && response.result){
                    let data = response.data
                    _this.accountName = data.name
                    _this.address = data.address
                    _this.blockchain_id = data.blockchain_id
                    let accountInfo = {
                        name:data.name,
                        blockchain:chains[data.blockchain_id],
                        authority:"active"
                    }
                    return accountInfo
                }
            })
        }
    }

    forgetIdentity(){
        this.accountName = ""
        this.address = ""
        this.blockchain_id = 0
    }

    transfer(from,to,count,memo,callback){
        let params = {
            from:from,
            to:to,
            amount:parseFloat(count).toFixed(4) + ' EOS',
            tokenName:tokens[this.blockchain_id],
            precision:4,
            contract:'eosio.token',
            memo:memo,
            address:this.address
        }

        if(typeof callback === 'function'){
            tp.eosTokenTransfer(params)
            .then(response=>{
                callback(null,response)
            })
            .catch(error=>{
                callback(error,null)
            })
        }else{
            return tp.eosTokenTransfer(params)
        }
    }
}
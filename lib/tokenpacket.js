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
            callback(tp.isConnected())
        }else{
            return tp.isConnected()
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
                        blockchain:tokens[data.blockchain_id],
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
                        blockchain:tokens[data.blockchain_id],
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

    transfer(params,callback){
        let {from,to,count,memo,precision} = params
        if(typeof precision == 'undefined'){
            precision = 4
        }

        let newParams = {
            from:from,
            to:to,
            amount:parseFloat(count).toFixed(precision),
            tokenName:tokens[this.blockchain_id],
            precision:precision,
            contract:'eosio.token',
            memo:memo,
            address:this.address
        }

        if(typeof callback === 'function'){
            tp.eosTokenTransfer(newParams)
            .then(response=>{
                callback(null,response)
            })
            .catch(error=>{
                callback(error,null)
            })
        }else{
            return tp.eosTokenTransfer(newParams)
        }
    }

    pushTransaction(params,callback){

    }
}
import BaseWallet from './BaseWallet'
import MeetBridge from 'meet-bridge'
const Bridge = new MeetBridge()

export default class MeetOne extends BaseWallet{
    constructor(network,config){
        super(network,config)
    }

    connect(callback){
        if(typeof callback === 'function'){
            callback(true)
        }else{
            return true
        }
    }

    getIdentity(callback){
       if (typeof callback === 'function'){
            Bridge.invokeAuthorizeInWeb()
            .then(response=>{
                if(response && response.code == 0){
                    let accountInfo = {
                        name:response.data.account,
                        blockchain:"EOS",
                        authority:"active"
                    }
                    callback(null,accountInfo)
                }else{
                    callback(true,response)
                }
            })
            .catch(error=>{
                callback(error,null)
            })
       }else{
           return Bridge.invokeAuthorizeInWeb().then(response=>response)
       }
    }

    forgetIdentity(){

    }

    transfer(params,callback){
        let {from,to,count,memo,precision} = params
        if(typeof precision == 'undefined'){
            precision = 4
        }

        let newParams = {
            to,
            amount:parseFloat(count).toFixed(precision),
            tokenName:"EOS",
            tokenContract:"eosio.token",
            tokenPrecision:precision,
            memo:memo,
            orderInfo:""
        }
        if(typeof callback === 'function'){
            Bridge.invokeTransfer(newParams)
                .then(response=>{
                    if(response && response.code == 0){
                        callback(null,response)
                    }else{
                        callback(true,response)
                    }
                }).catch(error=>{
                    callback(error,null)
                })
        }else{
            return Bridge.invokeTransfer(newParams).then(response=>response)
        }
    }

    pushTransaction(params,callback){

    }
}








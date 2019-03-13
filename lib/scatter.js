import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import BaseWallet from './BaseWallet'

// tell ScatterJS which plugins you are using
ScatterJS.plugins(new ScatterEOS());
const scatter = ScatterJS.scatter
const eosOptions = { expireInSeconds:60 };

export default class ScatterWallet extends BaseWallet{
    constructor(network,config){
        super(network,config)
        this.network = network
        this.connected = false
        this.scatter = scatter
        this.account = null
        this.eos = scatter.eos(network, Eos, eosOptions)
        this.transactionOptions = null
    }

    // connect to scatter
    connect(callback){
        let appName = this.config.dappName
        if(typeof callback === 'function'){
            if(this.connected){
                callback(true)
                return
            }
            ScatterJS.scatter.connect(appName).then(connected=>{
                this.connected = connected
                callback(connected)
            })
        }else{
            return this.connected ? this.connected : ScatterJS.scatter.connect(appName).then(connected=>{
                this.connected = connected
                return connected
            })
        }
    }

    // get account info
    getIdentity(callback){
        let _this = this
        if(!this.connected){
            console.error("please connect scatter first");
            return
        }
        const scatter = ScatterJS.scatter
        this.scatter = scatter
        const requiredFields = {accounts:[this.network]};
        if(typeof callback === 'function'){
            scatter.getIdentity(requiredFields).then((response)=>{
                const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
                _this.eos = scatter.eos(_this.network, Eos, eosOptions);
                _this.transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
                _this.account = account
                
                _this.prototype = _this.eos
                callback(null,account)
            }).catch(error=>{
                callback(error,null)
            })
        }else{
            return this.scatter.getIdentity(requiredFields).then(()=>{
                const account = _this.scatter.identity.accounts.find(x => x.blockchain === 'eos')
                _this.eos = _this.scatter.eos(_this.network, Eos, eosOptions);
                _this.transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
                _this.account = account
                return account
            })
        }
    }

    // get account info
    getAccount(accountName,callback){
        if(typeof callback == 'function'){
            this.eos.getAccount(accountName)
                .then(response=>{
                    console.log({response})
                    callback(null,response)
                })
                .catch(error=>{
                    callback(error,null)
                })
        }else{
            return this.eos.getAccount(accountName)
        }
    }

    // get current balance
    getBalance(params,callback){
        let defaultParam = {
            code:"eosio.token",
            symbol:"EOS"
        }

        let p = Object.assign(defaultParam,params)
        if(typeof callback == 'function'){
            this.eos.getCurrencyBalance(p.code,p.accountName,p.symbol)
            .then(response=>{
                callback(null,response)
            })
            .catch(error=>{
                callback(error,null)
            })
        }else{
            return this.eos.getCurrencyBalance(p.code,p.accountName,p.symbol)
        }
    }

    // forget account info
    forgetIdentity(){
        if(this.scatter){
            this.scatter.forgetIdentity()
            // this.scatter = null
            this.account = null
            // this.eos = null
            this.transactionOptions = null
        }
    }

    // transaction
    transfer(params,callback){
        if(!this.eos){
            console.error('please get identity first')
            return
        }

        let {from,to,count,memo,precision} = params
        if(typeof precision == 'undefined'){
            precision = 4
        }

        if(typeof callback === 'function'){
            this.eos.transfer(from,to,parseFloat(count).toFixed(precision) + ' EOS',memo,this.transactionOptions).then(trx=>{
                callback(null,trx)
            }).catch(error=>{
                callback(error,null)
            })
        }else{
            return this.eos.transfer(from,to,parseFloat(count).toFixed(precision) + ' EOS',memo,this.transactionOptions)
        }
    }

    // push eos action transaction
    pushTransaction(params,callback){
        if(typeof callback === 'function'){
            this.eos.transaction(...params)
                .then(response=>{
                    callback(null,response)
                }).catch(error=>{
                    callback(error,null)
                })
        }else{
            return this.eos.transaction(...params)
        } 
    }
}
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

// tell ScatterJS which plugins you are using
ScatterJS.plugins(new ScatterEOS());

const eosOptions = { expireInSeconds:60 };

export default class ScatterWallet{
    constructor(network){
        this.network = network
        this.connected = false
        this.scatter = null
        this.account = null
        this.eos = null
        this.transactionOptions = null
    }

    // connect to scatter
    connect(callback){
        ScatterJS.scatter.connect().then(connected=>{
            this.connected = connected
            if(callback){
                callback(connected)
            } else {
                return connected
            }
        })
    }

    getIdentity(callback){
        let _this = this
        if(!this.connected){
            console.error("please connect scatter first");
            return
        }
        const scatter = ScatterJS.scatter
        this.scatter = scatter
        const requiredFields = {accounts:[this.network]};
        if(callback){
            scatter.getIdentity(requiredFields).then((response)=>{
                const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
                _this.eos = scatter.eos(_this.network, Eos, eosOptions);
                _this.transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
                _this.account = account
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

    forgetIdentity(){
        if(this.scatter){
            this.scatter.forgetIdentity()
            this.account = null
            this.eos = null
            this.transactionOptions = null
        }
    }

    transfer(from,to,count,memo,callback){
        if(!this.eos){
            console.error('please get identity first')
            return
        }

        if(callback){
            this.eos.transfer(from,to,count + 'EOS',memo,this.transactionOptions).then(trx=>{
                callback(null,trx)
            }).catch(error=>{
                callback(error,null)
            })
        }else{
            return this.eos.transfer(from,to,count+'EOS',memo,this.transactionOptions)
        }
    }
}


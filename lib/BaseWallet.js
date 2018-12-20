import HttpTool from '../tool/HttpTool'

export default class BaseWallet{
    constructor(network,config){
        this.network = network
        this.config = config
        this.HttpTool = new HttpTool(network)
    }
    
    // get balance
    getBalance(accountName,callback){
        let url = '/chain/get_currency_balance'
        let params = {
            code:"eosio.token",
            account:accountName,
            symbol:"EOS"
        }
        if(callback){
            this.HttpTool.post(url,params)
                .then(response=>{
                    callback(null,response)
                }).catch(error=>{
                    callback(error,null)
                })
        }else{
            return this.HttpTool.post(url,params)
        }
    }
}
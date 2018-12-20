
import ScatterWallet from './scatter'
export default class Wallet {
    constructor(network,walletType = 'scatter'){
        this.network = network
        this.walletType = walletType
        
        switch(walletType){
            case 'sactter':
                return new ScatterWallet(network)
            default:
                return new ScatterWallet(network)
        }
    }
}

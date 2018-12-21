import ScatterWallet from './scatter'
import TokenPacket from './TokenPacket'

const defaultConfig = {
    walletType:"scatter",
    initTimeout:5000,
    dappName:"dapp"
}
export default class Wallet {
    constructor(network,config = defaultConfig){
        switch(config.walletType){
            case 'sactter':
                return new ScatterWallet(network,config)
            case "tokenpacket":
                return new TokenPacket(network,config)
            default:
                return new ScatterWallet(network,config)
        }
    }
}

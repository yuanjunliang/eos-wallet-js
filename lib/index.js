import ScatterWallet from './Scatter'
import TokenPacket from './TokenPacket'
import MeetOne from './MeetOne'

const defaultConfig = {
    walletType:"scatter",
    initTimeout:5000,
    dappName:"MyDapp"
}

export default (network,config = defaultConfig)=>{
    config = Object.assign(defaultConfig,config)
    switch(config.walletType){
        case 'sactter':
            return new ScatterWallet(network,config)
        case "tokenpacket":
            return new TokenPacket(network,config)
        case "meetone":
            return new MeetOne(network,config)
        default:
            return new ScatterWallet(network,config)
    }
}



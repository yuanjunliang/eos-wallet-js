export default {
    network:{
        blockchain:'eos',
        protocol:'https',
        host:'api-kylin.eosasia.one',
        port:443,
        chainId:"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
    },
    walletConfig:{
        walletType:"scatter",   // required:false default:scatter values: scatter、tokenpacket、meetone   
        dappName:"dapp",        // required:true
        initTimeout:5000,       // required:false default:5000 connect to scatter timeout
    },
    to:"eoschessdice"
}
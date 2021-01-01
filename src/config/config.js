export default {
    baseUrl:"https://api.eosbeijing.one",
    network:{
        blockchain:'eos',
        protocol:'https',
        host:'api.eosbeijing.one',
        port:443,
        chainId:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
    },
    walletConfig:{
        walletType:"scatter",   // required:false default:scatter values: scatter、tokenpacket、meetone   
        dappName:"mydapp",        // required:true
        initTimeout:1000,       // required:false default:5000 connect to scatter timeout
        to:"yuanjunliang"
    }
}

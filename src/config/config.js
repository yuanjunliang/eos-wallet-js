// export default {
//     baseUrl:"https://api.eosbeijing.one",
//     network:{
//         blockchain:'eos',
//         protocol:'https',
//         host:'api.eosbeijing.one',
//         port:443,
//         chainId:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
//     },
//     walletConfig:{
//         walletType:"scatter",   // required:false default:scatter values: scatter、tokenpacket、meetone   
//         dappName:"mydapp",        // required:true
//         initTimeout:1000,       // required:false default:5000 connect to scatter timeout
//         to:"yuanjunliang"
//     }
// }

export default {
    baseUrl:"http://api-kylin.eosasia.one",
    network:{
        blockchain:'eos',
        host:'api-kylin.eosasia.one',
        port:443,
        protocol:'https',
        chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
    },
    walletConfig:{
        baseUrl:"https://www.chessdice.one/v1",
        walletType:"scatter",   // required:false default:scatter values: scatter、tokenpacket、meetone   
        dappName:"chessdice",        // required:true
        initTimeout:5000,       // required:false default:5000 connect to scatter timeout
        to:"eoschessdice"
    },
    socketUrl:"https://chessdice.one"
}

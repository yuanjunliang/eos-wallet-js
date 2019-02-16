[TOC]

# eos-wallet-js

## 简介

`eos-wallet-js`是一个适配了多款钱包的`JS-SDK`,为了方便DApp开发者快速开发DApp并上线多款主流钱包，本项目采用统一的API接口。

**目前已经对接的钱包应用包括: Scatter、TokenPacket、MeetOne、麦子钱包、比特派、EOSToken**

未来我们希望能够将本项目做成一套通用的标准协议，正在与各大钱包厂商协商

如果您的钱包项目愿意添加到本项目中，请联系我们:

微信: 
<div align="center">
    <img src="https://github.com/yuanjunliang/eos-wallet-js/blob/master/doc/wechat.jpeg?raw=true" width="200px">
</div>

telegram: [https://t.me/eoswalletjs](https://t.me/eoswalletjs)

## 示例程序

**注意**

如果在chrome浏览器打开，请先配置好[Scatter钱包 chrome插件](https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle)的主网信息为:`api.eosbeijing.one`节点的信息


```
git clone https://github.com/yuanjunliang/eos-wallet-js.git
cd eos-wallet-js
git checkout -b test origin/test
yarn install
npm start
```

## API接口

Api

- connect((connected)=>{})
- getIdentity((error,account)=>{})
- forgetIdentity()
- getBalance(accountName,(error,response)=>{})
- transfer(params,(error,response)=>{})

## 用法

- 安装钱包

```
npm install eos-wallet-js --save
或
yarn add eos-wallet-js
```

- 使用

```
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'api.eosbeijing.one',
    port:443,
    chainId:"aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
}

const config = {
    dappName:"dapp",        // required:true
    initTimeout:5000,       // required:false default:5000 connect to scatter timeout
    to:"yuanjunliang"
}

import EOSWallet from 'eos-wallet-js'
// create wallet
const Wallet = EOSWallet(network,config)
```

- 通用接口

```
// connect to wallet
Wallet.connect((connected)=>{})

// getIdentity
Wallet.getIdentity((error,account)=>{
	console.log(error,account)
})

// forgetIdentity
Wallet.forgetIdentity()

// get balance
Wallet.getBalance(accountName,(error,response)=>{
    console.log(error,response)
})

// get account
Wallet.getAccount(accountName,(error,response)=>{})

// transfer
let params = {
    from: string,
    to: string,
    count: number|string,
    precision: number|string,  // default:4
    memo: string
}
Wallet.transfer(params,(error,response)=>{
	console.log(error,response)
})
```
[TOC]

# eos-wallet-js

## 简介

`eos-wallet-js`是一个适配了多款钱包的`JS-SDK`,为了方便DApp开发者快速开发DApp并上线多款主流钱包，本项目采用统一的API接口。

**目前已经兼容的钱包应用包括: Scatter、TokenPacket、MeetOne、麦子钱包、比特派、EOSToken**

## 示例程序

使用前请先安装[Scatter钱包](https://get-scatter.com/),并配置好节点和账号信息


```
git clone https://github.com/yuanjunliang/eos-wallet-js.git
cd eos-wallet-js
git checkout -b test origin/test
yarn install
npm start
```

## API接口

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

**注:**

**以下所有接口都支持Promise和async/await的方式调用**

- connect

```
// connect to wallet
Wallet.connect((connected)=>{})
```

- getIdentity

```
// get account identity
Wallet.getIdentity((error,account)=>{
	console.log(error,account)
})
```

- forgetIdentity

```
// forget account identity
Wallet.forgetIdentity()
```

- getBalance

```
// get account current balance
let params = {
    accountName:"",
    code:"",    // default "eosio.token"
    symbol:""   // default "EOS"
}
Wallet.getBalance(params,(error,response)=>{})
```

- getAccount

```
// get account info
Wallet.getAccount(accountName,(error,response)=>{})
```

- transfer

```
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

- pushTransaction

```
// pushTransaction : call contract method
// 该方法用于调用一些智能合约接口
let action = {
    actions: [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: 'useraaaaaaaa',
        permission: 'active',
      }],
      data: {
        from: 'useraaaaaaaa',
        to: 'useraaaaaaab',
        quantity: '0.0001 SYS',
        memo: '',
      },
    }]
}

let blocksBehind = {
    blocksBehind: 3,
    expireSeconds: 30,
}

let params = [action,blocksBehind]
Wallet.pushTransaction(params,(error,response)=>{})
```

- eosjs api

```
// 其他eosjs api方法,查看eos模块
Wallet.eos
```

eosjs api 接口调用方法请参考:https://eosio.github.io/eosjs/
import React,{PureComponent} from 'react'
import config from '../../config/config'
import {Button} from 'antd'
import EOSWallet from 'eos-wallet-js'
import HttpTool from '../../tools/HttpTool'

const Http = new HttpTool({baseUrl:config.baseUrl})

const Wallet = new EOSWallet(config.network,config.walletConfig)

export default class JLHome extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            account:null,
            connected:false
        }
    }

    getChainID(){
        Http.getFORM("/v1/chain/get_info")
            .then(response=>{
                console.log({response})
                alert(JSON.stringify(response))
            })
            .catch(error=>{
                console.log({error})
            })
    }

    connect(){
        let _this = this
        Wallet.connect((connected)=>{
            console.log("connected",connected)
            alert(JSON.stringify({connected}))
            _this.setState({connected})
        })
    }

    getIdentity(){
        let _this = this
        Wallet.getIdentity((error,account)=>{
            if(error){
                console.log({error})
            }else{
                _this.setState({account})
            }
            alert(JSON.stringify({error,account}))
        })
    }

    forgetIdentity(){
        Wallet.forgetIdentity()
    }

    getBalance(){
        Wallet.getBalance({accountName:this.state.account.name},(error,response)=>{
            console.log(error,response)
            alert(JSON.stringify({error,response}))
        })        
    }

    async transfer(){
        let _this = this
        
        if(!this.state.connected){
            await Wallet.connect()
        }

        let account = await Wallet.getIdentity()
        if(!account.name){
            alert("get identity failed")
            return
        }
        this.setState({account})

        let params = {
            from:account.name,
            to:config.walletConfig.to,
            count:"1.0000",
            memo:"test eos-wallet-js"
        }

        Wallet.transfer(params,(error,response)=>{
            console.log({error,response})
            alert(JSON.stringify({error,response}))
        })
    }

    getAccount(){
        Wallet.getAccount(this.state.account.name,(error,response)=>{
            console.log(error,response)
            alert(JSON.stringify({error,response}))
        })
    }

    render(){
        return(
            <div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.getChainID()}}>getChainID</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.connect()}}>connect</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.getIdentity()}}>getIdentity</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.forgetIdentity()}}>forgetIdentity</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.getBalance()}}>getBalance</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.transfer()}}>transfer</Button></div>
                <div style={styles.buttonStyle}><Button type="primary" onClick={()=>{this.getAccount()}}>getAccount</Button></div>
            </div>
        )
    }
}


const styles = {
    buttonStyle:{margin:30}
}
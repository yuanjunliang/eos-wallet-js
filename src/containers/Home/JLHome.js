import React,{PureComponent} from 'react'
import {getQueryVariable} from '../../common/common'

export default class JLHome extends PureComponent{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        let code = getQueryVariable("code")
        console.log(code)
        this.regist(code)
    }

    regist(code){
        console.log({window})
        let HttpTool = window.HttpTool
        let url = '/user/user_regist'
        let params = {
            code
        }
        HttpTool.post(url,params)
            .then(response=>{
                console.log({response})
            })
            .catch(error=>{
                console.log({error})
            })
    }

    render(){
        return(
            <div>
                <a href="https://github.com/login/oauth/authorize?client_id=54b6dbe3fc033def7165&redirect_uri=http://test.dappclub.cc:8080">GitHub登录</a>
            </div>
        )
    }
}
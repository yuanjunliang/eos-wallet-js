import React,{PureComponent} from 'react'
import config from '../config/config'
import HttpTool from '../tools/HttpTool'
import JLHome from './Home/JLHome'

window.HttpTool = new HttpTool(config)

export default class JLMain extends PureComponent{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <JLHome/>
        )
    }
}
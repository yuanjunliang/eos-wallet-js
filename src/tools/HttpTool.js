export default class HttpTool{
    constructor(config){
        this.baseUrl = config.baseUrl
    }

    post(url,params){
        url = this.baseUrl + url
        return fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(params)
        }).then(response=>response.json())
        .catch(error=>error)
    }

    get(url,params){
        url = this.baseUrl + url + this.getUrl(params)
        return fetch(url,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
            }
        }).then(response=>response.json())
        .catch(error=>error)
    }

    getUrl(params){
        let str = '';
        if (typeof params === 'object' && params) {
            str += '?';
            for (let key in params) {
                str += key + '=' + params[key] + '&';
            }
        }
        return str;
    }
}

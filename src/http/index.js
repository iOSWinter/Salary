import axios from 'axios'
import qs from 'qs'


axios.defaults.baseURL = 'http://www.sichuanzg.com/Salary/AppApi/'
axios.defaults.timeout = 60 * 1000

let loginLink = '/login'
let token = localStorage.getItem('SalaryUserToken')

export default {
    // 网络请求 get 方式
    get(action, params){
        this.judgeLoginStatus(action);
        if(params == null || params == undefined){
            params = {token:token};
        } else {
            params.token = token;
        }

        let paramStr = '';
        for(let key of Object.keys(params)){
            paramStr += `${key}=${params[key]}&`;
        }
        paramStr = paramStr.substring(0, paramStr.length - 1);

        return new Promise((resolve, reject) => {

            axios.get(`${action}?${paramStr}`)
            .then(res => {
                if(res.data.code == 403){
                    this.setToken('');
                    // location.href = loginLink;
                } else {
                    resolve(res);
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    // 网络请求 post 方式
    post(action, params){
        this.judgeLoginStatus(action);
        if(params == null || params == undefined){
            params = {token:token};
        } else {
            params.token = token;
        }

        return new Promise((resolve, reject) => {

            axios.post(action, qs.stringify(params))
            .then(res => {
                if(res.data.code == 403){
                    this.setToken('');
                    location.href = loginLink;
                } else {
                    resolve(res);
                }
            })
            .catch(err => {
                reject(err);
            })
        })
    },

    judgeLoginStatus(action){

        if(action == 'Login'){
            return;
        }
        if(token == null || token == undefined || token.length != 36){
            location.href = loginLink;
        }
    },

    setToken(newToken){
        localStorage.setItem("SalaryUserToken",newToken);
        token = newToken;
    },
}
import axios from "axios";

// Vue.use(Toast);
// import { getToken } from '@/utils/auth'

const service = axios.create({
    baseURL: 'http://192.168.1.117:8081/',
    // baseURL: 'http://192.168.1.121:8081/',
    timeout: 5000, // 请求超时时间
    headers: {
        // 'app_key': '1234567890',
        // 'app-key': '1234567890',
        // 'checkSum': '854c81726262a0dea703b1025c04940a4b3c777a'
    }
});
// 默认为需要token 不需要token事需要设置isToken为false
service.interceptors.request.use(
    config => {
        // let isToken = true
        // if (config.isToken != undefined) {
        //     isToken = config.isToken
        // }
        // if (isToken) {
        //     config.headers['token'] = "12123123"
        // }
        return config
    },
    error => {
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)
// respone拦截器
service.interceptors.response.use(
    response => {
        // const resp = response.data;
        // if (resp.status === 200) {
        //     return resp;
        // } else {
        //     Toast.fail(resp.message);
        // }
        return response;
    },
    error => {
        // console.log("err" + error); // for debug
        return Promise.reject(error);
    }
);
export default service;
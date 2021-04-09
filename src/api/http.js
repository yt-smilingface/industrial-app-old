import axios from "axios";
import Vue from 'vue';
import router from '../router'
import {
    Notify
} from 'vant';

const $axios = axios.create({
    baseURL: "http://139.9.234.168:10001/gzh",
    // baseURL: "http://10.64.128.52:10001/gzh",
    // baseURL: "http://139.9.150.10:10001/gzh",
    // baseURL: "",
    headers: {
        'Content-Type': 'application/json;charset=utf8'
    }
});
// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let token = '';
    if (userInfo) {
        token = userInfo.token;
    }
    if (token) {
        config.headers.common['Authorization'] = token;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    if (response.data.status_code == 100) {
        return response;
    }
    if (response.data.status_code == 401) {
        Notify(response.data.error_msg);
        router.replace({
            path: '/'
        })
        return response;
    }
    if (response.data.status_code == 500) {
        Notify('服务器错误');
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    if (error.response.status == 405) {
        Notify(error.response.statusText);
    }
    return Promise.reject(error);

});

export default $axios
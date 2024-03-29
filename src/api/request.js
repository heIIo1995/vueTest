import axios from 'axios'
//引入网络请求进度条插件和样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//start:开启进度条
//done:关闭进度条
//引入生成的uuid
import { getUUID } from '@/utils/index.js'
//引入store
import store from '@/store/index.js'

//二次封装axios
const request = axios.create({
  //基础路径
  baseURL: '/api',
  //请求超时时间
  timeout: 3000,
})

//请求拦截器
request.interceptors.request.use(
  (config) => {
    //给请求头添加一个字段模拟用户token
    config.headers.userTempId = getUUID()
    //将登录后的token写入请求头
    if (store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    //请求开始前开启进度条
    nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(new Error(`request error:${error}`))
  }
)

//响应拦截器
request.interceptors.response.use(
  (res) => {
    //请求结束后关闭进度条
    nprogress.done()
    return res.data
  },
  (error) => {
    return Promise.reject(new Error(`response error:${error}`))
  }
)
export default request

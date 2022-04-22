import store from '@/store'
import axios from 'axios'

export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net/'
const instance = axios.create({
  // baseURL: 'http://apipc-xiaotuxian-front.itheima.net/',
  // baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { profile } = store.state.user
    // 判断是否有token && 设置token
    profile.token && (config.headers.Authorization = `Bearer ${profile.token}`)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance

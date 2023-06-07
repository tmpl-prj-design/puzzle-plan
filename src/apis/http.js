/**
 * axios封装
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import router from '@/router'

import { useLangStore } from '@/stores/lang'
import { storage } from '@/utils/storage'

// 基础配置
const BASEURL = '/mdb/api/v1'
const Code = {
  LoginError: [1, 2, 3] // 登录时效
  // ... others
}

export const $http = axios.create({
  baseURL: BASEURL,
  transformResponse: [
    function (data) {
      try {
        // 处理超出浏览器支持长度的ID
        const jsonBigData = jsonBig.parse(data)
        const idToString = odata => {
          for (const key in odata) {
            if (key === 'id' && typeof odata[key] === 'number') odata[key] = odata[key].toString()
            if (odata[key] && Object.prototype.toString.call(odata[key]) === '[object Array]') {
              odata[key].forEach(item => {
                idToString(item)
              })
            }
            if (odata[key] && Object.prototype.toString.call(odata[key]) === '[object Object]') {
              idToString(odata[key])
            }
          }
          return odata
        }
        return idToString(jsonBigData)
      } catch (err) {
        return data
      }
    }
  ]
})

// 添加请求拦截器
$http.interceptors.request.use(
  config => {
    // 设置语言
    const { lang } = useLangStore()
    config.headers.lang = lang

    // 设置token
    const token = storage.get('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
export function ajax(options) {
  return $http(options)
    .then(res => {
      // 文件
      if (res.headers['content-type'] === 'application/json') {
        const resToken = res.headers.authorization
        if (resToken) {
          storage.set('token', resToken)
        }

        // 登录问题：失效 / 权限等
        if (Code.LoginError.includes(res.data.code)) {
          // 10001: 登录已失效 10002: 用户未授权
          storage.remove('token')
          if (location.pathname !== '/login') {
            router.push('/login')
          }
        }

        // Others error code

        return res.data
      } else {
        return res
      }
    })
    .catch(err => {
      const errorData = err.response.data || {}
      return { message: errorData.message || err.message }
    })
}

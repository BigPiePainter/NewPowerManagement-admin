import qs from 'qs'
import axios from 'axios'

class Http {
  baseUrl: string

  constructor() {
    console.log('后端网址', import.meta.env.VITE_API_URL)
    this.baseUrl = 'http://' + import.meta.env.VITE_API_URL
    // this.baseUrl = '/'
  }

  request(options: any) {
    const instance = axios.create()
    instance.defaults.withCredentials = true
    instance.defaults.baseURL = this.baseUrl

    if (options.mode == 'json') {
      instance.defaults.headers.post['Content-Type'] = 'application/json'
      instance.defaults.headers.put['Content-Type'] = 'application/json'
    } else if (options.mode == 'file') {
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
      if (options.onUploadProgress) {
        instance.defaults.onUploadProgress = options.onUploadProgress
      }
    } else {
      instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (options.token) {
      instance.defaults.headers.Authorization = 'Bearer ' + options.token
    } else if (localStorage.token) {
      instance.defaults.headers.Authorization = 'Bearer ' + localStorage.token
    }

    if (options.params) {
      options.paramsSerializer = (params: any) => qs.stringify(params)
    }

    instance.defaults.transformRequest = [
      (data) => {
        if (options.mode == 'json' && typeof data == 'object') return JSON.stringify(data)
        return data
      }
    ]

    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        console.log("REQUEST ERROR", error)
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (res) => {
        const { data } = res
        console.log("接口返回", data)
        if (!data) {
          this._errorHandle(res)
          return Promise.reject(res)
        }
        return data
      },
      (error) => {
        console.log("RESPONSE ERROR", error)
        const response = error.response
        if (response) {
          this._errorHandle(error)
        } else {
          this._errorHandle('服务器无响应')
        }

        return Promise.reject(error)
      }
    )

    console.log("请求后端接口", options)
    return instance(options)
  }

  _errorHandle(res: any) {
    console.log("Handle ERROR", res)
    // if (data.constructor.name == 'AxiosError') {
    //   //
    // }
  }
}

export default new Http()

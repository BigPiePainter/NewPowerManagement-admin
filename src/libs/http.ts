import axios from 'axios'

class Http {
  baseUrl: string

  constructor() {
    console.log('后端网址', import.meta.env.VITE_API_URL)
    this.baseUrl = 'http://' + import.meta.env.VITE_API_URL
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
    } else {
      instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    if (localStorage.token) {
      instance.defaults.headers.token = localStorage.token
    }
    if (options.token) {
      instance.defaults.headers.token = options.token
    }
    if (options.onUploadProgress) {
      instance.defaults.onUploadProgress = options.onUploadProgress
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
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (res) => {
        // const { data, status } = res
        // if (!data || data.msg !== 'success') {
        //   this._errorHandle(data, data.code)
        //   return Promise.reject(res)
        // }
        // this._errorHandle(data, status)

        // return data

        return res
      },
      (error) => {
        const response = error.response
        if (response) {
          this._errorHandle(error)
        } else {
          this._errorHandle('服务器无响应')
        }

        return Promise.reject(error)
      }
    )

    console.log(options)
    return instance(options)
  }

  _errorHandle(data: any) {
    if (data.constructor.name == 'AxiosError') {
      //
    }
  }
}

export default new Http()

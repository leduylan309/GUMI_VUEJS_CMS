// Config Request Interceptor
import Vue from 'vue'
import { convertParamsAndFilterToString } from '../../utils/filter'
import { AxiosRemovePending, CancelToken } from './cancel.config'

// Config Axios
export const axiosConfig = {
  url: process.env.APP_URL,
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10 * 1000,
  cancelToken: CancelToken.source().token,
  paramsSerializer: (params) => {
    return convertParamsAndFilterToString(params)
  }
}

// Config Request Interceptor
export const axiosInterceptorRequestConfig = (config) => {
  config.headers['Authorization'] = `Bearer ${ Vue.$cookies.get('token') }`

  // Config Cancel Pending
  config.cancelToken = new CancelToken((canceler) => {
    AxiosRemovePending(config, canceler)
  })

  return config
}

// Config Request Error Interceptor
export const axiosInterceptorRequestError = (error) => Promise.reject(error)
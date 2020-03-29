// Config Request Interceptor
import Vue from 'vue'
import { convertParamsAndFilterToString } from '../../utils/filter'
import { AxiosRemovePending, CancelToken } from './cancel.config'

// Config Axios
export const axiosConfig = {
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
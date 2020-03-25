import axios from 'axios'
import {
  axiosConfig,
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError,
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
} from './interceptor'

// config Axios
const axiosInstance = axios.create(axiosConfig)

// set request global
axiosInstance.interceptors.request.use(
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError)

// set response global
axiosInstance.interceptors.response.use(
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
)

export const ApiService = {
  get (url, params) {
    return axiosInstance.get(`${ url }`, { params })
  },

  post (url, body = {}, config = {}) {
    return axiosInstance.post(`${ url }`, body, config)
  },

  put (url, body = {}, params = {}) {
    return axiosInstance.put(`${ url }`, body, { params })
  },

  delete (url, params = {}) {
    return axiosInstance.delete(`${ url }`, { params })
  }
}

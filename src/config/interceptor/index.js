import {
  axiosConfig,
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError,
  axiosInterceptorResponseConfig, axiosInterceptorResponseError
} from '../../api/interceptor'

import axios from 'axios'

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

export default axiosInstance
// set request global
import { axiosInterceptorRequestConfig, axiosInterceptorRequestError } from './request.config'
import { axiosInterceptorResponseConfig, axiosInterceptorResponseError } from './response.config'

export const configInterceptorAxios = (axiosInstance) => {
  // set request global
  axiosInstance.interceptors.request.use(
    axiosInterceptorRequestConfig,
    axiosInterceptorRequestError)

  // set response global
  axiosInstance.interceptors.response.use(
    axiosInterceptorResponseConfig,
    axiosInterceptorResponseError
  )
}

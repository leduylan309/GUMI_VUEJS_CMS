// import Axios
import axios from 'axios'
import {
  axiosConfig,
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError,
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
} from '../api/interceptor'
import { Model } from '@vuex-orm/core'

export default class BaseModel extends Model {
  static apiConfig = axiosConfig

  static setAxios () {
    // config Axios
    const axiosInstance = axios.create()

    // set request global
    axiosInstance.interceptors.request.use(
      axiosInterceptorRequestConfig,
      axiosInterceptorRequestError)

    // set response global
    axiosInstance.interceptors.response.use(
      axiosInterceptorResponseConfig,
      axiosInterceptorResponseError
    )

    // set to axios global
    this.axios = axiosInstance
  }
}
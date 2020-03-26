import Model from 'javel'
import { getDependency } from 'javel/src/utils'

// import Axios
import axios from 'axios'
import {
  axiosConfig,
  axiosInterceptorRequestConfig,
  axiosInterceptorRequestError,
  axiosInterceptorResponseConfig,
  axiosInterceptorResponseError
} from '../api/interceptor'

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

export default class BaseModel extends Model {
  baseUrl () {
    return ''
  }

  makeRequest ({ method, url, data, query }) {
    if (axiosInstance) return axiosInstance({ method, url, data, params: query })

    throw new Error('Please override the `makeRequest` method and choose your http dependency.')
  }
}
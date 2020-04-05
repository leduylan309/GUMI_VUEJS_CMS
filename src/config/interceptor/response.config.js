// Config Response Interceptor
import axios from 'axios'
import router from '../../router'
import { AxiosRemovePending } from './cancel.config'

export const axiosInterceptorResponseConfig = (response) => {
  AxiosRemovePending(response.config)

  return response
}

// Config Response Error Interceptor
export const axiosInterceptorResponseError = (error) => {
  if (!axios.isCancel(error) && error) {
    const { config, response: { status } } = error

    // remove request pending
    AxiosRemovePending(config)

    if (status === 401 && router.currentRoute.name !== 'Login') {
      return router.push({ name: 'Login' })
    }

    return Promise.reject(error)
  } else {
    // return empty object for aborted request
    return Promise.resolve({})
  }
}

// config axiosCSRF | Laravel
export const axiosCSRF = () => {
  const token = document.head.querySelector('meta[name="csrf-token"]')

  if (token) {
    return token.content
  }

  return ''
}

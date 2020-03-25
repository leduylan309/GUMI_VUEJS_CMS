// Config Axios CancelToken
import axios from 'axios'

// define list of pending request
const pendingRequest = {}

export const CancelToken = axios.CancelToken

export const AxiosRemovePending = (config, canceler) => {
  const flagUrl = config.url + '&' + config.method

  if (flagUrl in pendingRequest) {
    if (canceler) {
      canceler('Operation canceled request:' + flagUrl) // cancel duplicate
    } else {
      delete pendingRequest[flagUrl] // delete request
    }
  } else {
    if (canceler) {
      pendingRequest[flagUrl] = canceler // store the cancel function
    }
  }
}

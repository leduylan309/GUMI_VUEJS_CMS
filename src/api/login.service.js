import LoginModel from '../models/login.model'
import Vue from 'vue'

// define
const BaseUrl = 'auth/'
const Guard = 'admin/'
export const LoginService = {
  /**
   * call api Login
   * @param data
   * @return {Promise<Response>}
   */
  async login (data) {
    return await LoginModel.api().post(`${ BaseUrl }${ Guard }` + 'login', data, {
      dataTransformer: ({ data }) => {
        // set token to cookie
        Vue.$cookies.set('token', data.token, new Date(data.exp))

        return data
      }
    })
  }
}

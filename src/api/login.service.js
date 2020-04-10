import LoginModel from '../models/login.model'

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
    return await LoginModel.api().post(`${ BaseUrl }${ Guard }` + 'login', data)
  }
}

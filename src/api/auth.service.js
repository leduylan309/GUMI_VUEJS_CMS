import AuthModel from '../models/auth.model'
// define
const AuthBaseUrl = ''
export const AuthService = {
  /**
   * call api Login
   * @param data
   * @return {Promise<Response>}
   */
  async login (data) {
    return await AuthModel.api().post(`${ AuthBaseUrl }` + 'login', data)
  }
}

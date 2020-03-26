import AuthModel from '../models/auth.model'

// define
const AuthBaseUrl = ''

export const AuthService = {
  async login (data) {
    return await AuthModel.api().post(`${ AuthBaseUrl }` + '/login', data)
  },

  async fetchAdmin () {
    return await AuthModel.api().get(`${ AuthBaseUrl }` + '/profile')
  },
}

import AuthModel from '../models/auth.model'
import AdminModel from '../models/admin.model'

// define
const AuthBaseUrl = ''

export const AuthService = {
  async login (data) {
    return await AuthModel.api().post(`${ AuthBaseUrl }` + '/login', data)
  },

  async fetchAdmin () {
    return await AdminModel.api().get(`${ AuthBaseUrl }` + '/profile', {
      dataTransformer: (response => {
        const { data } = response.data

        return data.attributes
      })
    })
  }
}

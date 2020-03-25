import { ApiService } from '../api.service'

const AuthBaseUrl = ''

export const AuthService = {

  async login (data) {
    return await ApiService.post(`${ AuthBaseUrl }` + '/login', data)
  },

  async fetchAdmin () {
    return await ApiService.get(`${ AuthBaseUrl }` + '/profile').then(response => {
      const { data } = response.data

      return data
    })
  },

  logout () {

  }
}

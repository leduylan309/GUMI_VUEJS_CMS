// define
import AuthModel from '../models/auth.model'

const BaseUrl = 'auth/'
export const AuthService = {
  /**
   * call Api to get profile
   * @return {Promise<Response>}
   */
  async profile () {
    return await AuthModel.api().get(`${ BaseUrl }` + 'profile', {
      dataTransformer: (response => {
        const { data } = response.data

        if (process.env.VUE_APP_JSON_API === 'true') {
          return data.data.attributes
        }

        return data
      })
    })
  }
}

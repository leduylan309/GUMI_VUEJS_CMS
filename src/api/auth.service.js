// define
import AuthModel from '../models/auth.model'

const BaseUrl = 'auth/'
export const AuthService = {
  /**
   * get current user
   * @return {Item<InstanceOf<AuthModel>>}
   */
  current_user () {
    return AuthModel.query().with('roles,permissions').first()
  },

  /**
   * call Api to get profile
   * @return {Promise<Response>}
   */
  async profile (params = {}) {
    return await AuthModel.api().get(`${ BaseUrl }` + 'profile', {
      params,
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

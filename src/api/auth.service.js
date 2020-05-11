// define
import AuthModel from '../models/auth.model'
import PostModel from '../models/post.model'
import Vue from 'vue'

const BaseUrl = 'auth'
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
    return await AuthModel.api().get(`${ BaseUrl }/profile`, {
      params,
      dataTransformer: (response => {
        const { data } = response.data

        if (process.env.VUE_APP_JSON_API === 'true') {
          return data.data.attributes
        }

        return data
      })
    })
  },

  /**
   * logout
   * @return {Promise<Response>}
   */
  async logout () {
    return await AuthModel.api().delete(`${ BaseUrl }/admin/logout`, {
      dataTransformer: ({ data }) => {
        // remove token
        Vue.$cookies.remove('token')

        return data
      }
    })
  }
}

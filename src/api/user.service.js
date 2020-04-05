import UserModel from '../models/user.model'
import { IROOTQUERY } from '../shared/store/state'

// define
const UserBaseUrl = 'user'

export const UserService = {
  /**
   * load list users
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...IROOTQUERY,
      ...queries
    }

    return await UserModel.api().get(`${ UserBaseUrl }`, {
      params,
      dataTransformer: ({ data, headers }) => {
        if (data && data.status === 200) {
          // delete all data before add post
          UserModel.deleteAll()

          // map data if use JSON API
          if (process.env.VUE_APP_JSON_API === 'true') {
            return data.data.attributes
          }

          UserModel.commit(state => {
            state.paginator = { ...data.pagination }
            state.queryParams = { ...data.params }
          })

          return data.data
        }
      }
    })
  }
}

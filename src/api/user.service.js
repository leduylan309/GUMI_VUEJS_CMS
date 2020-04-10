import UserModel from '../models/user.model'
import { IROOTQUERY } from '../shared/store/state'

// define
const BaseUrl = 'users'

// define transformer
const dataTransformer = ({ data, headers, status = nul }) => {
  if (data && status === 200) {
    // delete all data before add post
    UserModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    UserModel.commit(state => {
      // map paginator to stage
      if (data.pagination) {
        state.paginator = { ...data.pagination }
      }

      // map params
      if (data.params) {
        state.queryParams = { ...data.params }
      }
    })

    return data.data
  }
}
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

    return await UserModel.api().get(`${ BaseUrl }`, {
      params,
      dataTransformer
    })
  }
}

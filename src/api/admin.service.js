import AdminModel from '../models/admin.model'
import { IROOTQUERY } from '../shared/store/state'

// define
const AdminBaseUrl = ''

export const AdminService = {
  /**
   * call Api to get profile
   * @return {Promise<Response>}
   */
  async profile () {
    return await AdminModel.api().get(`${ AdminBaseUrl }` + 'profile', {
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
   * load list admins
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...IROOTQUERY,
      ...queries
    }

    return await AdminModel.api().get(`${ AdminBaseUrl }`, {
      params,
      dataTransformer: (({ data, headers }) => {
        if (data && data.status === 200) {
          // delete all data before add new
          AdminModel.deleteAll()

          // map data if use JSON API
          if (process.env.VUE_APP_JSON_API === 'true') {
            return data.data.attributes
          }

          AdminModel.commit(state => {
            state.paginator = { ...data.pagination }
            state.queryParams = { ...data.params }
          })

          return data.data
        }
      })
    })
  }
}

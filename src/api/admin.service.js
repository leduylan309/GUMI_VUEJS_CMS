import AdminModel from '../models/admin.model'
import { IROOTQUERY } from '../shared/store/state'

// define
const BaseUrl = 'admins/'

// define DataTransformer
const dataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    // delete all data before add new
    AdminModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    AdminModel.commit(state => {
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

export const AdminService = {
  /**
   * get current admin
   * @return {Item<InstanceOf<AdminModel>>}
   */
  current_admin () {
    return AdminModel.query().first()
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

    return await AdminModel.api().get(`${ BaseUrl }`, {
      params,
      dataTransformer
    })
  }
}

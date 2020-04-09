import { IROOTQUERY } from '../shared/store/state'
import RoleModel from '../models/company.model'

// define
const baseUrl = 'roles'

// define DataTransformer
const RoleDataTransformer = ({ data, headers, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    RoleModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    RoleModel.commit(state => {
      // map paginator to stage
      if (data.meta) {
        state.paginator = { ...data.meta.pagination }
      }

      // map params
      if (data.params) {
        state.queryParams = { ...data.params }
      }
    })

    return data.data
  }
}

/**
 * Role Service
 * @type {{list(*=): Promise<Response>}}
 */
export const RoleService = {
  /**
   * load list
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...IROOTQUERY,
      ...queries
    }

    return await RoleModel.api().get(`${ baseUrl }`, {
      params,
      dataTransformer: RoleDataTransformer
    })
  }
}

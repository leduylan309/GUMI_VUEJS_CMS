import AdminModel from '../models/admin.model'
import { IROOTQUERY } from '../shared/store/state'
import { AuthService } from './auth.service'

// define
const BaseUrl = 'admins'

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
  },

  /**
   * get only item
   * @param ID
   * @param queries
   * @return {Promise<Response>}
   */
  async item (ID, queries = {}) {
    const params = {
      ...queries
    }

    return await AdminModel.api().get(`${ BaseUrl }/${ ID }`, {
      ...params,
      dataTransformer
    })
  },

  /**
   * update admin
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    data.updated_by = AuthService.current_user().id

    return await AdminModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create post
   * @param data
   * @return {Promise<Response>}
   */
  async create (data = {}) {
    data.created_by = data.updated_by = AuthService.current_user().id

    return await AdminModel.api().post(`${ BaseUrl }`, data)
  }
}

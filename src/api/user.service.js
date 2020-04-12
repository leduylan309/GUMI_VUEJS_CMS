import UserModel from '../models/user.model'
import { AuthService } from './auth.service'

// define
const BaseUrl = 'users'

// define transformer
const dataTransformer = ({ data, headers, status = null }) => {
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
      ...UserModel.state().queryParams,
      ...queries
    }

    return await UserModel.api().get(`${ BaseUrl }`, {
      params,
      dataTransformer,
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
      ...queries,
    }

    return await UserModel.api().get(`${ BaseUrl }/${ ID }`, {
      params,
      dataTransformer,
    })
  },

  /**
   * update user
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    data.updated_by = AuthService.current_user().id

    return await UserModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create post
   * @param data
   * @return {Promise<Response>}
   */
  async create (data = {}) {
    data.created_by = data.updated_by = AuthService.current_user().id

    return await UserModel.api().post(`${ BaseUrl }`, data)
  },

  /**
   * delete user
   * @return {Promise<Response>}
   * @param id
   */
  async delete (id) {
    return await UserModel.api().delete(`${ BaseUrl }/${ id }`)
  }
}

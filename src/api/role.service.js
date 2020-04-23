import RoleModel from '../models/role.model'

// define
const BaseUrl = 'roles'

// define DataTransformer
const dataTransformer = ({ data, headers, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    RoleModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    RoleModel.commit(state => {
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
      ...RoleModel.state().queryParams,
      ...queries
    }

    return await RoleModel.api().get(`${ BaseUrl }`, {
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
      ...queries,
    }

    return await RoleModel.api().get(`${ BaseUrl }/${ ID }`, {
      params,
      dataTransformer,
    })
  },

  /**
   * update role
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    return await RoleModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create admin
   * @param data
   * @return {Promise<Response>}
   */
  async create (data = {}) {
    return await RoleModel.api().post(`${ BaseUrl }`, data)
  },

  /**
   * delete admin
   * @return {Promise<Response>}
   * @param id
   */
  async delete (id) {
    return await RoleModel.api().delete(`${ BaseUrl }/${ id }`)
  },
}

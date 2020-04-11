import CompanyModel from '../models/company.model'
import { AuthService } from './auth.service'

// define
const BaseUrl = 'companies'

// define DataTransformer
const CompanyDataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    CompanyModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    CompanyModel.commit(state => {
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
 * Company Service
 */
export const CompanyService = {
  /**
   * load list
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...CompanyModel.state().queryParams,
      ...queries
    }

    return await CompanyModel.api().get(`${ BaseUrl }`, {
      params: params,
      dataTransformer: CompanyDataTransformer
    })
  },

  /**
   * get company
   * @param ID
   * @param queries
   * @return {Promise<Response>}
   */
  async item (ID, queries = {}) {
    const params = {
      ...queries
    }

    return await CompanyModel.api().get(`${ BaseUrl }/${ ID }`, {
      params: params,
      dataTransformer: CompanyDataTransformer
    })
  },

  /**
   * update company
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    data.updated_by =  AuthService.current_user().id

    return await CompanyModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create company
   * @param data
   * @return {Promise<*>}
   */
  async create (data = {}) {
    data.created_by = data.updated_by = AuthService.current_user().id

    return await CompanyModel.api().api(`${ BaseUrl }`, data)
  },

  /**
   * delete company
   * @return {Promise<Response>}
   * @param id
   */
  async delete (id) {
    return await CompanyModel.api().delete(`${ BaseUrl }/${ id }`)
  }
}

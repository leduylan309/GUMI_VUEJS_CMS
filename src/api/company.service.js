import { IROOTQUERY } from '../shared/store/state'
import CompanyModel from '../models/company.model'
import { AdminService } from './admin.service'

// define
const baseUrl = 'companies'

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
      ...IROOTQUERY,
      ...queries
    }

    return await CompanyModel.api().get(`${ baseUrl }`, {
      params,
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

    return await CompanyModel.api().get(`${ baseUrl }/${ ID }`, {
      ...params,
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
    data.updated_by = AdminService.current_admin().id

    return await CompanyModel.api().put(`${ baseUrl }/${ ID }`, data)
  },

  /**
   * create company
   * @param data
   * @return {Promise<*>}
   */
  async create (data = {}) {
    data.created_by = data.updated_by = AdminService.current_admin().id

    return await CompanyModel.api().api(`${ baseUrl }`, data)
  }
}

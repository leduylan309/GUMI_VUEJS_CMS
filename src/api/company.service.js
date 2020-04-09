import { IROOTQUERY } from '../shared/store/state'
import CompanyModel from '../models/company.model'

// define
const baseUrl = 'companies'

// define DataTransformer
const CompanyDataTransformer = ({ data, headers, status = null }) => {
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
 * @type {{list(*=): Promise<Response>}}
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
  }
}

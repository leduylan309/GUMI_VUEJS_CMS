import DashboardModel from '../models/dashboard.model'

// define
const BaseUrl = 'dashboards'

// define DataTransformer
const dataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    // delete all data before add new
    DashboardModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    return data.data
  }
}

export const DashboardService = {
  /**
   * load list admins
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    return await DashboardModel.api().get(`${ BaseUrl }`, {
      params: queries,
      dataTransformer,
    })
  },
}

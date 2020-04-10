import { IROOTQUERY } from '../shared/store/state'
import CategoryModel from '../models/category.model'
import { AdminService } from './admin.service'

// define
const BaseUrl = 'categories'

// define DataTransformer
const dataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    // delete all data before add category
    CategoryModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    CategoryModel.commit(state => {
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

export const CategoryService = {
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

    return await CategoryModel.api().get(`${ BaseUrl }`, {
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

    return await CategoryModel.api().get(`${ BaseUrl }/${ ID }`, {
      ...params,
      dataTransformer
    })
  },

  /**
   * update category
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    data.updated_by = AdminService.current_admin().id

    return await CategoryModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create category
   * @param data
   * @return {Promise<Response>}
   */
  async create (data = {}) {
    data.created_by = AdminService.current_admin().id

    return await CategoryModel.api().post(`${ BaseUrl }`, data)
  }
}

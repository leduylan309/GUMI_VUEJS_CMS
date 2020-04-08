import { IROOTQUERY } from '../shared/store/state'
import CategoryModel from '../models/category.model'
import AdminModel from '../models/admin.model'

// define
const CategoryBaseUrl = 'categories'

// define DataTransformer
const CategoryDataTransformer = ({ data, headers, status = null }) => {
  if (data && status === 200) {
    // delete all data before add category
    CategoryModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    CategoryModel.commit(state => {
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

    return await CategoryModel.api().get(`${ CategoryBaseUrl }`, {
      params,
      dataTransformer: CategoryDataTransformer
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

    return await CategoryModel.api().get(`${ CategoryBaseUrl }/${ ID }`, {
      ...params,
      dataTransformer: CategoryDataTransformer
    })
  },

  async update (ID) {
    const category = CategoryModel.query().find(ID)
    const admin = AdminModel.query().first()

    category.updated_by = admin.id

    return await CategoryModel.api().put(`${ CategoryBaseUrl }/${ ID }`, category)
  },

  async create (ID) {
    const category = CategoryModel.query().find(ID)

    return await CategoryModel.api().post(`${ CategoryBaseUrl }`, category)
  }
}

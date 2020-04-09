import { IROOTQUERY } from '../shared/store/state'
import PostModel from '../models/post.model'
import AdminModel from '../models/admin.model'

// define
const PostBaseUrl = 'news'

// define DataTransformer
const PostDataTransformer = ({ data, headers, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    PostModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    PostModel.commit(state => {
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
 * Post Service
 * @type {{item(*, *=): Promise<Response>, update(*=): Promise<*>, create(*=): Promise<*>, list(*=): Promise<Response>}}
 */
export const PostService = {
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

    return await PostModel.api().get(`${ PostBaseUrl }`, {
      params,
      dataTransformer: PostDataTransformer
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

    return await PostModel.api().get(`${ PostBaseUrl }/${ ID }`, {
      ...params,
      dataTransformer: PostDataTransformer
    })
  },

  async update (ID) {
    const post = PostModel.query().find(ID)
    const admin = AdminModel.query().first()

    post.updated_by = admin.id

    return await PostModel.api().put(`${ PostBaseUrl }/${ ID }`, post)
  },

  async create (ID) {
    const post = PostModel.query().find(ID)
    const admin = AdminModel.query().first()

    post.created_by = post.updated_by = admin.id

    return await PostModel.api().post(`${ PostBaseUrl }`, post)
  }
}

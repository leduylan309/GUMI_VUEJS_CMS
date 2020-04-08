import { IROOTQUERY } from '../shared/store/state'
import PostModel from '../models/post.model'

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
      if (data.meta) {
        state.paginator = { ...data.meta.pagination }
      }

      if (data.params) {
        state.queryParams = { ...data.params }
      }
    })

    return data.data
  }
}

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
  }
}

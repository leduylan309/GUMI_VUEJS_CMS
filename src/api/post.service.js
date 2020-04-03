import { IROOTQUERY } from '../shared/store/state'
import PostModel from '../models/post.model'

// define
const PostBaseUrl = 'post'

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
      dataTransformer: ({ data, headers }) => {
        if (data && data.status === 200) {
          // delete all data before add post
          PostModel.deleteAll()

          // map data if use JSON API
          if (process.env.VUE_APP_JSON_API === 'true') {
            return data.data.attributes
          }

          PostModel.commit(state => {
            state.paginator = { ...data.pagination }
            state.queryParams = { ...data.params }
          })

          return data.data
        }
      }
    })
  }
}

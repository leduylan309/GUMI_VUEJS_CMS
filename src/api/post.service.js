import PostModel from '../models/post.model'
import { AuthService } from './auth.service'

// define
const BaseUrl = 'posts'

// define DataTransformer
const dataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    PostModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    PostModel.commit(state => {
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
 * Post Service
 */
export const PostService = {
  /**
   * load list
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...PostModel.state().queryParams,
      ...queries
    }

    return await PostModel.api().get(`${ BaseUrl }`, {
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

    return await PostModel.api().get(`${ BaseUrl }/${ ID }`, {
      ...params,
      dataTransformer
    })
  },

  /**
   * update post
   * @param ID
   * @param data
   * @return {Promise<Response>}
   */
  async update (ID, data = {}) {
    data.updated_by = AuthService.current_user().id

    return await PostModel.api().put(`${ BaseUrl }/${ ID }`, data)
  },

  /**
   * create post
   * @param data
   * @return {Promise<Response>}
   */
  async create (data = {}) {
    data.created_by = data.updated_by = AuthService.current_user().id

    return await PostModel.api().post(`${ BaseUrl }`, data)
  },

  /**
   * delete post
   * @return {Promise<Response>}
   * @param id
   */
  async delete (id) {
    return await PostModel.api().delete(`${ BaseUrl }/${ id }`)
  }
}

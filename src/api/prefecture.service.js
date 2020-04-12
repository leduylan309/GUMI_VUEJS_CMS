import PrefectureModel from '../models/prefecture.model'
// define
const BaseUrl = 'prefectures'

// define transformer
const dataTransformer = ({ data, headers, status = nul }) => {
  if (data && status === 200) {
    // delete all data before add post
    PrefectureModel.deleteAll()

    // map data if use JSON API
    if (process.env.VUE_APP_JSON_API === 'true') {
      return data.data.attributes
    }

    PrefectureModel.commit(state => {
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
export const PrefectureService = {
  /**
   * get all prefectures
   * @return {Promise<Response>}
   */
  async all () {
    return await PrefectureModel.api().get(`${ BaseUrl }`, {
      dataTransformer
    })
  },

  /**
   * load list prefectures
   * @param queries
   * @return {Promise<Response>}
   */
  async list (queries = {}) {
    const params = {
      ...PrefectureModel.state().queryParams,
      ...queries
    }

    return await PrefectureModel.api().get(`${ BaseUrl }`, {
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

    return await PrefectureModel.api().get(`${ BaseUrl }/${ ID }`, {
      params,
      dataTransformer
    })
  },
}

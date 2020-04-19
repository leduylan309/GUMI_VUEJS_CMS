import AssetModel from '../models/asset.model'

// define
const BaseUrl = 'assets'

// define DataTransformer
const dataTransformer = ({ data, status = null }) => {
  if (data && status === 200) {
    return data.data
  }
}

export const AssetService = {
  /**
   * create admin
   * @param data
   * @return {Promise<Response>}
   */
  async upload (data = {}) {
    return await AssetModel.api().post(`${ BaseUrl }/upload`, data, {
      dataTransformer
    })
  },
}

import PermissionModel from '../models/permission.model'

// define
const BaseUrl = 'permissions'

// define DataTransformer
const dataTransformer = ({ data, headers, status = null }) => {
  if (data && status === 200) {
    // delete all data before add post
    PermissionModel.deleteAll()

    return data.data
  }
}

/**
 * Role Service
 * @type {{list(*=): Promise<Response>}}
 */
export const PermissionService = {
  /**
   * load list
   * @param queries
   * @return {Promise<Response>}
   */
  async all () {
    return await PermissionModel.api().get(`${ BaseUrl }`, {
      dataTransformer
    })
  },
}

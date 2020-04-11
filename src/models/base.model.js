// import Axios
import { Model } from '@vuex-orm/core'
import { axiosConfig } from '../config/interceptor/request.config'

export default class BaseModel extends Model {
  static apiConfig = axiosConfig

  /**
   * define columns for search date (from - to)
   * ex:created_at= 2020-04-01,2020-04-15 (from route query)
   * @type {string[]}
   */
  static columnsDateRange = [
    'created_at'
  ]
}
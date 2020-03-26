// import Axios
import { Model } from '@vuex-orm/core'
import { axiosConfig } from '../config/interceptor/request.config'

export default class BaseModel extends Model {
  static apiConfig = axiosConfig
}
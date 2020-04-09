import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class CompanyModel extends BaseModel {
  static entity = 'company'

  static fields () {
    return {
      id: this.uid(),
      name: this.string(null),
      code: this.string(null),
      prefecture_id: this.string(null),
      created_by: this.uid(),
      updated_by: this.uid(),
      deleted_by: this.uid(),
      created_at: this.string(null),
      updated_at: this.string(null),
      deleted_at: this.string(null)
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
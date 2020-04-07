import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class CompanyModel extends BaseModel {
  static entity = 'company'

  static fields () {
    return {
      id: this.uid(),
      email: this.string(''),
      name: this.string(''),
      status: this.string(''),
      created_at: this.string('')
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
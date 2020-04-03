import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class PostModel extends BaseModel {
  static entity = 'post'

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
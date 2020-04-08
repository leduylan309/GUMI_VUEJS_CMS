import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class CategoryModel extends BaseModel {
  static entity = 'category'

  static fields () {
    return {
      id: this.uid(),
      model_id: this.uid(),
      model_type: this.string(null),
      name: this.string(null),
      display_name: this.string(null).nullable(),
      display_order: this.number(0)
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
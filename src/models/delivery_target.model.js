import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class DeliveryTargetModel extends BaseModel {
  static entity = 'delivery_target'

  static fields () {
    return {
      id: this.number(null),
      post_id: this.uid(),
      company_id: this.uid(),
      prefecture_id: this.uid(),
      category_id: this.uid()
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY
      }
    }
  }
}
import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class CategoryModel extends BaseModel {
  static entity = 'category'

  static fields () {
    return {
      id: this.uid(),
      category_code: this.string(null).nullable(),
      category_type: this.string(null).nullable(),
      display_name: this.string(null).nullable(),
      display_order: this.number(0)
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'display_name',
    'category_code',
    'category_type'
  ]

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
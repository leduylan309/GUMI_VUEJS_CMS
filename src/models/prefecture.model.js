import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class PrefectureModel extends BaseModel {
  static entity = 'prefecture'

  static fields () {
    return {
      id: this.uid(),
      prefecture_code: this.string(null),
      display_name: this.string(null),
      display_order: this.string(null)
      // contact: this.hasOne(ContactModel, 'contactable_id', 'id'),
      // prefecture: this.belongsTo(MasterDataModel, 'prefecture_id')
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'prefecture_code',
    'display_name',
    'display_order',
  ]

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY
      }
    }
  }
}
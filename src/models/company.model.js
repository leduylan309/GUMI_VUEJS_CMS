import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import ContactModel from './contact.model'
import MasterDataModel from './masterdata.model'

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
      deleted_at: this.string(null),
      contact: this.attr(null),
      // contact: this.hasOne(ContactModel, 'contactable_id', 'id'),
      prefecture: this.belongsTo(MasterDataModel, 'prefecture_id'),
      assets: this.attr([])
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'name',
    'code',
    // 'prefecture_id',
    // 'created_by',
  ]

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY,
        include: 'contact,assets'
      }
    }
  }
}
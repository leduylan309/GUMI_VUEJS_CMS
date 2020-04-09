import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import ContactModel from './contact.model'
import MasterDataModel from './masterdata.model'

export default class AdminModel extends BaseModel {
  static entity = 'admin'

  static fields () {
    return {
      id: this.uid(),
      prefecture_id: this.uid(),
      username: this.string(null),
      first_name: this.string(null),
      last_name: this.string(null),
      dob: this.string(null).nullable(),
      gender: this.string(null),
      status: this.string('activated').nullable(),
      created_at: this.string(''),
      updated_at: this.string(''),
      delete_at: this.string(''),
      contact: this.morphOne(ContactModel, 'model_id', 'model_type'),
      prefecture: this.belongsTo(MasterDataModel, 'prefecture_id')
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'first_name',
    'last_name',
    'username'
  ]

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
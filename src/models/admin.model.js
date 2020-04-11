import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import ContactModel from './contact.model'
import MasterDataModel from './masterdata.model'

export default class AdminModel extends BaseModel {
  static entity = 'admin'

  static fields () {
    return {
      id: this.uid(),
      name: this.string(null),
      username: this.string(null),
      password: this.string('').nullable(),
      password_confirmation: this.string('').nullable(),
      // status: this.string('activated').nullable(),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      delete_at: this.string(null).nullable(),
      contact: this.morphOne(ContactModel, 'model_id', 'model_type'),
      prefecture: this.belongsTo(MasterDataModel, 'prefecture_id')
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'name',
    'username'
  ]

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
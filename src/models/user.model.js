import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import ContactModel from './contact.model'
import MasterDataModel from './masterdata.model'

export default class UserModel extends BaseModel {
  static entity = 'user'

  static fields () {
    return {
      id: this.uid(),
      first_name: this.string(null),
      last_name: this.string(null),
      email: this.string(null),
      birthday: this.string(null).nullable(),
      gender: this.string(null),
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
    'first_name',
    'last_name',
    'email',
    'gender',
    'birthday'
  ]

  /**
   * Get full name of the user.
   */
  get full_name () {
    return `${ this.first_name } ${ this.last_name }`
  }

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY,
        include: 'contact'
      }
    }
  }
}
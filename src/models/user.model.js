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
      email: this.string(''),
      birthday: this.string(new Date()).nullable(),
      gender: this.string(null),
      password: this.string(''),
      password_confirmation: this.string(''),
      // status: this.string('activated').nullable(),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      delete_at: this.string(null).nullable(),
      contact: this.hasOne(ContactModel, 'contactable_id', 'id'),
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
import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import { StatusCommon } from '../enum/common.enum'

export default class ContactModel extends BaseModel {
  static entity = 'contact'

  static fields () {
    return {
      id: this.attr(null),
      contactable_id: this.uid(),
      contactable_type: this.string(null),
      postcode: this.string('0000000').nullable(),
      city: this.string(null).nullable(),
      address: this.string(null),
      free_dial: this.string(null).nullable(),
      tel: this.string(null).nullable(),
      fax: this.string(null).nullable(),
      email: this.string(null).nullable(),
      website: this.string(null).nullable(),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable()
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    {
      name: 'postcode',
      type: 'String'
    },
    {
      name: 'city',
      type: 'String'
    },
    {
      name: 'tel',
      type: 'String'
    },
    {
      name: 'email',
      type: 'String'
    },
    {
      name: 'updated_at',
      type: 'DateRange'
    },
    {
      name: 'created_at',
      type: 'DateRange'
    }
  ]

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
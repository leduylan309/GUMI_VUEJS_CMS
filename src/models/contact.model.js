import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class ContactModel extends BaseModel {
  static entity = 'contact'

  static fields () {
    return {
      id: this.uid(),
      model_id: this.uid(),
      model_type: this.string(null),
      postcode: this.string(''),
      city: this.string(null).nullable(),
      address: this.string(null),
      free_dial: this.string('activated').nullable(),
      tel: this.string(''),
      fax: this.string(''),
      email: this.string(''),
      website: this.string('')
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
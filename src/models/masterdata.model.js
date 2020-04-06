import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class MasterDataModel extends BaseModel {
  static entity = 'masterdata'

  static fields () {
    return {
      id: this.uid(),
      masterdata_type: this.string(null),
      name: this.string(''),
      display_name: this.string(null).nullable(),
      display_order: this.string(null)
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
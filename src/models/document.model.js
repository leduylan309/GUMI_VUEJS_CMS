import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class DocumentModel extends BaseModel {
  static entity = 'document'

  static fields () {
    return {
      id: this.uid(),
      model_id: this.uid(),
      model_type: this.string(null),
      name: this.string(''),
      mime: this.string(null).nullable(),
      size: this.number(0),
      disk: this.string(''),
      path: this.string(''),
      additional: this.attr('jsonb').nullable()
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
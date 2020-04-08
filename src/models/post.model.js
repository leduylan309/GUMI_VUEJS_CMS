import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import AdminModel from './admin.model'

export default class PostModel extends BaseModel {
  static entity = 'post'

  static fields () {
    return {
      id: this.uid(),
      title: this.string(null),
      content: this.string(null),
      publish_from: this.string(null).nullable(),
      publish_to: this.string(null).nullable(),
      display_order: this.number(0),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      created_by: this.uid().nullable(),
      updated_by: this.uid().nullable(),
      creator: this.belongsTo(AdminModel, 'created_by')
    }
  }

  static state () {
    return {
      paginator: {},
      queryParams: IROOTQUERY
    }
  }
}
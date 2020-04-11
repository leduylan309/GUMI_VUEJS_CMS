import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import AdminModel from './admin.model'
import moment from 'moment'
import CategoryModel from './category.model'

export default class PostModel extends BaseModel {
  static entity = 'post'

  static fields () {
    return {
      id: this.uid(),
      title: this.string(null),
      content: this.string(null),
      post_type: this.string('post').nullable(),
      publish_from: this.string(moment().format('YYYY-MM-DD H:mm:ss')).nullable(),
      publish_to: this.string(moment().format('YYYY-MM-DD H:mm:ss')).nullable(),
      status: this.string('publish').nullable(),
      display_order: this.number(0),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      created_by: this.uid().nullable(),
      updated_by: this.uid().nullable(),
      creator: this.belongsTo(AdminModel, 'created_by'),
      categories: this.morphMany(CategoryModel, 'model_id', 'model_type')
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    'title'
  ]

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY,
        include: 'delivery_target'
      }
    }
  }
}
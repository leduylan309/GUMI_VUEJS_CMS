import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'
import AdminModel from './admin.model'
import moment from 'moment'
import CategoryModel from './category.model'
import DeliveryTargetModel from './delivery_target.model'
import CompanyModel from './company.model'
import PrefectureModel from './prefecture.model'

export default class PostModel extends BaseModel {
  static entity = 'post'

  static fields () {
    return {
      id: this.uid(),
      title: this.string(null),
      content: this.string(null),
      post_type: this.string('post').nullable(),
      publish_from: this.string(moment().format('YYYY-MM-DD H:mm:ss')).nullable(),
      publish_to: this.string(moment().add(1, 'month').format('YYYY-MM-DD H:mm:ss')).nullable(),
      status: this.string('publish').nullable(),
      display_order: this.number(0),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      created_by: this.uid().nullable(),
      updated_by: this.uid().nullable(),
      delivery_target: this.attr(null),
      // delivery_target: this.hasOne(DeliveryTargetModel, 'post_id', 'id'),
      creator: this.belongsTo(AdminModel, 'created_by'),
      // categories: this.belongsToMany(CategoryModel, DeliveryTargetModel, 'post_id', 'category_id'),
      // companies: this.belongsToMany(CompanyModel, DeliveryTargetModel, 'post_id', 'company_id'),
      // prefectures: this.belongsToMany(PrefectureModel, DeliveryTargetModel, 'post_id', 'prefecture_id'),
      assets: this.attr([])
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
        include: 'delivery_target,assets'
      }
    }
  }
}
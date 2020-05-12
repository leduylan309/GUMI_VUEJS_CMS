import BaseModel from './base.model'
import { IROOTQUERY } from '../shared/store/state'

export default class RoleModel extends BaseModel {
  static entity = 'role'

  static fields () {
    return {
      id: this.uid(null),
      name: this.string(null),
      display_name: this.string(null),
      description: this.string(null),
      pivot: this.attr(null),
      permissions: this.attr([])
    }
  }

  /**
   * define columns show on list
   * @type {string[]}
   */
  static columns = [
    {
      name: 'display_name',
      type: 'String'
    }
  ]

  static state () {
    return {
      paginator: {},
      queryParams: {
        ...IROOTQUERY,
        include: 'permissions'
      }
    }
  }
}
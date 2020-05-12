import BaseModel from './base.model'

export default class DashboardModel extends BaseModel {
  static entity = 'dashboard'

  static fields () {
    return {
      statistics: this.attr(null),
      total_user: this.number(null)
    }
  }
}
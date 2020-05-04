import BaseModel from './base.model'

export default class DashboardModel extends BaseModel {
  static entity = 'dashboard'

  static fields () {
    return {
      data: this.attr(null)
    }
  }
}
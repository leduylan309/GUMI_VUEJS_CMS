import BaseModel from './base.model'

export default class AdminModel extends BaseModel {
  static entity = 'admin'

  static fields () {
    return {
      email: this.string(''),
      name: this.string('')
    }
  }
}
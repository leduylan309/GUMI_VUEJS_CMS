import BaseModel from './base.model'

export default class AuthModel extends BaseModel {
  static entity = 'auth'

  static fields () {
    return {
      token: this.string(''),
      exp: this.string('')
    }
  }
}
import BaseModel from './base.model'

export default class LoginModel extends BaseModel {
  static entity = 'login'

  static fields () {
    return {
      token: this.string(''),
      exp: this.string('')
    }
  }
}
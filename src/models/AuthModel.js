import BaseModel from './~BaseModel'

export default class AuthModel extends BaseModel {

  static login (inputData = {}) {
    return (new this).request({
      method: 'POST',
      action: 'login',
      url: `login`,
      data: inputData
    })

  }
}
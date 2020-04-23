import BaseModel from './base.model'

export default class AuthModel extends BaseModel {
  static entity = 'auth'

  static fields () {
    return {
      id: this.uid(),
      name: this.string(null),
      username: this.string(null),
      created_at: this.string(null).nullable(),
      updated_at: this.string(null).nullable(),
      deleted_at: this.string(null).nullable(),
      roles: this.attr([]),
      permissions: this.attr([])
    }
  }

  static state () {
    return {
      queryParams: {
        include: 'roles,permissions'
      }
    }
  }
}
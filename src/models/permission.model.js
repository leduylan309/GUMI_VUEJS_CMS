import BaseModel from './base.model'

export default class PermissionRole extends BaseModel {
  static entity = 'permission'

  static fields () {
    return {
      id: this.uid(null),
      name: this.string(null),
      display_name: this.string(null),
      description: this.string(null)
    }
  }
}
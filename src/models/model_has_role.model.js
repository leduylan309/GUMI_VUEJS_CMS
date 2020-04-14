import BaseModel from './base.model'

export default class ModelHasRole extends BaseModel {
  static entity = 'model_has_roles'

  static fields () {
    return {
      role_id: this.number(null),
      model_type: this.string(null),
      model_uuid: this.string(null)
    }
  }
}
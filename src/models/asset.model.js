import BaseModel from './base.model'

export default class AssetModel extends BaseModel {
  static entity = 'asset'

  static fields () {
    return {
      id: this.number(null),
      name: this.string(null),
      is_public: this.string(null),
      mime_type: this.string(null),
      size: this.number(null),
      disk: this.string(null),
      path: this.string(null),
      additional: this.attr(null)
    }
  }
}
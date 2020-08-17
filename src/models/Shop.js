import Model from './Model.js'

export default class Banner extends Model {
  buildUrl (request) {
    const { params } = request
    return ['shop', ...params]
  }

  static async areas () {
    return (new this()).request({ method: 'GET', url: `areas`, isStatic: true })
  }

  static async delete_shop (id) {
    return (new this()).request({ method: 'DELETE', url: `shop/${id}`, isStatic: true })
  }

  afterRequest ({ data }, { action, isStatic }) {
    if (action === 'custom') {
      return data
    }
    if (action === 'paginate') {
      data.data = this.make(data.data)
      return data
    }
    return isStatic ? this.make(data.data) : this.fill(data.data)
  }
}

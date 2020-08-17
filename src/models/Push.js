import Model from './Model.js'

export default class Push extends Model {
  buildUrl (request) {
    const { params } = request
    return ['push', ...params]
  }

  static async delete (id) {
    return (new this()).request({ method: 'DELETE', url: `push/${id}`, isStatic: true })
  }

  static async count (configs = {}) {
    return (new this()).request({ method: 'GET', url: `push/count`, ...configs, isStatic: true })
  }
}

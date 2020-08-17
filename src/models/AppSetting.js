import Model from './Model.js'

export default class AppSetting extends Model {
  buildUrl (request) {
    const { params } = request
    return ['app', ...params]
  }

  static async setting (data) {
    return (new this()).request({ method: 'PUT', url: `app`, data, isStatic: true })
  }
}

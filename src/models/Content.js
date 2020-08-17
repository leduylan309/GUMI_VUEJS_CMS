import Model from './Model.js'

export default class Content extends Model {
  buildUrl (request) {
    const { params } = request
    return ['content', ...params]
  }

  static async delete_content (id) {
    return (new this()).request({ method: 'DELETE', url: `content/${id}`, isStatic: true })
  }
}

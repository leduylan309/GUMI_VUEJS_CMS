import Model from './Model.js'

export default class Coupon extends Model {
  buildUrl (request) {
    const { params } = request
    return ['coupons', ...params]
  }
  static async delete (id) {
    return (new this()).request({ method: 'DELETE', url: `coupons/${id}`, isStatic: true })
  }
}

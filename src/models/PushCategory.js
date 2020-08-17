import Model from './Model.js'

export default class Prefecture extends Model {
  buildUrl ({ params }) {
    return ['push_categories', ...params]
  }
}

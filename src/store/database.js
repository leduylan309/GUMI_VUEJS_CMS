import VuexORM from '@vuex-orm/core'
import AuthModel from '../models/auth.model'

const database = new VuexORM.Database()

/** SAMPLE **/
database.register(AuthModel)

export default database

import VuexORM from '@vuex-orm/core'

// MODEL
import AuthModel from '../models/auth.model'
import AdminModel from '../models/admin.model'

const database = new VuexORM.Database()

/** SAMPLE **/
database.register(AuthModel)
database.register(AdminModel)

export default database

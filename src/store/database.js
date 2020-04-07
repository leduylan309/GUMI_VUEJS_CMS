import VuexORM from '@vuex-orm/core'

// MODEL
import AuthModel from '../models/auth.model'
import AdminModel from '../models/admin.model'
import PostModel from '../models/post.model'
import CompanyModel from '../models/company.model'

const database = new VuexORM.Database()

database.register(AuthModel)
database.register(AdminModel)
database.register(PostModel)
database.register(CompanyModel)

export default database

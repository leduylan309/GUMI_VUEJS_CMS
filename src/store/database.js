import VuexORM from '@vuex-orm/core'

// MODEL
import AuthModel from '../models/auth.model'
import AdminModel from '../models/admin.model'
import UserModel from '../models/user.model'
import PostModel from '../models/post.model'
import MasterDataModel from '../models/masterdata.model'
import DocumentModel from '../models/document.model'
import ContactModel from '../models/contact.model'

const database = new VuexORM.Database()

database.register(AuthModel)
database.register(AdminModel)
database.register(UserModel)
database.register(PostModel)
database.register(MasterDataModel)
database.register(DocumentModel)
database.register(ContactModel)

export default database

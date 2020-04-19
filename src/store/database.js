import VuexORM from '@vuex-orm/core'

// MODEL
import AuthModel from '../models/auth.model'
import AdminModel from '../models/admin.model'
import UserModel from '../models/user.model'
import PostModel from '../models/post.model'
import MasterDataModel from '../models/masterdata.model'
import DocumentModel from '../models/document.model'
import ContactModel from '../models/contact.model'
import CompanyModel from '../models/company.model'
import CategoryModel from '../models/category.model'
import RoleModel from '../models/role.model'
import LoginModel from '../models/login.model'
import PrefectureModel from '../models/prefecture.model'
import DeliveryTargetModel from '../models/delivery_target.model'
import ModelHasRole from '../models/model_has_role.model'
import AssetModel from '../models/asset.model'

const database = new VuexORM.Database()

database.register(AuthModel)
database.register(AdminModel)
database.register(UserModel)
database.register(PostModel)
database.register(MasterDataModel)
database.register(DocumentModel)
database.register(ContactModel)
database.register(CompanyModel)
database.register(CategoryModel)
database.register(RoleModel)
database.register(LoginModel)
database.register(PrefectureModel)
database.register(DeliveryTargetModel)
database.register(ModelHasRole)
database.register(AssetModel)

export default database

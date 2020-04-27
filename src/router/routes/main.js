import multiguard from 'vue-router-multiguard'
import { AuthGuard } from '../../guard/auth.guard'

// Components
import Index from '../../views/pages/Index.vue'

// Modules
import DashboardRoute from './dashboard'
import AdminRoute from './admin'
import UserRoute from './user'
import PostRoute from './post'
import CompanyRoute from './company'
import ContactRoute from './contact'
import CategoryRoute from './category'
import RoleRoute from './role'
import NotFoundRoute from './not-found'
import UnauthorizedRoute from './unauthorized'

const main = {
  path: '',
  name: 'Index',
  component: Index,
  beforeEnter: multiguard([AuthGuard]),
  meta: {
    title: 'Dashboard'
  },
  redirect: DashboardRoute,
  children: [
    DashboardRoute,
    AdminRoute,
    UserRoute,
    PostRoute,
    CompanyRoute,
    ContactRoute,
    // CategoryRoute,
    RoleRoute,
    NotFoundRoute,
    UnauthorizedRoute
  ]
}

export default main
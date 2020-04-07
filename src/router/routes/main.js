import multiguard from 'vue-router-multiguard'
import { AuthGuard } from '../../guard/auth.guard'

// Components
import Index from '../../views/pages/Index.vue'

// Modules
import DashboardRoute from './dashboard'
import AdminRoute from './admin'
import PostRoute from './post'
import CompanyRoute from './company'

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
    PostRoute,
    CompanyRoute
  ]
}

export default main
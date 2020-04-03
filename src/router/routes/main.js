import multiguard from 'vue-router-multiguard'
import { AuthGuard } from '../../guard/auth.guard'

// Components
import Index from '../../views/pages/Index.vue'

// Modules
import DashboardRoute from './dashboard'
import AdminRoute from './admin'
import PostRoute from './post'

const main = {
  path: '',
  name: 'Index',
  component: Index,
  beforeEnter: multiguard([AuthGuard]),
  children: [
    DashboardRoute,
    AdminRoute,
    PostRoute
  ]
}

export default main
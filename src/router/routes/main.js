import multiguard from 'vue-router-multiguard'
import { AuthGuard } from '../../guard/auth.guard'

// Components
import Index from '../../pages/Index.vue'

// Modules
import DashboardRoute from './dashboard'

const main = {
  path: '',
  name: 'Index',
  component: Index,
  beforeEnter: multiguard([AuthGuard]),
  children: [
    DashboardRoute
  ]
}

export default main
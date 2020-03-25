import Dashboard from '../../pages/Dashboard'
import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  meta: {
    title: 'Dashboard',

    // for menu
    icon: 'fas fa-tachometer-alt',
    label: 'Dashboard'
  },
  beforeEnter: multiguard([AuthGuard])
}

export default dashboard
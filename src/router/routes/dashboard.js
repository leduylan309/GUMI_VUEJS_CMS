import Dashboard from '../../views/pages/Dashboard'
import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  meta: {
    title: 'Dashboard',

    // for menu
    icon: 'pi pi-fw pi-home',
    label: 'Dashboard'
  },
  beforeEnter: multiguard([AuthGuard])
}

export default dashboard
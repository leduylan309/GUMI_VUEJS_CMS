import Dashboard from '../../views/pages/Dashboard'
import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'
import Admin from '../../views/pages/Admin'

const dashboard = {
  path: '/admin',
  name: 'Admin',
  component: Admin,
  meta: {
    title: 'Admin',

    // for menu
    icon: 'pi pi-fw pi-user',
    label: 'Admin'
  },
  beforeEnter: multiguard([AuthGuard])
}

export default dashboard
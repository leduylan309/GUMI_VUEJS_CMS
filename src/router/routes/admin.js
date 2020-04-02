import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import Index from '../../views/pages/admin/Index'
import List from '../../views/pages/admin/List'
import Add from '../../views/pages/admin/Add'
import Edit from '../../views/pages/admin/Edit'

const admin = {
  path: '',
  component: Index,
  meta: {
    title: 'Admin',

    // for menu
    icon: 'pi pi-fw pi-user',
    label: 'Admin'
  },
  children: [
    {
      path: '/admin',
      name: 'List',
      component: List,
      meta: {
        title: 'Admin',

        // for menu
        icon: 'pi pi-fw pi-users',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'admin/register',
      name: 'Add',
      component: Add,
      meta: {
        title: 'Create new Admin',

        // for menu
        icon: 'pi pi-fw pi-user-plus',
        label: 'Create new Admin'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'admin/:id',
      name: 'Edit',
      component: Edit,
      meta: {
        title: 'Edit Admin',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default admin
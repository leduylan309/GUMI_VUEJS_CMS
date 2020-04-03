import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import AdminIndex from '../../views/pages/admin/AdminIndex'
import AdminList from '../../views/pages/admin/AdminList'
import AdminAdd from '../../views/pages/admin/AdminAdd'
import AdminEdit from '../../views/pages/admin/AdminEdit'

const admin = {
  path: '/admin',
  component: AdminIndex,
  meta: {
    title: 'Admin',

    // for menu
    icon: 'pi pi-fw pi-user',
    label: 'Admin'
  },
  children: [
    {
      path: '',
      name: 'AdminList',
      component: AdminList,
      meta: {
        title: 'Admin',

        // for menu
        icon: 'pi pi-fw pi-users',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'AdminAdd',
      component: AdminAdd,
      meta: {
        title: 'Create Admin',

        // for menu
        icon: 'pi pi-fw pi-user-plus',
        label: 'Create Admin'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'AdminEdit',
      component: AdminEdit,
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
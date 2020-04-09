import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import RoleList from '../../views/pages/role/RoleList'
import RoleAdd from '../../views/pages/role/RoleAdd'
import RoleEdit from '../../views/pages/role/RoleEdit'
import RoleIndex from '../../views/pages/role/RoleIndex'

const role = {
  path: '/role',
  component: RoleIndex,
  meta: {
    title: 'Role',

    // for menu
    icon: 'pi pi-fw pi-file',
    label: 'Role'
  },
  children: [
    {
      path: '',
      name: 'RoleList',
      component: RoleList,
      meta: {
        title: 'Role',

        // for menu
        icon: 'pi pi-fw pi-file',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'RoleAdd',
      component: RoleAdd,
      meta: {
        title: 'Create Role',

        // for menu
        icon: 'pi pi-fw pi-plus',
        label: 'Create Role'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'RoleEdit',
      component: RoleEdit,
      meta: {
        title: 'Edit Role',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default role
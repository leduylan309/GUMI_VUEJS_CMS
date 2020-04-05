import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import UserIndex from '../../views/pages/user/UserIndex'
import UserList from '../../views/pages/user/UserList'
import UserAdd from '../../views/pages/user/UserAdd'
import UserEdit from '../../views/pages/user/UserEdit'

const user = {
  path: '/user',
  component: UserIndex,
  meta: {
    title: 'User',

    // for menu
    icon: 'pi pi-fw pi-user',
    label: 'User'
  },
  children: [
    {
      path: '',
      name: 'UserList',
      component: UserList,
      meta: {
        title: 'User List',

        // for menu
        icon: 'pi pi-fw pi-users',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'UserAdd',
      component: UserAdd,
      meta: {
        title: 'Create User',

        // for menu
        icon: 'pi pi-fw pi-user-plus',
        label: 'Create User'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'UserEdit',
      component: UserEdit,
      meta: {
        title: 'Edit User',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default user
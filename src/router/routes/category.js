import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import CategoryList from '../../views/pages/category/CategoryList'
import CategoryAdd from '../../views/pages/category/CategoryAdd'
import CategoryEdit from '../../views/pages/category/CategoryEdit'
import CategoryIndex from '../../views/pages/category/CategoryIndex'

const category = {
  path: '/category',
  component: CategoryIndex,
  meta: {
    title: 'Category',

    // for menu
    icon: 'pi pi-fw pi-folder',
    label: 'Category'
  },
  children: [
    {
      path: '',
      name: 'CategoryList',
      component: CategoryList,
      meta: {
        title: 'Category',

        // for menu
        icon: 'pi pi-fw pi-folder',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'CategoryAdd',
      component: CategoryAdd,
      meta: {
        title: 'Create Category',

        // for menu
        icon: 'pi pi-fw pi-plus',
        label: 'Create Category'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'CategoryEdit',
      component: CategoryEdit,
      meta: {
        title: 'Edit Category',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default category
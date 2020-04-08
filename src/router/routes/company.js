import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import CompanyList from '../../views/pages/company/CompanyList'
import CompanyAdd from '../../views/pages/company/CompanyAdd'
import CompanyEdit from '../../views/pages/company/CompanyEdit'
import CompanyIndex from '../../views/pages/company/CompanyIndex'

const post = {
  path: '/company',
  component: CompanyIndex,
  meta: {
    title: 'Company',

    // for menu
    icon: 'pi pi-file',
    label: 'Company'
  },
  children: [
    {
      path: '',
      name: 'CompanyList',
      component: CompanyList,
      meta: {
        title: 'Company',

        // for menu
        icon: 'pi pi-file',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'CompanyAdd',
      component: CompanyAdd,
      meta: {
        title: 'Create Company',

        // for menu
        icon: 'pi pi-plus',
        label: 'Create Company'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'CompanyEdit',
      component: CompanyEdit,
      meta: {
        title: 'Edit Company',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default post
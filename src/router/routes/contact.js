import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import ContactList from '../../views/pages/contact/ContactList'
import ContactAdd from '../../views/pages/contact/ContactAdd'
import ContactEdit from '../../views/pages/contact/ContactEdit'
import ContactIndex from '../../views/pages/contact/ContactIndex'

const post = {
  path: '/contact',
  component: ContactIndex,
  meta: {
    title: 'Contact',

    // for menu
    icon: 'pi pi-fw pi-id-card',
    label: 'Contact'
  },
  children: [
    {
      path: '',
      name: 'ContactList',
      component: ContactList,
      meta: {
        title: 'Contact',

        // for menu
        icon: 'pi pi-fw pi-id-card',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'ContactAdd',
      component: ContactAdd,
      meta: {
        title: 'Create Contact',

        // for menu
        icon: 'pi pi-fw pi-plus',
        label: 'Create Contact'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'ContactEdit',
      component: ContactEdit,
      meta: {
        title: 'Edit Contact',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default post
import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import PrefectureList from '../../views/pages/prefecture/PrefectureList'
import PrefectureAdd from '../../views/pages/prefecture/PrefectureAdd'
import PrefectureEdit from '../../views/pages/prefecture/PrefectureEdit'
import PrefectureIndex from '../../views/pages/prefecture/PrefectureIndex'

const post = {
  path: '/prefecture',
  component: PrefectureIndex,
  meta: {
    title: 'Prefecture',

    // for menu
    icon: 'pi pi-fw pi-globe',
    label: 'Prefecture'
  },
  children: [
    {
      path: '',
      name: 'PrefectureList',
      component: PrefectureList,
      meta: {
        title: 'Prefecture',

        // for menu
        icon: 'pi pi-fw pi-globe',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'PrefectureAdd',
      component: PrefectureAdd,
      meta: {
        title: 'Create Prefecture',

        // for menu
        icon: 'pi pi-fw pi-plus',
        label: 'Create Prefecture'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'PrefectureEdit',
      component: PrefectureEdit,
      meta: {
        title: 'Edit Prefecture',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default post
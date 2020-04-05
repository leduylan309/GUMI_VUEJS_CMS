import { AuthGuard } from '../../guard/auth.guard'
import multiguard from 'vue-router-multiguard'

// Components
import PostList from '../../views/pages/post/PostList'
import PostAdd from '../../views/pages/post/PostAdd'
import PostEdit from '../../views/pages/post/PostEdit'
import PostIndex from '../../views/pages/post/PostIndex'

const post = {
  path: '/post',
  component: PostIndex,
  meta: {
    title: 'Post',

    // for menu
    icon: 'pi pi-fw pi-file',
    label: 'Post'
  },
  children: [
    {
      path: '',
      name: 'PostList',
      component: PostList,
      meta: {
        title: 'Post',

        // for menu
        icon: 'pi pi-fw pi-file',
        label: 'Lists'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: 'register',
      name: 'PostAdd',
      component: PostAdd,
      meta: {
        title: 'Create Post',

        // for menu
        icon: 'pi pi-fw pi-plus',
        label: 'Create Post'
      },
      beforeEnter: multiguard([AuthGuard])
    },
    {
      path: ':id',
      name: 'PostEdit',
      component: PostEdit,
      meta: {
        title: 'Edit Post',

        // for menu
        hidden: true
      },
      beforeEnter: multiguard([AuthGuard])
    }
  ]
}

export default post
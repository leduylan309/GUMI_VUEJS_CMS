import Resource from '@/components/Resource'
import { AuthGuard, LoginGuard, ResolveGuard } from '@/router/guards'

import { PERMISSIONS } from '@/enum/permissions.enum'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  // Login
  {
    path: '/login',
    name: 'login',
    component: page('Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },

  // Home
  {
    path: '/',
    name: 'home',
    component: page('Home.vue'),
    meta: {
      title: 'dashboard',
      permissions: [PERMISSIONS.VIEW_DASHBOARD],
      breadcrumbs: [
        { title: 'dashboard' }
      ]
    },
    beforeEnter: ResolveGuard([AuthGuard])
  },

  // Admin
  {
    path: '/admin',
    component: Resource,
    children: [
      {
        path: '',
        name: 'admin.index',
        component: page('admin/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'admin_list',
          permissions: [PERMISSIONS.VIEW_ADMIN],
          breadcrumbs: [
            { title: 'admin_list', name: 'admin.index' }
          ]
        }
      },
      {
        path: '/admin/create',
        name: 'admin.create',
        component: page('admin/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'admin_create',
          permissions: [PERMISSIONS.CREATE_ADMIN],
          breadcrumbs: [
            { title: 'admin_list', name: 'admin.index' },
            { title: 'admin_create', name: 'admin.create' }
          ]
        }
      },
      {
        path: '/admin/:id/edit',
        name: 'admin.edit',
        component: page('admin/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'admin_edit',
          permissions: [PERMISSIONS.VIEW_ADMIN],
          breadcrumbs: [
            { title: 'admin_list', name: 'admin.index' },
            { title: 'admin_edit', name: 'admin.edit' }
          ]
        }
      }
    ]
  },

  // Company
  {
    path: '/companies',
    component: Resource,
    children: [
      {
        path: '',
        name: 'companies.index',
        component: page('companies/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'company',
          permissions: [PERMISSIONS.VIEW_COMPANY],
          breadcrumbs: [
            { title: 'company_list_page', name: 'companies.index' }
          ]
        }
      },
      {
        path: '/companies/create',
        name: 'companies.create',
        component: page('companies/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'company',
          permissions: [PERMISSIONS.CREATE_COMPANY],
          title: 'company',
          breadcrumbs: [
            { title: 'company_list_page', name: 'companies.index' },
            { title: 'company_create_page', name: 'companies.create' }
          ]
        }
      },
      {
        path: '/companies/:id/edit',
        name: 'companies.edit',
        component: page('companies/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'company',
          permissions: [PERMISSIONS.VIEW_COMPANY],
          title: 'company',
          breadcrumbs: [
            { title: 'company_list_page', name: 'companies.index' },
            { title: 'company_edit_page', name: 'companies.edit' }
          ]
        }
      }
    ]
  },

  // Content
  {
    path: '/content',
    component: Resource,
    children: [
      {
        path: '',
        name: 'content.index',
        component: page('content/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'content_list',
          permissions: [PERMISSIONS.VIEW_CONTENT],
          breadcrumbs: [
            { title: 'content_list', name: 'content.index' }
          ]
        }
      },
      {
        path: '/content/create',
        name: 'content.create',
        component: page('content/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'content',
          permissions: [PERMISSIONS.CREATE_CONTENT],
          title: 'content_create',
          breadcrumbs: [
            { title: 'content_list', name: 'content.index' },
            { title: 'content_create', name: 'content.create' }
          ]
        }
      },
      {
        path: '/content/:id/edit',
        name: 'content.edit',
        component: page('content/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          type: 'content',
          permissions: [PERMISSIONS.VIEW_CONTENT],
          title: 'content_edit',
          breadcrumbs: [
            { title: 'content_list', name: 'content.index' },
            { title: 'content_edit', name: 'content.edit' }
          ]
        }
      }
    ]
  },

  // User
  {
    path: '/user',
    component: Resource,
    children: [
      {
        path: '',
        name: 'user.index',
        component: page('user/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'user_list',
          permissions: [PERMISSIONS.VIEW_USER],
          breadcrumbs: [
            { title: 'user_list', name: 'user.index' }
          ]
        }
      },
      {
        path: '/user/create',
        name: 'user.create',
        component: page('user/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'user_list',
          permissions: [PERMISSIONS.CREATE_USER],
          breadcrumbs: [
            { title: 'user_list', name: 'user.index' },
            { title: 'user_create', name: 'user.create' }
          ]
        }
      },
      {
        path: '/user/:id/edit',
        name: 'user.edit',
        component: page('user/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'user_list',
          permissions: [PERMISSIONS.VIEW_USER],
          breadcrumbs: [
            { title: 'user_list', name: 'user.index' },
            { title: 'user_edit', name: 'user.edit' }
          ]
        }
      }
    ]
  },

  // Role
  {
    path: '/role',
    component: Resource,
    children: [
      {
        path: '',
        name: 'role.index',
        component: page('role/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_list',
          permissions: [PERMISSIONS.VIEW_ROLE],
          breadcrumbs: [
            { title: 'role_list', name: 'role.index' }
          ]
        }
      },
      {
        path: '/role/create',
        name: 'role.create',
        component: page('role/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_list',
          permissions: [PERMISSIONS.CREATE_ROLE],
          breadcrumbs: [
            { title: 'role_list', name: 'role.index' },
            { title: 'role_create', name: 'role.create' }
          ]
        }
      },
      {
        path: '/role/:id/edit',
        name: 'role.edit',
        component: page('role/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          title: 'role_list',
          permissions: [PERMISSIONS.VIEW_ROLE],
          breadcrumbs: [
            { title: 'role_list', name: 'role.index' },
            { title: 'role_edit', name: 'role.edit' }
          ]
        }
      }
    ]
  },

  // Error
  {
    path: '/error',
    component: Resource,
    children: [
      {
        path: '/400',
        name: 'error.400',
        component: page('error/Error400.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.400' }
          ]
        }
      },
      {
        path: '/403',
        name: 'error.403',
        component: page('error/Error403.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.403' }
          ]
        }
      },
      {
        path: '/404',
        name: 'error.404',
        component: page('error/Error404.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.404' }
          ]
        }
      },
      {
        path: '/409',
        name: 'error.409',
        component: page('error/Error409.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.409' }
          ]
        }
      },
      {
        path: '/429',
        name: 'error.429',
        component: page('error/Error429.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.429' }
          ]
        }
      },
      {
        path: '/500',
        name: 'error.500',
        component: page('error/Error500.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.500' }
          ]
        }
      },
      {
        path: '/503',
        name: 'error.503',
        component: page('error/Error503.vue'),
        meta: {
          title: '',
          permissions: PERMISSIONS.ALL,
          breadcrumbs: [
            { title: 'error', name: 'error.503' }
          ]
        }
      }
    ]
  },

  // Page not found
  {
    path: '*',
    component: page('error/Error404.vue')
  }
]

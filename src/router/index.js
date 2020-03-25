import Vue from 'vue'
import VueRouter from 'vue-router'

// ROUTE
import LoginRoute from './routes/login'
import MainRoute from './routes/main'

Vue.use(VueRouter)

const routes = [
  LoginRoute,
  MainRoute
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.addRoutes(routes)

export default router

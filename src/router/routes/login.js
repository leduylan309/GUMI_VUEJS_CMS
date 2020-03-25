import Login from '../../pages/Login.vue'
import multiguard from 'vue-router-multiguard'
import { LoginGuard } from '../../guard/login.guard'

const login = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    title: 'ADMIN LOGIN'
  },
  beforeEnter: multiguard([LoginGuard])
}

export default login
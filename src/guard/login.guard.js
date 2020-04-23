import Vue from 'vue'
import { AuthService } from '../api'

export const LoginGuard = (to, from, next) => {
  const token = Vue.$cookies.get('token')

  if (!token) {
    next()
  } else {
    AuthService.profile({ include: 'roles,permissions'}).then(() => {
      next({ name: 'Dashboard' })
    }).catch(() => {
      Vue.$cookies.remove('token')
      next({ name: 'Login' })
    })
  }
}

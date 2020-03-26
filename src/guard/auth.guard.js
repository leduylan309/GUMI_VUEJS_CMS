import Vue from 'vue'
import { AuthService } from '../api'
import AuthModel from '../models/auth.model'
import store from '../store'

export const AuthGuard = (to, from, next) => {
  next()
  const accessToken = Vue.$cookies.get('token')

  if (accessToken) {
    const admin = AuthModel.query().first()
    if (admin && 'id' in admin) {
      next()
    } else {
      AuthService.fetchAdmin().then(() => {
        next()
      }).catch((error) => {
        // return if error == undefined
        if (!error) {
          RedirectToLogin()
        }

        // return if unauthenticated
        const { response: { status } } = error
        if (!response || status === 401) {
          RedirectToLogin()
        }
      })
    }
  } else {
    // Not exist token
    next({ name: 'Login' })
  }
}

/**
 * Redirect to Login Router
 * @constructor
 */
export const RedirectToLogin = () => {
  Vue.$cookies.remove('token')

  next({ name: 'Login' })
}
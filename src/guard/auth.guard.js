import Vue from 'vue'
import { AuthService } from '../api'
import AuthModel from '../models/auth.model'

export const AuthGuard = (to, from, next) => {
  const token = Vue.$cookies.get('token')
  if (token) {
    const auth = AuthModel.query().first()

    if (auth && 'id' in auth) {
      next()
    } else {
      AuthService.profile().then(() => {
        next()
      }).catch((error) => {
        // return if error == undefined
        if (!error) {
          RedirectToLogin()
        }

        // return if unauthenticated
        const { response: { status } } = error
        if (response || status === 401) {
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
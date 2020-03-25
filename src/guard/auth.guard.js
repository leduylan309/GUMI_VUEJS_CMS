import Vue from 'vue'
import store from '../store'

export const AuthGuard = (to, from, next) => {
  const accessToken = Vue.$cookies.get('token')

  if (accessToken) {
    const admin = store.getters['auth/currentAdmin']
    if (admin && 'id' in admin) {
      next()
    } else {

      store.dispatch('auth/fetchAdmin').then(() => {
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
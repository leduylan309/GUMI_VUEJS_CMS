import Vue from 'vue'

export const LoginGuard = (to, from, next) => {
  const token = Vue.$cookies.get('token')

  if (!token) {
    next()
  } else {
    next({ name: 'Dashboard' })
  }
}

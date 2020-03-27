import Vue from 'vue'

export const LoginGuard = (to, from, next) => {
  const token = Vue.$cookies.get('token')

  if (!token) {
    // Exist token
    next()
  } else {
    // Not exist token
    next({ name: 'Dashboard' })
  }
}

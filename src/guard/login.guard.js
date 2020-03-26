import Vue from 'vue'

export const LoginGuard = (to, from, next) => {
  const accessToken = Vue.$cookies.get('token')

  if (!accessToken) {
    // Exist token
    next()
  } else {
    // Not exist token
    next({ name: 'Dashboard' })
  }
}

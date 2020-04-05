// import Core
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Style
import './assets/scss/main.scss'

// import Plugins
import './plugins/validation'
import './plugins/vue-cookies'
import './plugins/pimevue'
import './plugins/adminlte'
import i18n from './plugins/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n: i18n, // language
  render: h => h(App)
}).$mount('#app')

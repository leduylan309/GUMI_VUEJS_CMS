// Import Core
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import Plugins
import './plugins/tabler'
import './plugins/progress-bar'
import './plugins/lazyload'
import './plugins/validation'
import './plugins/ant.design'
import './plugins/google.map'
import './plugins/moment'
import i18n from './plugins/i18n'

// STYLE
import './assets/scss/main.scss'

// import filter
import './utils/filters'
import './mixins/global.mixin'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n: i18n, // language
  render: h => h(App)
}).$mount('#app')

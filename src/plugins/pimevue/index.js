// JS DIRECTIVE
import Vue from 'vue'
import Tooltip from 'primevue/tooltip'
import ToastService from 'primevue/toastservice'

Vue.use(ToastService)
Vue.directive('tooltip', Tooltip)
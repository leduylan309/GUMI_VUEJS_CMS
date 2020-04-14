import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { configInterceptorAxios } from '../config/interceptor'
import database from './database'

// map VUEX to Vue
Vue.use(Vuex)

// CONFIG GLOBAL FOR AXIOS
VuexORM.use(VuexORMAxios, {
  axios,
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10 * 1000
})

// config interceptor for Axios
configInterceptorAxios(axios)

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store
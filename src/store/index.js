import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import { configAxios } from '../config/interceptor'

import database from './database'

VuexORM.use(VuexORMAxios, { axios })

// config Axios
configAxios(axios)

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios/lib/VuexORMAxios'

import database from './database'
import axiosInstance from '../config/interceptor'

VuexORM.use(VuexORMAxios, { axiosInstance })

export default new Vuex.Store({
  plugins: [VuexORMAxios.install(database)]
})

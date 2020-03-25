import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

const state = {}
const getters = {}
const mutations = {}
const actions = {}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  modules,
  mutations,
  actions
})

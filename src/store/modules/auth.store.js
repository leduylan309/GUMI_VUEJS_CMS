import Vue from 'vue'

// Service
import { RootState } from '../../shared/store/state'
import { AuthService } from '../../api/services/auth.service'

// define Service
const state = { ...RootState }

const getters = {
  /**
   * get current Admin
   * @param state
   */
  currentAdmin: (state) => state.currentAdmin,

  /**
   * get token
   * @param state
   */
  token: (state) => state.token
}

const mutations = {
  /**
   * setup TOKEN
   * @param state
   * @param payload
   * @constructor
   */
  SET_TOKEN (state, payload) {
    state.token = payload['token']

    // add to cookie
    Vue.$cookies.set('token', payload['token'], payload['exp'])
  },

  /**
   * set current Admin to store
   * @param state
   * @param payload
   * @constructor
   */
  SET_CURRENT_ADMIN (state, payload) {
    state.currentAdmin = payload
  }
}

const actions = {
  /**
   * Login Action For Admin
   * @param commit
   * @param dispatch
   * @param payload
   * @return
   */
  async login ({ commit, dispatch }, payload) {
    const response = await AuthService.login(payload)

    // commit to store
    await commit('SET_TOKEN', response.data)

    // call fetch data
    await dispatch('fetchAdmin')
  },

  /**
   * call admin information
   * @param commit
   */
  async fetchAdmin ({ commit }) {
    const data = await AuthService.fetchAdmin()

    await commit('SET_CURRENT_ADMIN', data)
  }
}

/**
 * export module
 */
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

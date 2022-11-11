import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import micro from './modules/micro'
import configurator from './modules/configurator'

export { default as initStore } from './initStore'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    micro,
    configurator
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})

export default store

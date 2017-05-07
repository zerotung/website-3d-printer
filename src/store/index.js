import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import users from './modules/users'
import tasks from './modules/tasks'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    users,
    tasks
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})

import Vue from 'vue'
import Vuex from 'vuex'

import { login } from './modulo.login'
import { cadastro } from './modulo.cadastro'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    cadastro
  }
})
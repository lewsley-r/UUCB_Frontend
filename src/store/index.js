import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state:{
    selectedUser: null,
    users: null,
    posts: null
  },
  mutatations: {
  
  }
})

export default store

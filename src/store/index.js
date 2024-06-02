import { createStore } from 'vuex'

export const store = createStore({
  state: {
    auth: {
      user: null,
      isAuth: false
    }
  },
  getters: {
    getUser: (state) => state.auth.user,
    getIsAuth: (state) => state.auth.isAuth
  },
  mutations: {
    setUser(state, user) {
      state.auth.user = user
    },
    setIsAuth(state, isAuth) {
      state.auth.isAuth = isAuth
    },
    logout(state) {
      state.auth.user = null
      state.auth.isAuth = false
    }
  }
})

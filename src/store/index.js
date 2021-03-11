import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 資料
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
      avatar: '',
      cover: '',
      introduction: '',
      role: ''
    },
    isAuthenticated: false,
    token: ''
  },
  // 資料操作
  mutations: {
    // 登入
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    // 登出
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  // 非同步操作
  actions: {
    // 確認使用者登入狀態
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        const { id, name, account, email, avatar, role, cover, introduction } = data
        commit('setCurrentUser', {
          id,
          name,
          account,
          email,
          avatar,
          role,
          cover,
          introduction         
        })
        return true
      } catch(err) {
        console.log(err)
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { io } from 'socket.io-client'
import router from './router'
import './assets/application.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser, faCog, faArrowLeft, faComment, faHeart, faFeatherAlt, faEnvelope, faBell, faCamera, faTimes, faDoorOpen, faPaperPlane, faPlay } from '@fortawesome/free-solid-svg-icons'

library.add(
  faHome,
  faUser,
  faCog,
  faArrowLeft,
  faComment,
  faHeart,
  faFeatherAlt,
  faEnvelope,
  faBell,
  faCamera,
  faTimes,
  faDoorOpen,
  faPaperPlane,
  faPlay
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Socket.io
const token = localStorage.getItem('token') || ''
const userId = store.state.currentUser.id || -1

export const socket = io('https://twitter-simple-one.herokuapp.com/', {
  auth: {
    token,
    userId
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

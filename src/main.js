import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
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

const options = { path: '' }

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('https://twitter-simple-one.herokuapp.com/', options), //options object is Optional
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

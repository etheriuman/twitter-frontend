import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/application.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faUser, faCog, faArrowLeft, faComment, faHeart, faFeatherAlt, faEnvelope, faBell, faCamera, faTimes } from '@fortawesome/free-solid-svg-icons'

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
  faTimes
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

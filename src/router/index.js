import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn.vue'
import Tweets from './../views/Tweets.vue'
import AdminSignIn from './../views/AdminSignIn.vue'
import AdminTweets from './../views/AdminTweets.vue'
import store from './../store'

Vue.use(VueRouter)

// 管理者驗證(防止輸入路由侵入)
const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'admin') {
    // 踢出到404
    next('/404')
    return
  }
  next()
}

// 一般使用者驗證(防止管理者輸入路由產生bug)
const authorizeIsUser = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && currentUser.role !== 'user') {
    // 踢出到404
    next('/404')
    return
  }
  next()
}

const routes = [
  // root -----
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  // sign in -----
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  // sign up -----
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('./../views/SignUp.vue')
  },
  // setting -----
  {
    path: '/setting',
    name: 'setting',
    component: () => import('./../views/Setting.vue'),
    beforeEnter: authorizeIsUser
  },
  // tweets paths -----
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets,
    beforeEnter: authorizeIsUser
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('./../views/Tweet.vue'),
    beforeEnter: authorizeIsUser
  },
  // users paths -----
  {
    path: '/users/:id',
    exact: true,
    redirect: '/users/:id/tweets'
  },
  {
    path: '/users/:id/tweets',
    name: 'user-tweets',
    component: () => import('./../views/UserTweets.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id/replies',
    name: 'user-replies',
    component: () => import('./../views/UserReplies.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes',
    component: () => import('./../views/UserLikes.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('./../views/UserFollowings.vue'),
    beforeEnter: authorizeIsUser
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('./../views/UserFollowers.vue'),
    beforeEnter: authorizeIsUser
  },
  // admin paths -----
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/signin'
  },
  {
    path: '/admin/signin',
    name: 'admin-sign-in',
    component: AdminSignIn
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: AdminTweets,
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('./../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  // not found -----
  {
    path: '*',
    name: 'not-found',
    component: () => import('./../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

// 轉址前置驗證
router.beforeEach(async (to, from, next) => {
  console.log(to.name)
  const currentUserRole = store.state.currentUser.role
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 若localstorage token存在但與store的不一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 重新驗證token是否有效
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  
  const pathWithoutAuthentication = ['sign-in', 'sign-up', 'admin-sign-in']

  // 若token無效驗證沒過，轉址地點不是需認證地址
  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin')
    return
  }
  
  // 若token有效驗證通過，轉址地點是無需認證地址
  if (isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    if (currentUserRole === 'admin') {
      next('/admin/tweets')
      return
    }
    next('/tweets')
    return
  }
  // 都沒事就順利轉址
  console.log('success')
  next()
})

export default router

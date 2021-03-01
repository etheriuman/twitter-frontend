import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from './../views/SignIn.vue'

Vue.use(VueRouter)

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
    component: () => import('./../views/Setting.vue')
  },
  // tweets paths -----
  {
    path: '/tweets',
    name: 'tweets',
    component: () => import('./../views/Tweets.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('./../views/Tweet.vue')
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
    component: () => import('./../views/UserTweets.vue')
  },
  {
    path: '/users/:id/replies',
    name: 'user-replies',
    component: () => import('./../views/UserReplies.vue')
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes',
    component: () => import('./../views/UserLikes.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-following',
    component: () => import('./../views/UserFollowings.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'user-followers',
    component: () => import('./../views/UserFollowers.vue')
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
    component: () => import('./../views/AdminSignIn.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('./../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('./../views/AdminUsers.vue')
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

export default router

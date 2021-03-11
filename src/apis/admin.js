import { apiHelper } from './../utils/helpers.js'

export default {
  getTweets() {
    return apiHelper.get('/admin/tweets')
  },
  deleteTweets({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`)
  },
  getUsers() {
    return apiHelper.get('/admin/users')
  },
  getLightUsers() {
    return apiHelper.get('/admin/users/light')
  }
}
import { apiHelper } from './../utils/helpers.js'

export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user')
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  set ({ userId, payLoad }) {
    return apiHelper.put(`/users/${userId}`, payLoad)
  },
  getTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getRepliedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getLikedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getFollowings ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getTopUsers () {
      return apiHelper.get('/topusers')
  }
}
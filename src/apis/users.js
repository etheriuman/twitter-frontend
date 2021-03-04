import { apiHelper } from './../utils/helpers.js'

export default {
  set ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  edit ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getRepliedTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getFollowingUsers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowerUsers ({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getLikeTweets ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getTopUsers () {
      return apiHelper.get('/topusers')
  }
}
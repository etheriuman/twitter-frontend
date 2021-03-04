import { apiHelper } from './../utils/helpers.js'

export default {
  addLike({ tweetId }) {
    return apiHelper.post(`/like/${tweetId}`, null)
  },
  cancelLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  }
}
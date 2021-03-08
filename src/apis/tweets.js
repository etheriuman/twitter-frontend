import { apiHelper } from './../utils/helpers.js'

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  createTweet({ payLoad }) {
    return apiHelper.post('/tweets', payLoad)
  },
  updateTweet({ tweetId, payLoad }) {
    return apiHelper.put(`/tweets/${tweetId}`, payLoad)
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  getTweetLikes({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/likes`)
  },
}
import { apiHelper } from './../utils/helpers.js'

export default {
  addReply({ tweetId, payLoad }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, payLoad)
  },
  updateReply({ replyId, payLoad }) {
    return apiHelper.put(`/replies/${replyId}`, payLoad)
  },
  deleteReply({ replyId }) {
    return apiHelper.delete(`/replies/${replyId}`)
  }
}

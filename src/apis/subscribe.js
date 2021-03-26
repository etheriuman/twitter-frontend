import { apiHelper } from './../utils/helpers.js'

export default {
  addSubscribe ({ payLoad }) {
    return apiHelper.post('/followships', payLoad)
  },
  removeSubscribe({ subscribeId }) {
    return apiHelper.delete(`/followships/${subscribeId}`)
  }
}
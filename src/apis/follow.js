import { apiHelper } from './../utils/helpers.js'

export default {
  addFollow ({ payLoad }) {
    return apiHelper.post('/followships', payLoad)
  },
  removeFollow ({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  }
}
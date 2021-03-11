import { apiHelper } from './../utils/helpers.js'

export default {
  addFollow ({ payLoad }) {
    return apiHelper.post('/followships', payLoad)
  },
  removeFollow({ followId }) {
    return apiHelper.delete(`/followships/${followId}`)
  }
}
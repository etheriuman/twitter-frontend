import { apiHelper } from './../utils/helpers.js'

export default {
  addFollow () {
    return apiHelper.post('/followships',null)
  },
  removeFollow ({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  }
}
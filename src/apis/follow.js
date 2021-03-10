import { apiHelper } from './../utils/helpers.js'

export default {
  addFollow ({payLoad}) {
    return apiHelper.post('/followships', payLoad)
  },
  removeFollow ({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}
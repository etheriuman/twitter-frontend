import { apiHelper } from './../utils/helpers.js'

export default {
  signUp ({ payLoad }) {
    return apiHelper.post('/users', payLoad)
  }
}
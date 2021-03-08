import { apiHelper } from './../utils/helpers.js'

export default {
  users: {
    signIn ({ payLoad }) {
      return apiHelper.post('/signin', payLoad)    
    }
  },
  admin: {
    signIn ({ payLoad }) {
      return apiHelper.post('/admin/signin', payLoad)
    }
  }
}
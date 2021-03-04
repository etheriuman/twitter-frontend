import { apiHelper } from './../utils/helpers.js'

export default {
  users: {
    signUp ({ payLoad }) {
      return apiHelper.post('/users', payLoad)
    },
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
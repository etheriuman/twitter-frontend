<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="./../imgs/Icon.svg" alt="logo">
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>登入Alphitter</span>
    </div>
    <form @submit.prevent.stop="handleFormSubmit">
      <!-- 帳號 -->
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          v-model="account"
          id="account"
          ref="account"
          name="account"
          type="text"
          class="form-control"
          autocomplete="useraccount"
          required
          autofocus
        />
      </div>
      <!-- 密碼 -->
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control"
          autocomplete="new-password"
          required
        />
      </div>
      <div class="form-label-group button-div">
        <button class="btn btn-primary btn-block submit-button" :disabled="isProcessing" type="submit">
          登入
        </button>
      </div>
      <div class="form-bottom">
        <router-link class="text-secondary" to="/signup">
            註冊 Alphitter
        </router-link>
        <span class="text-muted"> · </span>
        <router-link class="text-secondary" to="/admin/signin">
            後台登入
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from './../apis/authorization'
import { mapState } from 'vuex'
import { Toast } from './../utils/helpers'
import { socket } from './../main'

export default {
  data() {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods:{
    async handleFormSubmit() {
      try {
        if (!this.account) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入帳號'
          })
          return
        }
        if (!this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入密碼'
          })
          return
        }
        const payLoad = {
        account: this.account,
        password: this.password
        }
        this.isProcessing = true
        // API POST request ...
        const { data } = await authorizationAPI.users.signIn({ payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 成功就存入token
        localStorage.setItem('token', data.token)
        // 修改store資料
        this.$store.commit('setCurrentUser', data.user)
        // 設定 socket query
        socket.io.opts.query = {
          token: localStorage.getItem('token'),
          userId: this.currentUser.id
        }
        // 設定 socket auth
        socket.io.opts.auth = {
          token: localStorage.getItem('token'),
          userId: this.currentUser.id
        }
        // 查看 socket 物件
        console.log('current socket object: ', socket)
        // socket.io 連線
        console.log('socket connect request sent!')
        socket.connect()
        // socket.io 發布上線訊息
        socket.emit('sendOnline', {userId: this.currentUser.id})
        console.log(this.currentUser.id)
        // 跳轉
        this.$router.push('/tweets')
      } catch(err) {
        Toast.fire({
          icon: 'warning',
          title: '請確認輸入了正確的帳號密碼'
        })
        this.isProcessing = false
        console.log(err)
      }
    },
    autoFocus() {
      this.$refs.account.focus()
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  mounted() {
    this.autoFocus()
  }
}
</script>

<style scoped>

.container {
  margin-top: 50px;
  width: 50%;
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title-bar {
  font-weight: 700;
}

.form-label-group {
  position: relative;
  height: 50px;
  margin-bottom: 30px;
  background: #f5f8fa;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.form-label-group label {
  position: absolute;
  font-size: .8rem;
  height: 25px;
  width: 100%;
  padding: 5px 0 0 10px;
  top: 0;
  cursor: text;
}

.form-control {
  height: 25px;
  background: #f5f8fa;
  padding: 0px 10px;
  outline-width: 0;
}

.button-div {
  height: auto;
  background: none;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.submit-button {
  margin-bottom: 20px;
}

.form-bottom {
  text-align: end;
}

.form-control:focus {
  box-shadow: none;
  border-color: #ff6600;
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {

.container {
  width: 80%;
}

}
</style>


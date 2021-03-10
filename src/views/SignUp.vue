// 註冊頁
<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="./../imgs/Icon.svg" alt="logo">
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>建立你的帳號</span>
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
      <!-- 名稱 -->
      <div class="form-label-group">
        <label for="name">名稱</label>
        <input
          v-model="name"
          id="name"
          ref="name"
          name="name"
          type="text"
          class="form-control"
          autocomplete="username"
          required
        />
      </div>
      <!-- email -->
      <div class="form-label-group">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          ref="email"
          name="email"
          type="email"
          class="form-control"
          autocomplete="useremail"
          required
        />
      </div>
      <!-- 密碼 -->
      <div class="form-label-group">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          ref="password"
          name="password"
          type="password"
          class="form-control"
          autocomplete="new-password"
          required
        />
      </div>
      <!-- 密碼確認 -->
      <div class="form-label-group">
        <label for="check-password">密碼確認</label>
        <input
          v-model="checkPassword"
          id="check-password"
          ref="checkPassword"
          name="checkPassword"
          type="password"
          class="form-control"
          autocomplete="new-password"
          required
        />
      </div>
      <div class="form-label-group button-div">
        <button class="btn btn-primary btn-block submit-button" :disabled="isProcessing" type="submit">
          註冊
        </button>
        <router-link class="text-secondary" v-show="!isProcessing" to="/signin">
          取消
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import signUpAPI from './../apis/signUp'
import { Toast } from "./../utils/helpers"


export default {
  data() {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      isProcessing: false
    }
  },
  methods:{
    async handleFormSubmit() {
      try {
        // 檢查表單內容
        if (!this.account) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫帳號'
          })
          this.$refs.account.focus()
          return
        }
        if (!this.name) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫名稱'
          })
          this.$refs.name.focus()
          return
        }
        if (!this.email) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫email'
          })
          this.$refs.email.focus()
          return
        }
        if (!this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫密碼'
          })
          this.$refs.password.focus()
          return
        }
        if (!this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請填寫密碼確認'
          })
          this.$refs.checkPassword.focus()
          return
        }
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼確認有誤，請再次填寫'
          })
          this.checkPassword = ''
          return
        }
        const payLoad = {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        }
        this.isProcessing = true
        // API POST request ...
        const { data } = await signUpAPI.signUp({ payLoad })
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 註冊成功頁面跳轉
        this.$router.push('/signin')
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法成功註冊，請稍後再試'
        })
        console.log(err)
        this.isProcessing = false
        this.password = ''
        this.checkPassword = ''
      }
      
    },
    autoFocus() {
      this.$refs.account.focus()
    }
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


// 後台登入頁
<template>
  <div class="container">
    <!-- logo bar-->
    <div class="logo-bar header">
      <img src="./../imgs/Icon.svg" alt="logo">
    </div>
    <!-- title bar-->
    <div class="title-bar header">
      <span>後台登入</span>
    </div>
    <form @submit.prevent.stop="handleFormSubmit">
      <!-- 帳號 -->
      <div class="form-label-group">
        <label for="account">帳號</label>
        <input
          v-model="account"
          id="account"
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
        <button class="btn btn-lg btn-primary btn-block submit-button" type="submit">
          登入
        </button>
      </div>
      <div class="form-bottom">
        <router-link class="cancle-button" to="/signin">
            前台登入
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      account: '',
      password: '',
    }
  },
  methods:{
    handleFormSubmit() {
      const payLoad = {
        account: this.account,
        password: this.password
      }
      console.log(payLoad)
      // API POST request ...
    },
    autoFocus() {
      $('#account').focus()
    }
  },
  mounted() {
    this.autoFocus()
  }
}
</script>

<style scoped>

* {
  /* outline: 1px solid pink; */
}

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


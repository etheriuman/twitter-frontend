// 登入頁
<template>
 <div class="container py-5">
    <form class="w-50 mx-auto">
      <div class="text-center mb-4">
        <img src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4" class="twitterLogo mb-3" alt="twitterLogo">
        <h1 class="title mb-3 font-weight-bold">
          登入 Alphitter
        </h1>
      </div>

      <div class="form-label-group mb-2 text-muted">
        <label for="account">帳號</label>
        <input
          v-model="account"
          id="account"
          name="account"
          type="text"
          class="form-control h-25 p-0"
          autocomplete="current-name"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-4 text-muted">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control h-25 p-0"
          autocomplete="current-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
      >
        登入
      </button>

      <div class="text-right font-weight-bold">
        <span>
          <router-link to="/signup" class="signup">註冊 Alphitter</router-link>
        </span>
        <span class="dot">．</span>
        <span>
          <router-link to="/admin" class="adminSignin">後台登入</router-link>
        </span>
      </div>

    </form>
  </div>
    
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  }
}
</script>


<style scoped>

.title {
  font-size: 23px
}
label {
  font-size:15px;
  color: #657786;
}
.twitterLogo {
  width: 50px;
  height: 50px;
}
.form-control {
  border: 0px ;
  border-bottom: 1px solid;
  border-radius: 0 ;
}
.btn-primary {
  color: #fff;
  background-color:  #FF6600;
  border-color: #FF6600;
  border-radius: 90px;
}
.btn-primary:hover, .btn-primary:focus, .btn-primary:active:hover{
  color: #fff;
  background-color: #CC5200;
  border-color: #CC5200;
  border-radius: 90px;
}
.signup, .dot, .adminSignin{
  color: #0099FF;;
}

</style>


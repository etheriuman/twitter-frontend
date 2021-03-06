// 註冊頁
<template>
  <div class="container py-5">
    <form @submit.prevent.stop="submitSignUp" class="w-50 mx-auto">
      <div class="text-center mb-4">
        <img
          src="https://avatars.githubusercontent.com/u/8667311?s=200&v=4"
          class="twitterLogo mb-3"
          alt="twitterLogo"
        />
        <h1 class="title mb-3 font-weight-bold">建立你的帳號</h1>
      </div>

      <div class="form-label-group mb-3">
        <label for="account">帳號</label>
        <input
          v-model="account"
          id="account"
          name="account"
          type="text"
          class="form-control h-25 p-0"
          autocomplete="useraccount"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-4">
        <label for="name">名稱</label>
        <input
          v-model="name"
          id="name"
          name="name"
          type="text"
          class="form-control h-25 p-0"
          autocomplete="username"
          required
        />
      </div>

      <div class="form-label-group mb-4">
        <label for="email">Email</label>
        <input
          v-model="email"
          id="email"
          name="email"
          type="email"
          class="form-control h-25 p-0"
          autocomplete="useremail"
          required
        />
      </div>

      <div class="form-label-group mb-4">
        <label for="password">密碼</label>
        <input
          v-model="password"
          id="password"
          name="password"
          type="password"
          class="form-control h-25 p-0"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-4">
        <label for="password-check">密碼確認</label>
        <input
          v-model="passwordCheck"
          id="password-check"
          name="password-check"
          type="password"
          class="form-control h-25 p-0"
          autocomplete="new-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        註冊
      </button>

      <div class="cancel text-center mb-3">
        <p>
          <router-link to="/signin"> 取消 </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "./../utils/helpers";
export default {
  name: "SignUp",
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  methods: {
    submitSignUp() {
      //串接api傳送資料
      console.log(
        `account:${this.account}, name:${this.name}, email:${this.email}, password:${this.password}, passwordCheck:${this.passwordCheck}`
      );
    },
  },
};
</script>



<style scoped>
.title {
  font-size: 23px;
}
label {
  font-size: 15px;
  color: #657786;
}
.twitterLogo {
  width: 50px;
  height: 50px;
}
.btn-primary {
  color: #fff;
  background-color: #ff6600;
  border-color: #ff6600;
  border-radius: 90px;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active:hover {
  color: #fff;
  background-color: #cc5200;
  border-color: #cc5200;
  border-radius: 90px;
}
.cancel {
  color: #0099ff;
}
.form-control {
  border: 0px;
  border-bottom: 1px solid;
  border-radius: 0;
}
</style>

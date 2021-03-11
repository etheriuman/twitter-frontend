<template>
  <div class="main">
    <div class="column-left column">
      <Navbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />

          <li class="list-group-item">
            <!-- 表單 -->
            <form class="card-body" @submit.prevent.stop="handleFormSubmit">
              <!-- 帳號 -->
              <div class="form-label-group">
                <label for="account">帳號</label>
                <input
                  v-model="cacheCurrentUser.account"
                  id="account"
                  ref="account"
                  name="account"
                  type="text"
                  class="form-control"
                  autocomplete="useraccount"
                  required
                />
              </div>
              <!-- 名稱 -->
              <div class="form-label-group">
                <label for="name">名稱</label>
                <input
                  v-model="cacheCurrentUser.name"
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
                  v-model="cacheCurrentUser.email"
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
                  v-model="cacheCurrentUser.password"
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
                <label for="password-check">密碼確認</label>
                <input
                  v-model="cacheCurrentUser.checkPassword"
                  id="checkPassword"
                  ref="checkPassword"
                  name="checkPassword"
                  type="password"
                  class="form-control"
                  autocomplete="new-password"
                  required
                />
              </div>
              <div class="form-label-group button-div">
                <button
                  class="btn btn-primary btn-block submit-button"
                  type="submit"
                  :disabled="isProcessing"
                >
                  儲存
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import PageHead from './../components/PageHead'
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'


export default {
  components: {
    Navbar,
    PageHead,
  },
  data() {
    return {
      cacheCurrentUser: {
        id: -1,
        name: '',
        account: '',
        email: '',
        password: '',
        checkPassword: ''
      },
      isProcessing: false
    }
  },
  computed: {
      ...mapState(['currentUser'])
  },
  methods: {
    async handleFormSubmit() {
      try {
        if (!this.cacheCurrentUser.account.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請填入帳號'
          })
          this.$refs.account.focus()
          return
        }
        if (!this.cacheCurrentUser.name.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請填入名稱'
          })
          this.$refs.name.focus()
          return
        }
        if (!this.cacheCurrentUser.email.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請填入email'
          })
          this.$refs.email.focus()
          return
        }
        if (!this.cacheCurrentUser.password.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請填入密碼'
          })
          this.$refs.password.focus()
          return
        }
        if (!this.cacheCurrentUser.checkPassword.trim()) {
          Toast.fire({
            icon: 'warning',
            title: '請輸入密碼確認'
          })
          this.$refs.checkPassword.focus()
          return
        }
        if (this.cacheCurrentUser.password !== this.cacheCurrentUser.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼確認有誤，請重新填寫'
          })
          this.cacheCurrentUser.checkPassword = ''
          this.$refs.checkPassword.focus()
          return
        }
        const userId = this.cacheCurrentUser.id
        const payLoad = {
          name: this.cacheCurrentUser.name,
          account: this.cacheCurrentUser.account,
          email: this.cacheCurrentUser.email,
          password: this.cacheCurrentUser.password,
          checkPassword: this.cacheCurrentUser.checkPassword
        }
        this.isProcessing = true
        const { data } = await usersAPI.set({ userId, payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.isProcessing = false
        this.$store.commit('setCurrentUser', {
          name: this.cacheCurrentUser.name,
          account: `@${this.cacheCurrentUser.account}`,
          email: this.cacheCurrentUser.email,
        })
        Toast.fire({
          icon: 'success',
          title: '更新成功'
        })
        this.cacheCurrentUser.password = ''
        this.cacheCurrentUser.checkPassword = ''
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法編輯資料，請稍後再試'
        })
        this.isProcessing = false
        this.cacheCurrentUser.password = ''
        this.cacheCurrentUser.checkPassword = ''
        console.log(err)
      }
    },
    autoFocus() {
      this.$refs.account.focus()
    }
  },
  created() {
    const { id, name, account, email } = this.currentUser
    this.cacheCurrentUser = {
      ...this.cacheCurrentUser,
      id,
      name,
      account: account.replace('@', ''),
      email
    }
  },
  watch: {
    currentUser(data) {
      const { id, name, account, email } = data
      this.cacheCurrentUser = {
        ...this.cacheCurrentUser,
        id,
        name,
        account: account.replace('@', ''),
        email
      }
    }
  },
  mounted() {
    this.autoFocus();
  }
}
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr;
  grid-template-areas: "left main";
}

.card-body {
  width: 65%;
}

li {
  /* 待優化 */
  border-bottom-width: 0 !important;
}

.form-label-group {
  position: relative;
  height: 50px;
  margin-bottom: 30px;
  background: #f5f8fa;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.form-label-group label {
  position: absolute;
  font-size: 0.8rem;
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
  background: none;
}

.form-control:focus {
  box-shadow: none;
  border-color: #ff6600;
}

.submit-button {
  width: 120px;
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "main main"
      "left left";
  }
  .card-body {
    margin: 0 auto;
  }
}

/* 小 mobile 尺寸 */
@media screen and (max-width: 576px) {
  .card-body {
    width: 80%;
  }
}
</style>


<template>
  <div class="main">
    <div class="column-left column">
      <Navbar @after-submit="handleAfterSubmit" />
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
                  v-model="currentUser.account"
                  id="account"
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
                  v-model="currentUser.name"
                  id="name"
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
                  v-model="currentUser.email"
                  id="email"
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
                  id="password"
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
                  id="password-check"
                  name="password-check"
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
import $ from "jquery";
import Navbar from "./../components/Navbar";
import PageHead from "./../components/PageHead";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "Pizza Hut",
    account: "@pizzahut",
    email: "pizzahut@example.com",
  },
};

export default {
  components: {
    Navbar,
    PageHead,
  },
  data() {
    return {
      currentUser: {},
    };
  },
  methods: {
    handleAfterSubmit() {
      console.log("new tweet uploaded!");
    },
    handleFormSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      console.log(formData);
      // API POST request ...
    },
    currentUserInIt() {
      this.currentUser = {
        ...dummyUser.currentUser,
      };
    },
    autoFocus() {
      $("#account").focus();
    },
  },
  created() {
    this.currentUserInIt();
  },
  mounted() {
    this.autoFocus();
  },
};
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


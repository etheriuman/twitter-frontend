// 管理者總使用者頁
<template>
  <div class="main">
    <div class="column-left column">
      <AdminNavbar />
    </div>
    <div class="column-main column">
      <div class="card main-content">
        <ul class="list-group list-group-flush">
          <PageHead />
          <li class="list-group-item user-card-group">
            <p class="loading" v-if="isLoading">努力加載中...</p>
            <AdminUserCard v-else v-for="user in users" :key="user.id" :user="user" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "./../components/AdminNavbar";
import PageHead from "./../components/PageHead";
import AdminUserCard from "./../components/AdminUserCard";
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNavbar,
    PageHead,
    AdminUserCard,
  },
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminAPI.getLightUsers()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.isLoading = false
        this.users = response.data
      } catch(err) {
        Toast.fire({
          icon: 'error',
          title: '無法取得所有使用者，請稍後再試'
        })
        console.log(err)
      }
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.main {
  grid-template-columns: 220px 1fr;
  grid-template-areas: "left main";
}

.user-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  padding: 20px;
  grid-gap: 10px;
  text-align: center;
}

/* pad 尺寸 */
@media screen and (max-width: 992px) {
  .column-left {
    outline-width: 0;
  }
}

/* mobile 尺寸 */
@media screen and (max-width: 768px) {
  .main {
    grid-template-rows: calc(100% - 50px) 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "main main"
      "left left";
  }
  .column-left {
    outline-width: 1px;
  }
  .column-right {
    display: none;
  }
}
</style>
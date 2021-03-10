<template>
  <div class="navbar">
    <div class="upper-content">
      <div class="logo">
        <router-link to="/admin/tweets">
          <img src="./../imgs/Icon.svg" alt="">
        </router-link>
      </div>
      <div class="tabs">
        <router-link class="tab" to="/admin/tweets">
          <font-awesome-icon icon="home" /><span>推文清單</span>
        </router-link>
        <router-link class="tab" to="/admin/users">
          <font-awesome-icon icon="user" /><span>使用者列表</span>
        </router-link>
      </div>
    </div>
    <div class="lower-content">
      <button class="logout btn" @click.prevent.stop="logout">
        登出
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log('logout')
      this.$store.commit('revokeAuthentication')
      this.$router.push('/admin/signin')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.navbar {
  width: 80%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.logo {
  width: 100%;
  height: 30px;
  margin-bottom: 50px;
}

.logo img {
  width: 30px;
  height: 30px;
}

.tabs {
  width: 100%;
  height: 120px;
  display: flex;
  flex-flow: column;
}

.tab {
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
}

.tab span {
  padding-left: 20px;
}

.lower-content {
  width: 100%;
}

/* mobile 尺寸以下 */
@media screen and (max-width: 768px) {
  
.navbar {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
}

.upper-content {
  display: flex;
  width: 55%;
  height: 100%
}

.logo {
  width: 30px;
  margin-bottom: 0;
  margin-right: 30px;
}

.logo img {
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}

.tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  margin: 0;
}

.tab {
  width: 20px;
  line-height: 30px;
  text-align: center;
  margin-right: 30px;
}

.tab span {
  display: none;
}

.lower-content {
  width: 100px;
  text-align: end;
}
}

</style>
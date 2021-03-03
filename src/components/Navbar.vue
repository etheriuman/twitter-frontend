<template>
  <div class="navbar">
    <div class="upper-content">
      <div class="logo mb-5">
        <img src="https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/473/original/alpha-camp-logo.png" alt="">
      </div>
      <div class="tabs mb-3">
        <router-link class="" to="/tweets">
          首頁
        </router-link>
        <router-link class="" to="/users/1">
          個人資料
        </router-link>
        <router-link class="" to="/setting">
          設定
        </router-link>
      </div>
      <button 
      class=" btn btn-primary"
      data-toggle="modal"
      data-target="#tweeting"
      >
        推文
      </button>
    </div>
    <div class="lower-content">
      <button class="logout btn">
        登出
      </button>
    </div>
    <Tweeting />
  </div>
</template>

<script>
import Tweeting from './../components/Tweeting'

export default {
  components: {
    Tweeting
  }
}
</script>

<style scoped>
.navbar {
  width: 80%;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}

.upper-content button {
  width: 120px;
}

.logo {
  width: 100%;
  height: 30px;
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
  justify-content: space-between;
}

.tab {
  width: 100%;
  height: 30px;
}

.lower-content {
  width: 100%;
}

.tweeting-area {
  width: 100%;
}

</style>
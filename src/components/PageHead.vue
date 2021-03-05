// 頁面最上方標頭
<template>
  <div class="list-group-item">
    <div class="card-body">
      <!-- dynamic返回鍵 -->
      <!-- 如果displayArrow成立、當前頁面又沒有userData，表示在單一推文頁 -->
      <router-link to="/tweets" v-if="displayArrow">
        <font-awesome-icon class="icon" icon="arrow-left"/>
      </router-link>
      <!-- dynamic 標頭 -->
      <div class="topic">
        <p>首頁</p>
        <!-- 如果有user表示在user相關頁面 -->
        <p v-if="user" class="text-muted user-tweet-number">
          <span>{{user.tweetsNumber}} </span>推文
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayArrow: false,
      // 預設 user undefined
      user: undefined
    }
  },
  methods: {
    checkArrowIsDisplay() {
      const currentRouterName = this.$route.name
      if (currentRouterName !== 'tweets' && currentRouterName !== 'setting') {
        // 當拿到currentUser之後要加下面這段
        // & if currentUser.role !== admin >> this.displayArrow = true
        this.displayArrow = true
      }
      return
    }
  },
  created() {
    this.checkArrowIsDisplay()
  }
}
</script>

<style scoped>

.list-group-item {
  padding: 0;
}

.card-body {
  flex: 0 1 auto;
  align-content: center;
  height: 55px;
  padding: 0;
  padding-left: 10px;
}

.topic {
  display: flex;
  flex-flow: column;
  height: 100%;
  justify-content: center;
}

.topic p {
  margin: 0;
}

.user-tweet-number {
  font-size: .5rem;
}

.icon {
  margin-right: 20px;
}
</style>
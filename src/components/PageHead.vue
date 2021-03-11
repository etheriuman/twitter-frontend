// 頁面最上方標頭
<template>
  <div class="list-group-item">
    <div class="card-body d-flex align-items-center ml-2">
      <!-- 如果displayArrow成立、當前頁面又沒有userData，表示在單一推文頁 -->
      <router-link :to="arrowDirection" v-if="displayArrow">
        <font-awesome-icon class="icon" icon="arrow-left" />
      </router-link>
      <!-- dynamic 標頭 -->
      <div class="topic">
        <p>{{ currentRouterName }}</p>
        <!-- 如果有user表示在user相關頁面 -->
        <p v-if="user" class="text-muted text-sm">
          {{ user.tweetsNumber }} 推文
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    user: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      displayArrow: false,
      currentRouterName: '',
      arrowDirection: '/tweets'
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    checkArrowIsDisplay() {
      const currentRouterName = this.$route.name
      if (currentRouterName !== 'tweets' && currentRouterName !== 'setting' && currentRouterName !== 'user-tweets') {
        if (this.currentUser.role !== 'admin') {
          this.displayArrow = true
        }
      }
      return
    },
    handleCurrentRouterName(currentRouterName) {
      if (currentRouterName === "setting") {
        this.currentRouterName = "帳戶設定"
      } else if (currentRouterName === "tweets") {
        this.currentRouterName = "首頁"
      } else if (currentRouterName === "tweet") {
        this.currentRouterName = "推文"
      } else if (
        currentRouterName === "user-tweets" ||
        currentRouterName === "user-replies" ||
        currentRouterName === "user-likes" ||
        currentRouterName === "user-followings" ||
        currentRouterName === "user-followers"
      ) {
        this.currentRouterName = this.user.name
      } else if (currentRouterName === "admin-tweets") {
        this.currentRouterName = "推文清單"
      } else if (currentRouterName === "admin-users") {
        this.currentRouterName = "使用者清單"
      } else {
        return ""
      }
    }
  },
  watch: {
    user(data) {
      const currentRouterName = this.$route.name
      this.handleCurrentRouterName(currentRouterName)
      this.arrowDirection = `/users/${data.id}`
    }
  },
  created() {
    const currentRouterName = this.$route.name
    this.checkArrowIsDisplay()
    this.handleCurrentRouterName(currentRouterName)
  },
}
</script>

<style scoped>

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

.icon {
  margin-right: 20px;
  color: #000000!important;
}
</style>
// 頁面最上方標頭
<template>
  <div class="list-group-item">
    <div class="card-body">
      <!-- dynamic返回鍵 -->
      <router-link to="/" v-if="displayArrow">
        <font-awesome-icon class="icon" icon="arrow-left"/>
      </router-link>
      <!-- dynamic 標頭 -->
      <span>首頁</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayArrow: false
    }
  },
  methods: {
    checkArrowIsDisplay() {
      const currentRouterName = this.$route.name
      if (currentRouterName !== 'tweets' | 'setting') {
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
  height: 55px;
  padding: 0;
  padding-left: 10px;
  line-height: 55px;
}

.icon {
  margin-right: 20px;
}
</style>
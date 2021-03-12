// 使用者追隨與追蹤頁上方的 tabs
<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link :to="{name:'user-followings', params:{id}}" class="nav-link">
        正在跟隨
      </router-link>
    </li>
    <li class="nav-item">
      <router-link :to="{name:'user-followers', params:{id}}" class="nav-link">
        跟隨者
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "UserFollowsNavTabs",
  data() {
    return {
      id: -1
    }
  },
  created() {
    const {id} = this.$route.params
    this.id = id
  }
}
</script>

<style scoped>
a {
  color: #657786;
}
</style>
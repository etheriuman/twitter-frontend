// 使用者追隨與追蹤頁上方的 tabs
<template>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <router-link class="nav-link" to="/users/1/followers">
        跟隨者
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/users/1/followings">
        正在跟隨
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
a {
  color: #657786;
}
</style>
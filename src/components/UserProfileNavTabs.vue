// 使用者頁面中所用到的 tabs
<template>
  <ul class="nav nav-pills ml-4">
    <li class="nav-item">
      <router-link class="nav-link" to="/users/1/tweets"> 推文 </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/users/1/replies">
        推文與回覆
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/users/1/likes">
        喜歡的內容
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  name: "UserProfileNavTabs",
};
</script>

<style scoped>
a {
  color: #657786;
}
.nav-item {
  width: 130px;
  text-align: center;
  color: #657786;
  border: 0;
}
.nav-item :hover {
  color: #ff6600;
  border-bottom: 1px solid #ff6600;
  border-radius: 0;
}
</style>
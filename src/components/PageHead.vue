// 頁面最上方標頭
<template>
  <div class="list-group-item">
    <div class="card-body">
      <!-- dynamic返回鍵 -->
      <router-link to="/">
        <font-awesome-icon class="icon" icon="arrow-left"/>
      </router-link>
      <!-- dynamic 標頭 -->
      <span>首頁</span>
    </div>
  </div>
</template>

<style scoped>

.list-group-item {
  padding: 0;
}

.card-body {
  flex: 0 1 auto;
  height: 55px;
  padding: 0;
  padding-left: 20px;
  line-height: 55px;
}

.icon {
  margin-right: 20px;
}
</style>
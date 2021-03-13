<template>
  <div class="list-group-item">
    <div class="card-body">
      <div class="card-body-side">
        <!-- user avatar -->
        <router-link :to="{name: 'user-tweets', params: {id:onlineUser.id}}">
          <img class="avatar" :src="onlineUser.avatar | emptyImage" alt="">
        </router-link>
      </div>
      <div class="card-body-content">
        <!-- replyCard header -->
        <div class="content-header">
          <span class="user-name">{{onlineUser.name}}</span>
          <span class="text-muted">{{onlineUser.account}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  props: {
    onlineUser: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter]
}
</script>

<style scoped>

.card-body {
  position: relative;
  display: flex;
  padding: 15px 10px;
  align-items: center;
}

.card-body-side {
  width: 60px;
  height: 100%;
  text-align: center;
}

.card-body-content {
  width: 100%;
  height: 100%;
  padding-left: 10px;
}

.content-header {
  margin-bottom: 10px;
}

.user-name {
  margin-right: 10px;
}

.content-body p {
  word-break: break-all;
}

</style>
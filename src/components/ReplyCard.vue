// 回覆卡片
<template>
  <div class="list-group-item">
    <div class="card-body">
      <div class="card-body-side">
        <!-- user avatar -->
        <router-link :to="{name: 'user-tweets', params: {id:reply.User.id}}">
          <img class="avatar" :src="reply.User.avatar | emptyImage" alt="">
        </router-link>
      </div>
      <div class="card-body-content">
        <!-- replyCard header -->
        <div class="content-header">
          <span class="user-name">{{reply.User.name}}</span>
          <span class="text-muted">{{reply.User.account}}</span>
          <span class="text-muted"> &#8231; </span>
          <span class="text-muted">{{reply.createdAt | fromNow}}</span>
        </div>
        <!-- reply description -->
        <div class="content-body">
          <p>{{reply.comment}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from './../utils/mixins'

export default {
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  watch: {
    initialTweet(data) {
      this.tweet = {
        ...this.tweet,
        ...data
      }
    }
  },
  mixins: [fromNowFilter, emptyImageFilter]
}
</script>

<style scoped>

.card-body {
  position: relative;
  display: flex;
  padding: 15px 10px;
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